import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import type { Expense } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const EXP_KEY = (id: string) => `sitecore_expenses_${id}`;

type Category = Expense["category"];

const CATEGORIES: Category[] = [
  "electricity",
  "water",
  "cleaning",
  "elevator",
  "other",
];

const CAT_COLORS: Record<Category, string> = {
  electricity: "bg-yellow-100 text-yellow-700",
  water: "bg-blue-100 text-blue-700",
  cleaning: "bg-green-100 text-green-700",
  elevator: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-600",
};

export default function ExpenseTracking({ buildingId, isOwner, t }: Props) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCat, setFilterCat] = useState<Category | "all">("all");
  const [showDialog, setShowDialog] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "other" as Category,
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(EXP_KEY(buildingId));
    if (raw) setExpenses(JSON.parse(raw));
  }, [buildingId]);

  const save = (updated: Expense[]) => {
    setExpenses(updated);
    localStorage.setItem(EXP_KEY(buildingId), JSON.stringify(updated));
  };

  const resetForm = () =>
    setForm({
      title: "",
      amount: "",
      category: "other",
      date: new Date().toISOString().slice(0, 10),
      note: "",
    });

  const handleAdd = () => {
    if (!form.title.trim() || !form.amount) return;
    const exp: Expense = {
      id: crypto.randomUUID(),
      buildingId,
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note.trim(),
      createdAt: Date.now(),
    };
    save([exp, ...expenses]);
    setShowDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) =>
    save(expenses.filter((e) => e.id !== id));

  const catLabel = (cat: Category) => {
    const labels: Record<Category, string> = {
      electricity: t.catElectricity,
      water: t.catWater,
      cleaning: t.catCleaning,
      elevator: t.catElevator,
      other: t.catOther,
    };
    return labels[cat];
  };

  const filtered =
    filterCat === "all"
      ? expenses
      : expenses.filter((e) => e.category === filterCat);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const catTotals = CATEGORIES.map((cat) => ({
    cat,
    total: expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.expenses}</h2>
        {isOwner && (
          <Button
            data-ocid="expenses.primary_button"
            onClick={() => setShowDialog(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.addExpense}
          </Button>
        )}
      </div>

      {/* Category summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {catTotals.map(({ cat, total: catTotal }) => (
          <div
            key={cat}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
          >
            <p className="text-lg font-bold text-[#0B1B2E]">
              {catTotal.toLocaleString()} ₺
            </p>
            <Badge className={`${CAT_COLORS[cat]} border-0 text-xs mt-1`}>
              {catLabel(cat)}
            </Badge>
          </div>
        ))}
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          onClick={() => setFilterCat("all")}
          size="sm"
          variant={filterCat === "all" ? "default" : "outline"}
          className={`rounded-full text-xs ${filterCat === "all" ? "bg-[#0B1B2E] text-white" : ""}`}
        >
          Tümü ({expenses.length})
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            data-ocid="expenses.toggle"
            onClick={() => setFilterCat(filterCat === cat ? "all" : cat)}
            size="sm"
            variant={filterCat === cat ? "default" : "outline"}
            className={`rounded-full text-xs ${filterCat === cat ? "bg-[#4A90D9] text-white" : ""}`}
          >
            {catLabel(cat)}
          </Button>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] mb-4 flex items-center justify-between">
        <span className="text-[#3A4654] font-medium">{t.totalExpenses}</span>
        <span className="text-2xl font-bold text-[#0B1B2E]">
          {total.toLocaleString()} ₺
        </span>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          data-ocid="expenses.empty_state"
          className="py-10 text-center text-[#3A4654]"
        >
          {t.noExpenses}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exp, idx) => (
            <div
              key={exp.id}
              data-ocid={`expenses.item.${idx + 1}`}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#0E1116]">
                    {exp.title}
                  </span>
                  <Badge
                    className={`${CAT_COLORS[exp.category]} border-0 text-xs`}
                  >
                    {catLabel(exp.category)}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#0B1B2E]">
                    {exp.amount.toLocaleString()} ₺
                  </span>
                  <span className="text-xs text-[#3A4654]/60">{exp.date}</span>
                  {exp.note && (
                    <span className="text-xs text-[#3A4654]">{exp.note}</span>
                  )}
                </div>
              </div>
              {isOwner && (
                <Button
                  data-ocid={`expenses.delete_button.${idx + 1}`}
                  onClick={() => handleDelete(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-600 h-8 w-8 p-0 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.addExpense}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.expenseTitle} *
              </p>
              <Input
                data-ocid="expenses.input"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Asansör bakımı..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.expenseAmount} (₺) *
                </p>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: e.target.value }))
                  }
                  placeholder="1500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.expenseDate}
                </p>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.expenseCategory}
              </p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    category: e.target.value as Category,
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {catLabel(cat)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.description}
              </p>
              <Input
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
                placeholder="Not..."
              />
            </div>
            <Button
              data-ocid="expenses.submit_button"
              onClick={handleAdd}
              disabled={!form.title.trim() || !form.amount}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.addExpense}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
