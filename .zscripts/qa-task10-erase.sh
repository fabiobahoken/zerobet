#!/bin/bash
# Task 10 QA v4 — real erasure E2E with DB verification.
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
bun run dev >> dev.log 2>&1 &
for i in $(seq 1 40); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER: $(curl -s -o /dev/null -w '%{http_code}' --max-time 30 http://localhost:3000)"

QADEV="qadev$(date +%s)abcdef"
node -e "
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
(async () => {
  await db.progressSnapshot.create({ data: { deviceId: '$QADEV', payload: JSON.stringify({streakDays:9,xp:250}), streakDays: 9, xp: 250, plan: 'premium' } });
  await db.payment.create({ data: { deviceId: '$QADEV', plan: 'premium', billingCycle: 'monthly', operator: 'orange', phone: '+236 70 12 ** 34', amount: 12000, status: 'success' } });
  console.log('seeded', '$QADEV');
  await db.\$disconnect();
})();
" 2>&1 | tail -1

agent-browser open http://localhost:3000 >/dev/null 2>&1
agent-browser eval "(() => {
localStorage.setItem('zerobet-device-id', '$QADEV');
const raw = localStorage.getItem('zerobet-store-v1') || '{}';
const data = JSON.parse(raw);
const state = data.state || {};
Object.assign(state, {
  hasCompletedOnboarding: true, hasSeenTutorial: true,
  screen: 'dashboard', streakDays: 9, xp: 250,
  plan: 'premium', planBillingCycle: 'monthly',
  planStartedAt: new Date(Date.now() - 10*24*3600*1000).toISOString(),
  language: 'fr', gender: 'male',
  lastCheckInDate: new Date().toISOString().split('T')[0],
});
data.state = state; data.version = 0;
localStorage.setItem('zerobet-store-v1', JSON.stringify(data));
return 'device + state seeded';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 9

echo "=== NAV ==="
agent-browser eval "(() => {
const tabs = Array.from(document.querySelectorAll('nav button, [role=tablist] button, nav a'));
const prof = tabs.find(b => (b.getAttribute('aria-label')||'').toLowerCase().includes('profil') || (b.textContent||'').toLowerCase().includes('profil'));
prof.click(); return 'profile';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const st = Array.from(document.querySelectorAll('button')).find(b => (b.getAttribute('aria-label')||'') === 'Paramètres');
st.click(); return 'settings';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const rgpd = Array.from(document.querySelectorAll('button')).find(b => (b.getAttribute('aria-label')||'') === 'Mes données & RGPD');
rgpd.click(); return 'data-rights';})()" 2>&1 | tail -1
sleep 3

echo "=== INVENTORY (should show 1 transaction + cloud snapshot) ==="
agent-browser eval "(() => {
const chips = Array.from(document.querySelectorAll('span.rounded-full')).map(s => s.textContent.trim());
return JSON.stringify(chips);})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-datarights-inventory.png >/dev/null 2>&1

echo "=== ERASE (for real) ==="
agent-browser eval "(() => {
const b = Array.from(document.querySelectorAll('button')).find(x => (x.textContent||'').includes('Supprimer les données du cloud'));
b.click(); return 'modal';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
document.querySelector('[role=dialog] [role=checkbox]').click(); return 'acked';})()" 2>&1 | tail -1
sleep 1
agent-browser eval "(() => {
const c = Array.from(document.querySelector('[role=dialog]').querySelectorAll('button')).find(x => (x.textContent||'').includes('tout effacer'));
c.click(); return 'confirm clicked';})()" 2>&1 | tail -1
sleep 4
agent-browser eval "(() => {
const toasts = Array.from(document.querySelectorAll('[data-sonner-toast]')).map(t => t.textContent).join(' ;; ');
const chips = Array.from(document.querySelectorAll('span.rounded-full')).map(s => s.textContent.trim());
return JSON.stringify({ toasts, chipsAfter: chips });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-erased.png >/dev/null 2>&1

echo "=== DB VERIFY ==="
node -e "
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
(async () => {
  const s = await db.progressSnapshot.count({ where: { deviceId: '$QADEV' } });
  const p = await db.payment.count({ where: { deviceId: '$QADEV' } });
  console.log('DB after erase → snapshots:', s, 'payments:', p);
  await db.\$disconnect();
})();
"

echo "=== full-page bottom screenshot (pb-32 fix) ==="
agent-browser eval "(() => { window.scrollTo(0, document.body.scrollHeight); return 'scrolled';})()" 2>&1 | tail -1
sleep 1
agent-browser screenshot /home/z/my-project/download/qa-datarights-bottom.png >/dev/null 2>&1

echo "=== console errors ==="
agent-browser errors 2>&1 | head -8
echo "=== E2E DONE ==="
