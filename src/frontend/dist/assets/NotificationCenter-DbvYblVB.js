import { c as createLucideIcon, u as useTranslation, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, e as Badge, q as Bell } from "./index-BJcLL9-x.js";
import { C as CheckCheck } from "./check-check-D5Rt4eHW.js";
import { A as Archive } from "./archive-CPRK9fwH.js";
import { T as Trash2 } from "./trash-2-ChUiugUF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode);
function NotificationCenter({
  userId,
  isOwnerOrManager
}) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = reactExports.useState([
    {
      id: "1",
      title: "Asansör Bakımı",
      message: "Yarın saat 10:00-14:00 arası asansör bakımda olacaktır.",
      type: "warning",
      category: "maintenance",
      priority: "normal",
      senderId: "system",
      targetAll: true,
      readBy: [],
      archived: false,
      createdAt: new Date(Date.now() - 36e5).toISOString()
    },
    {
      id: "2",
      title: "Hoş Geldiniz!",
      message: "SiteCore platformuna hoş geldiniz. Sorularınız için yöneticiye ulaşabilirsiniz.",
      type: "info",
      category: "announcement",
      priority: "low",
      senderId: "system",
      targetAll: true,
      readBy: [],
      archived: false,
      createdAt: new Date(Date.now() - 864e5).toISOString()
    },
    {
      id: "3",
      title: "Yangın Tatbikatı",
      message: "Cuma günü saat 11:00'de yangın tatbikatı yapılacaktır. Tüm sakinlerin katılması zorunludur.",
      type: "urgent",
      category: "emergency",
      priority: "high",
      senderId: "system",
      targetAll: true,
      readBy: [],
      archived: false,
      createdAt: new Date(Date.now() - 72e5).toISOString()
    }
  ]);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [notifTitle, setNotifTitle] = reactExports.useState("");
  const [notifMessage, setNotifMessage] = reactExports.useState("");
  const [notifType, setNotifType] = reactExports.useState("info");
  const [notifCategory, setNotifCategory] = reactExports.useState("general");
  const [notifPriority, setNotifPriority] = reactExports.useState("normal");
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const myNotifications = notifications.filter(
    (n) => n.targetAll || n.targetUserId === userId
  );
  const active = myNotifications.filter((n) => !n.archived);
  const archived = myNotifications.filter((n) => n.archived);
  const unreadCount = active.filter((n) => !n.readBy.includes(userId)).length;
  const filteredActive = filterCategory === "all" ? active : active.filter((n) => n.category === filterCategory);
  const handleSend = () => {
    if (!notifTitle || !notifMessage) return;
    const newNotif = {
      id: Date.now().toString(),
      title: notifTitle,
      message: notifMessage,
      type: notifType,
      category: notifCategory,
      priority: notifPriority,
      senderId: userId,
      targetAll: true,
      readBy: [],
      archived: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setNotifications([newNotif, ...notifications]);
    setNotifTitle("");
    setNotifMessage("");
    setNotifType("info");
    setNotifCategory("general");
    setNotifPriority("normal");
    setShowModal(false);
  };
  const handleRead = (notifId) => {
    setNotifications(
      notifications.map(
        (n) => n.id === notifId && !n.readBy.includes(userId) ? { ...n, readBy: [...n.readBy, userId] } : n
      )
    );
  };
  const handleReadAll = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        readBy: n.readBy.includes(userId) ? n.readBy : [...n.readBy, userId]
      }))
    );
  };
  const handleDelete = (notifId) => setNotifications(notifications.filter((n) => n.id !== notifId));
  const handleArchive = (notifId) => setNotifications(
    notifications.map(
      (n) => n.id === notifId ? { ...n, archived: true } : n
    )
  );
  const handleUnarchive = (notifId) => setNotifications(
    notifications.map(
      (n) => n.id === notifId ? { ...n, archived: false } : n
    )
  );
  const typeColor = (type) => {
    switch (type) {
      case "info":
        return "border-l-blue-400 bg-blue-50";
      case "warning":
        return "border-l-yellow-400 bg-yellow-50";
      case "urgent":
        return "border-l-red-400 bg-red-50";
    }
  };
  const typeBadge = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "urgent":
        return "bg-red-100 text-red-700";
    }
  };
  const priorityBadge = (p) => {
    if (p === "high")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs", children: "Yüksek" });
    if (p === "low")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 border-0 text-xs", children: "Düşük" });
    return null;
  };
  const categoryLabel = (c) => {
    const map = {
      general: "Genel",
      maintenance: "Bakım",
      emergency: "Acil",
      announcement: "Duyuru"
    };
    return map[c] || c;
  };
  const typeLabel = (type) => {
    switch (type) {
      case "info":
        return t.notifTypeInfo || "Bilgi";
      case "warning":
        return t.notifTypeWarning || "Uyarı";
      case "urgent":
        return t.notifTypeUrgent || "Acil";
    }
  };
  const formatTime = (iso) => {
    const d = new Date(iso);
    const now = /* @__PURE__ */ new Date();
    const diffH = Math.floor((now.getTime() - d.getTime()) / 36e5);
    if (diffH < 1) return t.justNow || "Az önce";
    if (diffH < 24) return `${diffH} ${t.hoursAgo || "saat önce"}`;
    return d.toLocaleDateString();
  };
  const NotifCard = ({
    notif,
    showArchiveBtn = true
  }) => {
    const isRead = notif.readBy.includes(userId);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        tabIndex: 0,
        className: `w-full text-left bg-white rounded-xl border-l-4 border border-[#E2E8F0] p-4 cursor-pointer transition-opacity ${typeColor(notif.type)} ${isRead ? "opacity-60" : ""}`,
        onClick: () => handleRead(notif.id),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
              !isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0B1B2E]", children: notif.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge(notif.type)}`,
                  children: typeLabel(notif.type)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: categoryLabel(notif.category) }),
              priorityBadge(notif.priority)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: notif.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: formatTime(notif.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-shrink-0", children: [
            showArchiveBtn && isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-gray-400 hover:text-gray-600 p-1",
                onClick: (e) => {
                  e.stopPropagation();
                  handleArchive(notif.id);
                },
                title: "Arşivle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-4 h-4" })
              }
            ),
            !showArchiveBtn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-blue-400 hover:text-blue-600 p-1",
                onClick: (e) => {
                  e.stopPropagation();
                  handleUnarchive(notif.id);
                },
                title: "Arşivden Çıkar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" })
              }
            ),
            isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "text-red-400 hover:text-red-600 hover:bg-red-50 p-1",
                onClick: (e) => {
                  e.stopPropagation();
                  handleDelete(notif.id);
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      },
      notif.id
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[#0B1B2E]", children: t.notifications || "Bildirim Merkezi" }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold", children: unreadCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D] mt-1", children: [
          unreadCount,
          " ",
          t.unread || "okunmamış bildirim"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "gap-2 text-sm",
            onClick: handleReadAll,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-4 h-4" }),
              t.markAllRead || "Tümünü Okundu"
            ]
          }
        ),
        isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowModal(true),
            className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t.sendNotification || "Bildirim Gönder"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", children: [
          "Tümü (",
          active.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "archive", children: [
          "Arşiv (",
          archived.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4 flex-wrap", children: ["all", "emergency", "maintenance", "announcement", "general"].map(
          (cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: filterCategory === cat ? "default" : "outline",
              onClick: () => setFilterCategory(cat),
              className: filterCategory === cat ? "bg-[#1A3A5C] text-white rounded-full" : "rounded-full",
              children: cat === "all" ? "Tümü" : categoryLabel(cat)
            },
            cat
          )
        ) }),
        filteredActive.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noNotifications || "Henüz bildirim yok." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredActive.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotifCard, { notif }, notif.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "archive", children: archived.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E2E8F0] p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-10 h-10 text-[#B0BAC6] mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Arşivde bildirim yok." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: archived.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotifCard,
        {
          notif,
          showArchiveBtn: false
        },
        notif.id
      )) }) })
    ] }),
    isOwnerOrManager && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.sendNotification || "Bildirim Gönder" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "notif-title",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.notifTitle || "Başlık"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "notif-title",
              value: notifTitle,
              onChange: (e) => setNotifTitle(e.target.value),
              placeholder: t.notifTitle || "Bildirim başlığı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "notif-msg",
              className: "text-sm font-medium text-[#3A4654] mb-1 block",
              children: t.notifMessage || "Mesaj"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "notif-msg",
              className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]",
              value: notifMessage,
              onChange: (e) => setNotifMessage(e.target.value),
              placeholder: t.notifMessagePlaceholder || "Bildirimi yazın..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "notif-type",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: "Tür"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "notif-type",
                className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm",
                value: notifType,
                onChange: (e) => setNotifType(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "info", children: "Bilgi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warning", children: "Uyarı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Acil" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "notif-category",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: "Kategori"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "notif-category",
                className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm",
                value: notifCategory,
                onChange: (e) => setNotifCategory(
                  e.target.value
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "general", children: "Genel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "maintenance", children: "Bakım" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "emergency", children: "Acil" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "announcement", children: "Duyuru" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "notif-priority",
                className: "text-sm font-medium text-[#3A4654] mb-1 block",
                children: "Öncelik"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "notif-priority",
                className: "w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm",
                value: notifPriority,
                onChange: (e) => setNotifPriority(
                  e.target.value
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Yüksek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "normal", children: "Normal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Düşük" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowModal(false), children: t.cancel || "İptal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white",
              onClick: handleSend,
              children: t.send || "Gönder"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  NotificationCenter as default
};
