# Documentation Intégration : Sécurité & Surveillance

Ce module est réservé aux agents de sécurité et administrateurs pour assurer la tranquillité sur les sites physiques et la modération des comportements.

## 🧱 Composants Clés
- `SecurityDashboardPage.tsx` : Monitoring en temps réel des alertes locales.
- `SecurityReportsPage.tsx` : Journalisation des incidents.
- `ScannerPage.tsx` : Scanner de QR Codes pour la vérification des tickets.
- `SignalerPage.tsx` : Formulaire de signalement d'incident pour les utilisateurs locaux.

## 🧬 Modèles de Données (Types)

```typescript
export interface SecurityAlert {
  id: string;
  type: 'CROWD_CONTROL' | 'MEDICAL' | 'THEFT' | 'OTHER';
  location: string;
  status: 'ACTIVE' | 'RESOLVED';
  timestamp: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface VerificationLog {
  id: string;
  agentId: string;
  ticketId: string;
  timestamp: string;
  result: 'SUCCESS' | 'FAILED';
}
```

## 🌐 Endpoints API Proposés

| Méthode | Route | Description | Auth Requise |
| :--- | :--- | :--- | :--- |
| GET | `/api/security/alerts` | Liste des alertes actives | Agent Secu |
| POST | `/api/security/alerts/:id/resolve` | Marquer une alerte comme résolue | Agent Secu |
| POST | `/api/security/verify-ticket` | Vérification de validité d'un ticket (vvia code) | Agent Secu |
| POST | `/api/reports/incident` | Soumettre un nouveau rapport d'incident | Utilisateur |

## 💾 Gestion d'État (Context)
Les données sont principalement récupérées via WebSockets pour le dashboard de sécurité afin de garantir une réactivité immédiate aux alertes.

## ⚠️ Notes pour le Backend
- **Temps Réel** : Utiliser Socket.io ou WebSockets pour pousser les alertes critiques aux terminaux des agents.
- **Géolocalisation** : Inclure des coordonnées GPS précises pour chaque alerte de sécurité.
- **Vérification Hors-ligne** : Envisager un système de signature cryptographique pour les tickets permettant une vérification partielle même sans réseau (Scanner).
