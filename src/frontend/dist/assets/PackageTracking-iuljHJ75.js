import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, w as ChartNoAxesColumn, i as TabsContent, x as Package, e as Badge, q as Bell, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-5GfTJQeF.js";
const KEY = (id) => `sitecore_packages_${id}`;
function isOverdue(pkg) {
  if (pkg.status !== "waiting") return false;
  const created = pkg.createdAt || new Date(pkg.receivedDate).getTime();
  return Date.now() - created > 7 * 24 * 60 * 60 * 1e3;
}
function PackageTracking({ buildingId, isOwner, t }) {
  const [packages, setPackages] = reactExports.useState([]);
  const [notifLogs, setNotifLogs] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    apartmentNo: "",
    recipientName: "",
    carrier: "PTT",
    trackingNumber: "",
    barcodeRef: "",
    receivedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const parsed = JSON.parse(raw);
      setPackages(parsed.map((p) => ({ barcodeRef: "", ...p })));
    } else {
      const seed = [
        {
          id: "p1",
          apartmentNo: "101",
          recipientName: "Ahmet Yılmaz",
          carrier: "PTT",
          trackingNumber: "TR123456789",
          barcodeRef: "BC-001",
          receivedDate: "2026-03-20",
          status: "waiting",
          createdAt: Date.now() - 8 * 864e5
        },
        {
          id: "p2",
          apartmentNo: "202",
          recipientName: "Fatma Kaya",
          carrier: "Yurtıçi",
          trackingNumber: "YK987654321",
          barcodeRef: "",
          receivedDate: "2026-03-20",
          status: "waiting",
          createdAt: Date.now() - 864e5
        },
        {
          id: "p3",
          apartmentNo: "301",
          recipientName: "Mehmet Demir",
          carrier: "Aras",
          trackingNumber: "",
          barcodeRef: "BC-003",
          receivedDate: "2026-03-19",
          status: "collected",
          collectedAt: "2026-03-20",
          createdAt: Date.now() - 2 * 864e5
        },
        {
          id: "p4",
          apartmentNo: "105",
          recipientName: "Ayşe Çelik",
          carrier: "MNG",
          trackingNumber: "MNG112233",
          barcodeRef: "",
          receivedDate: "2026-03-21",
          status: "waiting",
          createdAt: Date.now() - 432e5
        },
        {
          id: "p5",
          apartmentNo: "101",
          recipientName: "Ahmet Yılmaz",
          carrier: "PTT",
          trackingNumber: "TR999888",
          barcodeRef: "BC-005",
          receivedDate: "2026-03-18",
          status: "collected",
          collectedAt: "2026-03-19",
          createdAt: Date.now() - 3 * 864e5
        }
      ];
      const logs = [
        {
          packageId: "p1",
          message: "Kargo bekleniyor bildirimi gönderildi - Ahmet Yılmaz (D:101)",
          timestamp: new Date(Date.now() - 6 * 864e5).toLocaleString()
        },
        {
          packageId: "p2",
          message: "Yeni kargo bildirimi - Fatma Kaya (D:202)",
          timestamp: new Date(Date.now() - 864e5).toLocaleString()
        },
        {
          packageId: "p3",
          message: "Kargo teslim alındı bildirimi - Mehmet Demir (D:301)",
          timestamp: new Date(Date.now() - 864e5 + 36e5).toLocaleString()
        }
      ];
      setPackages(seed);
      setNotifLogs(logs);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
  }, [buildingId]);
  const save = (updated, logs) => {
    setPackages(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
    if (logs) setNotifLogs(logs);
  };
  const handleSubmit = () => {
    if (!form.apartmentNo.trim() || !form.recipientName.trim()) return;
    const newPkg = {
      id: Date.now().toString(),
      ...form,
      status: "waiting",
      createdAt: Date.now()
    };
    const newLog = {
      packageId: newPkg.id,
      message: `Yeni kargo kaydı - ${form.recipientName} (D:${form.apartmentNo})`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleString()
    };
    save([...packages, newPkg], [newLog, ...notifLogs]);
    setShowDialog(false);
    setForm({
      apartmentNo: "",
      recipientName: "",
      carrier: "PTT",
      trackingNumber: "",
      barcodeRef: "",
      receivedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
  };
  const markCollected = (id) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    const newLog = {
      packageId: id,
      message: `Kargo teslim alındı - ${pkg.recipientName} (D:${pkg.apartmentNo})`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleString()
    };
    save(
      packages.map(
        (p) => p.id === id ? {
          ...p,
          status: "collected",
          collectedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        } : p
      ),
      [newLog, ...notifLogs]
    );
  };
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const waiting = packages.filter(
    (p) => p.status === "waiting" && !isOverdue(p)
  ).length;
  const overdueCount = packages.filter((p) => isOverdue(p)).length;
  const collectedToday = packages.filter(
    (p) => p.status === "collected" && p.collectedAt === today
  ).length;
  const aptStats = reactExports.useMemo(() => {
    const map = {};
    for (const p of packages) {
      if (!map[p.apartmentNo])
        map[p.apartmentNo] = { total: 0, waiting: 0, collected: 0 };
      map[p.apartmentNo].total++;
      if (p.status === "waiting") map[p.apartmentNo].waiting++;
      else map[p.apartmentNo].collected++;
    }
    return Object.entries(map).map(([apt, stats]) => ({ apt, ...stats })).sort((a, b) => b.total - a.total);
  }, [packages]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.packageTracking || "Kargo & Paket Takibi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowDialog(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
          "data-ocid": "packages.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            t.addPackage || "Paket Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.waitingPackages || "Bekleyen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: waiting })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Gecikmiş (>7 gün)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-600", children: overdueCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: t.collectedToday || "Bugün Teslim" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: collectedToday })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", "data-ocid": "packages.tab", children: "Paket Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "stats", "data-ocid": "packages.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5 mr-1" }),
          "Daire İstatistikleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notifications", "data-ocid": "packages.tab", children: "Bildirim Geçmişi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: packages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-12 text-center",
          "data-ocid": "packages.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-[#D7DEE9] mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noPackages || "Kayıtlı paket yok." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.apartmentNo || "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.recipient || "Alıcı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.carrier || "Kargo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Barkod / Ref" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.receivedDate || "Geliş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.status || "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: packages.map((p, i) => {
          const overdue = isOverdue(p);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-t border-[#F0F3F8] hover:bg-[#FAFBFD] ${overdue ? "bg-red-50/40" : ""}`,
              "data-ocid": `packages.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-[#0E1116]", children: p.apartmentNo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: p.recipientName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#F1F4F8] text-[#3A4654]", children: p.carrier }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-[#6B7A8D] font-mono", children: p.barcodeRef || p.trackingNumber || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: p.receivedDate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: overdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700", children: "Gecikmiş" }) : p.status === "waiting" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700", children: t.waiting || "Bekliyor" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700", children: t.collected || "Teslim Alındı" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p.status === "waiting" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => markCollected(p.id),
                    className: "text-xs rounded-full",
                    "data-ocid": `packages.toggle.${i + 1}`,
                    children: t.markCollected || "Teslim Alındı"
                  }
                ) })
              ]
            },
            p.id
          );
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "stats", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: aptStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-8 w-8 text-[#D7DEE9] mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-sm", children: "Henüz istatistik yok." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Daire No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Toplam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Bekleyen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Teslim Alınan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: aptStats.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-t border-[#F0F3F8] ${i === 0 ? "bg-amber-50/40" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-[#0E1116]", children: [
                "Daire ",
                row.apt
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[#EEF3FA] text-[#4A90D9] text-xs font-bold px-2 py-0.5 rounded-full", children: row.total }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-amber-600 font-medium", children: row.waiting }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-green-600 font-medium", children: row.collected })
            ]
          },
          row.apt
        )) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: notifLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-8 w-8 text-[#D7DEE9] mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] text-sm", children: "Bildirim geçmişi yok." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-[#F0F3F8]", children: notifLogs.map((log, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: notification log positional
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: log.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: log.timestamp })
          ] })
        ] }, i)
      )) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "packages.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addPackage || "Paket Kaydı Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.apartmentNo || "Daire No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.apartmentNo,
                onChange: (e) => setForm((p) => ({ ...p, apartmentNo: e.target.value })),
                placeholder: "101",
                "data-ocid": "packages.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.recipient || "Alıcı Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.recipientName,
                onChange: (e) => setForm((p) => ({ ...p, recipientName: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.carrier || "Kargo Firması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.carrier,
              onChange: (e) => setForm((p) => ({
                ...p,
                carrier: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "packages.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PTT", children: "PTT" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Yurtıçi", children: "Yurtıçi Kargo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Aras", children: "Aras Kargo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MNG", children: "MNG Kargo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Diğer", children: t.other || "Diğer" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Barkod / Ref No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.barcodeRef,
                onChange: (e) => setForm((p) => ({ ...p, barcodeRef: e.target.value })),
                placeholder: "BC-001"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.trackingNumber || "Takip No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.trackingNumber,
                onChange: (e) => setForm((p) => ({ ...p, trackingNumber: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.receivedDate || "Geliş Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.receivedDate,
              onChange: (e) => setForm((p) => ({ ...p, receivedDate: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "packages.submit_button",
              children: t.addPackage || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "packages.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PackageTracking as default
};
