# 🐰 Smart Rabbit — Programme Force

Application React (Vite + Tailwind CSS) générée par Smart Rabbit pour un programme de force sur 5 jours/semaine, adapté avec des blessures au genou, bas du dos et coude gauche.

## Stack

- React 18
- Vite 5
- Tailwind CSS 3

## Installation

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)

## Build production

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── App.jsx                    # Navigation globale (bottom nav)
├── main.jsx                   # Entry point
├── index.css                  # Tailwind directives
└── components/
    ├── Shared.jsx             # Composants réutilisables
    ├── Part1.jsx              # Jour 1 (Push A) & Jour 2 (Pull A)
    ├── Part2.jsx              # Jour 3 (Legs) & Jour 4 (Push B)
    ├── Part3.jsx              # Jour 5 (Full Body) + récap semaine
    ├── Intensification.jsx    # Fiche techniques d'intensification
    └── Progression.jsx        # Fiche progression 6 semaines
```

## Contenu

- **5 jours d'entraînement** : Push A / Pull A / Legs / Push B / Full Body
- **Adaptations blessures** : genou (amplitude ≤80°), lombaires (pas de SDT classique), coude gauche (prise neutre)
- **5 techniques d'intensification** : Wave Loading, Cluster Sets, Rest-Pause, Myo-reps, Drop Sets
- **Progression sur 6 semaines** : 3 phases (Fondation → Progression → Pic + Déload)

## Déploiement rapide (Vercel / Netlify)

```bash
npm run build
# Déployer le dossier /dist
```
