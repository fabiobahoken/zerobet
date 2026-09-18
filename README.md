# 🛡️ Zerobet — Premium Gambling Addiction Recovery App

> **Reprends le contrôle de ta vie.** Une application mobile premium de récupération contre l'addiction aux paris sportifs, conçue pour le marché africain francophone.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

---

## 🌅 Zerobet 2.0 — « Aube Émeraude » (Septembre 2026)

Refonte majeure de l'identité visuelle et du modèle freemium :

### Nouvelle identité visuelle
- **Palette** : le rouge « alarme » laisse place à l'**émeraude/teal** (croissance, guérison, économies) — `#10B981 → #2DD4BF`
- **Or** (`#F59E0B`, `#FBBF24`) réservé aux réussites, quotas et artefacts
- **Corail** (`#FF453A`) conservé pour l'urgence (panique, SOS, rechute)
- Fond **aurora** émeraude + starfield, glassmorphism teinté teal
- Logo, favicon PWA et manifest mis à jour

### Freemium rééquilibré (expérience d'abord)
| Fonctionnalité | Gratuit | Premium |
|---|---|---|
| Atlas AI Coach | **10 messages/jour** (quota + pastille) | Illimité |
| Journal | **3 entrées/semaine** (quota + pastille) | Illimité |
| Témoignages | 5/jour (était 3) | Illimité |
| Forum | **Lecture + réponses libres** | + nouveaux sujets |
| Mentors & Psychologues | — | ✓ |

