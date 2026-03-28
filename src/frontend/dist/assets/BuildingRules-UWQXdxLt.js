import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, S as Search, I as Input, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, o as DialogFooter } from "./index-5GfTJQeF.js";
import { C as Card, a as CardContent } from "./card-D0EPcGRN.js";
import { L as Label } from "./label-DORX8B_y.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B_Z8p0V5.js";
import { S as Switch } from "./switch-CNO3_08V.js";
import { T as Textarea } from "./textarea-DKgbe6MC.js";
import { P as Pen } from "./pen-R-4RaXgb.js";
import { T as Trash2 } from "./trash-2-Bx-JrzAk.js";
import "./index-CL2ltrGM.js";
const CATS = [
  "Hepsi",
  "Gürültü",
  "Evcil Hayvan",
  "Otopark",
  "Temizlik",
  "Genel"
];
const catColors = {
  Gürültü: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "Evcil Hayvan": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Otopark: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Temizlik: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  Genel: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
};
const initialRules = [
  {
    id: "1",
    num: 1,
    title: "Gece Sessizlik Saatleri",
    desc: "22:00 - 08:00 saatleri arasında müzik aleti çalmak, yüksek sesle konuşmak ve gürültülü aktiviteler yasaktır.",
    category: "Gürültü",
    active: true
  },
  {
    id: "2",
    num: 2,
    title: "Evcil Hayvan Tasması",
    desc: "Köpekler ortak alanlarda daima tasmalı ve gözetim altında bulundurulmalıdır. Dışkı temizlenmesi zorunludur.",
    category: "Evcil Hayvan",
    active: true
  },
  {
    id: "3",
    num: 3,
    title: "Otopark Kullanım Kuralları",
    desc: "Her daire yalnızca kendine tahsis edilen park alanını kullanabilir. Misafir araçları için yöneticiden izin alınmalıdır.",
    category: "Otopark",
    active: true
  },
  {
    id: "4",
    num: 4,
    title: "Ortak Alan Temizliği",
    desc: "Merdiven, asansör ve giriş holüne çöp ve eşya bırakmak yasaktır. Bina saatleri dışında çöp atılmamalıdır.",
    category: "Temizlik",
    active: true
  },
  {
    id: "5",
    num: 5,
    title: "Yangın Merdivenlerini Açık Tutma",
    desc: "Yangın merdivenleri ve acil çıkış yollarına eşya bırakılması kesinlikle yasaktır.",
    category: "Genel",
    active: true
  },
  {
    id: "6",
    num: 6,
    title: "Tadilat Saatleri",
    desc: "Daire tadilatları yalnızca hafta içi 09:00-18:00 saatleri arasında yapılabilir. Hafta sonu ve resmi tatillerde yasaktır.",
    category: "Gürültü",
    active: true
  },
  {
    id: "7",
    num: 7,
    title: "Çamaşır Serme",
    desc: "Balkon dışından görünecek şekilde pencere veya çatıya çamaşır sermek yasaktır.",
    category: "Genel",
    active: false
  },
  {
    id: "8",
    num: 8,
    title: "Ziyaretçi Araç Parkı",
    desc: "Ziyaretçi araçları en fazla 24 saat park edebilir. Uzun süreli park için yönetici onayı gereklidir.",
    category: "Otopark",
    active: true
  },
  {
    id: "9",
    num: 9,
    title: "Asansör Kullanımı",
    desc: "Asansör içinde sigara içmek, hasar vermek ve çocukları yalnız bırakmak yasaktır. Kargo taşımacılığı için servis asansörü kullanılmalıdır.",
    category: "Genel",
    active: true
  },
  {
    id: "10",
    num: 10,
    title: "Koku Yönetimi",
    desc: "Güçlü koku yayan yemek veya aktiviteler için havalandırmaya dikkat edilmeli, komşuları rahatsız edecek durumlardan kaçınılmalıdır.",
    category: "Genel",
    active: false
  }
];
function BuildingRules(_props) {
  const [rules, setRules] = reactExports.useState(initialRules);
  const [search, setSearch] = reactExports.useState("");
  const [catFilter, setCatFilter] = reactExports.useState("Hepsi");
  const [statusFilter, setStatusFilter] = reactExports.useState("Hepsi");
  const [open, setOpen] = reactExports.useState(false);
  const [editRule, setEditRule] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({ title: "", desc: "", category: "" });
  const toggleActive = (id) => {
    setRules(
      (prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r)
    );
  };
  const deleteRule = (id) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };
  const openAdd = () => {
    setEditRule(null);
    setForm({ title: "", desc: "", category: "" });
    setOpen(true);
  };
  const openEdit = (rule) => {
    setEditRule(rule);
    setForm({ title: rule.title, desc: rule.desc, category: rule.category });
    setOpen(true);
  };
  const save = () => {
    if (!form.title || !form.category) return;
    if (editRule) {
      setRules(
        (prev) => prev.map((r) => r.id === editRule.id ? { ...r, ...form } : r)
      );
    } else {
      const maxNum = Math.max(...rules.map((r) => r.num), 0);
      setRules((prev) => [
        ...prev,
        { id: Date.now().toString(), num: maxNum + 1, ...form, active: true }
      ]);
    }
    setOpen(false);
  };
  const filtered = rules.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Hepsi" || r.category === catFilter;
    const matchStatus = statusFilter === "Hepsi" || (statusFilter === "Aktif" ? r.active : !r.active);
    return matchSearch && matchCat && matchStatus;
  });
  const activeCount = rules.filter((r) => r.active).length;
  const inactiveCount = rules.length - activeCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Bina Kuralları & Yönetmelik" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Apartman kuralları ve sakin yükümlülükleri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "rules.open_modal_button",
          className: "gap-2",
          onClick: openAdd,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Kural Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Toplam Kural" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: rules.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Aktif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: activeCount })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Pasif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-muted-foreground", children: inactiveCount })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "rules.search_input",
            className: "pl-9",
            placeholder: "Kural ara...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: catFilter, onValueChange: setCatFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "rules.cat_filter.select", className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "rules.status_filter.select",
            className: "w-36",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Hepsi", children: "Hepsi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Aktif", children: "Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pasif", children: "Pasif" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "rules.empty_state",
          className: "text-center py-16 text-muted-foreground",
          children: "Kural bulunamadı."
        }
      ),
      filtered.map((rule, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `rules.item.${idx + 1}`,
          className: !rule.active ? "opacity-60" : "",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold", children: rule.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: rule.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${catColors[rule.category] || catColors.Genel}`,
                    children: rule.category
                  }
                ),
                !rule.active && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Pasif" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: rule.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: rule.active,
                  onCheckedChange: () => toggleActive(rule.id),
                  "data-ocid": `rules.switch.${idx + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => openEdit(rule),
                  "data-ocid": `rules.edit_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-destructive",
                  onClick: () => deleteRule(rule.id),
                  "data-ocid": `rules.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }) })
        },
        rule.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editRule ? "Kuralı Düzenle" : "Yeni Kural Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kural Başlığı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "rules.title.input",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Örn: Gece Sessizlik Saatleri"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "rules.desc.textarea",
              value: form.desc,
              onChange: (e) => setForm((f) => ({ ...f, desc: e.target.value })),
              placeholder: "Kural detayı...",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "rules.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kategori seçin" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATS.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "rules.submit_button", onClick: save, children: editRule ? "Güncelle" : "Ekle" })
      ] })
    ] }) })
  ] });
}
export {
  BuildingRules as default
};
