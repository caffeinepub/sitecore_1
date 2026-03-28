import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  CreditCard,
  DollarSign,
  PiggyBank,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";

const MONTHS = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];

const contributions = [
  {
    month: "Ocak 2025",
    amount: 15000,
    status: "tamamlandı",
    note: "Aylık katkı",
  },
  {
    month: "Şubat 2025",
    amount: 15000,
    status: "tamamlandı",
    note: "Aylık katkı",
  },
  {
    month: "Mart 2025",
    amount: 18000,
    status: "tamamlandı",
    note: "Özel ek katkı",
  },
  {
    month: "Nisan 2025",
    amount: 15000,
    status: "tamamlandı",
    note: "Aylık katkı",
  },
  {
    month: "Mayıs 2025",
    amount: 15000,
    status: "tamamlandı",
    note: "Aylık katkı",
  },
  {
    month: "Haziran 2025",
    amount: 15000,
    status: "tamamlandı",
    note: "Aylık katkı",
  },
  {
    month: "Temmuz 2025",
    amount: 15000,
    status: "planlı",
    note: "Aylık katkı",
  },
  {
    month: "Ağustos 2025",
    amount: 15000,
    status: "planlı",
    note: "Aylık katkı",
  },
  { month: "Eylül 2025", amount: 15000, status: "planlı", note: "Aylık katkı" },
  { month: "Ekim 2025", amount: 15000, status: "planlı", note: "Aylık katkı" },
  { month: "Kasım 2025", amount: 15000, status: "planlı", note: "Aylık katkı" },
  {
    month: "Aralık 2025",
    amount: 15000,
    status: "planlı",
    note: "Aylık katkı",
  },
];

const expenditures = [
  {
    id: 1,
    date: "15.02.2025",
    description: "Asansör acil onarımı",
    amount: 12000,
    category: "Teknik",
    approved: true,
  },
  {
    id: 2,
    date: "10.04.2025",
    description: "Çatı su yalıtımı (kısmi)",
    amount: 35000,
    category: "İnşaat",
    approved: true,
  },
  {
    id: 3,
    date: "01.06.2025",
    description: "Jeneratör bakım & yedek parça",
    amount: 8500,
    category: "Teknik",
    approved: true,
  },
];

const plannedProjects = [
  {
    id: 1,
    name: "Asansör Modernizasyonu",
    estimatedCost: 280000,
    targetYear: 2026,
    priority: "yüksek",
    funded: 45,
  },
  {
    id: 2,
    name: "Çatı Yenileme",
    estimatedCost: 180000,
    targetYear: 2027,
    priority: "orta",
    funded: 30,
  },
  {
    id: 3,
    name: "Otopark Zemin Kaplama",
    estimatedCost: 95000,
    targetYear: 2026,
    priority: "düşük",
    funded: 18,
  },
  {
    id: 4,
    name: "Güvenlik Kamera Sistemi Yenileme",
    estimatedCost: 45000,
    targetYear: 2025,
    priority: "yüksek",
    funded: 80,
  },
];

const monthlyData = [88, 103, 121, 136, 151, 166, 166, 166, 166, 166, 166, 166];

type Tab = "ozet" | "katkılar" | "harcamalar" | "projeler";

