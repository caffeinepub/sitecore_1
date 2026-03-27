import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, I as Input, e as Badge, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-CwbyKW_q.js";
import { T as Trash2 } from "./trash-2-CcykOvVb.js";
const EXP_KEY = (id) => `sitecore_expenses_${id}`;
const BUDGET_KEY = (id) => `sitecore_exp_budget_${id}`;
const CATEGORIES = [
  "electricity",
  "water",
  "cleaning",
  "elevator",
  "other"
];
const CAT_COLORS = {
  electricity: "bg-yellow-100 text-yellow-700",
  water: "bg-blue-100 text-blue-700",
  cleaning: "bg-green-100 text-green-700",
  elevator: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-600"
};
function ExpenseTracking({ buildingId, isOwner, t }) {
  const [expenses, setExpenses] = reactExports.useState([]);
  const [filterCat, setFilterCat] = reactExports.useState("all");
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [monthlyBudget, setMonthlyBudget] = reactExports.useState(1e4);
  const [editBudget, setEditBudget] = reactExports.useState(false);
  const [budgetInput, setBudgetInput] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    title: "",
    amount: "",
    category: "other",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    note: "",
    vendor: ""
  });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(EXP_KEY(buildingId));
    if (raw) setExpenses(JSON.parse(raw));
    const b = localStorage.getItem(BUDGET_KEY(buildingId));
    if (b) setMonthlyBudget(Number(b));
  }, [buildingId]);
  const save = (updated) => {
    setExpenses(updated);
    localStorage.setItem(EXP_KEY(buildingId), JSON.stringify(updated));
  };
  const saveBudget = (val) => {
    setMonthlyBudget(val);
    localStorage.setItem(BUDGET_KEY(buildingId), String(val));
  };
  const resetForm = () => setForm({
    title: "",
    amount: "",
    category: "other",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    note: "",
    vendor: ""
  });
  const handleAdd = () => {
    if (!form.title.trim() || !form.amount) return;
    const exp = {
      id: crypto.randomUUID(),
      buildingId,
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note.trim(),
      vendor: form.vendor.trim(),
      createdAt: Date.now()
    };
    save([exp, ...expenses]);
    setShowDialog(false);
    resetForm();
  };
  const handleDelete = (id) => save(expenses.filter((e) => e.id !== id));
  const catLabel = (cat) => {
    const labels = {
      electricity: t.catElectricity,
      water: t.catWater,
      cleaning: t.catCleaning,
      elevator: t.catElevator,
      other: t.catOther
    };
    return labels[cat];
  };
  const filtered = filterCat === "all" ? expenses : expenses.filter((e) => e.category === filterCat);
  const total = filtered.reduce((s, e) => s + e.amount, 0);
  const catTotals = CATEGORIES.map((cat) => ({
    cat,
    total: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0)
  }));
  const monthlyData = {};
  for (const e of expenses) {
    const m = e.date.slice(0, 7);
    monthlyData[m] = (monthlyData[m] || 0) + e.amount;
  }
  const trendMonths = Object.keys(monthlyData).sort().slice(-6);
  const trendValues = trendMonths.map((m) => monthlyData[m]);
  const maxVal = Math.max(...trendValues, 1);
  const thisMonth = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const thisMonthTotal = monthlyData[thisMonth] || 0;
  const budgetUsedPct = Math.min(
    Math.round(thisMonthTotal / monthlyBudget * 100),
    100
  );
  const overBudget = thisMonthTotal > monthlyBudget;
  const vendorTotals = {};
  for (const e of expenses) {
    const v = e.vendor || "Belirtilmemiş";
    vendorTotals[v] = (vendorTotals[v] || 0) + e.amount;
  }
  const vendors = Object.entries(vendorTotals).sort((a, b) => b[1] - a[1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.expenses }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "expenses.primary_button",
          onClick: () => setShowDialog(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            t.addExpense
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: "Bu Ay Bütçe Takibi" }),
        isOwner && (editBudget ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: budgetInput,
              onChange: (e) => setBudgetInput(e.target.value),
              className: "w-24 h-7 text-xs"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "h-7 text-xs rounded-full bg-[#4A90D9] text-white",
              onClick: () => {
                saveBudget(Number(budgetInput) || monthlyBudget);
                setEditBudget(false);
              },
              children: "Kaydet"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-7 text-xs rounded-full",
            onClick: () => {
              setBudgetInput(String(monthlyBudget));
              setEditBudget(true);
            },
            children: "Bütçe Düzenle"
          }
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: overBudget ? "text-red-600 font-semibold" : "text-[#3A4654]",
            children: [
              thisMonthTotal.toLocaleString(),
              " ₺ harcandı"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#3A4654]", children: [
          monthlyBudget.toLocaleString(),
          " ₺ bütçe"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-[#F3F6FB] rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full transition-all ${overBudget ? "bg-red-500" : budgetUsedPct > 80 ? "bg-orange-400" : "bg-green-500"}`,
          style: { width: `${budgetUsedPct}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1", children: [
        budgetUsedPct,
        "% kullanıldı",
        overBudget ? " — Bütçe aşıldı!" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6", children: catTotals.map(({ cat, total: catTotal }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-[#0B1B2E]", children: [
            catTotal.toLocaleString(),
            " ₺"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${CAT_COLORS[cat]} border-0 text-xs mt-1`, children: catLabel(cat) })
        ]
      },
      cat
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Gider Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "trend", children: "Aylık Trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "vendor", children: "Tedarikçi Bazlı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setFilterCat("all"),
              size: "sm",
              variant: filterCat === "all" ? "default" : "outline",
              className: `rounded-full text-xs ${filterCat === "all" ? "bg-[#0B1B2E] text-white" : ""}`,
              children: [
                "Tümü (",
                expenses.length,
                ")"
              ]
            }
          ),
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "expenses.toggle",
              onClick: () => setFilterCat(filterCat === cat ? "all" : cat),
              size: "sm",
              variant: filterCat === cat ? "default" : "outline",
              className: `rounded-full text-xs ${filterCat === cat ? "bg-[#4A90D9] text-white" : ""}`,
              children: catLabel(cat)
            },
            cat
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654] font-medium", children: t.totalExpenses }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-[#0B1B2E]", children: [
            total.toLocaleString(),
            " ₺"
          ] })
        ] }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "expenses.empty_state",
            className: "py-10 text-center text-[#3A4654]",
            children: t.noExpenses
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `expenses.item.${idx + 1}`,
            className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: exp.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${CAT_COLORS[exp.category]} border-0 text-xs`,
                      children: catLabel(exp.category)
                    }
                  ),
                  exp.vendor && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: exp.vendor })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-[#0B1B2E]", children: [
                    exp.amount.toLocaleString(),
                    " ₺"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]/60", children: exp.date }),
                  exp.note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: exp.note })
                ] })
              ] }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `expenses.delete_button.${idx + 1}`,
                  onClick: () => handleDelete(exp.id),
                  variant: "ghost",
                  size: "sm",
                  className: "text-red-400 hover:text-red-600 h-8 w-8 p-0 ml-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ]
          },
          exp.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "trend", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116] mb-1", children: "Aylık Gider Trendi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-6", children: "Son 6 ay, ₺ cinsinden" }),
        trendMonths.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#6B7A8D] py-10", children: "Yeterli veri yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-48", children: trendMonths.map((month, i) => {
          const val = trendValues[i];
          const height = Math.max(val / maxVal * 100, 4);
          const isThis = month === thisMonth;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-[#0E1116]", children: [
                  (val / 1e3).toFixed(1),
                  "k"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-full rounded-t-lg ${isThis ? "bg-[#4A90D9]" : "bg-[#C3D9F5]"}`,
                    style: { height: `${height}%` }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] truncate w-full text-center", children: month.slice(5) })
              ]
            },
            month
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "vendor", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116] mb-4", children: "Tedarikçi Bazlı Giderler" }),
        vendors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#6B7A8D] py-8", children: "Tedarikçi verisi yok. Gider eklerken tedarikçi belirtin." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: vendors.map(([vendor, total2]) => {
          const pct = Math.round(
            total2 / (expenses.reduce((s, e) => s + e.amount, 0) || 1) * 100
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: vendor }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#3A4654]", children: [
                total2.toLocaleString(),
                " ₺ (",
                pct,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-[#F3F6FB] rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-[#4A90D9] rounded-full",
                style: { width: `${pct}%` }
              }
            ) })
          ] }, vendor);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addExpense }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
            t.expenseTitle,
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "expenses.input",
              value: form.title,
              onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "Asansör bakımı..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: [
              t.expenseAmount,
              " (₺) *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.amount,
                onChange: (e) => setForm((p) => ({ ...p, amount: e.target.value })),
                placeholder: "1500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.expenseDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.date,
                onChange: (e) => setForm((p) => ({ ...p, date: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.expenseCategory }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.category,
              onChange: (e) => setForm((p) => ({
                ...p,
                category: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
              children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: catLabel(cat) }, cat))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Tedarikçi / Firma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.vendor,
              onChange: (e) => setForm((p) => ({ ...p, vendor: e.target.value })),
              placeholder: "Firma adı..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.note,
              onChange: (e) => setForm((p) => ({ ...p, note: e.target.value })),
              placeholder: "Not..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "expenses.submit_button",
            onClick: handleAdd,
            disabled: !form.title.trim() || !form.amount,
            className: "w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full",
            children: t.addExpense
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ExpenseTracking as default
};
