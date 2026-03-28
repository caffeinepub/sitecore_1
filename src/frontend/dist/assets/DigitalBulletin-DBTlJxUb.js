import { r as reactExports, j as jsxRuntimeExports, N as Newspaper, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, m as Calendar, y as BookOpen, z as Megaphone, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-DrmT2NwI.js";
import { T as Textarea } from "./textarea-BURed9T_.js";
import { P as Pin } from "./pin-D9EhiEU7.js";
import { C as Clock } from "./clock-npxEKmqV.js";
import { T as Tag } from "./tag-BoU0BLIE.js";
import { P as Pen } from "./pen-Dzo00hcg.js";
import { A as Archive } from "./archive-39bchf7C.js";
import { D as Download } from "./download-BvPJ0HBR.js";
const SAMPLE_NEWS = [
  {
    id: "n1",
    title: "Asansör Modernizasyonu Başladı!",
    summary: "No. 1 asansörümüz 3 Mart itibarıyla yenileme çalışmaları kapsamında hizmet dışı olacaktır. Çalışmaların 6 hafta sürmesi öngörülmektedir.",
    content: "Değerli sakinlerimiz, apartmanımızın yaşam kalitesini artırmak amacıyla başlatılan asansör modernizasyon projesi kapsamında No. 1 asansör 3 Mart – 14 Nisan tarihleri arasında hizmet dışı kalacaktır. Bu süreçte lütfen No. 2 asansörü kullanınız.",
    category: "Bakım",
    date: "2026-03-01",
    readTime: 2,
    pinned: true,
    author: "Yönetim"
  },
  {
    id: "n2",
    title: "Bahar Barbeku Etkinliği – 15 Nisan",
    summary: "Her yıl geleneksel hale gelen bahar barbekümüz bu yıl da düzenleniyor. Tüm sakinler davetlidir!",
    content: "Sakin komitemizin organizasyonuyla gerçekleşecek Bahar Barbeku Etkinliği, 15 Nisan Salı günü saat 18:00'de bina bahçesinde yapılacaktır.",
    category: "Etkinlik",
    date: "2026-03-10",
    readTime: 1,
    pinned: false,
    author: "Sakin Komitesi"
  },
  {
    id: "n3",
    title: "Mart Ayı Olağan Genel Kurul Kararları",
    summary: "20 Mart tarihinde yapılan genel kurulda alınan kararların özeti aşağıda paylaşılmaktadır.",
    content: "Toplantıda; 2026 bütçe revizyonu, asansör yenileme projesi, otopark kapasite artışı ve bina güvenlik sistemi yenilenmesi konularında kararlar alınmıştır.",
    category: "Gündem",
    date: "2026-03-21",
    readTime: 3,
    pinned: false,
    author: "Yönetim"
  },
  {
    id: "n4",
    title: "Su Sayaçları Güncelleniyor",
    summary: "Nisan ayı içinde tüm dairelerin su sayaçları akıllı sayaç sistemiyle değiştirilecek.",
    content: "Belediye ile yapılan anlaşma kapsamında dairenizdeki eski su sayacı, uzaktan okuma özellikli akıllı sayaçlarla değiştirilecektir.",
    category: "Duyuru",
    date: "2026-03-15",
    readTime: 2,
    pinned: false,
    author: "Yönetim"
  },
  {
    id: "n5",
    title: "Komşu Tavsiyesi: Zeynep Hanım'ın Ev Yapımı Reçelleri",
    summary: "Daire 303'ten Zeynep Hanım, özel yapımı çilek ve kayısı reçellerini komşularla paylaşmak istiyor.",
    content: "Zeynep Hanım ile 303 numaralı dairenin kapısından ya da komşu forumu üzerinden iletişime geçebilirsiniz. Fiyatlar cüzi tutulmuştur.",
    category: "Komşu",
    date: "2026-03-18",
    readTime: 1,
    pinned: false,
    author: "Daire 303"
  },
  {
    id: "n6",
    title: "Güneş Paneli Fizibilite Anketi Sonuçları",
    summary: "Geçen ay düzenlenen güneş paneli fizibilite anketine katılanların %78'i projeyi destekledi.",
    content: "45 katılımcının %78'i güneş paneli kurulumunu desteklerken, %15'i daha fazla bilgi talep etti. Yönetim kurulu bu doğrultuda ihale sürecini başlatma kararı aldı.",
    category: "Gündem",
    date: "2026-03-05",
    readTime: 2,
    pinned: false,
    author: "Yönetim"
  }
];
const SAMPLE_ARCHIVES = [
  {
    id: "a1",
    title: "Şubat 2026 Bülteni",
    period: "Şubat 2026",
    date: "2026-02-28"
  },
  {
    id: "a2",
    title: "Ocak 2026 Bülteni",
    period: "Ocak 2026",
    date: "2026-01-31"
  },
  {
    id: "a3",
    title: "Aralık 2025 Bülteni",
    period: "Aralık 2025",
    date: "2025-12-31"
  }
];
const CATEGORIES = [
  "Tümü",
  "Duyuru",
  "Etkinlik",
  "Bakım",
  "Gündem",
  "Komşu"
];
const CATEGORY_COLORS = {
  Duyuru: "bg-blue-100 text-blue-700",
  Etkinlik: "bg-purple-100 text-purple-700",
  Bakım: "bg-orange-100 text-orange-700",
  Gündem: "bg-gray-100 text-gray-700",
  Komşu: "bg-green-100 text-green-700"
};
const EMPTY_FORM = {
  title: "",
  summary: "",
  content: "",
  category: "Duyuru",
  readTime: 2
};
function DigitalBulletin({ buildingId, isOwner }) {
  const storageKey = `sitecore_bulletin_${buildingId}`;
  const archiveKey = `sitecore_bulletin_archive_${buildingId}`;
  const [news, setNews] = reactExports.useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_NEWS;
  });
  const [archives, _setArchives] = reactExports.useState(() => {
    const raw = localStorage.getItem(archiveKey);
    return raw ? JSON.parse(raw) : SAMPLE_ARCHIVES;
  });
  const [filterCat, setFilterCat] = reactExports.useState("Tümü");
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [detailItem, setDetailItem] = reactExports.useState(null);
  const saveNews = (updated) => {
    setNews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };
  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newItem = {
      ...form,
      id: crypto.randomUUID(),
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      pinned: false,
      author: "Yönetim"
    };
    saveNews([newItem, ...news]);
    setShowCreateModal(false);
    setForm(EMPTY_FORM);
  };
  const pinnedItem = news.find((n) => n.pinned);
  const filteredNews = news.filter((n) => {
    if (n.pinned) return false;
    if (filterCat !== "Tümü" && n.category !== filterCat) return false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-[#0E1116] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-5 h-5 text-[#4A90D9]" }),
          "Bina Bülteni"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mt-0.5", children: [
          "Mart 2026 Sayısı • ",
          news.length,
          " haber"
        ] })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "bulletin.primary_button",
          onClick: () => {
            setForm(EMPTY_FORM);
            setShowCreateModal(true);
          },
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Bülten"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "feed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "feed", "data-ocid": "bulletin.tab", children: "Haber Akışı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "archive", "data-ocid": "bulletin.tab", children: "Arşiv" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "feed", children: [
        pinnedItem && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left bg-gradient-to-br from-[#0B1B2E] to-[#1A3A5C] rounded-2xl p-6 text-white mb-5 cursor-pointer hover:opacity-95 transition-opacity",
            onClick: () => setDetailItem(pinnedItem),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs", children: "Öne Çıkan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${CATEGORY_COLORS[pinnedItem.category]} text-xs`,
                    children: pinnedItem.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: pinnedItem.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm leading-relaxed", children: pinnedItem.summary }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-4 text-white/60 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  " ",
                  pinnedItem.date
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  " ",
                  pinnedItem.readTime,
                  " dk okuma"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                  " ",
                  pinnedItem.author
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: filterCat === cat ? "default" : "outline",
            onClick: () => setFilterCat(cat),
            className: filterCat === cat ? "bg-[#4A90D9] text-white rounded-full" : "rounded-full",
            "data-ocid": "bulletin.tab",
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: filteredNews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "bulletin.empty_state",
            className: "bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]",
            children: "Bu kategoride haber bulunamadı."
          }
        ) : filteredNews.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `bulletin.item.${idx + 1}`,
            className: "w-full text-left bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow",
            onClick: () => setDetailItem(item),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `${CATEGORY_COLORS[item.category] || ""} border-0 text-xs`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5 mr-1" }),
                        item.category
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: item.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#9CA8B4]", children: [
                    "• ",
                    item.readTime,
                    " dk"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-[#0E1116] text-sm", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1 line-clamp-2", children: item.summary })
              ] }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 w-7 p-0 text-[#4A90D9]",
                  onClick: (e) => {
                    e.stopPropagation();
                    setForm({
                      title: item.title,
                      summary: item.summary,
                      content: item.content,
                      category: item.category,
                      readTime: item.readTime
                    });
                    setShowCreateModal(true);
                  },
                  "data-ocid": `bulletin.edit_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" })
                }
              )
            ] })
          },
          item.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "archive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#F3F6FB] px-4 py-3 border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-4 h-4" }),
          " Bülten Arşivi"
        ] }) }),
        archives.map((arch, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `bulletin.item.${idx + 1}`,
            className: "flex items-center justify-between px-4 py-3 border-b border-[#F0F3F8] last:border-0 hover:bg-[#F9FAFB]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-[#EEF3FA] rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4 text-[#4A90D9]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-[#0E1116]", children: arch.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                    arch.period,
                    " • ",
                    arch.date
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-xs gap-1",
                  "data-ocid": `bulletin.secondary_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                    " İndir"
                  ]
                }
              )
            ]
          },
          arch.id
        ))
      ] }) })
    ] }),
    detailItem && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!detailItem, onOpenChange: () => setDetailItem(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "bulletin.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: detailItem.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `${CATEGORY_COLORS[detailItem.category] || ""} border-0 text-xs`,
              children: detailItem.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D] flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            " ",
            detailItem.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D] flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            " ",
            detailItem.readTime,
            " dk okuma"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D] flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
            " ",
            detailItem.author
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] leading-relaxed", children: detailItem.content })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateModal, onOpenChange: setShowCreateModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Haber / Bülten Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Başlık *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "bulletin.input",
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "Haber başlığı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.category,
              onChange: (e) => setForm((p) => ({
                ...p,
                category: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "bulletin.select",
              children: ["Duyuru", "Etkinlik", "Bakım", "Gündem", "Komşu"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Özet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.summary,
              onChange: (e) => setForm((p) => ({ ...p, summary: e.target.value })),
              rows: 2,
              placeholder: "Kısa özet (liste görünümünde gösterilir)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "İçerik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.content,
              onChange: (e) => setForm((p) => ({ ...p, content: e.target.value })),
              rows: 4,
              placeholder: "Haber detayı..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Okuma Süresi (dk)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              max: 30,
              value: form.readTime,
              onChange: (e) => setForm((p) => ({ ...p, readTime: Number(e.target.value) }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "bulletin.submit_button",
            onClick: handleCreate,
            disabled: !form.title.trim(),
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: "Yayınla"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DigitalBulletin as default
};
