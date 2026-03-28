import { r as reactExports, j as jsxRuntimeExports, L as ListOrdered, B as Button, P as Plus, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-B-5F0xzF.js";
import { C as Checkbox } from "./checkbox-Bl5x2lvH.js";
import "./index-BHZaq3-H.js";
const KEY = (id) => `sitecore_payment_plans_${id}`;
function generateInstallments(total, count, startMonth) {
  const amount = Math.round(total / count);
  const [year, month] = startMonth.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(year, month - 1 + i, 1);
    return {
      no: i + 1,
      dueDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`,
      amount: i === count - 1 ? total - amount * (count - 1) : amount,
      paid: false
    };
  });
}
function AccessDenied() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-[#E5EAF2] text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-12 h-12 text-[#6B7A8D] mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-[#3A4654]", children: "Bu modüle erişim yetkiniz yok." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Taksit planları yalnızca yöneticiler tarafından görüntülenebilir." })
  ] });
}
function DuesPaymentPlan({ buildingId, isOwner }) {
  const today = /* @__PURE__ */ new Date();
  const defaultStartMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [plans, setPlans] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    const sm = defaultStartMonth;
    return [
      {
        id: "pp1",
        apartment: "D-4",
        totalDebt: 15e3,
        installmentCount: 3,
        startMonth: sm,
        installments: generateInstallments(15e3, 3, sm),
        status: "active",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "pp2",
        apartment: "A-9",
        totalDebt: 8400,
        installmentCount: 4,
        startMonth: sm,
        installments: generateInstallments(8400, 4, sm).map((inst, i) => ({
          ...inst,
          paid: i < 2
        })),
        status: "active",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
  });
  const [expanded, setExpanded] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    apartment: "",
    totalDebt: "",
    installmentCount: "3",
    startMonth: defaultStartMonth
  });
  if (!isOwner) return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, {});
  const save = (list) => {
    setPlans(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };
  const handleCreate = () => {
    if (!form.apartment || !form.totalDebt) return;
    const count = Math.min(12, Math.max(2, Number(form.installmentCount)));
    const plan = {
      id: Date.now().toString(),
      apartment: form.apartment,
      totalDebt: Number(form.totalDebt),
      installmentCount: count,
      startMonth: form.startMonth,
      installments: generateInstallments(
        Number(form.totalDebt),
        count,
        form.startMonth
      ),
      status: "active",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    save([plan, ...plans]);
    setShowForm(false);
    setForm({
      apartment: "",
      totalDebt: "",
      installmentCount: "3",
      startMonth: defaultStartMonth
    });
  };
  const togglePaid = (planId, instNo) => {
    const updated = plans.map((p) => {
      if (p.id !== planId) return p;
      const installments = p.installments.map(
        (inst) => inst.no === instNo ? { ...inst, paid: !inst.paid } : inst
      );
      const allPaid = installments.every((i) => i.paid);
      return {
        ...p,
        installments,
        status: allPaid ? "completed" : "active"
      };
    });
    save(updated);
  };
  const activePlans = plans.filter((p) => p.status === "active").length;
  const totalDebt = plans.reduce((s, p) => s + p.totalDebt, 0);
  const totalCollected = plans.reduce(
    (s, p) => s + p.installments.filter((i) => i.paid).reduce((a, i) => a + i.amount, 0),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-6 h-6 text-[#0B1B2E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Aidat Taksit Planları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Taksit Planı Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      { label: "Aktif Planlar", val: activePlans, color: "text-[#0B1B2E]" },
      {
        label: "Toplam Borç",
        val: `₺${totalDebt.toLocaleString("tr-TR")}`,
        color: "text-red-600"
      },
      {
        label: "Tahsil Edilen",
        val: `₺${totalCollected.toLocaleString("tr-TR")}`,
        color: "text-green-600"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.val }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      plans.map((plan) => {
        const paidCount = plan.installments.filter((i) => i.paid).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#0E1116]", children: plan.apartment }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `border-0 text-xs ${plan.status === "active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`,
                        children: plan.status === "active" ? "Aktif" : "Tamamlandı"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExpanded(expanded === plan.id ? null : plan.id),
                      className: "text-xs text-[#4A90D9] hover:underline",
                      children: expanded === plan.id ? "Gizle" : "Taksitleri Gör"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 mt-2 text-sm text-[#3A4654]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Toplam:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-[#0E1116]", children: [
                      "₺",
                      plan.totalDebt.toLocaleString("tr-TR")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    plan.installmentCount,
                    " taksit"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Ödenen:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-green-600", children: [
                      paidCount,
                      "/",
                      plan.installmentCount
                    ] })
                  ] })
                ] })
              ] }),
              expanded === plan.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[#F3F6FB] px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#E5EAF2]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 text-[#6B7A8D] font-medium", children: "#" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 text-[#6B7A8D] font-medium", children: "Vade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1.5 text-[#6B7A8D] font-medium", children: "Tutar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-1.5 text-[#6B7A8D] font-medium", children: "Ödendi" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: plan.installments.map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: `border-b border-[#F3F6FB] ${inst.paid ? "opacity-60" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: inst.no }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: inst.dueDate }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-medium", children: [
                        "₺",
                        inst.amount.toLocaleString("tr-TR")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          checked: inst.paid,
                          onCheckedChange: () => togglePaid(plan.id, inst.no)
                        }
                      ) })
                    ]
                  },
                  inst.no
                )) })
              ] }) })
            ]
          },
          plan.id
        );
      }),
      plans.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-center py-10", children: "Henüz taksit planı oluşturulmamış." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Taksit Planı" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Daire No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.apartment,
              onChange: (e) => setForm((f) => ({ ...f, apartment: e.target.value })),
              placeholder: "A-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Toplam Borç (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.totalDebt,
              onChange: (e) => setForm((f) => ({ ...f, totalDebt: e.target.value })),
              placeholder: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Taksit Sayısı (2-12)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "2",
              max: "12",
              value: form.installmentCount,
              onChange: (e) => setForm((f) => ({ ...f, installmentCount: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başlangıç Ayı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: form.startMonth,
              onChange: (e) => setForm((f) => ({ ...f, startMonth: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCreate,
            disabled: !form.apartment || !form.totalDebt,
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Plan Oluştur"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DuesPaymentPlan as default
};
