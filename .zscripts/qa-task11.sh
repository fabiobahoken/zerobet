#!/bin/bash
# Task 11 QA v2 — webhook API + pull-before-push + exit survey + chat history.
# The sandbox reaper kills next dev ~40-110s after shell start, so the script
# restarts the server between phases to reset the reaper window.

ensure_server() {
  if [ "$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://localhost:3000)" = "200" ]; then
    return 0
  fi
  pkill -f "next dev" 2>/dev/null; sleep 1
  cd /home/z/my-project
  nohup bun run dev >> dev.log 2>&1 &
  for i in $(seq 1 30); do
    curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2
  done
}

cd /home/z/my-project
pkill -f "next dev" 2>/dev/null; sleep 1
nohup bun run dev >> dev.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER: $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3000)"

# Deterministic start: wipe the QA device rows
bun -e "const {PrismaClient}=require('@prisma/client');const db=new PrismaClient();(async()=>{const a=await db.payment.deleteMany({where:{deviceId:'qa-webhook-device-01'}});const b=await db.progressSnapshot.deleteMany({where:{deviceId:'qa-webhook-device-01'}});console.log('reset payments:',a.count,'snapshots:',b.count);await db.\$disconnect()})()"

export SECRET="whsec_dev_zerobet_aube_emeraude_2026"
DEV=qa-webhook-device-01
TX1="CP-QA-$(date +%s)"
TX2="FLW-QA-$(date +%s)"

