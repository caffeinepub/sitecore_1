import { r as reactExports, j as jsxRuntimeExports, a2 as Shield, T as TriangleAlert, P as Plus, F as FileText } from "./index-CN7AkLBl.js";
import { E as Eye } from "./eye-sz-2cbJN.js";
import { C as Clock } from "./clock-CDrKT4Og.js";
import { C as CircleCheckBig } from "./circle-check-big-DqCfhhFd.js";
import { C as CircleX } from "./circle-x-A0QGGS2q.js";
const POLICIES = [
  {
    id: "p1",
    type: "DASK (Zorunlu Deprem)",
    company: "Güneş Sigorta",
    policyNo: "DSK-2024-00412",
    startDate: "01.01.2024",
    endDate: "31.12.2024",
    coverage: 25e5,
    premium: 3200,
    status: "aktif",
    description: "Bina yapı sigortası, deprem hasarlarını kapsar."
  },
  {
    id: "p2",
    type: "Konut & Yangın Sigortası",
    company: "Anadolu Sigorta",
    policyNo: "KYS-2024-08831",
    startDate: "15.03.2024",
    endDate: "14.03.2025",
    coverage: 5e6,
    premium: 8750,
    status: "aktif",
    description: "Yangın, su baskını, hırsızlık ve doğal afet hasarlarını kapsar."
  },
  {
    id: "p3",
    type: "Asansör Zorunlu Mali Sorumluluk",
    company: "Allianz",
    policyNo: "AMS-2023-55120",
    startDate: "01.06.2023",
    endDate: "31.05.2024",
    coverage: 1e6,
    premium: 1850,
    status: "yenilenecek",
    description: "Asansör kazalarında üçüncü şahıs yaralanma ve hasar tazminatı."
  },
  {
    id: "p4",
    type: "Ortak Alan Sorumluluk",
    company: "Mapfre",
    policyNo: "OAS-2024-33021",
    startDate: "01.01.2024",
    endDate: "31.12.2024",
    coverage: 5e5,
    premium: 2400,
    status: "aktif",
    description: "Ortak alanlarda meydana gelen kaza ve yaralanmalara karşı sorumluluk."
  },
  {
    id: "p5",
    type: "Teknik Ekipman Sigortası",
    company: "HDI Sigorta",
    policyNo: "TES-2022-77811",
    startDate: "01.09.2022",
    endDate: "31.08.2023",
    coverage: 75e4,
    premium: 3100,
    status: "sona_erdi",
    description: "Kazan, pompa, jeneratör gibi teknik ekipmanları kapsar."
  }
];
const CLAIMS = [
  {
    id: "c1",
    policyId: "p2",
    policyType: "Konut & Yangın",
    incidentDate: "12.03.2024",
    reportDate: "13.03.2024",
    description: "3. kat ortak su borusu patlaması nedeniyle bodrum depoda su hasarı oluştu. Malzeme ve işçilik masrafı talep edilmektedir.",
    amount: 18500,
    status: "odendi",
    adjuster: "Mehmet Yılmaz",
    resolution: "Hasar tespiti yapıldı, tam tutar ödendi."
  },
  {
    id: "c2",
    policyId: "p1",
    policyType: "DASK",
    incidentDate: "06.02.2023",
    reportDate: "10.02.2023",
    description: "Şubat 2023 depremleri sonrasında bina dış cephesinde çatlaklar ve bölücü duvar hasarları tespit edildi.",
    amount: 145e3,
    status: "odendi",
    adjuster: "Ayla Kaya",
    resolution: "Hasar tespiti 3 hafta sürdü, %80 oranında ödeme yapıldı."
  },
  {
    id: "c3",
    policyId: "p3",
    policyType: "Asansör Mali Sorumluluk",
    incidentDate: "22.08.2024",
    reportDate: "23.08.2024",
    description: "Asansör arızası sırasında kabinde mahsur kalan bir sakin panik atağı geçirdi, ambulans çağrıldı. Kişisel yaralanma tazminatı talep ediliyor.",
    amount: 12e3,
    status: "inceleniyor",
    adjuster: "Kemal Arslan"
  },
  {
    id: "c4",
    policyId: "p2",
    policyType: "Konut & Yangın",
    incidentDate: "05.11.2024",
    reportDate: "05.11.2024",
    description: "Çatı katındaki elektrik panosunda kısa devre, duman hasarı oluştu. Sigorta şirketine hasar bildirimi yapıldı.",
    amount: 28e3,
    status: "beklemede"
  },
  {
    id: "c5",
    policyId: "p4",
    policyType: "Ortak Alan Sorumluluk",
    incidentDate: "14.07.2024",
    reportDate: "15.07.2024",
    description: "Islak zemin nedeniyle düşen sakin, bilek kırığı geçirdi. Tıbbi masraf tazminatı talep etti.",
    amount: 8500,
    status: "reddedildi",
    resolution: "İlliyet bağı kanıtlanamadı, poliçe kapsamı dışında değerlendirildi."
  }
];
const STATUS_POLICY = {
  aktif: { label: "Aktif", color: "bg-green-100 text-green-700" },
  yenilenecek: { label: "Yenilenecek", color: "bg-yellow-100 text-yellow-700" },
  sona_erdi: { label: "Sona Erdi", color: "bg-red-100 text-red-700" }
};
const STATUS_CLAIM = {
  inceleniyor: {
    label: "İnceleniyor",
    color: "bg-blue-100 text-blue-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
  },
  onaylandi: {
    label: "Onaylandı",
    color: "bg-green-100 text-green-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  },
  reddedildi: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
  },
  odendi: {
    label: "Ödendi",
    color: "bg-purple-100 text-purple-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  },
  beklemede: {
    label: "Beklemede",
    color: "bg-yellow-100 text-yellow-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
  }
};
function InsuranceClaimManagement() {
  const [tab, setTab] = reactExports.useState(
    "policies"
  );
  const [selectedPolicy, setSelectedPolicy] = reactExports.useState(null);
  const [selectedClaim, setSelectedClaim] = reactExports.useState(null);
  const [filterStatus, setFilterStatus] = reactExports.useState("tumu");
  const totalCoverage = POLICIES.filter((p) => p.status === "aktif").reduce(
    (s, p) => s + p.coverage,
    0
  );
  const totalPremium = POLICIES.filter((p) => p.status === "aktif").reduce(
    (s, p) => s + p.premium,
    0
  );
  const activeClaims = CLAIMS.filter(
    (c) => c.status === "inceleniyor" || c.status === "beklemede"
  ).length;
  const paidAmount = CLAIMS.filter((c) => c.status === "odendi").reduce(
    (s, c) => s + c.amount,
    0
  );
  const filteredClaims = filterStatus === "tumu" ? CLAIMS : CLAIMS.filter((c) => c.status === filterStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B1B2E]", children: "Bina Sigorta & Hasar Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7280] text-sm mt-1", children: "Sigorta poliçeleri, hasar başvuruları ve ekspertiz süreçleri" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aktif Poliçe Teminatı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-[#0B1B2E] mt-1", children: [
          (totalCoverage / 1e6).toFixed(1),
          "M ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 mt-1", children: "4 aktif poliçe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Yıllık Prim Toplamı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-[#0B1B2E] mt-1", children: [
          totalPremium.toLocaleString("tr-TR"),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Aktif poliçeler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Açık Hasar Başvurusu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-orange-600 mt-1", children: activeClaims }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-500 mt-1", children: "İşlemde / Beklemede" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Toplam Tahsil Edilen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-purple-700 mt-1", children: [
          paidAmount.toLocaleString("tr-TR"),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-purple-500 mt-1", children: "Ödenen tazminatlar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-gray-200", children: ["policies", "claims", "newClaim"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setTab(t),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-[#4A90D9] text-[#4A90D9]" : "border-transparent text-gray-500 hover:text-gray-700"}`,
        children: t === "policies" ? "Poliçeler" : t === "claims" ? "Hasar Başvuruları" : "Yeni Başvuru"
      },
      t
    )) }),
    tab === "policies" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: POLICIES.map((policy) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-gray-100 shadow-sm p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0B1B2E] text-sm", children: policy.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  policy.company,
                  " · Poliçe No: ",
                  policy.policyNo
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-1 rounded-full font-medium ${STATUS_POLICY[policy.status].color}`,
                  children: STATUS_POLICY[policy.status].label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedPolicy(
                    (selectedPolicy == null ? void 0 : selectedPolicy.id) === policy.id ? null : policy
                  ),
                  className: "text-gray-400 hover:text-[#4A90D9]",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-3 text-xs text-gray-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Teminat:" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                policy.coverage.toLocaleString("tr-TR"),
                " ₺"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Yıllık Prim:" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                policy.premium.toLocaleString("tr-TR"),
                " ₺"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Bitiş:" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: policy.endDate })
            ] })
          ] }),
          (selectedPolicy == null ? void 0 : selectedPolicy.id) === policy.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: policy.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
              "Geçerlilik: ",
              policy.startDate,
              " – ",
              policy.endDate
            ] })
          ] })
        ]
      },
      policy.id
    )) }),
    tab === "claims" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["tumu", "beklemede", "inceleniyor", "odendi", "reddedildi"].map(
        (s) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilterStatus(s),
              className: `px-3 py-1 text-xs rounded-full border transition-colors ${filterStatus === s ? "bg-[#4A90D9] text-white border-[#4A90D9]" : "text-gray-500 border-gray-200 hover:border-[#4A90D9]"}`,
              children: s === "tumu" ? "Tümü" : ((_a = STATUS_CLAIM[s]) == null ? void 0 : _a.label) || s
            },
            s
          );
        }
      ) }),
      filteredClaims.map((claim) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-gray-100 shadow-sm p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-orange-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0B1B2E] text-sm", children: claim.policyType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                    "Olay: ",
                    claim.incidentDate,
                    " · Bildirim: ",
                    claim.reportDate
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${STATUS_CLAIM[claim.status].color}`,
                    children: [
                      STATUS_CLAIM[claim.status].icon,
                      STATUS_CLAIM[claim.status].label
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedClaim(
                      (selectedClaim == null ? void 0 : selectedClaim.id) === claim.id ? null : claim
                    ),
                    className: "text-gray-400 hover:text-[#4A90D9]",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 mt-2 line-clamp-2", children: claim.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-4 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                "Talep Edilen:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0B1B2E]", children: [
                  claim.amount.toLocaleString("tr-TR"),
                  " ₺"
                ] })
              ] }),
              claim.adjuster && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                "Eksper:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: claim.adjuster })
              ] })
            ] }),
            (selectedClaim == null ? void 0 : selectedClaim.id) === claim.id && claim.resolution && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-700", children: "Sonuç:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 mt-1", children: claim.resolution })
            ] })
          ]
        },
        claim.id
      ))
    ] }),
    tab === "newClaim" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0B1B2E] mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Yeni Hasar Başvurusu"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "nc-policy",
              className: "block text-xs font-medium text-gray-700 mb-1",
              children: "İlgili Poliçe"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "nc-policy",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#4A90D9]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Poliçe seçin..." }),
                POLICIES.filter((p) => p.status === "aktif").map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.id, children: [
                  p.type,
                  " – ",
                  p.company
                ] }, p.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "nc-date",
              className: "block text-xs font-medium text-gray-700 mb-1",
              children: "Olay Tarihi"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "nc-date",
              type: "date",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "nc-desc",
              className: "block text-xs font-medium text-gray-700 mb-1",
              children: "Hasar Açıklaması"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "nc-desc",
              rows: 3,
              placeholder: "Hasarın nasıl oluştuğunu ve etkilenen alanları açıklayın...",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9] resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "nc-amount",
              className: "block text-xs font-medium text-gray-700 mb-1",
              children: "Tahmini Hasar Tutarı (₺)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "nc-amount",
              type: "number",
              placeholder: "0",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "nc-type",
              className: "block text-xs font-medium text-gray-700 mb-1",
              children: "Hasar Türü"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "nc-type",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#4A90D9]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yangın" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Su Hasarı / Boru Patlaması" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Deprem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Hırsızlık" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Vandalizm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Şiddetli Hava Koşulları" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kaza / Yaralanma" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Diğer" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              " Başvuruyu Gönder"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 text-center", children: "Başvuru sigorta şirketine iletilecek ve eksper ataması yapılacaktır." })
      ] })
    ] })
  ] });
}
export {
  InsuranceClaimManagement as default
};
