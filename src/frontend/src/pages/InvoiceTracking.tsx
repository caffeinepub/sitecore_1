import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Receipt,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

type InvoiceStatus = "Ödendi" | "Bekliyor" | "Gecikmiş";
type InvoiceType = "Su" | "Elektrik" | "Doğalgaz" | "Aidat" | "Diğer";

interface Invoice {
  id: string;
  apartmentNo: string;
  type: InvoiceType;
  period: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  description: string;
  paidAt: string | null;
}

const MONTHLY_DATA = [
  { ay: "Ekim", tahsil: 18400, bekleyen: 3200 },
  { ay: "Kasım", tahsil: 21200, bekleyen: 2800 },
  { ay: "Aralık", tahsil: 19800, bekleyen: 4100 },
  { ay: "Ocak", tahsil: 22600, bekleyen: 3600 },
  { ay: "Şubat", tahsil: 20100, bekleyen: 2900 },
  { ay: "Mart", tahsil: 16800, bekleyen: 5400 },
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "1",
    apartmentNo: "A-101",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-10",
  },
  {
    id: "2",
    apartmentNo: "A-102",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Gecikmiş",
    description: "Aylık aidat",
    paidAt: null,
  },
  {
    id: "3",
    apartmentNo: "B-201",
    type: "Su",
    period: "Mart 2026",
    amount: 320,
    dueDate: "2026-03-20",
    status: "Bekliyor",
    description: "Mart ayı su faturası",
    paidAt: null,
  },
  {
    id: "4",
    apartmentNo: "B-202",
    type: "Su",
    period: "Mart 2026",
    amount: 290,
    dueDate: "2026-03-20",
    status: "Ödendi",
    description: "Mart ayı su faturası",
    paidAt: "2026-03-18",
  },
  {
    id: "5",
    apartmentNo: "C-301",
    type: "Doğalgaz",
    period: "Şubat 2026",
    amount: 540,
    dueDate: "2026-03-10",
    status: "Gecikmiş",
    description: "Şubat ayı doğalgaz",
    paidAt: null,
  },
  {
    id: "6",
    apartmentNo: "A-103",
    type: "Elektrik",
    period: "Mart 2026",
    amount: 410,
    dueDate: "2026-03-25",
    status: "Bekliyor",
    description: "Ortak alan elektrik payı",
    paidAt: null,
  },
  {
    id: "7",
    apartmentNo: "D-401",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-12",
  },
  {
    id: "8",
    apartmentNo: "B-203",
    type: "Aidat",
    period: "Şubat 2026",
    amount: 850,
    dueDate: "2026-02-15",
    status: "Gecikmiş",
    description: "Şubat aidatı gecikmiş",
    paidAt: null,
  },
  {
    id: "9",
    apartmentNo: "C-302",
    type: "Su",
    period: "Mart 2026",
    amount: 380,
    dueDate: "2026-03-20",
    status: "Ödendi",
    description: "Mart ayı su faturası",
    paidAt: "2026-03-19",
  },
  {
    id: "10",
    apartmentNo: "A-104",
    type: "Doğalgaz",
    period: "Mart 2026",
    amount: 620,
    dueDate: "2026-03-22",
    status: "Bekliyor",
    description: "Mart ayı doğalgaz faturası",
    paidAt: null,
  },
  {
    id: "11",
    apartmentNo: "D-402",
    type: "Elektrik",
    period: "Şubat 2026",
    amount: 390,
    dueDate: "2026-02-25",
    status: "Gecikmiş",
    description: "Ortak alan elektrik payı",
    paidAt: null,
  },
  {
    id: "12",
    apartmentNo: "B-204",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-08",
  },
  {
    id: "13",
    apartmentNo: "C-303",
    type: "Diğer",
    period: "Mart 2026",
    amount: 200,
    dueDate: "2026-03-30",
    status: "Bekliyor",
    description: "Asansör bakım payı",
    paidAt: null,
  },
  {
    id: "14",
    apartmentNo: "A-105",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-14",
  },
  {
    id: "15",
    apartmentNo: "D-403",
    type: "Su",
    period: "Ocak 2026",
    amount: 310,
    dueDate: "2026-02-10",
    status: "Gecikmiş",
    description: "Ocak ayı su faturası gecikmeli",
    paidAt: null,
  },
];

