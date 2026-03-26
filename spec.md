# SiteCore

## Current State
Platform at 65+ modules (Version 25 added Çocuk & Spor Tesisi Yönetimi). All modules use lazy loading.

## Requested Changes (Diff)

### Add
- Doğal Afet Hazırlık & Sigorta Kılavuzu module: 4 scenario guides (earthquake, fire, flood, power outage), assembly points with drill history, insurance policies (DASK, building, liability), and preparedness checklist with progress tracking.

### Modify
- BuildingPanel.tsx: Add lazy import and sidebar entry for DisasterPreparedness, add render block.

### Remove
- Nothing removed.

## Implementation Plan
1. Create DisasterPreparedness.tsx page ✓
2. Add to BuildingPanel lazy imports, sidebar, and render ✓
3. Fix react-router-dom missing dependency ✓
