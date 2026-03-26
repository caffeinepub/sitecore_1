import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, B as Button, P as Plus, U as Users, e as Badge, S as Search, I as Input, F as FileText, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-BJcLL9-x.js";
import { T as Trash2 } from "./trash-2-ChUiugUF.js";
import { C as CircleCheckBig } from "./circle-check-big-Cn5BVo1T.js";
import { C as CircleX } from "./circle-x-Dd6EmKKk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
const CircleMinus = createLucideIcon("circle-minus", __iconNode);
const DEFAULT_MEMBERS = [
  {
    id: "1",
    name: "Ahmet Yıldırım",
    role: "Başkan",
    phone: "0532 111 22 33",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "A-15"
  },
  {
    id: "2",
    name: "Fatma Kaya",
    role: "Sekreter",
    phone: "0541 222 33 44",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "B-8"
  },
  {
    id: "3",
    name: "Mehmet Demir",
    role: "Üye",
    phone: "0555 333 44 55",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "A-3"
  },
  {
    id: "4",
    name: "Ayşe Çelik",
    role: "Üye",
    phone: "0533 444 55 66",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "C-12"
  },
  {
    id: "5",
    name: "Hasan Şahin",
    role: "Denetçi",
    phone: "0544 555 66 77",
    termStart: "2025-01-01",
    termEnd: "2026-12-31",
    apartment: "B-22"
  }
];
const DEFAULT_DECISIONS = [
  {
    id: "1",
    date: "2026-03-15",
    subject: "Asansör Bakım Sözleşmesi Yenileme",
    text: "Binanın A ve B bloğundaki asansörlerin bakım sözleşmesinin 2 yıllığına yenilenmesine karar verilmiştir.",
    kabul: 4,
    ret: 0,
    cekimser: 1,
    status: "yürürlükte"
  },
  {
    id: "2",
    date: "2026-02-20",
    subject: "Ortak Alan Boyası",
    text: "Bina koridorları ve giriş holünün boyanması için bütçeden ₺25.000 ayrılmasına karar verilmiştir.",
    kabul: 3,
    ret: 1,
    cekimser: 1,
    status: "yürürlükte"
  },
  {
    id: "3",
    date: "2026-01-10",
    subject: "Güvenlik Kamerası Ekleme",
    text: "Bodrum kat girişine 2 adet ek güvenlik kamerası takılmasına karar verilmiştir.",
    kabul: 5,
    ret: 0,
    cekimser: 0,
    status: "yürürlükte"
  },
  {
    id: "4",
    date: "2025-12-05",
    subject: "Havuz Kapatma Kararı",
    text: "Kış sezonu nedeniyle ortak alan havuzunun Mart 2026'ya kadar kapatılmasına karar verilmiştir.",
    kabul: 4,
    ret: 0,
    cekimser: 1,
    status: "yürürlükte"
  },
  {
    id: "5",
    date: "2025-11-18",
    subject: "Kapıcı Dairesi Tadilat",
    text: "Kapıcı dairesinin tadilatı teklifi reddedilmiştir. Yeniden değerlendirilmek üzere ertelenmiştir.",
    kabul: 1,
    ret: 3,
    cekimser: 1,
    status: "iptal"
  }
];
const MEMBER_KEY = (id) => `sitecore_committee_members_${id}`;
const DECISION_KEY = (id) => `sitecore_committee_decisions_${id}`;
const ROLE_COLORS = {
  Başkan: "bg-[#0B1B2E] text-white",
  Sekreter: "bg-blue-100 text-blue-700",
  Üye: "bg-gray-100 text-gray-700",
  Denetçi: "bg-purple-100 text-purple-700"
};
function CommitteeManagement({
  buildingId,
  isOwner,
  t: _t
}) {
  const loadMembers = () => {
    try {
      const d = localStorage.getItem(MEMBER_KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_MEMBERS;
    } catch {
      return DEFAULT_MEMBERS;
    }
  };
  const loadDecisions = () => {
    try {
      const d = localStorage.getItem(DECISION_KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_DECISIONS;
    } catch {
      return DEFAULT_DECISIONS;
    }
  };
  const [members, setMembers] = reactExports.useState(loadMembers);
  const [decisions, setDecisions] = reactExports.useState(loadDecisions);
  const [search, setSearch] = reactExports.useState("");
  const [showMemberDialog, setShowMemberDialog] = reactExports.useState(false);
  const [showDecisionDialog, setShowDecisionDialog] = reactExports.useState(false);
  const [memberForm, setMemberForm] = reactExports.useState({
    name: "",
    role: "Üye",
    phone: "",
    termStart: "",
    termEnd: "",
    apartment: ""
  });
  const [decisionForm, setDecisionForm] = reactExports.useState({
    subject: "",
    text: "",
    kabul: 0,
    ret: 0,
    cekimser: 0
  });
  const saveMembers = (data) => {
    setMembers(data);
    localStorage.setItem(MEMBER_KEY(buildingId), JSON.stringify(data));
  };
  const saveDecisions = (data) => {
    setDecisions(data);
    localStorage.setItem(DECISION_KEY(buildingId), JSON.stringify(data));
  };
  const addMember = () => {
    if (!memberForm.name.trim()) return;
    const newMember = {
      id: Date.now().toString(),
      ...memberForm
    };
    saveMembers([...members, newMember]);
    setShowMemberDialog(false);
    setMemberForm({
      name: "",
      role: "Üye",
      phone: "",
      termStart: "",
      termEnd: "",
      apartment: ""
    });
  };
  const addDecision = () => {
    if (!decisionForm.subject.trim()) return;
    const newDecision = {
      id: Date.now().toString(),
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "yürürlükte",
      ...decisionForm
    };
    saveDecisions([newDecision, ...decisions]);
    setShowDecisionDialog(false);
    setDecisionForm({ subject: "", text: "", kabul: 0, ret: 0, cekimser: 0 });
  };
  const filteredDecisions = decisions.filter(
    (d) => d.subject.toLowerCase().includes(search.toLowerCase()) || d.text.toLowerCase().includes(search.toLowerCase())
  );
  const totalVotes = (d) => d.kabul + d.ret + d.cekimser;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Komite & Kurul Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-0.5", children: "Yönetim kurulu üyeleri ve alınan kararlar" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "uyeler", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "uyeler", "data-ocid": "committee.tab", children: "Üyeler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "kararlar", "data-ocid": "committee.tab", children: "Kararlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "belgeler", "data-ocid": "committee.tab", children: "Belgeler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "uyeler", className: "mt-4", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowMemberDialog(true),
            className: "bg-[#0B1B2E] text-white rounded-full gap-2",
            "data-ocid": "committee.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Üye Ekle"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#F3F6FB] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-[#0B1B2E]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: m.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                      "Daire: ",
                      m.apartment,
                      " · ",
                      m.phone
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${ROLE_COLORS[m.role]} border-0 text-xs`,
                      children: m.role
                    }
                  ),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => saveMembers(members.filter((x) => x.id !== m.id)),
                      className: "text-[#6B7A8D] hover:text-red-500 transition-colors",
                      "data-ocid": "committee.delete_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-[#F3F6FB] flex gap-4 text-xs text-[#6B7A8D]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Dönem Başı: ",
                  m.termStart
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Dönem Sonu: ",
                  m.termEnd
                ] })
              ] })
            ]
          },
          m.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "kararlar", className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Karar veya konu ara...",
                className: "pl-9 rounded-full border-[#E5EAF2]",
                "data-ocid": "committee.search_input"
              }
            )
          ] }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setShowDecisionDialog(true),
              className: "bg-[#0B1B2E] text-white rounded-full gap-2 flex-shrink-0",
              "data-ocid": "committee.secondary_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Karar Ekle"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredDecisions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12",
            "data-ocid": "committee.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-[#D7DEE9] mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] font-medium", children: "Karar bulunamadı" })
            ]
          }
        ) : filteredDecisions.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow",
            "data-ocid": `committee.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-[#0E1116]", children: d.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: d.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${d.status === "yürürlükte" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"} border-0`,
                    children: d.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mb-4", children: d.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-3 border-t border-[#F3F6FB]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-green-600", children: [
                    d.kabul,
                    " Kabul"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-red-600", children: [
                    d.ret,
                    " Ret"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleMinus, { className: "w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-gray-500", children: [
                    d.cekimser,
                    " Çekimser"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-[#6B7A8D]", children: [
                  "Toplam: ",
                  totalVotes(d),
                  " oy"
                ] })
              ] })
            ]
          },
          d.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "belgeler", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Kurul Belgeleri" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2 rounded-full",
              "data-ocid": "committee.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Belge Yükle"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          {
            name: "Yönetim Planı 2025.pdf",
            date: "2025-01-15",
            size: "2.4 MB"
          },
          {
            name: "Olağan Kurul Toplantı Tutanağı - Mart 2026.pdf",
            date: "2026-03-15",
            size: "850 KB"
          },
          {
            name: "Bütçe Raporu 2025.xlsx",
            date: "2026-01-05",
            size: "1.2 MB"
          },
          {
            name: "Denetim Raporu Q1 2026.pdf",
            date: "2026-04-01",
            size: "1.8 MB"
          }
        ].map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-[#4A90D9]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: doc.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                    doc.date,
                    " · ",
                    doc.size
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-[#4A90D9] text-xs",
                  children: "İndir"
                }
              )
            ]
          },
          doc.name
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showMemberDialog, onOpenChange: setShowMemberDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "committee.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Kurul Üyesi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Ad Soyad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: memberForm.name,
              onChange: (e) => setMemberForm((p) => ({ ...p, name: e.target.value })),
              placeholder: "Üye adı",
              "data-ocid": "committee.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Görev" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: memberForm.role,
              onChange: (e) => setMemberForm((p) => ({
                ...p,
                role: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "committee.select",
              children: ["Başkan", "Sekreter", "Üye", "Denetçi"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: r }, r))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Telefon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: memberForm.phone,
              onChange: (e) => setMemberForm((p) => ({ ...p, phone: e.target.value })),
              placeholder: "0532 xxx xx xx",
              "data-ocid": "committee.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: memberForm.apartment,
              onChange: (e) => setMemberForm((p) => ({ ...p, apartment: e.target.value })),
              placeholder: "A-15",
              "data-ocid": "committee.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Dönem Başı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: memberForm.termStart,
                onChange: (e) => setMemberForm((p) => ({ ...p, termStart: e.target.value })),
                "data-ocid": "committee.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Dönem Sonu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: memberForm.termEnd,
                onChange: (e) => setMemberForm((p) => ({ ...p, termEnd: e.target.value })),
                "data-ocid": "committee.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: addMember,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              "data-ocid": "committee.submit_button",
              children: "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowMemberDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "committee.cancel_button",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDecisionDialog, onOpenChange: setShowDecisionDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "committee.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Karar Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Konu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: decisionForm.subject,
              onChange: (e) => setDecisionForm((p) => ({ ...p, subject: e.target.value })),
              placeholder: "Karar konusu",
              "data-ocid": "committee.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Karar Metni" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: decisionForm.text,
              onChange: (e) => setDecisionForm((p) => ({ ...p, text: e.target.value })),
              placeholder: "Karar detayı...",
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none",
              "data-ocid": "committee.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-green-700 block mb-1", children: "Kabul" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: decisionForm.kabul,
                onChange: (e) => setDecisionForm((p) => ({ ...p, kabul: +e.target.value })),
                "data-ocid": "committee.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-red-600 block mb-1", children: "Ret" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: decisionForm.ret,
                onChange: (e) => setDecisionForm((p) => ({ ...p, ret: +e.target.value })),
                "data-ocid": "committee.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500 block mb-1", children: "Çekimser" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: decisionForm.cekimser,
                onChange: (e) => setDecisionForm((p) => ({
                  ...p,
                  cekimser: +e.target.value
                })),
                "data-ocid": "committee.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: addDecision,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              "data-ocid": "committee.submit_button",
              children: "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDecisionDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "committee.cancel_button",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CommitteeManagement as default
};
