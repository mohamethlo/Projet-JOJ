# Guide de Palette de Couleurs - DiscoverSenegal

## Informations générales
Ce document décrit la palette de couleurs complète utilisée dans l'application DiscoverSenegal (Projet-JOJ). Le site vitrine/communication/blog/avancement doit utiliser exactement les mêmes couleurs pour maintenir la cohérence de l'identité visuelle.

## Couleur de marque principale : ORANGE

L'orange est la couleur signature de DiscoverSenegal et doit être utilisée pour :
- Les boutons d'action principaux (call-to-action)
- Le logo et le nom de la marque
- Les éléments interactifs importants
- Les sections en évidence
- Les états hover sur les boutons principaux

**Codes couleur Orange :**
- **Orange-600** (Principal) : `#EA580C` (hex) ou `rgb(234, 88, 12)` ou `hsl(19, 90%, 48%)`
  - Utilisé pour : boutons principaux, logo, textes d'accent
- **Orange-700** (Hover) : `#C2410C` (hex) ou `rgb(194, 65, 12)` ou `hsl(19, 88%, 40%)`
  - Utilisé pour : états hover des boutons et liens principaux
- **Orange-100** (Arrière-plan subtil) : `#FFEDD5` (hex) ou `rgb(255, 237, 213)` ou `hsl(31, 100%, 92%)`
  - Utilisé pour : arrière-plans d'icônes, sections en évidence légère
- **Orange-50** (Dégradé très léger) : `#FFF7ED` (hex) ou `rgb(255, 247, 237)` ou `hsl(33, 100%, 96%)`
  - Utilisé pour : dégradés de fond (ex: `bg-gradient-to-b from-orange-50 to-white`)

## Système de couleurs HSL (Configuration Tailwind)

### Couleur Primaire (Primary)
- **HSL** : `hsl(222.2, 47.4%, 11.2%)`
- **Hex approximatif** : `#0F172A` (bleu très foncé, presque noir)
- **RGB** : `rgb(15, 23, 42)`
- **Usage** : Boutons par défaut du système, éléments UI principaux
- **Foreground (texte sur primary)** : `hsl(210, 40%, 98%)` - presque blanc (`#F8FAFC`)

### Couleur Secondaire (Secondary)
- **HSL** : `hsl(210, 40%, 96%)`
- **Hex approximatif** : `#F1F5F9` (gris très clair, bleuté)
- **RGB** : `rgb(241, 245, 249)`
- **Usage** : Arrière-plans secondaires, éléments UI secondaires
- **Foreground (texte sur secondary)** : `hsl(222.2, 47.4%, 11.2%)` - très foncé

### Couleur Destructive (Erreurs, Actions dangereuses)
- **HSL** : `hsl(0, 84.2%, 60.2%)`
- **Hex approximatif** : `#EF4444` (rouge vif)
- **RGB** : `rgb(239, 68, 68)`
- **Usage** : Boutons de suppression, messages d'erreur, actions destructives
- **Foreground** : `hsl(210, 40%, 98%)` - blanc (`#F8FAFC`)

### Couleur Muted (Texte secondaire)
- **HSL** : `hsl(210, 40%, 96%)`
- **Hex approximatif** : `#F1F5F9` (gris très clair)
- **Foreground (texte muted)** : `hsl(215.4, 16.3%, 46.9%)`
- **Hex approximatif** : `#64748B` (gris moyen)
- **Usage** : Textes secondaires, labels, descriptions

### Couleur Accent
- **HSL** : `hsl(210, 40%, 96%)`
- **Foreground** : `hsl(222.2, 47.4%, 11.2%)`
- **Usage** : États hover, éléments interactifs

## Couleurs de fond et texte

### Fond (Background)
- **HSL** : `hsl(0, 0%, 100%)`
- **Hex** : `#FFFFFF` (blanc pur)
- **Usage** : Fond principal de l'application

### Texte principal (Foreground)
- **HSL** : `hsl(222.2, 84%, 4.9%)`
- **Hex approximatif** : `#020617` (presque noir, légèrement bleuté)
- **RGB** : `rgb(2, 6, 23)`
- **Usage** : Tous les textes principaux

