# Audit Jour 4

## Analyse bundle

Commande lancee :

```bash
pnpm exec next experimental-analyze
```

Constats :

- Le plus gros premier chargement non compresse est `/products/[slug]` avec environ 558 Ko.
- La home est tres proche avec environ 556 Ko.
- Les plus gros chunks statiques observes sont environ 224 Ko, 120 Ko et 112 Ko.

Optimisations possibles :

- Garder les composants interactifs petits et isoles.
- Eviter d'ajouter de grosses librairies client pour la langue, les formulaires ou les diagnostics.
- Charger a la demande les outils non critiques comme les panneaux de debug ou d'analyse.

## Audit performance

Constats :

- Le build Next passe et les routes principales sont en Partial Prerendering.
- Les donnees produit sont cachees et invalidees par tag apres mutation.
- Les pages lentes visibles utilisent `Suspense` avec fallback.
- Le prefetch est controle par variante A/B sur les liens produit.
- La PWA ajoute un fallback hors ligne avec strategie network-first.

Point a surveiller :

- Les scripts client globaux ajoutent du JS a toutes les routes. Le reporter Web Vitals et le service worker restent petits, mais il faut eviter d'y ajouter de la logique lourde.
