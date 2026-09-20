#!/bin/bash
# Task 12 QA v2 — Quittr circular gauges (dashboard ring, finance goal ring, stats counters)
# MUST run as a single command (sandbox reaps next dev after ~40-110s).
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
bun run dev >> dev.log 2>&1 &
for i in $(seq 1 40); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER: $(curl -s -o /dev/null -w '%{http_code}' --max-time 30 http://localhost:3000)"

# Seed: streak 19 (segment 14→30), savingsGoal 300k, saved 19*2142=40 698 (13.6%)
agent-browser open http://localhost:3000 >/dev/null 2>&1
agent-browser eval "(() => {
const raw = localStorage.getItem('zerobet-store-v1') || '{}';
const data = JSON.parse(raw);
const state = data.state || {};
Object.assign(state, {
  hasCompletedOnboarding: true, hasSeenTutorial: true,
  screen: 'dashboard', streakDays: 19, xp: 570,
  plan: 'premium', planBillingCycle: 'monthly',
  weeklyBetAmount: 15000, savingsGoal: 300000,
  language: 'fr', gender: 'male',
  lastCheckInDate: new Date().toISOString().split('T')[0],
  lastStreakDate: new Date().toDateString(),
});
data.state = state; data.version = 3;
localStorage.setItem('zerobet-store-v1', JSON.stringify(data));
return 'seeded';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 9

echo "=== A: DASHBOARD ring + pill ==="
agent-browser eval "(() => {
const pill = document.querySelector('.pr-milestone-pill');
const rings = document.querySelectorAll('svg circle').length;
const orb = document.querySelectorAll('[class*=\"orb-\"]').length > 0;
const badge = document.body.innerText.includes('19');
return JSON.stringify({ pillText: pill ? pill.textContent.trim() : 'NO PILL', svgCircles: rings, orbPresent: orb, streak19Shown: badge });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa12-dashboard-ring.png >/dev/null 2>&1

echo "=== B: STATS screen via store screen field ==="
agent-browser eval "(() => {
const s = JSON.parse(localStorage.getItem('zerobet-store-v1'));
s.state.currentScreen = 'stats'; localStorage.setItem('zerobet-store-v1', JSON.stringify(s)); return 'stats set';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 7
agent-browser eval "(() => {
const low = document.body.innerText.toLowerCase();
return JSON.stringify({ serie: low.includes('série'), epargne: low.includes('épargne'), niveau: low.includes('niveau'), val19: low.includes('19'), flame: !!document.querySelector('svg.lucide-flame') });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa12-stats-gauges.png >/dev/null 2>&1

echo "=== C: FINANCE screen via store screen field ==="
agent-browser eval "(() => {
const s = JSON.parse(localStorage.getItem('zerobet-store-v1'));
s.state.currentScreen = 'finance'; localStorage.setItem('zerobet-store-v1', JSON.stringify(s)); return 'finance set';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 7
agent-browser eval "(() => {
const txt = document.body.innerText;
return JSON.stringify({
  goalCard: txt.includes(\"Objectif d'épargne\"),
  pct: (txt.match(/(\d+)%/) || [])[0] || 'none',
  saved: txt.includes('40 698'),
  daysLeft: txt.includes('Objectif dans'),
  goal300k: txt.includes('300 000')
});})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa12-finance-goalring.png >/dev/null 2>&1

echo "=== D: edit goal inline -> 500000 ==="
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const edits = btns.filter(b => b.textContent.trim() === 'Modifier');
if (edits.length < 2) return 'EDIT BTNS < 2: ' + edits.length;
edits[1].click(); return 'goal edit clicked (2nd Modifier)';})()" 2>&1 | tail -1
sleep 1
agent-browser eval "(() => {
const inps = document.querySelectorAll('input[type=number]');
const inp = inps[inps.length - 1];
if (!inp) return 'GOAL INPUT NOT FOUND';
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
setter.call(inp, '500000');
inp.dispatchEvent(new Event('input', { bubbles: true }));
return 'goal input set';})()" 2>&1 | tail -1
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const ok = btns.find(b => b.className.includes('gradient-primary') && b.querySelector('svg'));
if (!ok) return 'OK BTN NOT FOUND';
ok.click(); return 'saved';})()" 2>&1 | tail -1
sleep 1.5
agent-browser eval "(() => {
const txt = document.body.innerText;
const s = JSON.parse(localStorage.getItem('zerobet-store-v1'));
return JSON.stringify({ ui500k: txt.includes('500 000'), store500k: s.state.savingsGoal === 500000 });})()" 2>&1 | tail -1

echo "=== E: MOBILE viewport dashboard ==="
agent-browser set-viewport 390 844 >/dev/null 2>&1
agent-browser eval "(() => { const s = JSON.parse(localStorage.getItem('zerobet-store-v1')); s.state.currentScreen='dashboard'; localStorage.setItem('zerobet-store-v1', JSON.stringify(s)); return 'to dashboard';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 7
agent-browser screenshot /home/z/my-project/download/qa12-mobile-ring.png >/dev/null 2>&1
agent-browser eval "(() => {
const pill = document.querySelector('.pr-milestone-pill');
const overflowX = document.documentElement.scrollWidth > window.innerWidth + 2;
return JSON.stringify({ pillText: pill ? pill.textContent.trim() : null, horizontalOverflow: overflowX });})()" 2>&1 | tail -1

echo "=== E2: translated keys spot-check ==="
agent-browser eval "(() => {
const s = JSON.parse(localStorage.getItem('zerobet-store-v1'));
s.state.currentScreen = 'finance'; localStorage.setItem('zerobet-store-v1', JSON.stringify(s)); return 'finance';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 6
agent-browser eval "(() => {
const low = document.body.innerText.toLowerCase();
return JSON.stringify({ progress30: low.includes('progression sur 30 jours'), rawKeyGone: !low.includes('financeProgress30Days'), budget: low.includes('budget hebdomadaire'), myGoals: low.includes('mes objectifs') });})()" 2>&1 | tail -1
agent-browser open http://localhost:3000/privacy >/dev/null 2>&1
sleep 5
agent-browser eval "(() => {
const h1 = document.querySelector('h1');
const txt = document.body.innerText;
return JSON.stringify({ h1: h1 ? h1.textContent : null, hasRawKey: /privacySection|termsSection/.test(txt), badge: txt.includes('100% privé') });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa12-privacy.png >/dev/null 2>&1

echo "=== F: CALENDAR compile check (ChunkLoadError suspicion) ==="
agent-browser eval "(() => {
const s = JSON.parse(localStorage.getItem('zerobet-store-v1'));
s.state.currentScreen = 'calendar'; localStorage.setItem('zerobet-store-v1', JSON.stringify(s)); return 'calendar set';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 6
agent-browser eval "(() => {
const h1 = document.querySelector('h1');
const err = document.body.innerText.includes('Something went wrong') || document.body.innerText.includes('Erreur');
return JSON.stringify({ h1: h1 ? h1.textContent : null, errorBoundary: err });})()" 2>&1 | tail -1

echo "=== G: console errors (fresh) ==="
agent-browser console 2>&1 | grep -iE "\[error\]" | head -5
echo "QA12 V3 DONE"
