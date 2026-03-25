import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  BarChart3,
  CheckCircle2,
  FileText,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ManagementActivityReportProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

interface OverdueApt {
  no: string;
  debt: number;
}

interface MaintenanceItem {
  name: string;
  date: string;
  cost: number;
}

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface Period {
  key: string;
  label: string;
  collectionRate: number;
  completedMaintenance: number;
  totalIncome: number;
  totalExpense: number;
  avgResolutionDays: number;
  overdueApts: OverdueApt[];
  maintenanceItems: MaintenanceItem[];
  decisions: string[];
  expenseCategories: ExpenseCategory[];
  incomeTarget: number;
  incomeActual: number;
}

const periods: Period[] = [
  {
    key: "2026-03",
    label: "Mart 2026",
    collectionRate: 87,
    completedMaintenance: 14,
    totalIncome: 124500,
    totalExpense: 98700,
    avgResolutionDays: 3.2,
    overdueApts: [
      { no: "2B", debt: 2400 },
      { no: "3C", debt: 4800 },
      { no: "4A", debt: 1200 },
    ],
    maintenanceItems: [
      { name: "Asansör periyodik bakımı", date: "2026-03-05", cost: 8500 },
      { name: "Bahçe sulama sistemi onarımı", date: "2026-03-08", cost: 2200 },
      { name: "Giriş kat boya", date: "2026-03-12", cost: 5400 },
      { name: "Jeneratör bakımı", date: "2026-03-18", cost: 3800 },
      { name: "Güvenlik kamera sistemi", date: "2026-03-22", cost: 6200 },
    ],
    decisions: [
      "Bina girişine yeni aydınlatma sistemi kurulmasına karar verildi.",
      "2026 yılı bütçesinin %10 artırılması oy birliğiyle kabul edildi.",
      "Temizlik firması sözleşmesi 1 yıl uzatıldı.",
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 38500, color: "#3b82f6" },
      { name: "Personel", value: 28000, color: "#10b981" },
      { name: "Temizlik", value: 12400, color: "#f59e0b" },
      { name: "Enerji", value: 11800, color: "#ef4444" },
      { name: "Diğer", value: 8000, color: "#8b5cf6" },
    ],
    incomeTarget: 142000,
    incomeActual: 124500,
  },
  {
    key: "2026-02",
    label: "Şubat 2026",
    collectionRate: 92,
    completedMaintenance: 11,
    totalIncome: 138200,
    totalExpense: 105300,
    avgResolutionDays: 2.8,
    overdueApts: [
      { no: "1B", debt: 2400 },
      { no: "3C", debt: 2400 },
    ],
    maintenanceItems: [
      { name: "Su deposu temizliği", date: "2026-02-03", cost: 4200 },
      { name: "Çatı kontrol ve onarım", date: "2026-02-10", cost: 9800 },
      { name: "Isı merkezi bakımı", date: "2026-02-15", cost: 7600 },
    ],
    decisions: [
      "Giriş kapısı otomatik sistemi kurulumu için teklif alınmasına karar verildi.",
      "Misafir otopark ücretleri belirlendi.",
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 42000, color: "#3b82f6" },
      { name: "Personel", value: 28000, color: "#10b981" },
      { name: "Temizlik", value: 14200, color: "#f59e0b" },
      { name: "Enerji", value: 13100, color: "#ef4444" },
      { name: "Diğer", value: 8000, color: "#8b5cf6" },
    ],
    incomeTarget: 142000,
    incomeActual: 138200,
  },
  {
    key: "2026-01",
    label: "Ocak 2026",
    collectionRate: 95,
    completedMaintenance: 8,
    totalIncome: 141800,
    totalExpense: 112400,
    avgResolutionDays: 4.1,
    overdueApts: [{ no: "2B", debt: 2400 }],
    maintenanceItems: [
      {
        name: "Yıl başı asansör sertifikasyonu",
        date: "2026-01-08",
        cost: 12400,
      },
      { name: "Bodrum kat elektrik panosu", date: "2026-01-14", cost: 5600 },
      { name: "Yangın tüpü dolumu", date: "2026-01-20", cost: 2800 },
    ],
    decisions: [
      "2026 yılı faaliyet planı onaylandı.",
      "Acil durum fonu 50.000 ₺'ye yükseltildi.",
      "Site kuralları güncellendi ve tüm sakine duyurulmasına karar verildi.",
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 48000, color: "#3b82f6" },
      { name: "Personel", value: 28000, color: "#10b981" },
      { name: "Temizlik", value: 14200, color: "#f59e0b" },
      { name: "Enerji", value: 14200, color: "#ef4444" },
      { name: "Diğer", value: 8000, color: "#8b5cf6" },
    ],
    incomeTarget: 142000,
    incomeActual: 141800,
  },
];

const duesBarData = (p: Period) => [
  { name: "Hedef", value: p.incomeTarget },
  { name: "Gerçekleşen", value: p.incomeActual },
];

