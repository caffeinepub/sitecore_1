import { r as reactExports, j as jsxRuntimeExports, aA as ShieldCheck, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, D as Dialog, s as DialogTrigger, B as Button, P as Plus, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, T as TriangleAlert, e as Badge } from "./index-DrmT2NwI.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Bc19n7vK.js";
import { C as Checkbox } from "./checkbox-fLhhfhvB.js";
import { L as Label } from "./label-AI95LEA1.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-FVX1qZdR.js";
import { T as Textarea } from "./textarea-BURed9T_.js";
import { S as Star } from "./star-CBS86Ck3.js";
import "./index-OxX3-zPw.js";
const inspections = [
  {
    id: 1,
    tarih: "15.03.2026",
    alan: "Ortak Koridor",
    denetci: "Ahmet Yılmaz",
    puan: 92,
    durum: "tamamlandı"
  },
  {
    id: 2,
    tarih: "12.03.2026",
    alan: "Asansör",
    denetci: "Fatma Kaya",
    puan: 85,
    durum: "tamamlandı"
  },
  {
    id: 3,
    tarih: "10.03.2026",
    alan: "Otopark",
    denetci: "Mehmet Demir",
    puan: 68,
    durum: "tamamlandı"
  },
  {
    id: 4,
    tarih: "08.03.2026",
    alan: "Bahçe",
    denetci: "Ahmet Yılmaz",
    puan: 95,
    durum: "tamamlandı"
  },
  {
    id: 5,
    tarih: "05.03.2026",
    alan: "Çatı",
    denetci: "Fatma Kaya",
    puan: 72,
    durum: "tamamlandı"
  },
  {
    id: 6,
    tarih: "03.03.2026",
    alan: "Bodrum",
    denetci: "Mehmet Demir",
    puan: 61,
    durum: "tamamlandı"
  },
  {
    id: 7,
    tarih: "20.03.2026",
    alan: "Ortak Koridor",
    denetci: "Ahmet Yılmaz",
    puan: 0,
    durum: "devam ediyor"
  },
  {
    id: 8,
    tarih: "25.03.2026",
    alan: "Asansör",
    denetci: "Fatma Kaya",
    puan: 0,
    durum: "planlandı"
  }
];
const pestLogs = [
  {
    id: 1,
    tarih: "10.03.2026",
    tur: "İlaçlama",
    alan: "Bodrum",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı"
  },
  {
    id: 2,
    tarih: "05.03.2026",
    tur: "Tuzak",
    alan: "Otopark",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı"
  },
  {
    id: 3,
    tarih: "01.03.2026",
    tur: "Önleyici",
    alan: "Ortak Koridor",
    firma: "HijyenMark",
    durum: "tamamlandı"
  },
  {
    id: 4,
    tarih: "28.02.2026",
    tur: "İlaçlama",
    alan: "Çatı",
    firma: "PestPro A.Ş.",
    durum: "tamamlandı"
  },
  {
    id: 5,
    tarih: "25.03.2026",
    tur: "İlaçlama",
    alan: "Bodrum",
    firma: "HijyenMark",
    durum: "planlandı"
  },
  {
    id: 6,
    tarih: "30.03.2026",
    tur: "Önleyici",
    alan: "Bahçe",
    firma: "PestPro A.Ş.",
    durum: "planlandı"
  }
];
const checklistItems = [
  {
    id: 1,
    kategori: "Genel Temizlik",
    item: "Koridorlar süpürülüp temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true
  },
  {
    id: 2,
    kategori: "Genel Temizlik",
    item: "Cam ve pencereler silindi",
    sonKontrol: "14.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true
  },
  {
    id: 3,
    kategori: "Genel Temizlik",
    item: "Merdiven sahanlıkları temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true
  },
  {
    id: 4,
    kategori: "Genel Temizlik",
    item: "Kapı kolları dezenfekte edildi",
    sonKontrol: "13.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false
  },
  {
    id: 5,
    kategori: "Genel Temizlik",
    item: "Bodrum kat temizlendi",
    sonKontrol: "10.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false
  },
  {
    id: 6,
    kategori: "Sanitasyon",
    item: "Çöp konteynerleri dezenfekte edildi",
    sonKontrol: "15.03.2026",
    sorumlu: "Teknik Personel",
    checked: true
  },
  {
    id: 7,
    kategori: "Sanitasyon",
    item: "Atık su kanalları kontrol edildi",
    sonKontrol: "12.03.2026",
    sorumlu: "Teknik Personel",
    checked: true
  },
  {
    id: 8,
    kategori: "Sanitasyon",
    item: "Su depoları temizlendi",
    sonKontrol: "01.03.2026",
    sorumlu: "Teknik Personel",
    checked: false
  },
  {
    id: 9,
    kategori: "Sanitasyon",
    item: "Biyogüvenlik protokolleri uygulandı",
    sonKontrol: "10.03.2026",
    sorumlu: "Yönetim",
    checked: true
  },
  {
    id: 10,
    kategori: "Sanitasyon",
    item: "Tuvalet ve lavabolar temizlendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true
  },
  {
    id: 11,
    kategori: "Haşere Önleme",
    item: "Haşere tuzakları kontrol edildi",
    sonKontrol: "14.03.2026",
    sorumlu: "PestPro A.Ş.",
    checked: true
  },
  {
    id: 12,
    kategori: "Haşere Önleme",
    item: "Bodrum ilaçlama yapıldı",
    sonKontrol: "10.03.2026",
    sorumlu: "PestPro A.Ş.",
    checked: true
  },
  {
    id: 13,
    kategori: "Haşere Önleme",
    item: "Giriş noktaları kapatıldı",
    sonKontrol: "08.03.2026",
    sorumlu: "Teknik Personel",
    checked: false
  },
  {
    id: 14,
    kategori: "Haşere Önleme",
    item: "Çöp birikimleri engellendi",
    sonKontrol: "15.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: true
  },
  {
    id: 15,
    kategori: "Haşere Önleme",
    item: "Sızdırmazlık kontrolleri yapıldı",
    sonKontrol: "05.03.2026",
    sorumlu: "Teknik Personel",
    checked: false
  },
  {
    id: 16,
    kategori: "Havalandırma",
    item: "Hava kanalları temizlendi",
    sonKontrol: "01.03.2026",
    sorumlu: "Teknik Personel",
    checked: true
  },
  {
    id: 17,
    kategori: "Havalandırma",
    item: "Filtreler değiştirildi",
    sonKontrol: "28.02.2026",
    sorumlu: "Teknik Personel",
    checked: false
  },
  {
    id: 18,
    kategori: "Havalandırma",
    item: "Asansör makine dairesi havalandırıldı",
    sonKontrol: "10.03.2026",
    sorumlu: "Teknik Personel",
    checked: true
  },
  {
    id: 19,
    kategori: "Havalandırma",
    item: "Garaj havalandırma sistemi kontrol edildi",
    sonKontrol: "12.03.2026",
    sorumlu: "Teknik Personel",
    checked: true
  },
  {
    id: 20,
    kategori: "Havalandırma",
    item: "Koku giderici sistemler çalıştırıldı",
    sonKontrol: "14.03.2026",
    sorumlu: "Temizlik Ekibi",
    checked: false
  }
];
const bulgular = [
  {
    id: 1,
    alan: "Otopark",
    aciklama: "Yağ lekeleri temizlenmemiş",
    seviye: "orta"
  },
  {
    id: 2,
    alan: "Bodrum",
    aciklama: "Rutubet ve küf oluşumu tespit edildi",
    seviye: "kritik"
  },
  { id: 3, alan: "Çatı", aciklama: "Atık birikmesi var", seviye: "orta" },
  { id: 4, alan: "Asansör", aciklama: "Tavan paneli kirli", seviye: "düşük" },
  { id: 5, alan: "Bodrum", aciklama: "Haşere izi mevcut", seviye: "kritik" }
];
function scoreColor(puan) {
  if (puan >= 90) return "text-green-600";
  if (puan >= 70) return "text-yellow-600";
  return "text-red-600";
}
function scoreBg(puan) {
  if (puan >= 90) return "bg-green-100 text-green-700";
  if (puan >= 70) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}