### Nouveautés backend
- **Sauvegarde cloud anonyme** : `ProgressSnapshot` (Prisma) + `/api/progress` (GET/POST) — synchro automatique debounced (série, XP, objectifs) sans compte, pilotée par un `deviceId` local
- **Export RGPD** : bouton « Exporter mes données » (JSON complet) dans Paramètres → Sauvegarde & Données
- **Synchroniser maintenant** : bouton manuel + statut de synchro en direct
- **Migration Next.js 16** : `middleware.ts` → `proxy.ts` (convention 2025)

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Fonctionnalités](#fonctionnalités)
3. [Stack Technique](#stack-technique)
4. [Architecture](#architecture)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Structure du Projet](#structure-du-projet)
8. [i18n (Internationalisation)](#i18n-internationalisation)
9. [Sécurité](#sécurité)
10. [PWA & Mobile](#pwa--mobile)
11. [Déploiement](#déploiement)
12. [Roadmap](#roadmap)

---

## 🎯 Vue d'ensemble

Zerobet est une application de récupération contre l'addiction aux paris sportifs, spécialement conçue pour les utilisateurs africains francophones. Elle combine un design premium (dark theme + glass morphism + starfield), un système d'aventure gamifié (13 artefacts avec pouvoirs et auras magnétiques), un coach IA (Atlas AI), et une communauté de soutien en temps réel.

### Public cible
- Personnes lutte contre l'addiction aux paris sportifs en Afrique francophone
- Langues supportées : Français (par défaut), Anglais, Espagnol
- Devises supportées : FCFA, USD, EUR, GBP, NGN, GHS, ZAR, MAD, TND, BRL, INR, CNY, JPY

---

## ✨ Fonctionnalités

### Onboarding (11 étapes)
- **Splash** → Logo animé avec loader premium
- **Langue** → Choix de la langue (FR/EN/ES) — s'applique à toute l'app
- **Genre** → Icônes élégantes (Bouclier+Flèche / Lotus) avec halo magnétique
- **Devise** → 13 devises avec drapeaux SVG et conversion en temps réel
- **Bienvenue** → Emblème "soleil levant" avec rayons orbitaux
- **Quiz** → 15 questions d'évaluation (montants adaptés à la devise)
- **Résultats** → Score d'addiction avec jauge animée
- **Symptômes** → 5 catégories × 6 symptômes
- **Carousel** → 8 slides éducatifs (cerveau piraté, opérateur, etc.)
- **Engagement** → Objectifs + signature + plan personnalisé
- **Paywall** → 4 plans (Free / Premium / Mentor / Psychologue)

### Application Principale (38+ écrans)
- **Dashboard** — Série, économies, citation du jour, insight, tracker d'humeur, heatmap annuel
- **Bouton Panique** — Respiration 4-7-8 (3 cycles) + journal post-crise
- **Coach Atlas AI** — Chat avec IA (z-ai-web-dev-sdk), 4 sections (Journal/Motivation/Progrès/Crise)
- **Journal** — Entrées avec analyse émotionnelle, prompts suggérés, mini-calendrier
- **Finance** — Suivi des économies en FCFA (converti selon devise), projections, objectifs
- **Bloqueur** — 52+ sites de paris, mode strict 72h, catégories
- **Communauté** — Témoignages + Forum + Mentors + Psychologues + Chat live (socket.io)
- **Parcours de Guérison** — 13 artefacts avec pouvoirs et auras magnétiques
- **Méditation** — 5 techniques de respiration avec animations
- **Objectifs de vie** — 6 catégories, milestones, progress rings SVG
- **Déclencheurs** — Suivi des triggers avec heatmap et insights
- **Affirmations** — 60 affirmations × 6 catégories + daily + favoris + custom
- **Relance** — Protocole 24h (8 étapes, 4 phases) avec ton bienveillant
- **Programme 90 jours** — Phases, tâches quotidiennes, jalons, citations
- **Mentorat** — Devenir mentor (90 jours requis), profils
- **Sevrage** — Suivi des symptômes de sevrage
- **Statistiques** — Tendances d'humeur, économies cumulées, distribution
- **Calendrier** — Vue mensuelle avec jalons et notes
- **Ressources** — 10 articles × 6 catégories
- **SOS** — Numéros d'urgence internationaux
- **Trophées** — 25 achievements avec 3D flip badges
- **Gamification** — XP, niveaux, quêtes quotidiennes, multiplicateurs de série
- **Profil** — Photo de profil (upload + resize 256×256), stats, records
- **Notifications** — Préférences + PWA install + test notification
- **Support** — FAQ, contact, troubleshooting, vidéos

### Composants Réutilisables (24+)
- `ZerobetLogo` — Logo SVG animé (glow + shine + sparkle)
- `BottomNav` — Navigation avec pill gradient + sliding indicator
- `DailyCheckIn` — Modal de check-in avec humeurs + craving
- `AchievementPopup` — Popup de déblocage d'artéfact avec confettis
- `MilestoneCelebration` — Célébration automatique (7/14/30/60/90/180/365 jours)
- `AnimatedNumber` — Compteur animé (easeOutExpo, 3 formats)
- `StreakFlame` — Flamme de série avec couleurs par paliers
- `HeatmapCalendar` — Heatmap GitHub-style (année de récupération)
- `ArtifactIcon` — 13 icônes SVG uniques pour les artefacts
- `TiltCard` — Carte 3D avec tilt au survol + glare
- `SpotlightCard` — Carte avec spotlight qui suit la souris
- `CurrencyFlag` — 13 drapeaux SVG pour les devises
- `PremiumLoader` — Loader premium avec particules
- `TutorialTooltips` — Guide interactif (6 étapes, rAF direct DOM)
- `DailyInsights` — Insights générés depuis les données utilisateur
- `MoodTracker` — Tracker d'humeur rapide (5 émotions)
- `PullToRefresh` — Pull-to-refresh natif
- `EmptyState` — États vides avec 4 variantes
- `ErrorBoundary` — Gestion d'erreurs avec UI traduite
- `RelapseModal` — Modal de gestion de rechute
- `NotificationCenter` — Notifications avec badge
- `SearchModal` — Recherche globale
- `OnboardingProgress` — Barre de progression 8 étapes
- `PWARegister` — Enregistrement service worker + cache cleanup

---

## 🛠️ Stack Technique

| Catégorie | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Next.js (App Router) | 16.2.10 |
| **Langage** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui (New York) | - |
| **Animations** | Framer Motion | 12.x |
| **State Management** | Zustand (persist) | 5.x |
| **Database** | PostgreSQL (Supabase) | - |
| **ORM** | Prisma | 6.x |
| **Auth** | NextAuth.js (Google OAuth + Credentials) | 4.24.x |
| **AI Coach** | z-ai-web-dev-sdk (Atlas AI) | - |
| **Email** | Resend | 6.x |
| **Real-time** | Socket.io (mini-service, port 3003) | 4.x |
| **Icons** | Lucide React | 0.525.x |
| **Charts** | Recharts | - |
| **PWA** | Service Worker + Manifest | - |
| **Security** | CSP, HSTS, Rate Limiting, bcrypt | - |

---

## 🏗️ Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── auth/signup/          # Signup endpoint
│   │   ├── chat/                 # Atlas AI chat (LLM)
│   │   ├── journal/              # Journal CRUD
│   │   ├── panic/                # Panic event logging
│   │   └── csp-report/           # CSP violation reports
│   ├── auth/                     # Auth pages
│   │   ├── signin/               # Sign-in page
│   │   ├── signup/               # Sign-up page
│   │   └── error/                # Auth error page
│   ├── globals.css               # Global styles + premium utilities
│   ├── layout.tsx                # Root layout (fonts, PWA, Toaster)
│   └── page.tsx                 # Main router (dynamic imports)
├── components/zerobet/
│   ├── screens/                  # 38+ screen components
│   ├── components/               # 24+ reusable components
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── auth/                     # NextAuth config + session helpers
│   ├── data/                     # Data files (parcours, quiz, etc.)
│   ├── email/                    # Resend email utility
│   ├── i18n/                     # Dictionary (FR/EN/ES) + useT hook
│   ├── monitoring/               # Logger utility
│   ├── sound.ts                 # Web Audio API sound manager
│   ├── haptics.ts                # Vibration API haptics manager
│   ├── pwa.ts                    # PWA utilities
│   ├── animations.ts             # Framer Motion variant presets
│   └── db.ts                     # Prisma client
├── store/
│   └── zerobet-store.ts          # Zustand store (state + persist)
├── middleware.ts                 # Body size limits + API security
└── prisma/
    └── schema.prisma             # 11 Prisma models
```

### Mini-services
```
mini-services/
└── chat-service/                 # Socket.io server (port 3003)
    ├── package.json
    └── index.ts                   # 3 rooms (general/crisis/veterans)
```

---

## 🚀 Installation

### Prérequis
- Node.js 20+ (ou Bun)
- PostgreSQL (ou compte Supabase)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/zerobet.git
cd zerobet

# 2. Installer les dépendances
bun install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditez .env avec vos credentials (voir Configuration ci-dessous)

# 4. Pousser le schéma Prisma
bunx prisma db push

# 5. Démarrer le serveur de développement
bun run dev

# 6. (Optionnel) Démarrer le service de chat
cd mini-services/chat-service
bun install
bun run dev
```

---

## ⚙️ Configuration

### Variables d'environnement (.env)

```env
# Database (PostgreSQL — Supabase recommandé)
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
DIRECT_URL="postgresql://user:pass@host:5432/dbname"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# NextAuth.js
NEXTAUTH_SECRET="your-random-secret-32-bytes"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-secret"

# Resend (Email)
RESEND_API_KEY="re_your-api-key"

# App
APP_URL="http://localhost:3000"
APP_NAME="Zerobet"
```

### Configuration Google OAuth
1. Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID (Web application)
3. Authorized redirect URIs : `http://localhost:3000/api/auth/callback/google`

### Configuration Supabase
1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier la connection string PostgreSQL
3. Exécuter `supabase_migration.sql` dans le SQL Editor

---

## 🌍 i18n (Internationalisation)

L'application supporte **3 langues** : Français (défaut), Anglais, Espagnol.

- **Dictionnaire** : `src/lib/i18n/dictionary.ts` (8000+ lignes, 2400+ clés par langue)
- **Hook** : `src/lib/i18n/useT.ts` — `const t = useT();` puis `t("key")`
- **Sélection** : L'utilisateur choisit sa langue au premier lancement (avant le genre)
- **Devise** : Choisie au premier lancement, tous les montants s'adaptent (FCFA → €, $, etc.)
- **Dates** : Localisées via `Intl.DateTimeFormat` selon la langue

### Couverture i18n
| Zone | État | Détails |
|------|------|---------|
| Onboarding (11 écrans) | ✅ 100% | Titres, sous-titres, boutons, questions, options |
| Dashboard | ✅ 95% | Insights, heatmap, citations, tracker d'humeur, badges |
| Écrans principaux | ✅ 90% | Panic, Journal, Finance, Atlas, Blocker, Community, etc. |
| Data files | ✅ 85% | Affirmations (60), étapes relapse (8), symptômes (30), objectifs |
| Témoignages | ✅ 100% | 6 témoignages traduits + montants adaptés |
| Quiz | ✅ 100% | 15 questions × 4 options (montants convertis) |
| Carousel | ✅ 100% | 8 slides + histoire adaptée (nom, ville, devise selon utilisateur) |
| Badges/Artéfacts | ✅ 100% | 13 artefacts × (nom + sous-titre + description + histoire) |

---

## 🔒 Sécurité

### Headers de sécurité (next.config.ts)
- `X-Frame-Options: DENY` — Anti-clickjacking
- `X-Content-Type-Options: nosniff` — Anti-MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(self), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security` — HSTS (HTTPS obligatoire)
- `Content-Security-Policy-Report-Only` — CSP en mode report

### Authentification
- NextAuth.js avec Google OAuth (primary) + Credentials (email/password)
- bcrypt (12 rounds) pour le hachage des mots de passe
- Session JWT (30 jours, stateless)

### API Routes
- Rate limiting (15 req/min sur /api/chat)
- Input validation + sanitization sur toutes les routes
- Body size limits (100KB API, 10KB chat) via middleware
- Protection CSRF via NextAuth

### Service Worker
- Cache `zerobet-v2` (versionné, auto-cleanup)
- `/_next/*` jamais caché (évite les erreurs HMR)
- Network-first pour navigation
- Cache-first pour assets statiques
- `updateViaCache: "none"` (SW toujours frais)

---

## 📱 PWA & Mobile

### PWA
- `public/manifest.json` — Standalone, portrait, thème #FF3B30
- `public/sw.js` — Service worker avec offline + push notifications
- `public/icons/` — 16 tailles d'icônes (iOS + Android)
- `<PWARegister>` — Auto-enregistrement + cleanup cache dev

### Optimisations Mobile
- Container 430px mobile-first
- `viewport-fit: cover` + `env(safe-area-inset-*)`
- Blur réduit sur mobile (`@media max-width: 430px`)
- GPU acceleration (`will-change`, `translateZ(0)`)
- `prefers-reduced-motion` (0.01ms sur toutes les animations)
- `font-display: swap` (évite le layout shift)
- `contain: layout style` sur le container principal
- Code splitting (38 écrans en `dynamic()` imports)

### Performance
- Score mobile estimé : **85/100**
  - Design responsive : 9/10
  - PWA installable : 8/10
  - Safe areas iOS : 7/10
  - Haptiques : 8/10
  - Sons : 8/10
  - Animations : 8/10
  - Offline : 7/10
  - Sécurité : 9/10
  - Code splitting : 8/10
  - Icônes natives : 8/10

---

## 🎮 Système d'Aventure — La Quête des Artéfacts

Les 13 rangs du Parcours de Guérison sont transformés en **artéfacts** de jeu d'aventure, chacun avec :

| Jour | Artéfact | Type | Pouvoir | Aura |
|------|----------|------|---------|------|
| 1 | Le Cristal d'Aube | Cristal | Première Lumière | Argenté |
| 3 | L'Amulette de Brume | Amulette | Vision Claire | Cyan |
| 7 | Le Bouclier de Bronze | Bouclier | Garde-Renvoi | Bronze |
| 14 | Les Runes d'Argent | Runes | Mémoire Ancienne | Argenté |
| 30 | Le Sceptre d'Or | Sceptre | Volonté Royale | Or |
| 45 | L'Orbe de Platine | Orbe | Sérénité Pure | Platine |
| 60 | Le Cœur de Diamant | Cristal | Incassable | Bleu |
| 90 | L'Émeraude de Renaissance | Pierre | Neuroplasticité | Vert |
| 120 | Le Saphir de Sagesse | Pierre | Vision Profonde | Bleu profond |
| 180 | Le Rubis de Passion | Pierre | Feu Intérieur | Rouge |
| 270 | L'Améthyste de Maîtrise | Pierre | Contrôle Total | Violet |
| 365 | La Couronne de Légende | Couronne | Immortalité | Or-rouge |
| 730 | L'Étoile de Maîtrise | Étoile | Transcendance | Prismatico |

Chaque artéfact a un **SVG unique** (ArtifactIcon) avec dégradé, glow filter, et design géométrique. Les auras sont **magnétiques et apaisantes** (pulsation 4s + rotation conique 20s + anneaux + particules).

---

## 🚢 Déploiement

### Vercel (recommandé)
```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
# ... etc

# 4. Déployer en production
vercel --prod
```

### Variables d'environnement production
- Changer `NEXTAUTH_URL` vers le domaine de production
- Ajouter l'URL de callback Google OAuth dans Google Cloud Console
- Vérifier le domaine dans Resend pour les emails

---

## 🗺️ Roadmap

### ✅ Terminé
- [x] 38+ écrans avec design premium
- [x] i18n FR/EN/ES (85% traduit)
- [x] 13 artefacts avec SVG + auras magnétiques
- [x] Coach AI (Atlas) avec z-ai-web-dev-sdk
- [x] Chat temps réel (socket.io)
- [x] Sélection de devise (13 devises)
- [x] Authentification (Google OAuth + Credentials)
- [x] PWA (manifest + service worker + offline)
- [x] Sécurité (CSP, HSTS, rate limiting, validation)
- [x] Code splitting (38 écrans dynamiques)
- [x] Icônes natives (16 tailles)
- [x] Photo de profil (upload + resize)
- [x] Heatmap annuel de récupération
- [x] Email (Resend — welcome, reset, streak reminder)

### 🔄 En cours
- [ ] i18n 100% (citations quotidiennes, techniques méditation)
- [ ] Pages légales (privacy policy, terms of service)
- [ ] Wrapper Capacitor (PWA → app native)
- [ ] Paiement in-app (Apple/Google)

### 📋 À faire
- [ ] Tests sur appareils réels (iPhone + Android)
- [ ] Publication App Store
- [ ] Publication Play Store
- [ ] Notifications push (VAPID + APNs + FCM)
- [ ] Synchronisation serveur des données (localStorage → DB)
- [ ] Vidéos dans Ressources
- [ ] OAuth Apple Sign In

---

## 📄 Licence

Propriétaire — Tous droits réservés. Ce code ne peut être redistribué sans autorisation.

---

## 👥 Contribution

Ce projet est développé par l'équipe Zerobet avec l'assistance de Z.ai Code.

---

*Dernière mise à jour : Juillet 2026*