export default function ManagementActivityReport({
  isOwner,
}: ManagementActivityReportProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("2026-03");
  const [showReport, setShowReport] = useState(false);

  const period = periods.find((p) => p.key === selectedPeriod) || periods[0];

  return (
    <div className="space-y-6" data-ocid="activity_report.page">
      {/* Period selector + action */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 font-medium">Dönem:</span>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40" data-ocid="activity_report.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((p) => (
                <SelectItem key={p.key} value={p.key}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isOwner && (
          <Button
            className="ml-auto bg-slate-800 hover:bg-slate-900 text-white"
            onClick={() => setShowReport(true)}
            data-ocid="activity_report.open_modal_button"
          >
            <FileText className="w-4 h-4 mr-2" /> Raporu Görüntüle
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Aidat Tahsilat</p>
                <p className="text-2xl font-bold text-green-700">
                  %{period.collectionRate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Tamamlanan Bakım</p>
                <p className="text-2xl font-bold text-slate-800">
                  {period.completedMaintenance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Toplam Gelir</p>
                <p className="text-lg font-bold text-slate-800">
                  {period.totalIncome.toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Toplam Gider</p>
                <p className="text-lg font-bold text-slate-800">
                  {period.totalExpense.toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Dues Collection */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Aidat Tahsilat Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={duesBarData(period)}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(v: number) => [`${v.toLocaleString("tr-TR")} ₺`]}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            {period.overdueApts.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Gecikmiş Daireler
                </p>
                <div className="space-y-1">
                  {period.overdueApts.map((apt) => (
                    <div
                      key={apt.no}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-700">Daire {apt.no}</span>
                      <Badge className="bg-red-100 text-red-700 border-0">
                        {apt.debt.toLocaleString("tr-TR")} ₺
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Summary Pie */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Gider Kategorileri</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={period.expenseCategories}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={35}
                >
                  {period.expenseCategories.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v.toLocaleString("tr-TR")} ₺`]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Maintenance Summary */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Bakım & Onarım Özeti</CardTitle>
              <Badge variant="outline" className="text-blue-600">
                Ort. {period.avgResolutionDays} gün
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İş Adı</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Maliyet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {period.maintenanceItems.map((item, i) => (
                  <TableRow
                    key={item.name}
                    data-ocid={`activity_report.row.${i + 1}`}
                  >
                    <TableCell className="text-sm">{item.name}</TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {item.date}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {item.cost.toLocaleString("tr-TR")} ₺
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Meeting Decisions */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Toplantı Kararları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {period.decisions.map((decision, i) => (
                <div
                  key={decision}
                  className="flex gap-3"
                  data-ocid={`activity_report.item.${i + 1}`}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {decision}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Report Modal */}
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          data-ocid="activity_report.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              📋 Yönetim Faaliyet Raporu — {period.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4 border">
              <h3 className="font-bold text-slate-800 mb-3">ÖZET</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500">Aidat Tahsilat Oranı:</span>{" "}
                  <span className="font-semibold text-green-700">
                    %{period.collectionRate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Tamamlanan Bakım:</span>{" "}
                  <span className="font-semibold">
                    {period.completedMaintenance} iş
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Toplam Gelir:</span>{" "}
                  <span className="font-semibold">
                    {period.totalIncome.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Toplam Gider:</span>{" "}
                  <span className="font-semibold">
                    {period.totalExpense.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Net:</span>{" "}
                  <span
                    className={`font-bold ${
                      period.totalIncome - period.totalExpense >= 0
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {(period.totalIncome - period.totalExpense).toLocaleString(
                      "tr-TR",
                    )}{" "}
                    ₺
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Ort. Çözüm Süresi:</span>{" "}
                  <span className="font-semibold">
                    {period.avgResolutionDays} gün
                  </span>
                </div>
              </div>
            </div>

            {/* Overdue */}
            <div>
              <h3 className="font-bold text-slate-800 mb-2">
                GECİKMİŞ AİDAT DAİRELERİ
              </h3>
              {period.overdueApts.map((apt) => (
                <div
                  key={apt.no}
                  className="flex justify-between py-1.5 border-b border-slate-100"
                >
                  <span>Daire {apt.no}</span>
                  <span className="font-medium text-red-600">
                    {apt.debt.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              ))}
            </div>

            {/* Maintenance */}
            <div>
              <h3 className="font-bold text-slate-800 mb-2">
                TAMAMLANAN BAKIM & ONARIMLAR
              </h3>
              {period.maintenanceItems.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between py-1.5 border-b border-slate-100"
                >
                  <span>{item.name}</span>
                  <div className="text-right">
                    <span className="text-slate-500 mr-4">{item.date}</span>
                    <span className="font-medium">
                      {item.cost.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Expenses */}
            <div>
              <h3 className="font-bold text-slate-800 mb-2">
                GİDER KATEGORİLERİ
              </h3>
              {period.expenseCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex justify-between py-1.5 border-b border-slate-100"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </span>
                  <span className="font-medium">
                    {cat.value.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              ))}
            </div>

            {/* Decisions */}
            <div>
              <h3 className="font-bold text-slate-800 mb-2">
                TOPLANTI KARARLARI
              </h3>
              {period.decisions.map((d, i) => (
                <div
                  key={d}
                  className="py-1.5 border-b border-slate-100 flex gap-2"
                >
                  <span className="text-green-600 font-bold">{i + 1}.</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setShowReport(false)}
              data-ocid="activity_report.close_button"
            >
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
