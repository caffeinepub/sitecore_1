# SiteCore

## Current State
Platform has 67+ modules with lazy loading. WorkOrderManagement.tsx exists with basic work order list, status/priority filtering, and staff assignment.

## Requested Changes (Diff)

### Add
- Printable/PDF-like work order detail view (modal with print button, shows all order details formatted)
- Work order templates section (predefined templates for recurring tasks like monthly elevator inspection, quarterly fire system check, weekly cleaning)
- Template-based quick creation (select template → pre-fills form)

### Modify
- WorkOrderManagement.tsx: add Templates tab, add print modal for individual work orders, add quick-create from template

### Remove
- Nothing

## Implementation Plan
1. Add a Templates tab to WorkOrderManagement with 6 predefined templates
2. Add template-based quick creation flow
3. Add printable detail modal with all work order fields formatted for print
