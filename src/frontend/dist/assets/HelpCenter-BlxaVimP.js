import { r as reactExports, j as jsxRuntimeExports, a4 as CircleHelp, B as Button, P as Plus, S as Search, I as Input, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-CN7AkLBl.js";
import { T as Textarea } from "./textarea-RagzksC2.js";
import { T as Trash2 } from "./trash-2-Ckoukr5C.js";
import { T as ThumbsUp } from "./thumbs-up-KKWR5Tvh.js";
import { T as ThumbsDown } from "./thumbs-down-Ir8xVKg5.js";
const KEY = (id) => `sitecore_helpcenter_${id}`;
const CATEGORIES = ["Tümü", "Genel", "Aidat", "Teknik", "Güvenlik"];
const DEFAULT_FAQS = [
  {
    id: "faq1",
    question: "Bina yönetimiyle nasıl iletişime geçebilirim?",
    answer: "Yönetici ile SiteCore platformu üzerinden Bildirim/Mesaj Merkezi aracılığıyla iletişime geçebilirsiniz. Acil durumlar için Acil İletişim Rehberi modülündeki numaraları kullanabilirsiniz.",
    category: "Genel",
    updatedAt: "2026-03-01",
    helpful: 12,
    notHelpful: 1,
    ratedBy: []
  },
  {
    id: "faq2",
    question: "Misafirimi binaya nasıl davet edebilirim?",
    answer: "Ziyaretçi Ön İzni modülü üzerinden misafiriniz için ön izin oluşturup 6 haneli erişim kodu alabilirsiniz. Güvenlik görevlisi bu kodu doğrulayarak giriş izni verecektir.",
    category: "Genel",
    updatedAt: "2026-03-10",
    helpful: 18,
    notHelpful: 0,
    ratedBy: []
  },
  {
    id: "faq3",
    question: "Dairemin bilgilerini nasıl güncelleyebilirim?",
    answer: "Profil Ayarları sayfasından kişisel bilgilerinizi, Daire Yönetimi sayfasından ise daire detaylarınızı güncelleyebilirsiniz. Daire sahipliği değişiklikleri için yöneticiye başvurunuz.",
    category: "Genel",
    updatedAt: "2026-02-15",
    helpful: 7,
    notHelpful: 2,
    ratedBy: []
  },
  {
    id: "faq4",
    question: "Aidat ödememi nasıl yapabilirim?",
    answer: "Aidat ödemeleri bina yönetimi tarafından belirlenen banka hesabına EFT/havale yöntemiyle yapılabilir. IBAN bilgisi için yöneticinize danışın. Ödeme sonrası dekont yüklemek için Aidat Takibi modülünü kullanabilirsiniz.",
    category: "Aidat",
    updatedAt: "2026-03-15",
    helpful: 22,
    notHelpful: 1,
    ratedBy: []
  },
  {
    id: "faq5",
    question: "Aidatimin gecikip gecikmediğini nasıl öğrenebilirim?",
    answer: "Aidat Takibi modülünde daireye ait ödemelerin durumunu görüntüleyebilirsiniz. Geciken ödemeler kırmızı olarak işaretlenir ve size bildirim gönderilir.",
    category: "Aidat",
    updatedAt: "2026-02-20",
    helpful: 15,
    notHelpful: 0,
    ratedBy: []
  },
  {
    id: "faq6",
    question: "Aidat taksitlendirme talep edebilir miyim?",
    answer: "Evet, yöneticiye Taksit Planları modülü üzerinden başvurabilirsiniz. Yönetici uygun gördüğü takdirde 2-12 ay arası taksitlendirme planı oluşturabilir.",
    category: "Aidat",
    updatedAt: "2026-03-05",
    helpful: 9,
    notHelpful: 0,
    ratedBy: []
  },
  {
    id: "faq7",
    question: "Arıza bildirimi nasıl yapabilirim?",
    answer: "Arıza Bildirimi & Bakım Talebi modülünden yeni talep oluşturabilirsiniz. Arıza türünü, açıklamasını ve varsa fotoğrafını ekleyerek gönderin. Talebiniz yönetici tarafından incelenip teknisyene atanacaktır.",
    category: "Teknik",
    updatedAt: "2026-03-18",
    helpful: 19,
    notHelpful: 2,
    ratedBy: []
  },
  {
    id: "faq8",
    question: "Su/elektrik sayacımı nasıl bildiririm?",
    answer: "Sayaç Takibi modülüne giderek ilgili sayacı seçip endeks değerinizi girebilirsiniz. Toplu giriş özelliğiyle birden fazla sayacı aynı anda güncelleyebilirsiniz.",
    category: "Teknik",
    updatedAt: "2026-02-10",
    helpful: 11,
    notHelpful: 1,
    ratedBy: []
  },
  {
    id: "faq9",
    question: "Gece güvenlik numarası nedir?",
    answer: "Acil İletişim Rehberi modülünde güvenlik personelinin iletişim bilgilerini bulabilirsiniz. 7/24 hizmet veren güvenlik görevlisi sabitlenmiş olarak listelenmektedir.",
    category: "Güvenlik",
    updatedAt: "2026-01-25",
    helpful: 16,
    notHelpful: 0,
    ratedBy: []
  },
  {
    id: "faq10",
    question: "Misafir giriş loglarına nasıl ulaşabilirim?",
    answer: "Ziyaretçi Yönetimi modülünde tüm ziyaretçi giriş/çıkış kayıtlarını görebilirsiniz. Yöneticiler ek olarak günlük raporları da indirebilir.",
    category: "Güvenlik",
    updatedAt: "2026-02-05",
    helpful: 8,
    notHelpful: 1,
    ratedBy: []
  },
  {
    id: "faq11",
    question: "Ortak alanları nasıl rezerve edebilirim?",
    answer: "Ortak Alan Rezervasyonu modülünden uygun tarih ve saati seçerek rezervasyon oluşturabilirsiniz. Kapasite doluysa bekleme listesine eklenebilirsiniz.",
    category: "Genel",
    updatedAt: "2026-03-12",
    helpful: 13,
    notHelpful: 0,
    ratedBy: []
  },
  {
    id: "faq12",
    question: "Bina WiFi şifresini nereden öğrenebilirim?",
    answer: "Bina kurallarında belirtilen ortak alan Wi-Fi şifresi yönetici tarafından düzenli olarak güncellenmektedir. Güncel şifre için yöneticinize başvurun.",
    category: "Teknik",
    updatedAt: "2026-03-20",
    helpful: 10,
    notHelpful: 3,
    ratedBy: []
  }
];
function HelpCenter({ buildingId, userId, isOwner }) {
  const [faqs, setFaqs] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return DEFAULT_FAQS;
  });
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("Tümü");
  const [expanded, setExpanded] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    question: "",
    answer: "",
    category: "Genel"
  });
  const save = (list) => {
    setFaqs(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };
  const handleAdd = () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    save([
      ...faqs,
      {
        id: Date.now().toString(),
        ...form,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        helpful: 0,
        notHelpful: 0,
        ratedBy: []
      }
    ]);
    setShowForm(false);
    setForm({ question: "", answer: "", category: "Genel" });
  };
  const handleRate = (faqId, isHelpful) => {
    var _a;
    if ((_a = faqs.find((f) => f.id === faqId)) == null ? void 0 : _a.ratedBy.includes(userId)) return;
    save(
      faqs.map(
        (f) => f.id !== faqId ? f : {
          ...f,
          helpful: isHelpful ? f.helpful + 1 : f.helpful,
          notHelpful: !isHelpful ? f.notHelpful + 1 : f.notHelpful,
          ratedBy: [...f.ratedBy, userId]
        }
      )
    );
  };
  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "Tümü" || f.category === activeCategory;
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const suggested = expanded ? faqs.filter(
    (f) => {
      var _a;
      return f.id !== expanded && f.category === ((_a = faqs.find((x) => x.id === expanded)) == null ? void 0 : _a.category);
    }
  ).slice(0, 3) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-6 h-6 text-[#0B1B2E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "SSS & Yardım Merkezi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          "data-ocid": "helpcenter.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Soru Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Soru ara...",
          className: "pl-9",
          "data-ocid": "helpcenter.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveCategory(cat),
        className: `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[#0B1B2E] text-white" : "bg-white border border-[#E5EAF2] text-[#3A4654] hover:border-[#0B1B2E]"}`,
        "data-ocid": "helpcenter.tab",
        children: [
          cat,
          cat !== "Tümü" && ` (${faqs.filter((f) => f.category === cat).length})`
        ]
      },
      cat
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      filtered.map((faq) => {
        const isRated = faq.ratedBy.includes(userId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setExpanded(expanded === faq.id ? null : faq.id),
                  className: "w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-[#EEF3FA] text-[#4A90D9] font-medium flex-shrink-0", children: faq.category }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0E1116]", children: faq.question })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.stopPropagation();
                            save(faqs.filter((f) => f.id !== faq.id));
                          },
                          className: "p-1 rounded text-[#6B7A8D] hover:text-red-500",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-[#6B7A8D] transition-transform ${expanded === faq.id ? "rotate-180" : ""}`,
                          children: "▼"
                        }
                      )
                    ] })
                  ]
                }
              ),
              expanded === faq.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-0 border-t border-[#F3F6FB]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] leading-relaxed pt-3", children: faq.answer }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 pt-3 border-t border-[#F3F6FB]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                    "Son güncelleme: ",
                    faq.updatedAt
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Faydalı mı?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleRate(faq.id, true),
                        disabled: isRated,
                        className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${isRated ? "bg-green-50 text-green-600 cursor-default" : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-green-50 hover:text-green-600"}`,
                        "data-ocid": "helpcenter.toggle",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                          " ",
                          faq.helpful
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleRate(faq.id, false),
                        disabled: isRated,
                        className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${isRated ? "bg-red-50 text-red-500 cursor-default" : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-red-50 hover:text-red-500"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
                          " ",
                          faq.notHelpful
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            ]
          },
          faq.id
        );
      }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-center py-10", children: "Aramanizla eşleşen soru bulunamadı." })
    ] }),
    suggested.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#0E1116] mb-3", children: "Önerilen Sorular" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: suggested.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setExpanded(faq.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          className: "w-full text-left text-sm text-[#4A90D9] hover:text-[#2A70B9] py-1 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6B7A8D]", children: "▸" }),
            " ",
            faq.question
          ]
        },
        faq.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "helpcenter.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Soru & Cevap Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.category,
              onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "helpcenter.select",
              children: CATEGORIES.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Soru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.question,
              onChange: (e) => setForm((f) => ({ ...f, question: e.target.value })),
              placeholder: "Sıkça sorulan soruyu yazın",
              "data-ocid": "helpcenter.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Cevap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.answer,
              onChange: (e) => setForm((f) => ({ ...f, answer: e.target.value })),
              rows: 4,
              placeholder: "Detaylı cevabı yazın...",
              "data-ocid": "helpcenter.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !form.question.trim() || !form.answer.trim(),
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            "data-ocid": "helpcenter.confirm_button",
            children: "Ekle"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  HelpCenter as default
};
