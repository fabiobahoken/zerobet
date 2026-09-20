#!/bin/bash
# Interactive chat screen probe
cd /home/z/my-project
pkill -f "next dev" 2>/dev/null; sleep 1
nohup bun run dev >> dev.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER: $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3000)"

agent-browser open http://localhost:3000 >/dev/null 2>&1
agent-browser eval "(() => {
localStorage.clear();
localStorage.setItem('zerobet-device-id', 'qa-webhook-device-01');
const raw = localStorage.getItem('zerobet-store-v1') || '{}';
const data = JSON.parse(raw);
const state = data.state || {};
Object.assign(state, {
  hasCompletedOnboarding: true, hasSeenTutorial: true,
  currentScreen: 'community-chat', previousScreens: [],
  streakDays: 7, xp: 570, plan: 'premium', chatNickname: 'QAChat',
  language: 'fr', gender: 'male',
  lastCheckInDate: new Date().toISOString().split('T')[0],
});
data.state = state; data.version = 0;
localStorage.setItem('zerobet-store-v1', JSON.stringify(data));
return 'seeded';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 10
agent-browser eval "(() => {
const bodyText = document.body.innerText.slice(0, 1200);
const h1 = document.querySelector('h1')?.textContent || '';
const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent).slice(0,4);
return JSON.stringify({h1, h2s, bodyText});})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-chat-debug.png >/dev/null 2>&1
echo "PROBE_DONE"
pkill -f "next dev" 2>/dev/null
