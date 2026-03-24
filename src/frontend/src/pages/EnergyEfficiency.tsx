import {
  AlertTriangle,
  Battery,
  Flame,
  Leaf,
  Plus,
  Target,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";

const chartData = [
  { ay: "Ekim", elektrik: 4200, dogalgaz: 1800 },
  { ay: "Kasım", elektrik: 4800, dogalgaz: 2600 },
  { ay: "Aralık", elektrik: 5100, dogalgaz: 3400 },
  { ay: "Ocak", elektrik: 5400, dogalgaz: 3800 },
  { ay: "Şubat", elektrik: 4900, dogalgaz: 3200 },
  { ay: "Mart", elektrik: 4100, dogalgaz: 2100 },
];

const suggestions = [
  {
    icon: "💡",
    title: "LED Aydınlatmaya Geçiş",
    desc: "Ortak alanlarda LED ampul kullanarak yıllık %40 enerji tasarrufu sağlayabilirsiniz.",
    savings: "~1.200 kWh/yıl",
    priority: "Yüksek",
  },
  {
    icon: "🏠",
    title: "Çatı Yalıtımı",
    desc: "Çatı katı yalıtımını iyileştirerek ısı kaybını %30 azaltabilirsiniz.",
    savings: "~800 kWh/yıl",
    priority: "Orta",
  },
  {
    icon: "☀️",
    title: "Güneş Paneli Kurulumu",
    desc: "Çatıya kurulacak 20 panel ile yıllık tüketimin %25'ini karşılayabilirsiniz.",
    savings: "~5.000 kWh/yıl",
    priority: "Uzun Vadeli",
  },
  {
    icon: "🌡️",
    title: "Akıllı Termostat",
    desc: "Merkezi ısıtmaya akıllı termostat ekleyerek gereksiz ısıtmayı önleyebilirsiniz.",
    savings: "~600 kWh/yıl",
    priority: "Orta",
  },
  {
    icon: "🚿",
    title: "Düşük Debili Armatürler",
    desc: "Su tasarruflu armatürler hem su hem enerji tasarrufu sağlar.",
    savings: "~300 kWh/yıl",
    priority: "Düşük",
  },
];

const priorityColors: Record<string, string> = {
  Yüksek: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Orta: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  "Uzun Vadeli":
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Düşük: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

export default function EnergyEfficiency(_props: {
  buildingId?: string;
  isOwnerOrManager?: boolean;
  t?: unknown;
}) {
  const [co2Input, setCo2Input] = useState("");
  const [co2Result, setCo2Result] = useState<number | null>(null);
  const [goalKwh, setGoalKwh] = useState("4000");
  const [goalDate, setGoalDate] = useState("2025-06-30");
  const [goalSaved, setGoalSaved] = useState(false);

  const currentKwh = 4100;
  const targetKwh = Number(goalKwh) || 4000;
  const goalProgress = Math.max(
    0,
    Math.min(100, Math.round(((targetKwh - currentKwh + 1000) / 1000) * 100)),
  );

  const calcCo2 = () => {
    const kwh = Number.parseFloat(co2Input);
    if (!Number.isNaN(kwh)) setCo2Result(kwh * 0.49);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Enerji Verimliliği Takibi
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bina enerji tüketimi, karşılaştırmalı analiz ve tasarruf önerileri
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Enerji Skoru
              </span>
            </div>
            <p className="text-4xl font-bold text-green-600">B</p>
            <p className="text-xs text-muted-foreground mt-1">
              Skala: A (en iyi) → G
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">
                Bu Ay Tüketim
              </span>
            </div>
            <p className="text-3xl font-bold">{currentKwh.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">kWh</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-muted-foreground">
                CO₂ Tasarrufu
              </span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">342</p>
            <p className="text-xs text-muted-foreground mt-1">kg bu ay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">
                Tasarruf Hedefi
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{goalProgress}%</p>
            <Progress value={goalProgress} className="h-1.5 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" /> Son 6 Ay Tüketim
            Karşılaştırması
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`${value} kWh`]} />
              <Legend />
              <Bar
                dataKey="elektrik"
                name="Elektrik (kWh)"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="dogalgaz"
                name="Doğalgaz (kWh)"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" /> Tasarruf Hedefi Belirle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Hedef Aylık Tüketim (kWh)</Label>
              <Input
                data-ocid="energy.goal_input"
                type="number"
                value={goalKwh}
                onChange={(e) => setGoalKwh(e.target.value)}
                placeholder="Örn: 3500"
              />
            </div>
            <div className="space-y-1">
              <Label>Hedef Tarihi</Label>
              <Input
                data-ocid="energy.date_input"
                type="date"
                value={goalDate}
                onChange={(e) => setGoalDate(e.target.value)}
              />
            </div>
            {goalSaved && (
              <div className="text-sm text-green-600 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Hedef kaydedildi!
              </div>
            )}
            <Button
              data-ocid="energy.save_button"
              className="w-full"
              onClick={() => setGoalSaved(true)}
            >
              Hedefi Kaydet
            </Button>
          </CardContent>
        </Card>

        {/* CO2 Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5" /> CO₂ Hesap Makinesi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enerji tüketiminizi girerek karbon ayak izinizi hesaplayın (0.49
              kg CO₂/kWh)
            </p>
            <div className="space-y-1">
              <Label>Aylık Tüketim (kWh)</Label>
              <Input
                data-ocid="energy.co2_input"
                type="number"
                value={co2Input}
                onChange={(e) => setCo2Input(e.target.value)}
                placeholder="Örn: 4100"
              />
            </div>
            <Button
              data-ocid="energy.calc_button"
              variant="outline"
              className="w-full"
              onClick={calcCo2}
            >
              Hesapla
            </Button>
            {co2Result !== null && (
              <div className="rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Aylık CO₂ Eşdeğeri
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {co2Result.toFixed(1)} <span className="text-base">kg</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(co2Result / 12).toFixed(1)} ağaç/yıl absorbe eder
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" /> Tasarruf
            Önerileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((s) => (
              <div key={s.title} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[s.priority]}`}
                  >
                    {s.priority}
                  </span>
                </div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
                <p className="text-xs font-medium text-green-600">
                  Tasarruf: {s.savings}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
