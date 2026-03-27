import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, p as Building2, I as Input, q as Bell, B as Button } from "./index-DWivtUfb.js";
import { u as ue } from "./index-CPnApMEd.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DSsMlaGs.js";
import { L as Label } from "./label-Dq9K6OlF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-doNiBben.js";
import { S as Switch } from "./switch-BKtN-NRy.js";
import { L as Lock } from "./lock-gUHSBT9e.js";
import { S as Save } from "./save-BXYYWuy_.js";
import { C as Clock } from "./clock-DpDpF638.js";
import "./index-BPgR8-uc.js";
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
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode);
const changeLog = [
  {
    who: "Ahmet Yılmaz (Yönetici)",
    what: "Maksimum ziyaretçi sayısı güncellendi: 3 → 5",
    when: "20 Mar 2025, 14:32"
  },
  {
    who: "Fatma Demir (Yönetici)",
    what: "Aidat hatırlatma günü değiştirildi: 5 → 3 gün",
    when: "18 Mar 2025, 09:15"
  },
  {
    who: "Ahmet Yılmaz (Yönetici)",
    what: "Bina adı güncellendi",
    when: "10 Mar 2025, 16:45"
  },
  {
    who: "Sistem",
    what: "Otomatik yedekleme ayarları güncellendi",
    when: "5 Mar 2025, 00:00"
  },
  {
    who: "Mehmet Kaya (Site Sahibi)",
    what: "Yeni yönetici atandı: Fatma Demir",
    when: "1 Mar 2025, 11:00"
  }
];
const THEME_COLORS = [
  { label: "Koyu Lacivert", value: "navy", bg: "bg-slate-800" },
  { label: "Koyu Yeşil", value: "green", bg: "bg-emerald-800" },
  { label: "Bordo", value: "red", bg: "bg-red-900" },
  { label: "Derin Mor", value: "purple", bg: "bg-purple-900" }
];
const LANGUAGES = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" }
];
function BuildingSettings(_props) {
  const [buildingName, setBuildingName] = reactExports.useState("Yeşilvadi Sitesi");
  const [address, setAddress] = reactExports.useState(
    "Bağcılar Mah. Lale Sok. No:12, İstanbul"
  );
  const [managerName, setManagerName] = reactExports.useState("Ahmet Yılmaz");
  const [managerPhone, setManagerPhone] = reactExports.useState("0532 111 22 33");
  const [unitCount, setUnitCount] = reactExports.useState("48");
  const [foundedDate, setFoundedDate] = reactExports.useState("2015-06-01");
  const [visitorRequired, setVisitorRequired] = reactExports.useState(true);
  const [entryRestriction, setEntryRestriction] = reactExports.useState(false);
  const [maxVisitors, setMaxVisitors] = reactExports.useState("5");
  const [duesReminderDays, setDuesReminderDays] = reactExports.useState("3");
  const [maintenanceNotif, setMaintenanceNotif] = reactExports.useState(true);
  const [eventNotif, setEventNotif] = reactExports.useState(true);
  const [themeColor, setThemeColor] = reactExports.useState("navy");
  const [defaultLang, setDefaultLang] = reactExports.useState("tr");
  const saveSettings = () => {
    ue.success("Ayarlar başarıyla kaydedildi");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Bina Ayarları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Bina yapılandırması ve tercihler" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "general", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "grid grid-cols-4 w-full max-w-xl",
          "data-ocid": "settings.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "general", children: "Genel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "security", children: "Güvenlik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notifications", children: "Bildirimler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "appearance", children: "Görünüm" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "general", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }),
          " Genel Bilgiler"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bina Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.building_name.input",
                value: buildingName,
                onChange: (e) => setBuildingName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Yönetici Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.manager_name.input",
                value: managerName,
                onChange: (e) => setManagerName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Adres" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.address.input",
                value: address,
                onChange: (e) => setAddress(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Yönetici Telefonu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.manager_phone.input",
                value: managerPhone,
                onChange: (e) => setManagerPhone(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Daire Sayısı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.unit_count.input",
                type: "number",
                value: unitCount,
                onChange: (e) => setUnitCount(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kuruluş Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.founded_date.input",
                type: "date",
                value: foundedDate,
                onChange: (e) => setFoundedDate(e.target.value)
              }
            )
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "security", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
          " Güvenlik Ayarları"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Ziyaretçi Kaydı Zorunlu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tüm ziyaretçilerin kayıt yaptırması zorunlu olsun" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": "settings.visitor_required.switch",
                checked: visitorRequired,
                onCheckedChange: setVisitorRequired
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Giriş Saati Kısıtlaması" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gece saatlerinde giriş kısıtlansın (00:00 - 06:00)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": "settings.entry_restriction.switch",
                checked: entryRestriction,
                onCheckedChange: setEntryRestriction
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Maksimum Eş Zamanlı Ziyaretçi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.max_visitors.input",
                type: "number",
                value: maxVisitors,
                onChange: (e) => setMaxVisitors(e.target.value)
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
          " Bildirim Ayarları"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aidat Hatırlatması (Kaç gün önce)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "settings.dues_reminder.input",
                type: "number",
                value: duesReminderDays,
                onChange: (e) => setDuesReminderDays(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Bakım Bildirimleri" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bakım ve arıza güncellemelerinde bildirim gönder" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": "settings.maintenance_notif.switch",
                checked: maintenanceNotif,
                onCheckedChange: setMaintenanceNotif
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Etkinlik Bildirimleri" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Toplantı ve etkinlik davetlerinde bildirim gönder" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": "settings.event_notif.switch",
                checked: eventNotif,
                onCheckedChange: setEventNotif
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "appearance", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5" }),
          " Görünüm Ayarları"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tema Rengi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: THEME_COLORS.map((tc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `settings.theme.${tc.value}.button`,
                onClick: () => setThemeColor(tc.value),
                className: `flex items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all ${themeColor === tc.value ? "border-primary" : "border-border"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-4 h-4 rounded-full ${tc.bg}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: tc.label })
                ]
              },
              tc.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Varsayılan Dil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: defaultLang, onValueChange: setDefaultLang, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "settings.default_lang.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l.value, children: l.label }, l.value)) })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "settings.save_button",
        className: "gap-2",
        onClick: saveSettings,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          " Ayarları Kaydet"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
        " Değişiklik Geçmişi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: changeLog.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `settings.item.${i + 1}`,
          className: "flex items-start gap-3 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: entry.what }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                entry.who,
                " · ",
                entry.when
              ] })
            ] })
          ]
        },
        entry.when
      )) }) })
    ] })
  ] });
}
export {
  BuildingSettings as default
};
