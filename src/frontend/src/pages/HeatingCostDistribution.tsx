import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Flame, Plus, TrendingUp, Wallet } from "lucide-react";
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

interface HeatingCostDistributionProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

interface Apartment {
  no: string;
  m2: number;
  occupants: number;
  paid: boolean;
}

const apartments: Apartment[] = [
  { no: "1A", m2: 85, occupants: 3, paid: true },
  { no: "1B", m2: 70, occupants: 2, paid: false },
  { no: "1C", m2: 95, occupants: 4, paid: true },
  { no: "2A", m2: 85, occupants: 2, paid: true },
  { no: "2B", m2: 70, occupants: 1, paid: false },
  { no: "2C", m2: 95, occupants: 3, paid: true },
  { no: "3A", m2: 85, occupants: 4, paid: true },
  { no: "3B", m2: 70, occupants: 2, paid: true },
  { no: "3C", m2: 95, occupants: 2, paid: false },
  { no: "4A", m2: 85, occupants: 3, paid: true },
  { no: "4B", m2: 70, occupants: 2, paid: true },
  { no: "4C", m2: 95, occupants: 4, paid: false },
];

const chartData = [
  { month: "Ekim", amount: 28400 },
  { month: "Kasım", amount: 34200 },
  { month: "Aralık", amount: 42600 },
  { month: "Ocak", amount: 48500 },
  { month: "Şubat", amount: 45100 },
  { month: "Mart", amount: 38900 },
];

type DistributionMethod = "m2" | "kisi" | "esit";

export default function HeatingCostDistribution({
  isOwner,
}: HeatingCostDistributionProps) {
  const [method, setMethod] = useState<DistributionMethod>("m2");
  const [period, setPeriod] = useState("2026-03");
  const [totalCost] = useState(38900);
  const [expenseType] = useState("Doğalgaz");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newForm, setNewForm] = useState({
    amount: "",
    period: "",
    type: "Doğalgaz",
  });
  const [aptPaid, setAptPaid] = useState<Record<string, boolean>>(
    Object.fromEntries(apartments.map((a) => [a.no, a.paid])),
  );

  function calcShare(apt: Apartment): number {
    if (method === "m2") {
      const totalM2 = apartments.reduce((s, a) => s + a.m2, 0);
      return Math.round((apt.m2 / totalM2) * totalCost);
    }
    if (method === "kisi") {
      const totalPeople = apartments.reduce((s, a) => s + a.occupants, 0);
      return Math.round((apt.occupants / totalPeople) * totalCost);
    }
    return Math.round(totalCost / apartments.length);
  }

  const paidCount = Object.values(aptPaid).filter(Boolean).length;
  const collectionRate = Math.round((paidCount / apartments.length) * 100);
  const avgShare = Math.round(totalCost / apartments.length);
  const pending = apartments.filter((a) => !aptPaid[a.no]).length;
  const pendingAmount = apartments
    .filter((a) => !aptPaid[a.no])
    .reduce((s, a) => s + calcShare(a), 0);

  return (
    <div className="space-y-6" data-ocid="heating_cost.page">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Dönem Toplam Gider</p>
                <p className="text-xl font-bold text-slate-800">
                  {totalCost.toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Ortalama Daire Payı</p>
                <p className="text-xl font-bold text-slate-800">
                  {avgShare.toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Tahsilat Oranı</p>
                <p className="text-2xl font-bold text-slate-800">
                  %{collectionRate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Bekleyen Ödeme</p>
                <p className="text-xl font-bold text-red-700">
                  {pendingAmount.toLocaleString("tr-TR")} ₺
                </p>
                <p className="text-xs text-slate-400">{pending} daire</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Dönem:</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-36" data-ocid="heating_cost.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-03">Mart 2026</SelectItem>
                  <SelectItem value="2026-02">Şubat 2026</SelectItem>
                  <SelectItem value="2026-01">Ocak 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Dağıtım Yöntemi:</Label>
              <Select
                value={method}
                onValueChange={(v) => setMethod(v as DistributionMethod)}
              >
                <SelectTrigger className="w-44" data-ocid="heating_cost.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m2">m² Bazlı</SelectItem>
                  <SelectItem value="kisi">Kişi Sayısı</SelectItem>
                  <SelectItem value="esit">Eşit Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-300"
              >
                {expenseType}
              </Badge>
            </div>
            {isOwner && (
              <Button
                size="sm"
                className="ml-auto bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => setShowNewModal(true)}
                data-ocid="heating_cost.open_modal_button"
              >
                <Plus className="w-4 h-4 mr-1" /> Yeni Dönem Gider Girişi
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Distribution Table */}
        <div className="md:col-span-2">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Daire Bazlı Pay Hesabı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Daire No</TableHead>
                    <TableHead>m²</TableHead>
                    <TableHead>Kişi</TableHead>
                    <TableHead>Hesaplanan Pay</TableHead>
                    <TableHead>Ödeme Durumu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apartments.map((apt, i) => (
                    <TableRow
                      key={apt.no}
                      data-ocid={`heating_cost.item.${i + 1}`}
                    >
                      <TableCell className="font-medium">{apt.no}</TableCell>
                      <TableCell>{apt.m2} m²</TableCell>
                      <TableCell>{apt.occupants} kişi</TableCell>
                      <TableCell className="font-semibold">
                        {calcShare(apt).toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          onClick={() =>
                            setAptPaid((p) => ({ ...p, [apt.no]: !p[apt.no] }))
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                            aptPaid[apt.no]
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          }`}
                          data-ocid="heating_cost.toggle"
                        >
                          {aptPaid[apt.no] ? "✓ Ödendi" : "⏳ Bekliyor"}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div>
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Son 6 Ay Isınma Gideri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(v: number) => [
                      `${v.toLocaleString("tr-TR")} ₺`,
                      "Gider",
                    ]}
                  />
                  <Bar dataKey="amount" fill="#ea580c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Expense Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="max-w-md" data-ocid="heating_cost.dialog">
          <DialogHeader>
            <DialogTitle>Yeni Dönem Gider Girişi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Toplam Tutar (₺)</Label>
              <Input
                type="number"
                placeholder="45000"
                value={newForm.amount}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, amount: e.target.value }))
                }
                data-ocid="heating_cost.input"
              />
            </div>
            <div>
              <Label>Dönem</Label>
              <Input
                type="month"
                value={newForm.period}
                onChange={(e) =>
                  setNewForm((p) => ({ ...p, period: e.target.value }))
                }
                data-ocid="heating_cost.input"
              />
            </div>
            <div>
              <Label>Gider Türü</Label>
              <Select
                value={newForm.type}
                onValueChange={(v) => setNewForm((p) => ({ ...p, type: v }))}
              >
                <SelectTrigger data-ocid="heating_cost.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Doğalgaz">Doğalgaz</SelectItem>
                  <SelectItem value="Su">Su</SelectItem>
                  <SelectItem value="Isınma">Isınma</SelectItem>
                  <SelectItem value="Elektrik">Elektrik</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowNewModal(false)}
                data-ocid="heating_cost.cancel_button"
              >
                İptal
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => setShowNewModal(false)}
                data-ocid="heating_cost.submit_button"
              >
                Kaydet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
