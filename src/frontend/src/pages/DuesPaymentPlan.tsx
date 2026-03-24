import { ListOrdered, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface Installment {
  no: number;
  dueDate: string;
  amount: number;
  paid: boolean;
}

interface PaymentPlan {
  id: string;
  apartment: string;
  totalDebt: number;
  installmentCount: number;
  startMonth: string;
  installments: Installment[];
  status: "active" | "completed";
  createdAt: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_payment_plans_${id}`;

function generateInstallments(
  total: number,
  count: number,
  startMonth: string,
): Installment[] {
  const amount = Math.round(total / count);
  const [year, month] = startMonth.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(year, month - 1 + i, 1);
    return {
      no: i + 1,
      dueDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`,
      amount: i === count - 1 ? total - amount * (count - 1) : amount,
      paid: false,
    };
  });
}

function AccessDenied() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5EAF2] text-center">
      <ListOrdered className="w-12 h-12 text-[#6B7A8D] mx-auto mb-3" />
      <p className="text-lg font-semibold text-[#3A4654]">
        Bu modüle erişim yetkiniz yok.
      </p>
      <p className="text-sm text-[#6B7A8D] mt-1">
        Taksit planları yalnızca yöneticiler tarafından görüntülenebilir.
      </p>
    </div>
  );
}

export default function DuesPaymentPlan({ buildingId, isOwner }: Props) {
  const today = new Date();
  const defaultStartMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const [plans, setPlans] = useState<PaymentPlan[]>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    const sm = defaultStartMonth;
    return [
      {
        id: "pp1",
        apartment: "D-4",
        totalDebt: 15000,
        installmentCount: 3,
        startMonth: sm,
        installments: generateInstallments(15000, 3, sm),
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: "pp2",
        apartment: "A-9",
        totalDebt: 8400,
        installmentCount: 4,
        startMonth: sm,
        installments: generateInstallments(8400, 4, sm).map((inst, i) => ({
          ...inst,
          paid: i < 2,
        })),
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    apartment: "",
    totalDebt: "",
    installmentCount: "3",
    startMonth: defaultStartMonth,
  });

  if (!isOwner) return <AccessDenied />;

  const save = (list: PaymentPlan[]) => {
    setPlans(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleCreate = () => {
    if (!form.apartment || !form.totalDebt) return;
    const count = Math.min(12, Math.max(2, Number(form.installmentCount)));
    const plan: PaymentPlan = {
      id: Date.now().toString(),
      apartment: form.apartment,
      totalDebt: Number(form.totalDebt),
      installmentCount: count,
      startMonth: form.startMonth,
      installments: generateInstallments(
        Number(form.totalDebt),
        count,
        form.startMonth,
      ),
      status: "active",
      createdAt: new Date().toISOString(),
    };
    save([plan, ...plans]);
    setShowForm(false);
    setForm({
      apartment: "",
      totalDebt: "",
      installmentCount: "3",
      startMonth: defaultStartMonth,
    });
  };

  const togglePaid = (planId: string, instNo: number) => {
    const updated = plans.map((p) => {
      if (p.id !== planId) return p;
      const installments = p.installments.map((inst) =>
        inst.no === instNo ? { ...inst, paid: !inst.paid } : inst,
      );
      const allPaid = installments.every((i) => i.paid);
      return {
        ...p,
        installments,
        status: allPaid ? ("completed" as const) : ("active" as const),
      };
    });
    save(updated);
  };

  const activePlans = plans.filter((p) => p.status === "active").length;
  const totalDebt = plans.reduce((s, p) => s + p.totalDebt, 0);
  const totalCollected = plans.reduce(
    (s, p) =>
      s +
      p.installments.filter((i) => i.paid).reduce((a, i) => a + i.amount, 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-6 h-6 text-[#0B1B2E]" />
          <h2 className="text-xl font-bold text-[#0E1116]">
            Aidat Taksit Planları
          </h2>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
        >
          <Plus className="w-4 h-4" /> Taksit Planı Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Aktif Planlar", val: activePlans, color: "text-[#0B1B2E]" },
          {
            label: "Toplam Borç",
            val: `₺${totalDebt.toLocaleString("tr-TR")}`,
            color: "text-red-600",
          },
          {
            label: "Tahsil Edilen",
            val: `₺${totalCollected.toLocaleString("tr-TR")}`,
            color: "text-green-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-sm text-[#6B7A8D] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {plans.map((plan) => {
          const paidCount = plan.installments.filter((i) => i.paid).length;
          return (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2]"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0E1116]">
                      {plan.apartment}
                    </span>
                    <Badge
                      className={`border-0 text-xs ${plan.status === "active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                    >
                      {plan.status === "active" ? "Aktif" : "Tamamlandı"}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(expanded === plan.id ? null : plan.id)
                    }
                    className="text-xs text-[#4A90D9] hover:underline"
                  >
                    {expanded === plan.id ? "Gizle" : "Taksitleri Gör"}
                  </button>
                </div>
                <div className="flex gap-6 mt-2 text-sm text-[#3A4654]">
                  <span>
                    Toplam:{" "}
                    <strong className="text-[#0E1116]">
                      ₺{plan.totalDebt.toLocaleString("tr-TR")}
                    </strong>
                  </span>
                  <span>{plan.installmentCount} taksit</span>
                  <span>
                    Ödenen:{" "}
                    <strong className="text-green-600">
                      {paidCount}/{plan.installmentCount}
                    </strong>
                  </span>
                </div>
              </div>
              {expanded === plan.id && (
                <div className="border-t border-[#F3F6FB] px-5 py-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5EAF2]">
                        <th className="text-left py-1.5 text-[#6B7A8D] font-medium">
                          #
                        </th>
                        <th className="text-left py-1.5 text-[#6B7A8D] font-medium">
                          Vade
                        </th>
                        <th className="text-right py-1.5 text-[#6B7A8D] font-medium">
                          Tutar
                        </th>
                        <th className="text-center py-1.5 text-[#6B7A8D] font-medium">
                          Ödendi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.installments.map((inst) => (
                        <tr
                          key={inst.no}
                          className={`border-b border-[#F3F6FB] ${inst.paid ? "opacity-60" : ""}`}
                        >
                          <td className="py-2">{inst.no}</td>
                          <td className="py-2">{inst.dueDate}</td>
                          <td className="py-2 text-right font-medium">
                            ₺{inst.amount.toLocaleString("tr-TR")}
                          </td>
                          <td className="py-2 text-center">
                            <Checkbox
                              checked={inst.paid}
                              onCheckedChange={() =>
                                togglePaid(plan.id, inst.no)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
        {plans.length === 0 && (
          <p className="text-[#3A4654] text-center py-10">
            Henüz taksit planı oluşturulmamış.
          </p>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yeni Taksit Planı</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Daire No</p>
              <Input
                value={form.apartment}
                onChange={(e) =>
                  setForm((f) => ({ ...f, apartment: e.target.value }))
                }
                placeholder="A-9"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Toplam Borç (₺)</p>
              <Input
                type="number"
                value={form.totalDebt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, totalDebt: e.target.value }))
                }
                placeholder="0"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Taksit Sayısı (2-12)</p>
              <Input
                type="number"
                min="2"
                max="12"
                value={form.installmentCount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, installmentCount: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Başlangıç Ayı</p>
              <Input
                type="month"
                value={form.startMonth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startMonth: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={!form.apartment || !form.totalDebt}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Plan Oluştur
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
