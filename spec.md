# SiteCore

## Current State
SiteCore is a 90+ module residential management platform. v53 added BuildingContactDirectory. MovingManagement already exists.

## Requested Changes (Diff)

### Add
- Bina Sağlık & Hijyen Denetimi (HealthHygieneInspection.tsx): hygiene inspection checklists for common areas, pest control tracking, health scoring, inspection history, finding reports

### Modify
- BuildingPanel.tsx: add lazy import and sidebar entry for new module

### Remove
- Nothing

## Implementation Plan
1. Create HealthHygieneInspection.tsx with inspection list, health score panel, pest control tab, findings form
2. Add lazy import and route/sidebar entry in BuildingPanel.tsx