function durumBadge(durum) {
  if (durum === "tamamlandı")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700", children: "Tamamlandı" });
  if (durum === "devam ediyor")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: "Devam Ediyor" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600", children: "Planlandı" });
}
function seviyeBadge(seviye) {
  if (seviye === "kritik")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700", children: "Kritik" });
  if (seviye === "orta")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700", children: "Orta" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: "Düşük" });
}
function HealthHygieneInspection({
  buildingId: _buildingId
}) {
  const [alanFilter, setAlanFilter] = reactExports.useState("Tümü");
  const [durumFilter, setDurumFilter] = reactExports.useState("Tümü");
  const [checklist, setChecklist] = reactExports.useState(checklistItems);
  const [showInspForm, setShowInspForm] = reactExports.useState(false);
  const [showPestForm, setShowPestForm] = reactExports.useState(false);
  const filteredInsp = inspections.filter((i) => {
    if (alanFilter !== "Tümü" && i.alan !== alanFilter) return false;
    if (durumFilter !== "Tümü" && i.durum !== durumFilter) return false;
    return true;
  });
  const alanScores = {};
  for (const i of inspections.filter((i2) => i2.puan > 0)) {
    if (!alanScores[i.alan]) alanScores[i.alan] = [];
    alanScores[i.alan].push(i.puan);
  }
  const alanAvg = Object.entries(alanScores).map(([alan, scores]) => ({
    alan,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }));
  const genelSkor = Math.round(
    alanAvg.reduce((a, b) => a + b.avg, 0) / (alanAvg.length || 1)
  );
  const enIyi = alanAvg.sort((a, b) => b.avg - a.avg)[0];
  const enDusuk = [...alanAvg].sort((a, b) => a.avg - b.avg)[0];
  const completedCount = checklist.filter((c) => c.checked).length;
  const completionPct = Math.round(completedCount / checklist.length * 100);
  const categories = Array.from(new Set(checklist.map((c) => c.kategori)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "text-teal-600", size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Sağlık & Hijyen Denetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Bina hijyen takibi, denetim raporları ve haşere kontrolü" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "denetimler", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "denetimler", "data-ocid": "health.denetimler.tab", children: "Denetimler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "skor", "data-ocid": "health.skor.tab", children: "Sağlık Skoru" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "hasere", "data-ocid": "health.hasere.tab", children: "Haşere Kontrol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "liste", "data-ocid": "health.liste.tab", children: "Kontrol Listesi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "denetimler", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4 items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: alanFilter, onValueChange: setAlanFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "health.alan.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                "Tümü",
                "Ortak Koridor",
                "Asansör",
                "Otopark",
                "Bahçe",
                "Çatı",
                "Bodrum"
              ].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: durumFilter, onValueChange: setDurumFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "health.durum.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Tümü", "tamamlandı", "devam ediyor", "planlandı"].map(
                (d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d.charAt(0).toUpperCase() + d.slice(1) }, d)
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showInspForm, onOpenChange: setShowInspForm, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "bg-teal-600 hover:bg-teal-700",
                "data-ocid": "health.denetim.open_modal_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                  " Yeni Denetim"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "health.denetim.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Denetim Ekle" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "health.denetim.alan.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Alan seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                      "Ortak Koridor",
                      "Asansör",
                      "Otopark",
                      "Bahçe",
                      "Çatı",
                      "Bodrum"
                    ].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tarih" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", "data-ocid": "health.denetim.tarih.input" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Denetçi Adı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Ad Soyad",
                      "data-ocid": "health.denetim.denetci.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notlar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      placeholder: "Notlar...",
                      "data-ocid": "health.denetim.notlar.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => setShowInspForm(false),
                      "data-ocid": "health.denetim.cancel_button",
                      children: "İptal"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => setShowInspForm(false),
                      className: "bg-teal-600 hover:bg-teal-700",
                      "data-ocid": "health.denetim.submit_button",
                      children: "Kaydet"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-gray-50", children: ["Tarih", "Alan", "Denetçi", "Puan", "Durum"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left px-3 py-2 text-gray-600 font-medium",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredInsp.map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b hover:bg-gray-50",
              "data-ocid": `health.denetim.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: i.tarih }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: i.alan }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: i.denetci }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: i.puan > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${scoreColor(i.puan)}`, children: i.puan }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: durumBadge(i.durum) })
              ]
            },
            i.id
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "skor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "health.genel_skor.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Genel Bina Skoru" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-4xl font-black ${scoreColor(genelSkor)}`, children: genelSkor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${scoreBg(genelSkor)}`,
                children: genelSkor >= 90 ? "Mükemmel" : genelSkor >= 70 ? "İyi" : "Düşük"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "En İyi Alan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 20, className: "text-yellow-500 mx-auto mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: enIyi == null ? void 0 : enIyi.alan }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-lg font-bold ${scoreColor((enIyi == null ? void 0 : enIyi.avg) ?? 0)}`,
                children: enIyi == null ? void 0 : enIyi.avg
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "En Düşük Alan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                size: 20,
                className: "text-red-500 mx-auto mb-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: enDusuk == null ? void 0 : enDusuk.alan }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-lg font-bold ${scoreColor((enDusuk == null ? void 0 : enDusuk.avg) ?? 0)}`,
                children: enDusuk == null ? void 0 : enDusuk.avg
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Son Denetim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-800 mt-3", children: "15.03.2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Ortak Koridor" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Alan Bazlı Skor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: alanAvg.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.alan }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${scoreColor(a.avg)}`, children: a.avg })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full ${a.avg >= 90 ? "bg-green-500" : a.avg >= 70 ? "bg-yellow-500" : "bg-red-500"}`,
                style: { width: `${a.avg}%` }
              }
            ) })
          ] }, a.alan)) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Açık Bulgular" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: bulgular.map((b, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between py-2 border-b last:border-0",
              "data-ocid": `health.bulgu.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: b.alan }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: b.aciklama })
                ] }),
                seviyeBadge(b.seviye)
              ]
            },
            b.id
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "hasere", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Son İlaçlama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-800", children: "10.03.2026" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Planlanan Sonraki" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-800", children: "25.03.2026" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Aktif Tuzak Sayısı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl text-teal-600", children: "8" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showPestForm, onOpenChange: setShowPestForm, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-teal-600 hover:bg-teal-700",
              "data-ocid": "health.pest.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
                " Yeni Kayıt"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "health.pest.dialog", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Haşere Kontrol Kaydı" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Uygulama Türü" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "health.pest.tur.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seçin" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["İlaçlama", "Tuzak", "Önleyici"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Alan",
                    "data-ocid": "health.pest.alan.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Firma" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Firma adı",
                    "data-ocid": "health.pest.firma.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tarih" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", "data-ocid": "health.pest.tarih.input" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setShowPestForm(false),
                    "data-ocid": "health.pest.cancel_button",
                    children: "İptal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setShowPestForm(false),
                    className: "bg-teal-600 hover:bg-teal-700",
                    "data-ocid": "health.pest.submit_button",
                    children: "Kaydet"
                  }
                )
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-gray-50", children: ["Tarih", "Tür", "Alan", "Firma", "Durum"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-left px-3 py-2 text-gray-600 font-medium",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pestLogs.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b hover:bg-gray-50",
              "data-ocid": `health.pest.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: p.tarih }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: p.tur }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: p.alan }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: p.firma }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: durumBadge(p.durum) })
              ]
            },
            p.id
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "liste", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-teal-600", children: [
              completionPct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500 ml-2", children: [
              "tamamlandı (",
              completedCount,
              "/",
              checklist.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-3 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-teal-500 rounded-full transition-all",
              style: { width: `${completionPct}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: categories.map((kat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: kat }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: checklist.filter((c) => c.kategori === kat).map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 py-1.5 border-b last:border-0",
              "data-ocid": `health.checklist.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: c.checked,
                    onCheckedChange: (v) => setChecklist(
                      (prev) => prev.map(
                        (x) => x.id === c.id ? { ...x, checked: !!v } : x
                      )
                    ),
                    "data-ocid": `health.checklist.checkbox.${idx + 1}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm ${c.checked ? "line-through text-gray-400" : "text-gray-800"}`,
                      children: c.item
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                    c.sorumlu,
                    " · Son: ",
                    c.sonKontrol
                  ] })
                ] })
              ]
            },
            c.id
          )) }) })
        ] }, kat)) })
      ] })
    ] })
  ] });
}
export {
  HealthHygieneInspection as default
};
