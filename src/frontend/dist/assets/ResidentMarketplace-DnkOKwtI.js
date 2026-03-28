import { r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, S as Search, I as Input, B as Button, A as Heart } from "./index-DrmT2NwI.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Bc19n7vK.js";
import { L as Label } from "./label-AI95LEA1.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-FVX1qZdR.js";
import { T as Textarea } from "./textarea-BURed9T_.js";
import { S as ShoppingBag } from "./shopping-bag-DIHjnJsa.js";
import { S as Star } from "./star-CBS86Ck3.js";
import { M as MessageCircle } from "./message-circle-DJ3MJDQj.js";
import "./index-OxX3-zPw.js";
const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: "İkea Yemek Masası (6 Kişilik)",
    category: "Takas",
    description: "2 yıllık, çok az kullanılmış meşe rengi yemek masası. Sandalyeler dahil. Küçük bir kanepe ile takas yaparım.",
    poster: "Daire 5",
    date: "25 Mar 2026",
    condition: "İyi"
  },
  {
    id: 2,
    title: "Beko Bulaşık Makinesi",
    category: "Satılık",
    description: "A++ enerji sınıfı, 5 yaşında, tam çalışır durumda. Yeni makine aldığımız için satıyoruz.",
    poster: "Daire 12",
    date: "24 Mar 2026",
    condition: "İyi",
    price: "3.500 ₺"
  },
  {
    id: 3,
    title: "Haftalık Ev Temizliği",
    category: "Hizmet",
    description: "Deneyimli ev hanımıyım, haftada 1 gün temizlik yapabilirim. Referanslarım mevcut. Uygun fiyat.",
    poster: "Daire 8",
    date: "23 Mar 2026",
    condition: null,
    price: "800 ₺/gün"
  },
  {
    id: 4,
    title: "Çocuk Bisikleti (5-8 Yaş)",
    category: "Takas",
    description: "Kırmızı, 20 jant çocuk bisikleti. Çocuğum büyüdü, scooter veya kaykay ile takas ederim.",
    poster: "Daire 3",
    date: "22 Mar 2026",
    condition: "İyi"
  },
  {
    id: 5,
    title: "Bahçe & Balkon Bakımı",
    category: "Hizmet",
    description: "Balkon bahçeciliği konusunda yardım edebilirim. Bitki budama, toprak değişimi, sulama sistemi kurulumu.",
    poster: "Daire 17",
    date: "21 Mar 2026",
    condition: null,
    price: "Pazarlıklı"
  },
  {
    id: 6,
    title: 'Samsung 55" 4K Televizyon',
    category: "Satılık",
    description: "3 yıllık, smart TV, Netflix/YouTube desteği. Kutusunda saklanan orijinal uzaktan kumandası var.",
    poster: "Daire 21",
    date: "20 Mar 2026",
    condition: "İyi",
    price: "8.000 ₺"
  },
  {
    id: 7,
    title: "Elektrikli Scooter (Xiaomi)",
    category: "Kiralık",
    description: "Xiaomi Mi Scooter Pro 2, haftalık kiralık. Şehir içi ulaşım için ideal. Kask dahil.",
    poster: "Daire 9",
    date: "19 Mar 2026",
    condition: "İyi",
    price: "500 ₺/hafta"
  },
  {
    id: 8,
    title: "Kitap Koleksiyonu (50+ Kitap)",
    category: "Takas",
    description: "Türk ve dünya edebiyatından oluşan karma koleksiyon. Yemek kitabı veya çizgi roman ile takas.",
    poster: "Daire 14",
    date: "18 Mar 2026",
    condition: "İyi"
  }
];
const SAVED_LISTINGS = SAMPLE_LISTINGS.filter((l) => [2, 5, 7].includes(l.id));
const CATEGORY_COLORS = {
  Takas: "bg-blue-100 text-blue-700 border-blue-200",
  Satılık: "bg-green-100 text-green-700 border-green-200",
  Kiralık: "bg-purple-100 text-purple-700 border-purple-200",
  Hizmet: "bg-orange-100 text-orange-700 border-orange-200"
};
function ListingCard({
  listing,
  showFavorite = true
}) {
  const [fav, setFav] = reactExports.useState(listing.favorited ?? false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-gray-100 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[listing.category]}`,
          children: listing.category
        }
      ),
      showFavorite && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFav((v) => !v),
          className: "text-gray-400 hover:text-red-500 transition-colors mt-0.5",
          "data-ocid": `marketplace.toggle.${listing.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              className: `w-4 h-4 ${fav ? "fill-red-500 text-red-500" : ""}`
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-800 text-sm mb-1", children: listing.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-3 line-clamp-2", children: listing.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-400 space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          listing.poster,
          " · ",
          listing.date
        ] }),
        listing.condition && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Durum:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: listing.condition })
        ] }),
        listing.price && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-green-700", children: listing.price })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "text-xs h-7",
          "data-ocid": `marketplace.secondary_button.${listing.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3 mr-1" }),
            "İletişim"
          ]
        }
      )
    ] })
  ] }) });
}
function ResidentMarketplace({
  buildingId: _buildingId,
  t: _t
}) {
  const [filter, setFilter] = reactExports.useState("Tümü");
  const [search, setSearch] = reactExports.useState("");
  const [formData, setFormData] = reactExports.useState({
    title: "",
    category: "",
    description: "",
    condition: "",
    contact: "",
    price: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const CATEGORIES = ["Tümü", "Takas", "Satılık", "Kiralık", "Hizmet"];
  const filtered = SAMPLE_LISTINGS.filter((l) => {
    const matchCat = filter === "Tümü" || l.category === filter;
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        category: "",
        description: "",
        condition: "",
        contact: "",
        price: ""
      });
    }, 3e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "marketplace.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-indigo-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Komşu Takas & İlan Panosu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Komşularınızla alışveriş yapın, hizmet alın veya ilan verin" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-indigo-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-indigo-700", children: SAMPLE_LISTINGS.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-indigo-600", children: "Aktif İlan" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-700", children: "3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-green-600", children: "Bu Hafta Eklenen" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 bg-orange-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-700", children: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-orange-600", children: "Tamamlanan Takas" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "listings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-3 w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "listings", "data-ocid": "marketplace.tab", children: "İlanlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "post", "data-ocid": "marketplace.tab", children: "İlan Ver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "favorites", "data-ocid": "marketplace.tab", children: "Favoriler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "listings", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "İlan ara...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "marketplace.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(cat),
              "data-ocid": "marketplace.toggle",
              className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === cat ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"}`,
              children: cat
            },
            cat
          )) })
        ] }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12 text-gray-400",
            "data-ocid": "marketplace.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu kategoride ilan bulunamadı." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `marketplace.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing }) }, listing.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "post", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Yeni İlan Oluştur" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-8",
            "data-ocid": "marketplace.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-green-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-700 font-medium", children: "İlanınız başarıyla yayınlandı!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Komşularınız ilanınızı görebilecek." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Başlık" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "title",
                placeholder: "Ör: Çocuk bisikleti, temizlik hizmeti...",
                value: formData.title,
                onChange: (e) => setFormData((p) => ({ ...p, title: e.target.value })),
                required: true,
                "data-ocid": "marketplace.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kategori" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.category,
                  onValueChange: (v) => setFormData((p) => ({ ...p, category: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seçin..." }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Takas", children: "Takas" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Satılık", children: "Satılık" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Kiralık", children: "Kiralık" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Hizmet", children: "Hizmet" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Durum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.condition,
                  onValueChange: (v) => setFormData((p) => ({ ...p, condition: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seçin..." }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Yeni", children: "Yeni" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "İyi", children: "İyi" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Orta", children: "Orta" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Hizmet", children: "Hizmet (geçerli değil)" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Açıklama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                placeholder: "Ürün veya hizmet hakkında detaylı bilgi verin...",
                value: formData.description,
                onChange: (e) => setFormData((p) => ({
                  ...p,
                  description: e.target.value
                })),
                required: true,
                rows: 3,
                "data-ocid": "marketplace.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", children: "Fiyat (opsiyonel)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "price",
                  placeholder: "Ör: 500 ₺ veya Pazarlıklı",
                  value: formData.price,
                  onChange: (e) => setFormData((p) => ({ ...p, price: e.target.value })),
                  "data-ocid": "marketplace.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "İletişim Tercihi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.contact,
                  onValueChange: (v) => setFormData((p) => ({ ...p, contact: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seçin..." }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Mesaj", children: "Mesaj" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Telefon", children: "Telefon" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full bg-indigo-600 hover:bg-indigo-700",
              "data-ocid": "marketplace.submit_button",
              children: "İlan Yayınla"
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "favorites", className: "mt-4 space-y-4", children: SAVED_LISTINGS.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 text-gray-400",
          "data-ocid": "marketplace.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz favori ilanınız yok." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: SAVED_LISTINGS.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `marketplace.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing: { ...listing, favorited: true } }) }, listing.id)) }) })
    ] })
  ] });
}
export {
  ResidentMarketplace as default
};
