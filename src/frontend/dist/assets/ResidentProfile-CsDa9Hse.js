import { r as reactExports, j as jsxRuntimeExports, t as User, q as Bell, a2 as Shield, E as Phone, at as Globe } from "./index-COU4G2On.js";
import { S as Save } from "./save-3oeavxcI.js";
import { L as Lock } from "./lock-CdkgdZx5.js";
const LANGUAGES = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" }
];
const KEY = (id) => `sitecore_resident_profile_${id}`;
const DEFAULT_PROFILE = {
  name: "Sakin Adı",
  apartmentNo: "1",
  phone: "",
  moveInDate: "2024-01-01",
  residentType: "owner",
  email: "",
  emergencyContact: "",
  emergencyPhone: "",
  language: "tr",
  notifyAnnouncements: true,
  notifyDues: true,
  notifyMaintenance: true,
  notifyEvents: true,
  notifyForum: false,
  profileVisible: true,
  phoneVisible: false,
  apartmentVisible: true
};
function ResidentProfile({ buildingId }) {
  const [activeTab, setActiveTab] = reactExports.useState(
    "profile"
  );
  const [profile, setProfile] = reactExports.useState(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  });
  const [saved, setSaved] = reactExports.useState(false);
  const update = (patch) => {
    setProfile((p) => ({ ...p, ...patch }));
    setSaved(false);
  };
  const handleSave = () => {
    localStorage.setItem(KEY(buildingId), JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const fields = [
    "name",
    "phone",
    "moveInDate",
    "emergencyContact",
    "emergencyPhone"
  ];
  const filled = fields.filter((f) => String(profile[f]).trim() !== "").length;
  const completion = Math.round(filled / fields.length * 100);
  const tabs = [
    { key: "profile", label: "Profil", icon: User },
    { key: "prefs", label: "Tercihler", icon: Bell },
    { key: "privacy", label: "Gizlilik", icon: Shield }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Sakin Profil & Tercih Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Kişisel bilgiler, bildirim tercihleri ve gizlilik ayarları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleSave,
          className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${saved ? "bg-green-600 text-white" : "bg-[#1B3A5C] text-white hover:bg-[#16324f]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15 }),
            " ",
            saved ? "Kaydedildi!" : "Kaydet"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#0E1116]", children: "Profil Tamamlanma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-[#1B3A5C]", children: [
          completion,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-[#F3F6FB] rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full transition-all ${completion === 100 ? "bg-green-500" : completion >= 60 ? "bg-[#4A90D9]" : "bg-yellow-400"}`,
          style: { width: `${completion}%` }
        }
      ) }),
      completion < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1.5", children: "Profili tamamlamak için telefon, acil kişi ve diğer bilgileri doldurun." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 border-b border-[#D7DEE9]", children: tabs.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(key),
        className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition ${activeTab === key ? "border-[#1B3A5C] text-[#1B3A5C]" : "border-transparent text-[#3A4654] hover:text-[#0E1116]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 }),
          " ",
          label
        ]
      },
      key
    )) }),
    activeTab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] text-sm", children: "Kişisel Bilgiler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Ad Soyad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.name,
                onChange: (e) => update({ name: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "Ad Soyad"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Daire No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.apartmentNo,
                onChange: (e) => update({ apartmentNo: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12, className: "inline mr-1" }),
              "Telefon"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.phone,
                onChange: (e) => update({ phone: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "05xx xxx xx xx"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Taşınma Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "date",
                value: profile.moveInDate,
                onChange: (e) => update({ moveInDate: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Sakin Türü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: profile.residentType,
                onChange: (e) => update({
                  residentType: e.target.value
                }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "owner", children: "Malik (Ev Sahibi)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tenant", children: "Kiracı" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "E-posta (isteğe bağlı)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.email,
                onChange: (e) => update({ email: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "ornek@mail.com"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] text-sm", children: "Acil İletişim Kişisi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Ad Soyad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.emergencyContact,
                onChange: (e) => update({ emergencyContact: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "Acil iletişim kişisi"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-medium text-[#3A4654] mb-1.5", children: "Telefon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: profile.emergencyPhone,
                onChange: (e) => update({ emergencyPhone: e.target.value }),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                placeholder: "05xx xxx xx xx"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    activeTab === "prefs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] text-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14, className: "inline mr-2" }),
          "Bildirim Tercihleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            key: "notifyAnnouncements",
            label: "Duyurular",
            desc: "Bina duyuruları ve önemli bildirimler"
          },
          {
            key: "notifyDues",
            label: "Aidat Hatırlatmaları",
            desc: "Ödeme tarihleri ve gecikme bildirimleri"
          },
          {
            key: "notifyMaintenance",
            label: "Bakım & Arıza",
            desc: "Planlı bakım ve arıza bildirimleri"
          },
          {
            key: "notifyEvents",
            label: "Etkinlikler",
            desc: "Toplantılar ve bina etkinlikleri"
          },
          {
            key: "notifyForum",
            label: "Komşu Forumu",
            desc: "Yeni forum gönderileri ve yanıtlar"
          }
        ].map(({ key, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-3 border-b border-[#F3F6FB] last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => update({ [key]: !profile[key] }),
                  className: `w-11 h-6 rounded-full transition-colors relative ${profile[key] ? "bg-[#1B3A5C]" : "bg-[#D7DEE9]"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${profile[key] ? "translate-x-5" : "translate-x-0.5"}`
                    }
                  )
                }
              )
            ]
          },
          key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] text-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14, className: "inline mr-2" }),
          "Dil Tercihi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => update({ language: lang.code }),
            className: `flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition ${profile.language === lang.code ? "border-[#1B3A5C] bg-[#1B3A5C]/5 text-[#1B3A5C] font-medium" : "border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: lang.code.toUpperCase() }),
              lang.label
            ]
          },
          lang.code
        )) })
      ] })
    ] }),
    activeTab === "privacy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] text-sm mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14, className: "inline mr-2" }),
          "Profil Görünürlüğü"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mb-4", children: "Diğer sakinlerin profilinizde hangi bilgileri görebileceğini seçin." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            key: "profileVisible",
            label: "Profilim görünür",
            desc: "Diğer sakinler profilinizi görebilir"
          },
          {
            key: "phoneVisible",
            label: "Telefon numaramı göster",
            desc: "Diğer sakinler telefon numaranızı görebilir"
          },
          {
            key: "apartmentVisible",
            label: "Daire bilgimi göster",
            desc: "Daire numaranız sakin listesinde görünür"
          }
        ].map(({ key, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-3 border-b border-[#F3F6FB] last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => update({ [key]: !profile[key] }),
                  className: `w-11 h-6 rounded-full transition-colors relative ${profile[key] ? "bg-[#1B3A5C]" : "bg-[#D7DEE9]"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${profile[key] ? "translate-x-5" : "translate-x-0.5"}`
                    }
                  )
                }
              )
            ]
          },
          key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FEF9EC] border border-yellow-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-800 font-medium mb-1", children: "Veri Güvenliği" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-700", children: "Tüm profil bilgileriniz bu cihazda yerel olarak saklanır. Bina yönetimine paylaşılan bilgiler sadece yönetici rolündeki kullanıcılar tarafından görülebilir." })
      ] })
    ] })
  ] });
}
export {
  ResidentProfile as default
};