### Bordures et Inputs
- **HSL** : `hsl(214.3, 31.8%, 91.4%)`
- **Hex approximatif** : `#E2E8F0` (gris clair)
- **RGB** : `rgb(226, 232, 240)`
- **Usage** : Bordures de champs, séparateurs, bordures de cartes

## Couleurs supplémentaires utilisées

### Gris (Gray)
- **Gray-900** : `#111827` - Footer, textes très foncés
- **Gray-800** : `#1F2937` - Textes foncés
- **Gray-600** : `#4B5563` - Textes secondaires
- **Gray-500** : `#6B7280` - Textes tertiaires
- **Gray-400** : `#9CA3AF` - Textes désactivés
- **Gray-50** : `#F9FAFB` - Arrière-plans légers

### Couleurs d'accent (pour varier les sections)
- **Green-600** : `#16A34A` - Pour éléments positifs/nature
- **Green-100** : `#DCFCE7` - Arrière-plan green
- **Blue-600** : `#2563EB` - Pour éléments technologiques/informatifs
- **Blue-100** : `#DBEAFE` - Arrière-plan blue
- **Red-600** : `#DC2626` - Pour alertes/éléments d'attention
- **Red-100** : `#FEE2E2` - Arrière-plan red

## Rayon de bordure (Border Radius)
- **Valeur** : `0.5rem` (8px)
- **Usage** : Tous les éléments arrondis (boutons, cartes, inputs)

## Police de caractères
- **Famille** : 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif
- **Line-height** : 1.5
- **Font-weight par défaut** : 400

## Recommandations d'utilisation

### Hiérarchie des couleurs pour les boutons
1. **Boutons primaires** : Utiliser **orange-600** avec texte blanc
2. **Boutons secondaires** : Utiliser le système **primary** (bleu foncé) ou variante **outline**
3. **Boutons destructifs** : Utiliser **destructive** (rouge)

### Sections de la page
- **Hero section** : Dégradé `from-orange-50 to-white`
- **Sections en évidence** : Fond **orange-600** avec texte blanc
- **Sections standard** : Fond blanc (`#FFFFFF`)
- **Sections secondaires** : Fond **gray-50** (`#F9FAFB`)
- **Footer** : Fond **gray-900** (`#111827`) avec texte blanc/gris clair

### Éléments interactifs
- **Liens actifs dans navigation** : Fond **orange-100** avec texte **orange-700**
- **États hover** : Utiliser **orange-700** pour les éléments orange
- **Focus rings** : Utiliser la couleur **ring** : `hsl(222.2, 84%, 4.9%)`

## Mode sombre (Dark Mode) - Optionnel

Si le site vitrine doit supporter le mode sombre, utiliser ces valeurs :

- **Background** : `hsl(222.2, 84%, 4.9%)` - `#020617`
- **Foreground** : `hsl(210, 40%, 98%)` - `#F8FAFC`
- **Primary** : `hsl(210, 40%, 98%)` - `#F8FAFC`
- **Secondary** : `hsl(217.2, 32.6%, 17.5%)` - `#1E293B`

## Résumé des codes hex principaux

Pour faciliter l'implémentation, voici les codes hex les plus importants :

```
COULEUR PRINCIPALE (ORANGE) :
- Orange-600: #EA580C
- Orange-700: #C2410C
- Orange-100: #FFEDD5
- Orange-50:  #FFF7ED

COULEURS SYSTÈME :
- Primary:       #0F172A (bleu très foncé)
- Secondary:     #F1F5F9 (gris clair)
- Background:    #FFFFFF (blanc)
- Foreground:    #020617 (presque noir)
- Destructive:   #EF4444 (rouge)
- Border:        #E2E8F0 (gris clair)
- Muted text:    #64748B (gris moyen)

COULEURS UTILITAIRES :
- Gray-900:      #111827 (footer)
- Gray-600:      #4B5563 (texte secondaire)
- Gray-50:       #F9FAFB (fond léger)
```

---

**Note pour l'IA :** Utilisez cette palette de couleurs pour créer le site vitrine DiscoverSenegal. L'orange (#EA580C) doit être la couleur dominante pour tous les éléments de marque et call-to-action. Le reste de l'interface doit suivre le système de couleurs décrit ci-dessus pour maintenir la cohérence avec l'application principale.


