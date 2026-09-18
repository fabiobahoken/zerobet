#!/bin/bash
# Task 10 QA script v3 — correct seed format + UI navigation.
pkill -f "next dev" 2>/dev/null; sleep 1
cd /home/z/my-project
bun run dev >> dev.log 2>&1 &
for i in $(seq 1 40); do curl -s -o /dev/null --max-time 3 http://localhost:3000 && break; sleep 2; done
echo "SERVER: $(curl -s -o /dev/null -w '%{http_code}' --max-time 30 http://localhost:3000)"

agent-browser open http://localhost:3000 >/dev/null 2>&1
agent-browser eval "(() => {
const raw = localStorage.getItem('zerobet-store-v1') || '{}';
const data = JSON.parse(raw);
const state = data.state || {};
Object.assign(state, {
  hasCompletedOnboarding: true, hasSeenTutorial: true,
  screen: 'dashboard', streakDays: 7, xp: 570,
  plan: 'premium', planBillingCycle: 'monthly',
  planStartedAt: new Date(Date.now() - 10*24*3600*1000).toISOString(),
  language: 'fr', gender: 'male',
  lastCheckInDate: new Date().toISOString().split('T')[0],
});
data.state = state; data.version = 0;
localStorage.setItem('zerobet-store-v1', JSON.stringify(data));
return 'seeded';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 9

echo "=== STEP A: navigate profile -> settings ==="
agent-browser eval "(() => {
const overlays = document.querySelectorAll('.fixed.inset-0').length;
if (overlays > 0) return 'OVERLAYS: ' + overlays;
const tabs = Array.from(document.querySelectorAll('nav button, [role=tablist] button, nav a'));
const prof = tabs.find(b => (b.getAttribute('aria-label')||'').toLowerCase().includes('profil') || (b.textContent||'').toLowerCase().includes('profil'));
if (!prof) return 'PROFILE TAB NOT FOUND (' + tabs.length + ' tabs)';
prof.click(); return 'profile tab clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const st = btns.find(b => (b.getAttribute('aria-label')||'') === 'Paramètres');
if (!st) return 'SETTINGS BTN NOT FOUND';
st.click(); return 'settings clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const rgpd = btns.find(b => (b.getAttribute('aria-label')||'') === 'Mes données & RGPD');
if (!rgpd) return 'RGPD ROW NOT FOUND (' + btns.length + ')';
rgpd.click(); return 'RGPD clicked';})()" 2>&1 | tail -1
sleep 3

echo "=== STEP B: data-rights screen verify ==="
agent-browser eval "(() => {
const h1 = document.querySelector('h1');
const secs = Array.from(document.querySelectorAll('section'));
const titles = secs.map(s => s.querySelector('h2,h3')?.textContent || '').filter(Boolean);
const chips = document.querySelectorAll('span.rounded-full').length;
return JSON.stringify({ h1: h1 && h1.textContent, titles, chips });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-datarights-fr.png >/dev/null 2>&1

echo "=== STEP C: export click ==="
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const b = btns.find(x => (x.textContent||'').includes('JSON'));
if (!b) return 'NO EXPORT BTN'; b.click(); return 'export clicked';})()" 2>&1 | tail -1
sleep 3
agent-browser eval "(() => {
const toasts = Array.from(document.querySelectorAll('[data-sonner-toast]')).map(t => t.textContent).join(' ;; ');
return 'TOASTS: ' + (toasts || 'none');})()" 2>&1 | tail -1

echo "=== STEP D: erase modal gating ==="
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const b = btns.find(x => (x.textContent||'').includes('Supprimer les données du cloud'));
if (!b) return 'erase btn missing'; b.click(); return 'modal opened';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const dialog = document.querySelector('[role=dialog]');
const c = dialog && Array.from(dialog.querySelectorAll('button')).find(x => (x.textContent||'').includes('tout effacer'));
return JSON.stringify({ dialogOpen: !!dialog, confirmDisabled: c ? c.disabled : null });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-erase-modal.png >/dev/null 2>&1

echo "=== STEP E: ack -> enabled ==="
agent-browser eval "(() => {
const cb = document.querySelector('[role=dialog] [role=checkbox]');
if (!cb) return 'no checkbox'; cb.click(); return 'ack clicked';})()" 2>&1 | tail -1
sleep 1
agent-browser eval "(() => {
const dialog = document.querySelector('[role=dialog]');
const c = dialog && Array.from(dialog.querySelectorAll('button')).find(x => (x.textContent||'').includes('tout effacer'));
return JSON.stringify({ confirmDisabledAfterAck: c ? c.disabled : null });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-erase-acked.png >/dev/null 2>&1

