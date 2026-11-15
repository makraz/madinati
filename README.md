# Madinati — Votre ville, votre voix

Prototype civic-tech (atelier vibe-coding) : signalez des problèmes d'infrastructure à
Marrakech, soutenez-les, votez sur les propositions de quartier et suivez les chantiers publics.

> **Démonstration** : toutes les données sont fictives et signalées comme telles dans l'interface
> (bandeau « Prototype — données fictives » + pied de page). Aucune donnée réelle n'est envoyée.

## Lancer l'application

```bash
npm install        # déjà fait si node_modules existe
npm run build      # build de production
npm start          # http://localhost:3000  (100 % hors ligne : tuiles locales)
# ou en développement :
npm run dev
```

La carte fonctionne **sans Internet** : les tuiles de Marrakech sont dans `public/tiles/`
(téléchargées via `python3 scripts/fetch_tiles.py`).

## Scénario de démo (3 min)

1. Onboarding à la 1ʳᵉ visite (3 étapes, rejouable via le bouton **?**), puis la carte s'ouvre sur Marrakech.
2. Cliquer sur le marqueur orange « nid-de-poule » → **popup** (photo + infos + réf) → **Voir les détails** → panneau.
3. Cliquer **Soutenir** (compteur 142 → 143).
4. Cliquer **+ Signaler un problème** → repère « Bab Doukkala, Médina » → catégorie
   « Éclairage public » → photo d'exemple → décrire → **Envoyer** → toast + référence `MRK-XXXXX` →
   le nouveau marqueur apparaît sur la carte et la vue vole dessus.
   *(une description trop courte bloque l'envoi avec un message inline)*
5. Sidebar **Propositions** → **Voter** sur le passage piéton du lycée (348 → 349).
6. Cliquer le marqueur bleu « Rénovation place Jemaa el-Fnaa » → jalons à 65 % →
   **« Simuler une mise à jour communale (démo) »** → 100 %, « Terminé ».
   *Dire à voix haute : dans le vrai produit, ce sont les services municipaux qui publient ces mises à jour.*
7. Bouton **Réinitialiser la démo** : données restaurées, carte réajustée — pour rejouer le scénario.
   Langues FR/EN/AR et mode sombre via les boutons en haut à droite.

## Fonctionnalités

- **3 langues** : FR / EN / AR (commutateur en haut à droite, arabe en RTL), persistées en localStorage
- **Mode sombre** : bouton soleil/lune, persisté
- **Onboarding** à la première visite (3 étapes, rejouable via le bouton ?)
- **Popup au clic** sur chaque marqueur (photo + infos + « Voir les détails »)
- **Signalement** : formulaire avec validation inline, référence `MRK-XXXXX`, marqueur ajouté sur la carte
- **Zoom out** jusqu'à z12 (tuiles locales z12–z16)
- Bouton **Réinitialiser la démo** : restaure les données et réajuste la carte

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS (dark mode `class`) · Leaflet + tuiles locales · lucide-react · zustand (état local) · i18n maison dans `lib/i18n.ts` · données mock trilingues dans `lib/mock.ts`.

## Structure

```
app/            layout, page, globals, icône
components/     AppShell, TopBar, Sidebar, MapView, DetailPanel, ProposalsPanel, ReportDrawer, ToastStack
lib/            types, store (zustand), mock, landmarks, examplePhotos, categories, mapImage
scripts/        fetch_tiles.py (tuiles hors ligne), flow.cjs + shot.cjs (tests/screenshots)
public/tiles/   tuiles Marrakech z14–z16
```

## Tests / captures

```bash
NODE_PATH=$(find ~/.npm/_npx -maxdepth 4 -type d -name playwright | head -1 | xargs dirname)/node_modules \
  node scripts/flow.cjs http://localhost:3000 /tmp/shots   # parcours de démo complet + captures
```
