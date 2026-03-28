import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
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

const monthlyData = [
  { ay: "Oca", elektrik: 4200, su: 850, dogalgaz: 3100 },
  { ay: "Şub", elektrik: 3900, su: 800, dogalgaz: 2800 },
  { ay: "Mar", elektrik: 3600, su: 870, dogalgaz: 2200 },
  { ay: "Nis", elektrik: 3200, su: 920, dogalgaz: 1400 },
  { ay: "May", elektrik: 2900, su: 1050, dogalgaz: 600 },
  { ay: "Haz", elektrik: 3400, su: 1200, dogalgaz: 200 },
  { ay: "Tem", elektrik: 4100, su: 1400, dogalgaz: 100 },
  { ay: "Ağu", elektrik: 4300, su: 1350, dogalgaz: 120 },
  { ay: "Eyl", elektrik: 3700, su: 1100, dogalgaz: 400 },
  { ay: "Eki", elektrik: 3500, su: 950, dogalgaz: 1800 },
  { ay: "Kas", elektrik: 3900, su: 880, dogalgaz: 2600 },
  { ay: "Ara", elektrik: 4400, su: 860, dogalgaz: 3200 },
];

const apartmentData = [
  { daire: "D:1", elektrik: 320, su: 68, dogalgaz: 240 },
  { daire: "D:2", elektrik: 280, su: 72, dogalgaz: 195 },
  { daire: "D:3", elektrik: 410, su: 95, dogalgaz: 310 },
  { daire: "D:4", elektrik: 260, su: 58, dogalgaz: 180 },
  { daire: "D:5", elektrik: 350, su: 88, dogalgaz: 270 },
  { daire: "D:6", elektrik: 290, su: 65, dogalgaz: 205 },
  { daire: "D:7", elektrik: 380, su: 82, dogalgaz: 290 },
  { daire: "D:8", elektrik: 240, su: 55, dogalgaz: 165 },
];

const pieData = [
  { name: "Elektrik", value: 43800, color: "#f59e0b" },
  { name: "Su", value: 11230, color: "#3b82f6" },
  { name: "Doğalgaz", value: 18520, color: "#ef4444" },
];

const savingsTips = [
  {
    icon: "💡",
    title: "LED Aydınlatma",
    desc: "Ortak alanlarda LED geçişiyle %40 elektrik tasarrufu sağlanabilir.",
    tasarruf: "1.200 ₺/ay",
  },
  {
    icon: "🌡️",
    title: "Akıllı Termostat",
    desc: "Merkezi ısıtmada akıllı termostat kullanımı %25 doğalgaz tasarrufu sunar.",
    tasarruf: "2.100 ₺/ay",
  },
  {
    icon: "💧",
    title: "Damlama Tespiti",
    desc: "Boru sistemindeki damlama noktaları tespiti %15 su tasarrufu sağlar.",
    tasarruf: "380 ₺/ay",
  },
  {
    icon: "☀️",
    title: "Güneş Paneli",
    desc: "Çatıya kurulacak güneş panelleri ortak alan elektrik ihtiyacını karşılayabilir.",
    tasarruf: "1.800 ₺/ay",
  },
  {
    icon: "🔧",
    title: "Kazan Bakımı",
    desc: "Yıllık kazan bakımı verimliği %20 artırarak yakıt tüketimini düşürür.",
    tasarruf: "950 ₺/ay",
  },
  {
    icon: "🪟",
    title: "Çift Cam Yalıtım",
    desc: "Isı yalıtımlı cam sistemi ısınma maliyetini önemli ölçüde azaltır.",
    tasarruf: "1.500 ₺/ay",
  },
];

const kpiData = [
  {
    label: "Bu Ay Toplam Tüketim",
    value: "9.540 kWh",
    change: "-3.2%",
    positive: true,
    icon: "⚡",
  },
  {
    label: "Aylık Toplam Maliyet",
    value: "28.640 ₺",
    change: "+1.8%",
    positive: false,
    icon: "💰",
  },
  {
    label: "Daire Başı Ortalama",
    value: "3.580 ₺",
    change: "-2.1%",
    positive: true,
    icon: "🏠",
  },
  {
    label: "CO₂ Tasarrufu",
    value: "1.2 ton",
    change: "+0.3 ton",
    positive: true,
    icon: "🌱",
  },
];