const STATUS_CONFIG: Record<
  InvoiceStatus,
  { color: string; icon: React.ReactNode }
> = {
  Ödendi: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  Bekliyor: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <Clock className="w-3 h-3" />,
  },
  Gecikmiş: {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: <AlertCircle className="w-3 h-3" />,
  },
};

const TYPE_COLORS: Record<InvoiceType, string> = {
  Su: "bg-blue-100 text-blue-700",
  Elektrik: "bg-yellow-100 text-yellow-700",
  Doğalgaz: "bg-orange-100 text-orange-700",
  Aidat: "bg-purple-100 text-purple-700",
  Diğer: "bg-gray-100 text-gray-600",
};

export default function InvoiceTracking({
  buildingId: _buildingId,
  isOwner,
}: {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}) {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tümü");
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [filterPeriod, setFilterPeriod] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    apartmentNo: "",
    type: "Aidat" as InvoiceType,
    period: "Mart 2026",
    amount: "",
    dueDate: "",
    description: "",
  });

  const stats = {
    total: invoices.length,
    collected: invoices
      .filter((i) => i.status === "Ödendi")
      .reduce((s, i) => s + i.amount, 0),
    pending: invoices
      .filter((i) => i.status === "Bekliyor")
      .reduce((s, i) => s + i.amount, 0),
    overdue: invoices
      .filter((i) => i.status === "Gecikmiş")
      .reduce((s, i) => s + i.amount, 0),
  };

  const periods = [
    "Tümü",
    ...Array.from(new Set(invoices.map((i) => i.period))),
  ];

  const filtered = invoices.filter((i) => {
    const matchSearch =
      i.apartmentNo.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Tümü" || i.type === filterType;
    const matchStatus = filterStatus === "Tümü" || i.status === filterStatus;
    const matchPeriod = filterPeriod === "Tümü" || i.period === filterPeriod;
    return matchSearch && matchType && matchStatus && matchPeriod;
  });

  function handleCreate() {
    if (!form.apartmentNo || !form.amount || !form.dueDate) return;
    const inv: Invoice = {
      id: Date.now().toString(),
      apartmentNo: form.apartmentNo,
      type: form.type,
      period: form.period,
      amount: Number(form.amount),
      dueDate: form.dueDate,
      status: "Bekliyor",
      description: form.description,
      paidAt: null,
    };
    setInvoices((prev) => [inv, ...prev]);
    setShowForm(false);
    setForm({
      apartmentNo: "",
      type: "Aidat",
      period: "Mart 2026",
      amount: "",
      dueDate: "",
      description: "",
    });
  }

  function markAsPaid(id: string) {
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              status: "Ödendi" as InvoiceStatus,
              paidAt: new Date().toISOString().split("T")[0],
            }
          : i,
      ),
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1116]">
            Fatura & Servis Bedeli Takibi
          </h1>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Daire bazlı fatura ve servis ödemelerini yönetin
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
            data-ocid="invoice.open_modal_button"
          >
            <Plus className="w-4 h-4" /> Yeni Fatura
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Toplam Fatura",
            value: stats.total,
            isCount: true,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
            Icon: FileText,
          },
          {
            label: "Tahsil Edilen",
            value: stats.collected,
            isCount: false,
            color: "bg-green-100",
            iconColor: "text-green-600",
            Icon: CheckCircle2,
          },
          {
            label: "Bekleyen",
            value: stats.pending,
            isCount: false,
            color: "bg-yellow-100",
            iconColor: "text-yellow-600",
            Icon: Clock,
          },
          {
            label: "Gecikmiş",
            value: stats.overdue,
            isCount: false,
            color: "bg-red-100",
            iconColor: "text-red-600",
            Icon: AlertCircle,
          },
        ].map(({ label, value, isCount, color, iconColor, Icon }) => (
          <Card key={label} className="bg-white border-none shadow-sm">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0E1116]">
                    {isCount ? value : `₺${value.toLocaleString("tr-TR")}`}
                  </p>
                  <p className="text-xs text-[#6B7A8D]">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="bg-white border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#4A90D9]" />
            Aylık Tahsilat Analizi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={MONTHLY_DATA}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F8" />
              <XAxis
                dataKey="ay"
                tick={{ fontSize: 12, fill: "#6B7A8D" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7A8D" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `₺${value.toLocaleString("tr-TR")}`,
                  name === "tahsil" ? "Tahsil Edilen" : "Bekleyen",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5EAF2",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="tahsil"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                name="tahsil"
              />
              <Bar
                dataKey="bekleyen"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                name="bekleyen"
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            <span className="flex items-center gap-1.5 text-xs text-[#6B7A8D]">
              <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />{" "}
              Tahsil Edilen
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7A8D]">
              <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" />{" "}
              Bekleyen
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Daire veya açıklama ara..."
            className="pl-9"
            data-ocid="invoice.search_input"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
          data-ocid="invoice.select"
        >
          <option>Tümü</option>
          {(
            ["Su", "Elektrik", "Doğalgaz", "Aidat", "Diğer"] as InvoiceType[]
          ).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
        >
          <option>Tümü</option>
          {(["Ödendi", "Bekliyor", "Gecikmiş"] as InvoiceStatus[]).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          className="border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
        >
          {periods.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl shadow-sm overflow-hidden"
        data-ocid="invoice.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F1F4F8]">
              <tr>
                {[
                  "Daire",
                  "Fatura Türü",
                  "Dönem",
                  "Tutar",
                  "Son Ödeme",
                  "Durum",
                  "İşlemler",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-[#6B7A8D] uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F4F8]">
              {filtered.map((inv, idx) => {
                const sc = STATUS_CONFIG[inv.status];
                return (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                    data-ocid={`invoice.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-[#0E1116]">
                        {inv.apartmentNo}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[inv.type]}`}
                      >
                        {inv.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#3A4654]">{inv.period}</td>
                    <td className="px-4 py-3 font-semibold text-[#0E1116]">
                      ₺{inv.amount.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 text-[#6B7A8D]">{inv.dueDate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}
                      >
                        {sc.icon}
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {inv.status !== "Ödendi" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs gap-1 h-7 border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => markAsPaid(inv.id)}
                          data-ocid={`invoice.confirm_button.${idx + 1}`}
                        >
                          <CheckCircle2 className="w-3 h-3" /> Ödendi
                        </Button>
                      ) : (
                        <span className="text-xs text-[#6B7A8D]">
                          {inv.paidAt}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-[#6B7A8D]"
              data-ocid="invoice.empty_state"
            >
              <Receipt className="w-8 h-8 mx-auto mb-2 text-[#B0BAC7]" />
              <p>Fatura bulunamadı</p>
            </div>
          )}
        </div>
      </div>

      {/* New Invoice Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md" data-ocid="invoice.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Fatura Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Daire No (örn. A-101)"
              value={form.apartmentNo}
              onChange={(e) =>
                setForm((p) => ({ ...p, apartmentNo: e.target.value }))
              }
              data-ocid="invoice.input"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Fatura Türü</p>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      type: e.target.value as InvoiceType,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {(
                    [
                      "Su",
                      "Elektrik",
                      "Doğalgaz",
                      "Aidat",
                      "Diğer",
                    ] as InvoiceType[]
                  ).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Dönem</p>
                <Input
                  placeholder="örn. Mart 2026"
                  value={form.period}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, period: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">Tutar (₺)</p>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, amount: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-xs text-[#6B7A8D] mb-1 block">
                  Son Ödeme Tarihi
                </p>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#6B7A8D] mb-1 block">Açıklama</p>
              <Input
                placeholder="Fatura açıklaması"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="invoice.textarea"
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={!form.apartmentNo || !form.amount || !form.dueDate}
              className="w-full bg-[#0B1B2E] text-white rounded-full"
              data-ocid="invoice.submit_button"
            >
              Fatura Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