echo "=== STEP F: cancel ==="
agent-browser eval "(() => {
const dialog = document.querySelector('[role=dialog]');
const c = dialog && Array.from(dialog.querySelectorAll('button')).find(x => (x.textContent||'').includes('Annuler'));
if (!c) return 'no cancel'; c.click(); return 'cancelled';})()" 2>&1 | tail -1
sleep 1
agent-browser eval "(() => document.querySelector('[role=dialog]') ? 'STILL OPEN' : 'dialog closed')()" 2>&1 | tail -1

echo "=== STEP G: EN version ==="
agent-browser eval "(() => {
const back = document.querySelector('button[aria-label=\"Retour aux paramètres\"], button[aria-label*=etour]');
if (back) { back.click(); return 'back clicked'; }
return 'no back btn — staying';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const raw = localStorage.getItem('zerobet-store-v1');
const data = JSON.parse(raw); data.state.language = 'en';
localStorage.setItem('zerobet-store-v1', JSON.stringify(data)); return 'en set';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 8
agent-browser eval "(() => {
const tabs = Array.from(document.querySelectorAll('nav button, [role=tablist] button, nav a'));
const prof = tabs.find(b => (b.getAttribute('aria-label')||'').toLowerCase().includes('profil') || (b.textContent||'').toLowerCase().includes('profil'));
if (!prof) return 'PROFILE TAB NOT FOUND'; prof.click(); return 'profile clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const st = btns.find(b => (b.getAttribute('aria-label')||'') === 'Settings' || (b.getAttribute('aria-label')||'').includes('Settings'));
if (!st) return 'SETTINGS BTN NOT FOUND (' + btns.filter(b=>b.getAttribute('aria-label')).map(b=>b.getAttribute('aria-label')).slice(0,10).join(',') + ')';
st.click(); return 'settings clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const rgpd = btns.find(b => (b.getAttribute('aria-label')||'') === 'My data & GDPR');
if (!rgpd) return 'EN GDPR ROW NOT FOUND';
rgpd.click(); return 'EN RGPD clicked';})()" 2>&1 | tail -1
sleep 3
agent-browser eval "(() => {
const h1 = document.querySelector('h1');
const btns = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
return JSON.stringify({ h1: h1 && h1.textContent, erase: btns.find(t => t.includes('cloud data')), export: btns.find(t => t.includes('archive')) });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-datarights-en.png >/dev/null 2>&1

echo "=== STEP H: ES version ==="
agent-browser eval "(() => {
const raw = localStorage.getItem('zerobet-store-v1');
const data = JSON.parse(raw); data.state.language = 'es';
localStorage.setItem('zerobet-store-v1', JSON.stringify(data)); return 'es set';})()" 2>&1 | tail -1
agent-browser reload >/dev/null 2>&1
sleep 8
agent-browser eval "(() => {
const tabs = Array.from(document.querySelectorAll('nav button, [role=tablist] button, nav a'));
const prof = tabs.find(b => (b.getAttribute('aria-label')||'').toLowerCase().includes('perfil') || (b.textContent||'').toLowerCase().includes('perfil') || (b.getAttribute('aria-label')||'').toLowerCase().includes('profil'));
if (!prof) return 'PROFILE TAB NOT FOUND'; prof.click(); return 'profile clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const st = btns.find(b => (b.getAttribute('aria-label')||'').includes('Ajustes') || (b.getAttribute('aria-label')||'').includes('Configuraci'));
if (!st) { const any = btns.find(b => (b.getAttribute('aria-label')||'') === 'Settings'); if (any) { any.click(); return 'settings clicked (fallback)'; } return 'ES SETTINGS BTN NOT FOUND'; }
st.click(); return 'ES settings clicked';})()" 2>&1 | tail -1
sleep 2
agent-browser eval "(() => {
const btns = Array.from(document.querySelectorAll('button'));
const rgpd = btns.find(b => (b.getAttribute('aria-label')||'') === 'Mis datos y RGPD');
if (!rgpd) return 'ES RGPD ROW NOT FOUND';
rgpd.click(); return 'ES RGPD clicked';})()" 2>&1 | tail -1
sleep 3
agent-browser eval "(() => {
const h1 = document.querySelector('h1');
const btns = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim());
return JSON.stringify({ h1: h1 && h1.textContent, erase: btns.find(t => t.includes('nube')), export: btns.find(t => t.includes('JSON')) });})()" 2>&1 | tail -1
agent-browser screenshot /home/z/my-project/download/qa-datarights-es.png >/dev/null 2>&1

echo "=== STEP I: console errors ==="
agent-browser errors 2>&1 | head -8
echo "=== QA DONE ==="
