import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, T as TriangleAlert, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-Cr-31AJ2.js";
import { C as ChartColumn } from "./chart-column-DyUSzK7-.js";
const KEY = (id) => `sitecore_meters_${id}`;
const SEED = [
  {
    id: "m1",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 105,
    currentReading: 120,
    readingDate: "2026-01-01",
    month: "2026-01"
  },
  {
    id: "m2",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 120,
    currentReading: 133,
    readingDate: "2026-02-01",
    month: "2026-02"
  },
  {
    id: "m3",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 133,
    currentReading: 148,
    readingDate: "2026-03-01",
    month: "2026-03"
  },
  {
    id: "m4",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 750,
    currentReading: 820,
    readingDate: "2026-01-01",
    month: "2026-01"
  },
  {
    id: "m5",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 820,
    currentReading: 890,
    readingDate: "2026-02-01",
    month: "2026-02"
  },
  {
    id: "m6",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 890,
    currentReading: 920,
    readingDate: "2026-03-01",
    month: "2026-03"
  },
  {
    id: "m7",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 75,
    currentReading: 88,
    readingDate: "2026-01-01",
    month: "2026-01"
  },
  {
    id: "m8",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 88,
    currentReading: 99,
    readingDate: "2026-02-01",
    month: "2026-02"
  },
  {
    id: "m9",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 99,
    currentReading: 115,
    readingDate: "2026-03-01",
    month: "2026-03"
  },
  {
    id: "m10",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 300,
    currentReading: 325,
    readingDate: "2026-01-01",
    month: "2026-01"
  },
  {
    id: "m11",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 325,
    currentReading: 348,
    readingDate: "2026-02-01",
    month: "2026-02"
  },
  {
    id: "m12",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 348,
    currentReading: 365,
    readingDate: "2026-03-01",
    month: "2026-03"
  }
];
function MeterTracking({ buildingId, isOwner, t }) {
  const [readings, setReadings] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [showBulk, setShowBulk] = reactExports.useState(false);
  const [filterType, setFilterType] = reactExports.useState("all");
  const [bulkApts, setBulkApts] = reactExports.useState([
    { no: "", reading: "" },
    { no: "", reading: "" },
    { no: "", reading: "" }
  ]);
  const [bulkType, setBulkType] = reactExports.useState("water");
  const [bulkMonth, setBulkMonth] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
  );
  const [form, setForm] = reactExports.useState({
    apartmentNo: "",
    meterType: "water",
    previousReading: "",
    currentReading: "",
    readingDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) setReadings(JSON.parse(raw));
    else {
      setReadings(SEED);
      localStorage.setItem(KEY(buildingId), JSON.stringify(SEED));
    }
  }, [buildingId]);
  const save = (updated) => {
    setReadings(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };
  const handleSubmit = () => {
    if (!form.apartmentNo.trim() || !form.currentReading) return;
    save([
      ...readings,
      {
        id: Date.now().toString(),
        ...form,
        previousReading: Number(form.previousReading) || 0,
        currentReading: Number(form.currentReading)
      }
    ]);
    setShowDialog(false);
    setForm({
      apartmentNo: "",
      meterType: "water",
      previousReading: "",
      currentReading: "",
      readingDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
    });
  };
  const handleBulkSubmit = () => {
    const valid = bulkApts.filter((a) => a.no.trim() && a.reading.trim());
    if (valid.length === 0) return;
    const newReadings = valid.map((a) => ({
      id: Date.now().toString() + Math.random(),
      apartmentNo: a.no.trim(),
      meterType: bulkType,
      previousReading: 0,
      currentReading: Number(a.reading),
      readingDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      month: bulkMonth
    }));
    save([...readings, ...newReadings]);
    setShowBulk(false);
    setBulkApts([
      { no: "", reading: "" },
      { no: "", reading: "" },
      { no: "", reading: "" }
    ]);
  };
  const filtered = filterType === "all" ? readings : readings.filter((r) => r.meterType === filterType);
  const typeLabel = (type) => {
    if (type === "water")
      return {
        label: t.waterMeter || "Su",
        color: "bg-blue-100 text-blue-700"
      };
    if (type === "electricity")
      return {
        label: t.electricityMeter || "Elektrik",
        color: "bg-yellow-100 text-yellow-700"
      };
    return {
      label: t.gasMeter || "Doğalgaz",
      color: "bg-orange-100 text-orange-700"
    };
  };
  const unitLabel = (type) => type === "water" ? "m³" : type === "electricity" ? "kWh" : "m³";
  const trendType = filterType === "all" ? "water" : filterType;
  const monthlyConsumption = {};
  for (const r of readings.filter((r2) => r2.meterType === trendType)) {
    const c = r.currentReading - r.previousReading;
    monthlyConsumption[r.month] = (monthlyConsumption[r.month] || 0) + c;
  }
  const trendMonths = Object.keys(monthlyConsumption).sort().slice(-6);
  const trendValues = trendMonths.map((m) => monthlyConsumption[m]);
  const maxVal = Math.max(...trendValues, 1);
  const avg = trendValues.length > 0 ? trendValues.reduce((a, b) => a + b, 0) / trendValues.length : 0;
  const aptConsumption = {};
  for (const r of readings.filter((r2) => r2.meterType === trendType)) {
    if (!aptConsumption[r.apartmentNo]) aptConsumption[r.apartmentNo] = [];
    aptConsumption[r.apartmentNo].push(r.currentReading - r.previousReading);
  }
  const alerts = Object.entries(aptConsumption).filter(([, vals]) => {
    const last = vals[vals.length - 1];
    const prevAvg = vals.slice(0, -1).reduce((a, b) => a + b, 0) / Math.max(vals.length - 1, 1);
    return prevAvg > 0 && last > prevAvg * 1.2;
  }).map(([apt]) => apt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.meterTracking || "Sayaç Takibi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowBulk(true),
            variant: "outline",
            className: "rounded-full gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4" }),
              " Toplu Giriş"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowDialog(true),
            className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
            "data-ocid": "meters.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              t.addMeterReading || "Okuma Ekle"
            ]
          }
        )
      ] })
    ] }),
    alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-2xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-orange-700 flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
        " Yüksek Tüketim Uyarısı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-orange-600", children: [
        "Bu dairelerin son tüketimi ortalamanın %20 üzerinde:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: alerts.join(", ") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "table", children: "Tablo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "chart", children: "Trend Grafik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", children: ["all", "water", "electricity", "gas"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: filterType === type ? "default" : "outline",
            onClick: () => setFilterType(type),
            className: filterType === type ? "bg-[#0B1B2E] text-white rounded-full" : "rounded-full",
            "data-ocid": "meters.tab",
            children: type === "all" ? t.all || "Tümü" : typeLabel(type).label
          },
          type
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-[#6B7A8D] py-12",
            "data-ocid": "meters.empty_state",
            children: t.noReadings || "Sayaç okuması bulunamadı."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.apartmentNo || "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.meterType || "Tür" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.previousReading || "Önceki" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.currentReading || "Güncel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.consumption || "Tüketim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.month || "Ay" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((r, i) => {
            const { label, color } = typeLabel(r.meterType);
            const consumption = r.currentReading - r.previousReading;
            const isAlert = alerts.includes(r.apartmentNo);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-t border-[#F0F3F8] hover:bg-[#FAFBFD] ${isAlert ? "bg-orange-50/30" : ""}`,
                "data-ocid": `meters.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-[#0E1116]", children: [
                    r.apartmentNo,
                    isAlert && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-orange-500 inline ml-1" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: color, children: label }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
                    r.previousReading,
                    " ",
                    unitLabel(r.meterType)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
                    r.currentReading,
                    " ",
                    unitLabel(r.meterType)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-green-700", children: [
                    consumption,
                    " ",
                    unitLabel(r.meterType)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: r.month })
                ]
              },
              r.id
            );
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[#0E1116] mb-1", children: [
          "Tüketim Trendi - ",
          typeLabel(trendType).label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mb-6", children: [
          "Son 6 ay, ",
          unitLabel(trendType),
          " cinsinden"
        ] }),
        trendMonths.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#6B7A8D] py-10", children: "Yeterli veri yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-48", children: trendMonths.map((month, i) => {
          const val = trendValues[i];
          const height = Math.max(val / maxVal * 100, 4);
          const isAboveAvg = val > avg * 1.2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-[#0E1116]", children: val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-full rounded-t-lg transition-all ${isAboveAvg ? "bg-orange-400" : "bg-[#4A90D9]"}`,
                    style: { height: `${height}%` },
                    title: `${month}: ${val} ${unitLabel(trendType)}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] truncate w-full text-center", children: month.slice(5) })
              ]
            },
            month
          );
        }) }),
        avg > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-4", children: [
          "Aylık ortalama:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            Math.round(avg),
            " ",
            unitLabel(trendType)
          ] }),
          " ",
          "| Turuncu barlar ortalamanın %20 üzerindedir."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "meters.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addMeterReading || "Sayaç Okuması Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.apartmentNo || "Daire No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.apartmentNo,
              onChange: (e) => setForm((p) => ({ ...p, apartmentNo: e.target.value })),
              placeholder: "101",
              "data-ocid": "meters.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.meterType || "Sayaç Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.meterType,
              onChange: (e) => setForm((p) => ({
                ...p,
                meterType: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "meters.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "water", children: t.waterMeter || "Su" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "electricity", children: t.electricityMeter || "Elektrik" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gas", children: t.gasMeter || "Doğalgaz" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.previousReading || "Önceki Okuma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.previousReading,
                onChange: (e) => setForm((p) => ({ ...p, previousReading: e.target.value })),
                placeholder: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.currentReading || "Güncel Okuma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.currentReading,
                onChange: (e) => setForm((p) => ({ ...p, currentReading: e.target.value })),
                placeholder: "0"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.month || "Ay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: form.month,
              onChange: (e) => setForm((p) => ({ ...p, month: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "meters.submit_button",
              children: t.addMeterReading || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "meters.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBulk, onOpenChange: setShowBulk, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Toplu Okuma Girişi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Sayaç Türü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: bulkType,
                onChange: (e) => setBulkType(e.target.value),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "water", children: "Su" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "electricity", children: "Elektrik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gas", children: "Doğalgaz" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Ay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "month",
                value: bulkMonth,
                onChange: (e) => setBulkMonth(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654]", children: "Daire No ve Okuma Değerleri:" }),
        bulkApts.map((apt, i) => {
          const bulkKey = `bulk-${i}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: `Daire ${i + 1}`,
                value: apt.no,
                onChange: (e) => setBulkApts(
                  (p) => p.map(
                    (a, j) => j === i ? { ...a, no: e.target.value } : a
                  )
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "Okuma",
                value: apt.reading,
                onChange: (e) => setBulkApts(
                  (p) => p.map(
                    (a, j) => j === i ? { ...a, reading: e.target.value } : a
                  )
                )
              }
            )
          ] }, bulkKey);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setBulkApts((p) => [...p, { no: "", reading: "" }]),
            className: "w-full",
            children: "+ Satır Ekle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleBulkSubmit,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              children: "Kaydet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowBulk(false),
              className: "flex-1 rounded-full",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  MeterTracking as default
};
