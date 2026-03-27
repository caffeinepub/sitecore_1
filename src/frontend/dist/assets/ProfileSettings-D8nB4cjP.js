import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, t as User, B as Button, I as Input, Z as Check, at as Globe, q as Bell, p as Building2, au as Copy } from "./index-xOs1ph1v.js";
import { u as ue } from "./index-CdvnNSGq.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-jOvUj7j4.js";
import { L as Label } from "./label-CBz9bC4q.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BjLkhQEU.js";
import { S as Switch } from "./switch-CcA9IWhC.js";
import { L as Lock } from "./lock-C9pzjgxE.js";
import { E as Eye } from "./eye-BIJ26OL4.js";
import "./index-l2CT6Vma.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
const LANGUAGES = [
  { value: "tr", label: "🇹🇷 Türkçe" },
  { value: "en", label: "🇬🇧 English" },
  { value: "de", label: "🇩🇪 Deutsch" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "ar", label: "🇸🇦 العربية" },
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "ja", label: "🇯🇵 日本語" },
  { value: "pt", label: "🇵🇹 Português" }
];
const BUILDINGS = [
  {
    id: "1",
    name: "Yeşilvadi Sitesi",
    role: "Yönetici",
    joined: "2022-03-15",
    roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
  },
  {
    id: "2",
    name: "Gül Apartmanı",
    role: "Sakin",
    joined: "2020-09-01",
    roleColor: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
  },
  {
    id: "3",
    name: "Merkez Plaza",
    role: "Destek Personeli",
    joined: "2024-01-10",
    roleColor: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
  }
];
const ENTRY_CODE = "AX7K-2M9P-4RQT-8VWZ";
function ProfileSettings(_props) {
  const [name, setName] = reactExports.useState("Ahmet Yılmaz");
  const [phone, setPhone] = reactExports.useState("0532 111 22 33");
  const [language, setLanguage] = reactExports.useState("tr");
  const [showCode, setShowCode] = reactExports.useState(false);
  const [codeCopied, setCodeCopied] = reactExports.useState(false);
  const [editInfo, setEditInfo] = reactExports.useState(false);
  const [notifs, setNotifs] = reactExports.useState({
    dues: true,
    maintenance: true,
    announcements: true,
    visitor: false,
    meeting: true
  });
  const toggleNotif = (key) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const copyCode = () => {
    navigator.clipboard.writeText(ENTRY_CODE.replace(/-/g, "")).then(() => {
      setCodeCopied(true);
      ue.success("Giriş kodu kopyalandı!");
      setTimeout(() => setCodeCopied(false), 2e3);
    });
  };
  const saveInfo = () => {
    setEditInfo(false);
    ue.success("Bilgiler güncellendi");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Profil Ayarları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Kişisel bilgiler, tercihler ve bina üyelikleri" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }),
          " Kullanıcı Bilgileri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setEditInfo(!editInfo),
            "data-ocid": "profile.edit_button",
            children: editInfo ? "İptal" : "Düzenle"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ad Soyad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "profile.name.input",
                value: name,
                onChange: (e) => setName(e.target.value),
                disabled: !editInfo
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "profile.phone.input",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                disabled: !editInfo
              }
            )
          ] })
        ] }),
        editInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "profile.save_button",
            className: "gap-2",
            onClick: saveInfo,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              " Kaydet"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }),
        " Dil Tercihi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Arayüz Dili" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: language, onValueChange: setLanguage, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.language.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l.value, children: l.label }, l.value)) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
        " Bildirim Tercihleri"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [
        {
          key: "dues",
          label: "Aidat Hatırlatmaları",
          desc: "Ödeme tarihi yaklaşınca bildirim al"
        },
        {
          key: "maintenance",
          label: "Bakım Bildirimleri",
          desc: "Bakım ve arıza güncellemeleri"
        },
        {
          key: "announcements",
          label: "Duyurular",
          desc: "Yönetici duyuruları"
        },
        {
          key: "visitor",
          label: "Ziyaretçi Bildirimleri",
          desc: "Ziyaretçi girişlerinde bildir"
        },
        {
          key: "meeting",
          label: "Toplantı Davetleri",
          desc: "Etkinlik ve toplantı davetleri"
        }
      ].map(({ key, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            "data-ocid": `profile.${key}.switch`,
            checked: notifs[key],
            onCheckedChange: () => toggleNotif(key)
          }
        )
      ] }, key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }),
        " Bağlı Binalar"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: BUILDINGS.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `profile.item.${i + 1}`,
          className: "flex items-center justify-between rounded-lg border p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: b.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Üyelik: ",
                b.joined
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-medium px-2 py-1 rounded-full ${b.roleColor}`,
                children: b.role
              }
            )
          ]
        },
        b.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
        " Giriş Kodu"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "16 haneli giriş kodunuz. Kimseyle paylaşmayın." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 font-mono text-lg tracking-widest bg-muted rounded-lg px-4 py-3 select-all", children: showCode ? ENTRY_CODE : "●●●● ●●●● ●●●● ●●●●" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => setShowCode(!showCode),
              "data-ocid": "profile.show_code.button",
              children: showCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: copyCode,
              "data-ocid": "profile.copy_code.button",
              children: codeCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
        " Güvenlik Bilgileri"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Son Giriş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-1", children: "20 Mar 2025, 09:14" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "İstanbul, TR · Chrome / Windows" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aktif Oturum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-1", children: "2 cihaz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Web · Mobil" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ProfileSettings as default
};
