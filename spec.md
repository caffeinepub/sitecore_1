# SiteCore

## Current State
ReportingCenter.tsx (801 lines) has 4 tabs: Özet, Finansal, Teknik, Sakin & Bina. It has date range filter, export modal with 3 templates, and multiple recharts graphs.

## Requested Changes (Diff)

### Add
- New 'Performans' tab in ReportingCenter with: manager KPI summary cards (open work orders, average resolution time, dues collection rate, resident satisfaction score), period-over-period comparison bar chart (current vs previous period for 4 metrics), and a ranked staff performance table
- Period comparison toggle in the existing tabs (compare current period vs previous period on graphs)

### Modify
- ReportingCenter.tsx: add Performans tab and period comparison feature

### Remove
- Nothing

## Implementation Plan
1. Add PERIOD_COMPARISON_DATA constant for previous vs current period metrics
2. Add new 'Performans' TabsTrigger and TabsContent
3. Performans tab content: 4 KPI cards (açık iş emirleri, çözüm süresi, tahsilat oranı, memnuniyet skoru), grouped bar chart comparing current vs previous period, staff performance table with 5 rows
4. Add comparison toggle button to Finansal tab header to overlay previous period line on the tahsilat chart