export default function EnergyConsumption(_props?: { t?: any }) {
  const [activeTab, setActiveTab] = useState<"genel" | "daire" | "tasarruf">(
    "genel",
  );
  const [selectedType, setSelectedType] = useState<
    "elektrik" | "su" | "dogalgaz" | "tum"
  >("tum");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Bina Enerji Tüketimi & Tasarrufu
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Elektrik, su ve doğalgaz tüketimi izleme ve tasarruf önerileri
          </p>
        </div>
        <Button variant="outline" size="sm">
          📊 Rapor İndir
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{kpi.icon}</span>
                <span className="text-xs text-muted-foreground">
                  {kpi.label}
                </span>
              </div>
              <div className="text-xl font-bold">{kpi.value}</div>
              <div
                className={`text-xs font-medium mt-1 ${kpi.positive ? "text-green-600" : "text-red-500"}`}
              >
                {kpi.change} geçen aya göre
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["genel", "daire", "tasarruf"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab)}
          >
            {tab === "genel"
              ? "📈 Genel Tüketim"
              : tab === "daire"
                ? "🏠 Daire Bazlı"
                : "💡 Tasarruf Önerileri"}
          </Button>
        ))}
      </div>

      {/* Genel Tab */}
      {activeTab === "genel" && (
        <div className="space-y-6">
          {/* Type filter */}
          <div className="flex gap-2 flex-wrap">
            {(["tum", "elektrik", "su", "dogalgaz"] as const).map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType(type)}
              >
                {type === "tum"
                  ? "Tümü"
                  : type === "elektrik"
                    ? "⚡ Elektrik"
                    : type === "su"
                      ? "💧 Su"
                      : "🔥 Doğalgaz"}
              </Badge>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Aylık Tüketim Grafiği (Son 12 Ay)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  {(selectedType === "tum" || selectedType === "elektrik") && (
                    <Line
                      type="monotone"
                      dataKey="elektrik"
                      name="Elektrik (kWh)"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                  {(selectedType === "tum" || selectedType === "su") && (
                    <Line
                      type="monotone"
                      dataKey="su"
                      name="Su (m³)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                  {(selectedType === "tum" || selectedType === "dogalgaz") && (
                    <Line
                      type="monotone"
                      dataKey="dogalgaz"
                      name="Doğalgaz (m³)"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Yıllık Tüketim Dağılımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} %${(percent * 100).toFixed(0)}`
                      }
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: any) => `${v.toLocaleString()} birim`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Maliyet Özeti (Bu Yıl)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    label: "Elektrik",
                    total: "52.400 ₺",
                    unit: "43.800 kWh",
                    color: "bg-amber-500",
                    pct: 71,
                  },
                  {
                    label: "Su",
                    total: "8.970 ₺",
                    unit: "11.230 m³",
                    color: "bg-blue-500",
                    pct: 12,
                  },
                  {
                    label: "Doğalgaz",
                    total: "12.340 ₺",
                    unit: "18.520 m³",
                    color: "bg-red-500",
                    pct: 17,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.label}</span>
                      <span>
                        {item.total}{" "}
                        <span className="text-muted-foreground text-xs">
                          ({item.unit})
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t flex justify-between font-semibold">
                  <span>Toplam</span>
                  <span>73.710 ₺</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Daire Tab */}
      {activeTab === "daire" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Kasım 2024 dönemi -- daire bazlı tüketim karşılaştırması
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Daire Bazlı Tüketim Karşılaştırması
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={apartmentData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="daire" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="elektrik"
                    name="Elektrik (kWh)"
                    fill="#f59e0b"
                  />
                  <Bar dataKey="su" name="Su (m³)" fill="#3b82f6" />
                  <Bar dataKey="dogalgaz" name="Doğalgaz (m³)" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">Daire</th>
                  <th className="text-right p-3">⚡ Elektrik</th>
                  <th className="text-right p-3">💧 Su</th>
                  <th className="text-right p-3">🔥 Doğalgaz</th>
                  <th className="text-right p-3">Toplam Maliyet</th>
                  <th className="text-center p-3">Durum</th>
                </tr>
              </thead>
              <tbody>
                {apartmentData.map((row) => {
                  const total =
                    row.elektrik * 1.2 + row.su * 0.8 + row.dogalgaz * 0.65;
                  const avg = 355;
                  const status =
                    row.elektrik > avg
                      ? "Yüksek"
                      : row.elektrik < avg * 0.8
                        ? "Düşük"
                        : "Normal";
                  return (
                    <tr
                      key={row.daire}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-3 font-medium">{row.daire}</td>
                      <td className="p-3 text-right">{row.elektrik} kWh</td>
                      <td className="p-3 text-right">{row.su} m³</td>
                      <td className="p-3 text-right">{row.dogalgaz} m³</td>
                      <td className="p-3 text-right font-medium">
                        {total.toFixed(0)} ₺
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          variant={
                            status === "Yüksek"
                              ? "destructive"
                              : status === "Düşük"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tasarruf Tab */}
      {activeTab === "tasarruf" && (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              🌱 Tüm önerilerin uygulanması durumunda tahmini aylık tasarruf:{" "}
              <strong>7.930 ₺</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsTips.map((tip) => (
              <Card
                key={tip.title}
                className="border hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{tip.title}</span>
                        <Badge
                          variant="secondary"
                          className="text-green-700 bg-green-100"
                        >
                          {tip.tasarruf}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Yıllık Tasarruf Potansiyeli
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={savingsTips.map((s) => ({
                    name: s.title,
                    tasarruf: Number.parseInt(
                      s.tasarruf.replace(/[^0-9]/g, ""),
                    ),
                  }))}
                  layout="vertical"
                  margin={{ left: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(v: any) => `${v.toLocaleString()} ₺/ay`}
                  />
                  <Bar
                    dataKey="tasarruf"
                    name="Tasarruf (₺/ay)"
                    fill="#22c55e"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