# All four signatures computed in ONE bun spawn (fast).
read -r SIG SIG2 SIG3 SIG4 <<< "$(BODY1="{\"event\":\"payment.success\",\"provider\":\"cinetpay\",\"transactionId\":\"$TX1\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000,\"currency\":\"FCFA\",\"phone\":\"0701020304\"}" \
BODY2="{\"event\":\"payment.refunded\",\"provider\":\"cinetpay\",\"transactionId\":\"X1\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000}" \
BODY3="{\"event\":\"payment.success\",\"provider\":\"cinetpay\",\"transactionId\":\"X2\",\"deviceId\":\"<script>x</script>\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000}" \
BODY4="{\"event\":\"payment.failed\",\"provider\":\"flutterwave\",\"transactionId\":\"$TX2\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000,\"failReason\":\"insufficient_funds\"}" \
SECRET="$SECRET" bun -e "
const {createHmac}=require('crypto');
const h=(b)=>'sha256='+createHmac('sha256',process.env.SECRET).update(b,'utf8').digest('hex');
process.stdout.write([h(process.env.BODY1),h(process.env.BODY2),h(process.env.BODY3),h(process.env.BODY4)].join(' '));
")"

BODY_OK="{\"event\":\"payment.success\",\"provider\":\"cinetpay\",\"transactionId\":\"$TX1\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000,\"currency\":\"FCFA\",\"phone\":\"0701020304\"}"
BODY_FAIL="{\"event\":\"payment.failed\",\"provider\":\"flutterwave\",\"transactionId\":\"$TX2\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000,\"failReason\":\"insufficient_funds\"}"

echo "=== B1: no signature (expect 401) ==="
curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -d "$BODY_OK" http://localhost:3000/api/payment/webhook
echo "=== B2: bad signature (expect 401) ==="
curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: sha256=0000000000000000000000000000000000000000000000000000000000000000" -d "$BODY_OK" http://localhost:3000/api/payment/webhook
echo "=== B3: invalid event, signed (expect 400) ==="
curl -s -w "|%{http_code}\n" -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: $SIG2" -d "{\"event\":\"payment.refunded\",\"provider\":\"cinetpay\",\"transactionId\":\"X1\",\"deviceId\":\"$DEV\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000}" http://localhost:3000/api/payment/webhook
echo "=== B4: XSS deviceId, signed (expect 400) ==="
curl -s -w "|%{http_code}\n" -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: $SIG3" -d "{\"event\":\"payment.success\",\"provider\":\"cinetpay\",\"transactionId\":\"X2\",\"deviceId\":\"<script>x</script>\",\"plan\":\"premium\",\"billingCycle\":\"monthly\",\"amount\":12000}" http://localhost:3000/api/payment/webhook
echo "=== C1: valid success (expect ok + subscription) ==="
curl -s -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: $SIG" -d "$BODY_OK" http://localhost:3000/api/payment/webhook; echo
echo "=== C2: replay (expect idempotent:true) ==="
curl -s -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: $SIG" -d "$BODY_OK" http://localhost:3000/api/payment/webhook; echo
echo "=== C3: payment.failed (expect ok) ==="
curl -s -X POST -H "Content-Type: application/json" -H "x-zerobet-signature: $SIG4" -d "$BODY_FAIL" http://localhost:3000/api/payment/webhook; echo
echo "=== D: history ==="
curl -s "http://localhost:3000/api/payment/history?deviceId=$DEV" | head -c 600; echo

echo "=== PHASE 2: fresh server window for UI ==="
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
nohup bun run dev >> dev.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER2: $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3000)"

agent-browser open http://localhost:81 >/dev/null 2>&1
agent-browser eval "(() => {
localStorage.clear();
localStorage.setItem('zerobet-device-id', '$DEV');
const raw = localStorage.getItem('zerobet-store-v1') || '{}';
const data = JSON.parse(raw);
const state = data.state || {};
Object.assign(state, {
  hasCompletedOnboarding: true, hasSeenTutorial: true,
  currentScreen: 'dashboard', previousScreens: [], streakDays: 7, xp: 570,
  plan: 'free', planBillingCycle: 'monthly', planStartedAt: null, planRenewsAt: null,
  chatNickname: 'QAChat', language: 'fr', gender: 'male',
  lastCheckInDate: new Date().toISOString().split('T')[0],
});
data.state = state; data.version = 0;
localStorage.setItem('zerobet-store-v1', JSON.stringify(data));
return 'seeded-free';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 9
echo "=== G: plan after pull-before-push (expect premium) ==="
agent-browser eval "(() => { const s = JSON.parse(localStorage.getItem('zerobet-store-v1')).state; return JSON.stringify({plan: s.plan, cycle: s.planBillingCycle, renewsAt: !!s.planRenewsAt}); })()" 2>&1 | tail -1

echo "=== H: subscription screen ==="
agent-browser eval "(() => { const raw = JSON.parse(localStorage.getItem('zerobet-store-v1')); raw.state.currentScreen='subscription'; raw.state.previousScreens=[]; localStorage.setItem('zerobet-store-v1', JSON.stringify(raw)); return 'nav'; })()" >/dev/null 2>&1
agent-browser reload >/dev/null 2>&1
sleep 7
echo "SERVER_MID: $(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:3000)"
agent-browser eval "(() => {
const text = document.body.innerText.toLowerCase();
const h1 = document.querySelector('h1')?.textContent || '';
const badge = text.includes('confirmé serveur');
const renewal = (document.body.innerText.match(/Prochain renouvellement : [^\n]+/) || [''])[0];
const activeSince = (document.body.innerText.match(/Abonné depuis le [^\n]+/) || [''])[0];
const cinetpay = text.includes('cinetpay');
const failed = text.includes('échoué');
return JSON.stringify({h1, badge, renewal, activeSince, cinetpay, failed});})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-webhook-subscription-fr.png >/dev/null 2>&1

echo "=== I: cancel -> survey ==="
agent-browser eval "(() => {
const cancel = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Annuler mon abonnement'));
if (!cancel) return 'CANCEL NOT FOUND'; cancel.click(); return 'ok';})()" 2>&1 | tail -1
sleep 1.5
agent-browser eval "(() => {
const yes = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Oui, annuler');
if (!yes) return 'YES NOT FOUND'; yes.click(); return 'ok';})()" 2>&1 | tail -1
sleep 1.5
agent-browser eval "(() => {
const dialog = document.querySelector('[role=dialog]');
const title = dialog?.querySelector('h3')?.textContent || '';
const chips = Array.from(dialog?.querySelectorAll('[role=radio]') || []).map(r => r.textContent.trim());
const send = Array.from(dialog?.querySelectorAll('button') || []).find(b => b.textContent.includes('Envoyer'));
return JSON.stringify({title, chips: chips.length, sendDisabled: send?.disabled});})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-survey-modal.png >/dev/null 2>&1
agent-browser eval "(() => {
const dialog = document.querySelector('[role=dialog]');
const chip = Array.from(dialog?.querySelectorAll('[role=radio]') || []).find(r => r.textContent.includes('trop cher'));
if (!chip) return 'CHIP NOT FOUND';
chip.click();
const ta = dialog?.querySelector('textarea');
if (ta) { const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; setter.call(ta, 'Test QA commentaire'); ta.dispatchEvent(new Event('input', { bubbles: true })); }
const send = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Envoyer'));
setTimeout(() => send && send.click(), 150);
return 'submitted';})()" 2>&1 | tail -1
sleep 2
echo "=== J: survey stored + plan free ==="
agent-browser eval "(() => {
const s = JSON.parse(localStorage.getItem('zerobet-store-v1')).state;
return JSON.stringify({plan: s.plan, survey: s.downgradeSurvey, thanks: document.body.innerText.includes('ton avis compte')});})()" 2>&1 | tail -1