export default function ReserveFundManagement() {
  const [activeTab, setActiveTab] = useState<Tab>("ozet");

  const currentBalance = 166000;
  const annualTarget = 300000;
  const targetProgress = Math.round((currentBalance / annualTarget) * 100);
  const totalExpended = expenditures.reduce((sum, e) => sum + e.amount, 0);
  const completedContributions = contributions.filter(
    (c) => c.status === "tamamlandı",
  );
  const completedTotal = completedContributions.reduce(
    (sum, c) => sum + c.amount,
    0,
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "ozet", label: "Özet" },
    { key: "katkılar", label: "Katkı Geçmişi" },
    { key: "harcamalar", label: "Harcamalar" },
    { key: "projeler", label: "Büyük Projeler" },
  ];

  const priorityColor = (p: string) => {
    if (p === "yüksek") return "bg-red-100 text-red-700";
    if (p === "orta") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Rezerv Fonu Yönetimi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Bina büyük onarım ve proje rezerv fonu takibi
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Katkı Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <PiggyBank className="w-4 h-4 text-blue-500" />
              Mevcut Bakiye
            </div>
            <p className="text-2xl font-bold text-blue-700">
              ₺{currentBalance.toLocaleString("tr-TR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Target className="w-4 h-4 text-green-500" />
              Yıllık Hedef
            </div>
            <p className="text-2xl font-bold text-green-700">
              ₺{annualTarget.toLocaleString("tr-TR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Yıl İçi Katkı
            </div>
            <p className="text-2xl font-bold text-purple-700">
              ₺{completedTotal.toLocaleString("tr-TR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <CreditCard className="w-4 h-4 text-red-500" />
              Toplam Harcama
            </div>
            <p className="text-2xl font-bold text-red-700">
              ₺{totalExpended.toLocaleString("tr-TR")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ÖZET */}
      {activeTab === "ozet" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Yıllık Hedef İlerleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>₺{currentBalance.toLocaleString("tr-TR")} birikti</span>
                <span className="font-semibold">{targetProgress}%</span>
              </div>
              <Progress value={targetProgress} className="h-4" />
              <p className="text-xs text-gray-500 mt-2">
                Hedefe ulaşmak için ₺
                {(annualTarget - currentBalance).toLocaleString("tr-TR")} daha
                gerekiyor
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                2025 Aylık Birikim Grafiği
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1 h-32">
                {monthlyData.map((val, i) => (
                  <div
                    key={MONTHS[i]}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${(val / 180) * 100}%`,
                        backgroundColor: i <= 5 ? "#3B82F6" : "#CBD5E1",
                      }}
                    />
                    <span className="text-[9px] text-gray-400">
                      {MONTHS[i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Mavi: Gerçekleşen | Gri: Planlanan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Uyarılar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Güvenlik Kamera Sistemi Yenileme projesi 2025 hedefiyle
                  planlandı -- fon oranı %80. Kalan ₺9.000 için ek katkı
                  gerekebilir.
                </span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm">
                <BarChart3 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <span>
                  Mevcut birikim hızında yıllık hedefe Kasım 2025'te ulaşılması
                  öngörülüyor.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* KATKILAR */}
      {activeTab === "katkılar" && (
        <div className="space-y-3">
          {contributions.map((c, i) => (
            <div
              key={MONTHS[i]}
              className="flex items-center justify-between p-4 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-3">
                {c.status === "tamamlandı" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <div>
                  <p className="font-medium text-sm">{c.month}</p>
                  <p className="text-xs text-gray-500">{c.note}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-sm">
                  ₺{c.amount.toLocaleString("tr-TR")}
                </p>
                <Badge
                  className={`text-xs ${
                    c.status === "tamamlandı"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.status === "tamamlandı" ? "Tamamlandı" : "Planlı"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HARCAMALAR */}
      {activeTab === "harcamalar" && (
        <div className="space-y-3">
          {expenditures.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{e.description}</p>
                  <p className="text-xs text-gray-500">
                    {e.date} • {e.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-sm text-red-600">
                  -₺{e.amount.toLocaleString("tr-TR")}
                </p>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  Onaylı
                </Badge>
              </div>
            </div>
          ))}
          <div className="p-4 bg-gray-50 rounded-lg border border-dashed flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">
              Toplam Harcama
            </span>
            <span className="text-lg font-bold text-red-600">
              -₺{totalExpended.toLocaleString("tr-TR")}
            </span>
          </div>
        </div>
      )}

      {/* PROJELER */}
      {activeTab === "projeler" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Rezerv fonundan karşılanması planlanan büyük projeler ve mevcut
            fonlama durumu.
          </p>
          {plannedProjects.map((p) => (
            <Card key={p.id}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      Hedef yıl: {p.targetYear}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor(
                        p.priority,
                      )}`}
                    >
                      {p.priority} öncelik
                    </span>
                    <span className="text-sm font-bold">
                      ₺{p.estimatedCost.toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Fonlama durumu</span>
                  <span className="font-semibold">{p.funded}%</span>
                </div>
                <Progress
                  value={p.funded}
                  className={`h-2 ${
                    p.funded >= 70
                      ? "[&>div]:bg-green-500"
                      : p.funded >= 40
                        ? "[&>div]:bg-yellow-500"
                        : "[&>div]:bg-red-400"
                  }`}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Mevcut fondan ₺
                  {Math.round(
                    (p.funded / 100) * p.estimatedCost,
                  ).toLocaleString("tr-TR")}{" "}
                  ayrıldı
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
