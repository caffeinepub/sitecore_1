import { r as reactExports, j as jsxRuntimeExports, I as Input, B as Button, _ as Settings, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, q as Bell, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as Badge } from "./index-huPFjtKr.js";
import { u as ue } from "./index-Bh47-Wag.js";
import { D as DollarSign } from "./dollar-sign-1-ZKl_fY.js";
import { U as Upload } from "./upload-JO3-pUOr.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar } from "./BarChart-BF-ngLS6.js";
const APT_KEY = (id) => `sitecore_apartments_${id}`;
const DUES_KEY = (id) => `sitecore_dues_${id}`;
const REMINDER_KEY = (id) => `sitecore_reminders_${id}`;
function currentMonth() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
const MONTH_LABELS = {
  "01": "Oca",
  "02": "Şub",
  "03": "Mar",
  "04": "Nis",
  "05": "May",
  "06": "Haz",
  "07": "Tem",
  "08": "Āğu",
  "09": "Eyl",
  "10": "Eki",
  "11": "Kas",
  "12": "Ara"
};
function formatMonth(m) {
  const [yr, mo] = m.split("-");
  return `${MONTH_LABELS[mo] || mo} ${yr.slice(2)}`;
}
function monthDiffFromNow(month) {
  const [yr, mo] = month.split("-").map(Number);
  const now = /* @__PURE__ */ new Date();
  return (now.getFullYear() - yr) * 12 + (now.getMonth() + 1 - mo);
}
function calcInterest(amount, month, dailyRate) {
  const days = monthDiffFromNow(month) * 30;
  if (days <= 0) return 0;
  return Math.round(amount * dailyRate * days);
}
function DuesTracking({ buildingId, isOwner, t }) {
  const [apartments, setApartments] = reactExports.useState([]);
  const [dues, setDues] = reactExports.useState([]);
  const [month, setMonth] = reactExports.useState(currentMonth());
  const [showBulkDialog, setShowBulkDialog] = reactExports.useState(false);
  const [bulkAmount, setBulkAmount] = reactExports.useState("");
  const [proofFiles, setProofFiles] = reactExports.useState({});
  const [reminders, setReminders] = reactExports.useState([]);
  const [dailyRate, setDailyRate] = reactExports.useState(1e-3);
  const [showRateDialog, setShowRateDialog] = reactExports.useState(false);
  const [rateInput, setRateInput] = reactExports.useState("0.1");
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(APT_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const dRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (dRaw) setDues(JSON.parse(dRaw));
    const rRaw = localStorage.getItem(REMINDER_KEY(buildingId));
    if (rRaw) setReminders(JSON.parse(rRaw));
  }, [buildingId]);
  const saveDues = (updated) => {
    setDues(updated);
    localStorage.setItem(DUES_KEY(buildingId), JSON.stringify(updated));
  };
  const saveReminders = (updated) => {
    setReminders(updated);
    localStorage.setItem(REMINDER_KEY(buildingId), JSON.stringify(updated));
  };
  const monthDues = reactExports.useMemo(
    () => dues.filter((d) => d.month === month),
    [dues, month]
  );
  const getDue = (aptId) => monthDues.find((d) => d.apartmentId === aptId);
  const ensureDue = (aptId, amount = 0) => {
    const existing = getDue(aptId);
    if (existing) return existing;
    const newDue = {
      id: crypto.randomUUID(),
      buildingId,
      apartmentId: aptId,
      month,
      amount,
      status: "pending",
      note: ""
    };
    const updated = [...dues, newDue];
    saveDues(updated);
    return newDue;
  };
  const setStatus = (aptId, status) => {
    const due = ensureDue(aptId);
    const updated = dues.map(
      (d) => d.id === due.id ? { ...d, status, paidAt: status === "paid" ? Date.now() : d.paidAt } : d
    );
    saveDues(updated);
  };
  const setAmount = (aptId, amount) => {
    const due = getDue(aptId);
    if (due) {
      saveDues(dues.map((d) => d.id === due.id ? { ...d, amount } : d));
    } else {
      ensureDue(aptId, amount);
    }
  };
  const applyBulkAmount = () => {
    const amt = Number(bulkAmount);
    if (!amt) return;
    const updated = [...dues];
    for (const apt of apartments) {
      const idx = updated.findIndex(
        (d) => d.apartmentId === apt.id && d.month === month
      );
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], amount: amt };
      } else {
        updated.push({
          id: crypto.randomUUID(),
          buildingId,
          apartmentId: apt.id,
          month,
          amount: amt,
          status: "pending",
          note: ""
        });
      }
    }
    saveDues(updated);
    setShowBulkDialog(false);
    setBulkAmount("");
    ue.success(`${apartments.length} daire için aidat dönemi oluşturuldu.`);
  };
  const handleBulkReminder = () => {
    const overdueCount = monthDues.filter(
      (d) => d.status === "overdue" || d.status === "pending"
    ).length;
    ue.success(
      `${overdueCount} gecikmiş daire için hatırlatma kuyruğa alındı.`
    );
  };
  const handleSendReminder = (apt) => {
    const newReminder = {
      id: crypto.randomUUID(),
      daire: `${apt.block ? `${apt.block}-` : ""}${apt.number}`,
      date: (/* @__PURE__ */ new Date()).toLocaleString("tr-TR"),
      month: formatMonth(month)
    };
    saveReminders([newReminder, ...reminders]);
    ue.success(`Daire ${apt.number} için hatırlatma gönderildi.`);
  };
  const handleProofUpload = (aptId, fileName) => {
    setProofFiles((prev) => ({ ...prev, [aptId]: fileName }));
    ue.success(`Ödeme kanıtı kaydedildi: ${fileName}`);
  };
  const handleSaveRate = () => {
    const r = Number(rateInput) / 100;
    if (r > 0) setDailyRate(r);
    setShowRateDialog(false);
    ue.success(`Günlük faiz oranı güncellendi: %${rateInput}`);
  };
  const totalCollected = monthDues.filter((d) => d.status === "paid").reduce((s, d) => s + d.amount, 0);
  const totalPending = monthDues.filter((d) => d.status === "pending").reduce((s, d) => s + d.amount, 0);
  const totalOverdue = monthDues.filter((d) => d.status === "overdue").reduce((s, d) => s + d.amount, 0);
  const chartData = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const mDues = dues.filter((dd) => dd.month === m);
      return {
        name: formatMonth(m),
        Tahsilat: mDues.filter((dd) => dd.status === "paid").reduce((s, dd) => s + dd.amount, 0),
        Bekleyen: mDues.filter((dd) => dd.status !== "paid").reduce((s, dd) => s + dd.amount, 0)
      };
    });
  }, [dues]);
  const agingData = reactExports.useMemo(() => {
    const overdueRecords = dues.filter(
      (d) => d.status === "overdue" || d.status === "pending" && monthDiffFromNow(d.month) > 0
    );
    const buckets = {
      "1-30": [],
      "31-60": [],
      "60+": []
    };
    for (const d of overdueRecords) {
      const days = monthDiffFromNow(d.month) * 30;
      if (days <= 30) buckets["1-30"].push(d);
      else if (days <= 60) buckets["31-60"].push(d);
      else buckets["60+"].push(d);
    }
    return buckets;
  }, [dues]);
  const statusBadge = (status) => {
    if (status === "paid")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: t.paid });
    if (status === "overdue")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-red-200", children: t.overdue });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700 border-yellow-200", children: t.pending });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.dues }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "month",
            value: month,
            onChange: (e) => setMonth(e.target.value),
            className: "w-40 text-sm"
          }
        ),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "dues.secondary_button",
              onClick: handleBulkReminder,
              variant: "outline",
              className: "text-sm rounded-full border-amber-300 text-amber-700 hover:bg-amber-50",
              children: "Toplu Hatırlatma Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "dues.toggle",
              onClick: () => setShowRateDialog(true),
              variant: "outline",
              className: "text-sm rounded-full border-gray-300 text-gray-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5 mr-1" }),
                " Faiz Ayarı"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "dues.primary_button",
              onClick: () => setShowBulkDialog(true),
              className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-sm",
              children: t.setMonthlyDues
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-green-600", children: [
          totalCollected.toLocaleString(),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#3A4654] text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3" }),
          " ",
          t.totalCollected
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-yellow-600", children: [
          totalPending.toLocaleString(),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: t.totalPending })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-red-500", children: [
          totalOverdue.toLocaleString(),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm mt-1", children: t.overdue })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "table", children: "Aidat Tablosu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "aging", children: "Borç Yaşlandırma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reminders", children: "Hatırlatma Geçmişi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "chart", children: "Grafik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "table", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden mb-6", children: apartments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "dues.empty_state",
          className: "py-12 text-center text-[#3A4654]",
          children: t.noApartments
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.apartmentNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.resident }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.dueAmount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: "Gecikme Faizi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: t.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-semibold text-[#3A4654]", children: "Ödeme Kanıtı" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: apartments.map((apt, idx) => {
          const due = getDue(apt.id);
          const proofFile = proofFiles[apt.id];
          const isOverdue = (due == null ? void 0 : due.status) === "overdue" || (due == null ? void 0 : due.status) === "pending" && monthDiffFromNow(month) > 0;
          const interest = isOverdue && due ? calcInterest(due.amount, due.month, dailyRate) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `dues.item.${idx + 1}`,
              className: "border-b border-[#E5EAF2] last:border-0 hover:bg-[#F9FAFB]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium text-[#0E1116]", children: [
                  apt.block ? `${apt.block}-` : "",
                  apt.number
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: apt.residentName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]/40", children: t.noResident }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    value: (due == null ? void 0 : due.amount) ?? "",
                    onChange: (e) => setAmount(apt.id, Number(e.target.value)),
                    className: "w-24 h-7 text-sm",
                    placeholder: "0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#0E1116]", children: [
                  (due == null ? void 0 : due.amount) ?? 0,
                  " ₺"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: interest > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500 text-sm font-medium", children: [
                  "+",
                  interest.toLocaleString(),
                  " ₺"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#9CA8B4] text-sm", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: statusBadge(due == null ? void 0 : due.status) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: proofFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-600 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3" }),
                  " ",
                  proofFile
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "file",
                      accept: ".pdf,.jpg,.jpeg,.png",
                      className: "hidden",
                      onChange: (e) => {
                        var _a;
                        const file = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (file)
                          handleProofUpload(apt.id, file.name);
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#4A90D9] hover:underline flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3" }),
                    " Yükle"
                  ] })
                ] }) }),
                isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": `dues.secondary_button.${idx + 1}`,
                      onClick: () => handleSendReminder(apt),
                      size: "sm",
                      variant: "outline",
                      className: "text-xs text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full h-7 gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3" }),
                        " Hatırlat"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": `dues.toggle.${idx + 1}`,
                      onClick: () => setStatus(apt.id, "paid"),
                      size: "sm",
                      variant: "outline",
                      className: "text-xs text-green-600 border-green-200 hover:bg-green-50 rounded-full h-7",
                      children: t.markPaid
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => setStatus(apt.id, "overdue"),
                      size: "sm",
                      variant: "outline",
                      className: "text-xs text-red-500 border-red-200 hover:bg-red-50 rounded-full h-7",
                      children: t.markOverdue
                    }
                  )
                ] }) })
              ]
            },
            apt.id
          );
        }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "aging", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-700 mb-1", children: "1–30 Gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: agingData["1-30"].length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-500 mt-1", children: [
              agingData["1-30"].reduce((s, d) => s + d.amount, 0).toLocaleString(),
              " ",
              "₺"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-orange-700 mb-1", children: "31–60 Gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-orange-600", children: agingData["31-60"].length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-500 mt-1", children: [
              agingData["31-60"].reduce((s, d) => s + d.amount, 0).toLocaleString(),
              " ",
              "₺"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-700 mb-1", children: "60+ Gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-600", children: agingData["60+"].length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 mt-1", children: [
              agingData["60+"].reduce((s, d) => s + d.amount, 0).toLocaleString(),
              " ",
              "₺"
            ] })
          ] })
        ] }),
        Object.entries(agingData).map(
          ([bucket, records]) => records.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden mb-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-[#F3F6FB] font-semibold text-sm text-[#3A4654]", children: [
                  bucket,
                  " Gün — ",
                  records.length,
                  " daire"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: records.map((d) => {
                  const apt = apartments.find(
                    (a) => a.id === d.apartmentId
                  );
                  const interest = calcInterest(
                    d.amount,
                    d.month,
                    dailyRate
                  );
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[#F0F3F8]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 font-medium text-[#0E1116]", children: [
                      "Daire ",
                      (apt == null ? void 0 : apt.block) ? `${apt.block}-` : "",
                      (apt == null ? void 0 : apt.number) || d.apartmentId
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: (apt == null ? void 0 : apt.residentName) || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 font-semibold text-red-600", children: [
                      d.amount.toLocaleString(),
                      " ₺"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-red-400 text-xs", children: [
                      "Faiz: +",
                      interest.toLocaleString(),
                      " ₺"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#6B7A8D]", children: formatMonth(d.month) })
                  ] }, d.id);
                }) }) })
              ]
            },
            bucket
          ) : null
        ),
        Object.values(agingData).every((r) => r.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Vadesi geçmiş borç bulunmuyor." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#EEF3FA] border border-[#C5D5EA] rounded-xl p-3 mt-3 text-xs text-[#4A90D9]", children: [
          "Günlük gecikme faiz oranı: %",
          (dailyRate * 100).toFixed(1),
          " • Aylık: %",
          (dailyRate * 30 * 100).toFixed(1),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "ml-2 underline",
              onClick: () => setShowRateDialog(true),
              children: "Değiştir"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reminders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#F3F6FB] px-4 py-3 border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-[#0E1116] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-[#4A90D9]" }),
          " Gönderilen Hatırlatmalar"
        ] }) }),
        reminders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "dues.empty_state",
            className: "py-12 text-center text-[#6B7A8D]",
            children: "Henüz hatırlatma gönderilmedi."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-[#3A4654]", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-[#3A4654]", children: "İlgili Dönem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-[#3A4654]", children: "Gönderilme Tarihi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: reminders.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `dues.item.${i + 1}`,
              className: "border-t border-[#F0F3F8] hover:bg-[#F9FAFB]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-[#0E1116]", children: r.daire }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: r.month }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#6B7A8D]", children: r.date })
              ]
            },
            r.id
          )) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Son 6 Ay Aidat Geçmişi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: chartData,
            margin: { top: 5, right: 10, left: 0, bottom: 5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 12, fill: "#6B7A8D" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "#6B7A8D" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    borderRadius: 8,
                    border: "1px solid #E5EAF2"
                  },
                  formatter: (v) => [`${Number(v).toLocaleString()} ₺`]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Tahsilat", fill: "#22C55E", radius: [4, 4, 0, 0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Bekleyen", fill: "#F59E0B", radius: [4, 4, 0, 0] })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBulkDialog, onOpenChange: setShowBulkDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.setMonthlyDues }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D]", children: [
          formatMonth(month),
          " ayı için tüm dairelere toplu aidat dönemi oluşturulacak."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
            t.dueAmount,
            " (₺)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "dues.input",
              type: "number",
              value: bulkAmount,
              onChange: (e) => setBulkAmount(e.target.value),
              placeholder: "500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "dues.submit_button",
            onClick: applyBulkAmount,
            disabled: !bulkAmount,
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: t.applyToAll
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRateDialog, onOpenChange: setShowRateDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
        " Gecikme Faizi Ayarı"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Vadesi geçmiş aidat borcu için günlük uygulanacak faiz oranını belirleyin." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] mb-1", children: "Günlük Faiz Oranı (%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "dues.input",
              type: "number",
              step: "0.01",
              min: "0",
              value: rateInput,
              onChange: (e) => setRateInput(e.target.value),
              placeholder: "0.1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1", children: [
            "Aylık karşılığı: %",
            (Number(rateInput) * 30).toFixed(1)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "dues.submit_button",
            onClick: handleSaveRate,
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: "Kaydet"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DuesTracking as default
};