echo "=== PHASE 3: fresh server window for chat + i18n ==="
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
nohup bun run dev >> dev.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER3: $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3000)"

echo "=== K: chat history ==="
agent-browser eval "(() => { const raw = JSON.parse(localStorage.getItem('zerobet-store-v1')); raw.state.plan='premium'; raw.state.currentScreen='community-chat'; raw.state.previousScreens=[]; localStorage.setItem('zerobet-store-v1', JSON.stringify(raw)); return 'nav'; })()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 9
echo "SERVER_MID2: $(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:3000)"
agent-browser eval "(() => {
const text = document.body.innerText.toLowerCase();
return JSON.stringify({h1: document.querySelector('h1')?.textContent || '', loadBtn: text.includes('messages plus anciens'), floodVisible: text.includes('message de contexte'), welcome: text.includes('bienvenue')});})()" 2>&1 | tail -1
agent-browser eval "(() => {
const loadBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.toLowerCase().includes('messages plus anciens'));
if (!loadBtn) return 'NO BTN'; loadBtn.click(); return 'clicked';})()" 2>&1 | tail -1
sleep 2.5
agent-browser eval "(() => {
const text = document.body.innerText.toLowerCase();
return JSON.stringify({startDivider: text.includes('début de la conversation'), moreBtn: text.includes('messages plus anciens')});})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-chat-history.png >/dev/null 2>&1

echo "=== PHASE 4: fresh server window for i18n ==="
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
nohup bun run dev >> dev.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER4: $(curl -s -o /dev/null -w "%{http_code}" --max-time 10 http://localhost:3000)"

echo "=== L: EN + ES spot-check ==="
agent-browser eval "(() => { const raw = JSON.parse(localStorage.getItem('zerobet-store-v1')); raw.state.language='en'; raw.state.plan='premium'; raw.state.planStartedAt=new Date(Date.now()-10*864e5).toISOString(); raw.state.planRenewsAt=new Date(Date.now()+20*864e5).toISOString(); raw.state.currentScreen='subscription'; raw.state.previousScreens=[]; localStorage.setItem('zerobet-store-v1', JSON.stringify(raw)); return 'nav'; })()" >/dev/null 2>&1
agent-browser reload >/dev/null 2>&1
sleep 7
agent-browser eval "(() => {
const text = document.body.innerText.toLowerCase();
return JSON.stringify({en_serverVerified: text.includes('server-confirmed'), en_cancel: text.includes('cancel my subscription'), en_renewal: (document.body.innerText.match(/Next renewal: [^\n]+/) || [''])[0]});})()" 2>&1 | tail -1
agent-browser eval "(() => { const raw = JSON.parse(localStorage.getItem('zerobet-store-v1')); raw.state.language='es'; localStorage.setItem('zerobet-store-v1', JSON.stringify(raw)); return 'nav'; })()" >/dev/null 2>&1
agent-browser reload >/dev/null 2>&1
sleep 7
agent-browser eval "(() => {
const text = document.body.innerText.toLowerCase();
return JSON.stringify({es_serverVerified: text.includes('confirmado en el servidor'), es_cancel: text.includes('cancelar mi suscripción')});})()" 2>&1 | tail -1

echo "=== M: fresh session console errors ==="
agent-browser eval "(() => { localStorage.clear(); return 'cleared'; })()" >/dev/null 2>&1
agent-browser reload >/dev/null 2>&1
sleep 6
agent-browser console 2>&1 | tail -12
echo "QA_DONE"
pkill -f "next dev" 2>/dev/null
