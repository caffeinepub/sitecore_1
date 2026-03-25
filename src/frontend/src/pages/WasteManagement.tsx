import { Award, Calendar, Leaf, Recycle, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface Props {
  buildingId: string;
  t: any;
}

const RECYCLING_SCHEDULE = [
  {
    gun: "Pazartesi",
    tur: "Plastik & Metal",
    renk: "bg-yellow-400",
    icon: "♻️",
    aciklama: "Sarı konteyner",
  },
  {
    gun: "Salı",
    tur: "Organik Atık",
    renk: "bg-green-500",
    icon: "🌿",
    aciklama: "Kahverengi konteyner",
  },
  {
    gun: "Çarşamba",
    tur: "Karışık Atık",
    renk: "bg-gray-500",
    icon: "🗑️",
    aciklama: "Gri konteyner",
  },
  {
    gun: "Perşembe",
    tur: "Kağıt & Karton",
    renk: "bg-blue-500",
    icon: "📄",
    aciklama: "Mavi konteyner",
  },
  {
    gun: "Cuma",
    tur: "Cam",
    renk: "bg-green-300",
    icon: "🫙",
    aciklama: "Yeşil konteyner",
  },
  {
    gun: "Cumartesi",
    tur: "Elektronik Atık",
    renk: "bg-purple-500",
    icon: "📱",
    aciklama: "Mor konteyner (Ayda 1)",
  },
  {
    gun: "Pazar",
    tur: "Kağıt & Karton",
    renk: "bg-blue-500",
    icon: "📄",
    aciklama: "Mavi konteyner (ikinci tur)",
  },
];

const MONTHLY_WASTE = [
  { ay: "Eki", plastik: 125, kagit: 98, cam: 72, organik: 210, elektronik: 15 },
  {
    ay: "Kas",
    plastik: 131,
    kagit: 102,
    cam: 68,
    organik: 198,
    elektronik: 12,
  },
  {
    ay: "Ara",
    plastik: 142,
    kagit: 120,
    cam: 85,
    organik: 225,
    elektronik: 20,
  },
  { ay: "Oca", plastik: 128, kagit: 95, cam: 71, organik: 205, elektronik: 8 },
  { ay: "Şub", plastik: 119, kagit: 91, cam: 65, organik: 195, elektronik: 11 },
  {
    ay: "Mar",
    plastik: 133,
    kagit: 108,
    cam: 78,
    organik: 215,
    elektronik: 14,
  },
];

const LATEST_MONTH = MONTHLY_WASTE[MONTHLY_WASTE.length - 1];
const totalWaste =
  LATEST_MONTH.plastik +
  LATEST_MONTH.kagit +
  LATEST_MONTH.cam +
  LATEST_MONTH.organik +
  LATEST_MONTH.elektronik;
const recycledAmount =
  LATEST_MONTH.plastik +
  LATEST_MONTH.kagit +
  LATEST_MONTH.cam +
  LATEST_MONTH.elektronik;
const recycleRate = Math.round((recycledAmount / totalWaste) * 100);

const ENV_SCORE = 73;
const CO2_SAVED_KG = Math.round(recycledAmount * 0.85); // rough multiplier

const CATEGORIES = [
  { name: "Plastik", key: "plastik", color: "#F2A23A" },
  { name: "Kağıt", key: "kagit", color: "#4A90D9" },
  { name: "Cam", key: "cam", color: "#22C55E" },
  { name: "Organik", key: "organik", color: "#8B5CF6" },
  { name: "Elektronik", key: "elektronik", color: "#EF4444" },
];

const CERTS = [
  {
    name: "LEED Silver",
    issuer: "USGBC",
    year: "2022",
    status: "Aktif",
    color: "bg-gray-100 text-gray-700",
  },
  {
    name: "ISO 14001",
    issuer: "ISO",
    year: "2021",
    status: "Aktif",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "BREEAM Very Good",
    issuer: "BRE",
    year: "2023",
    status: "Aktif",
    color: "bg-blue-100 text-blue-700",
  },
];

const TODAY_IDX = new Date().getDay(); // 0=Pazar, 1=Pazartesi ...
const GUN_MAP = [6, 0, 1, 2, 3, 4, 5]; // JS day index → our schedule index

export default function WasteManagement({
  buildingId: _buildingId,
  t: _t,
}: Props) {
  const todayScheduleIdx = GUN_MAP[TODAY_IDX];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0E1116]">
          Çevre & Atık Yönetimi
        </h2>
        <p className="text-sm text-[#6B7A8D] mt-1">
          Geri dönüşüm takvimi, atık takibi ve çevre skoru
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <p className="text-xs text-[#6B7A8D]">Çevre Skoru</p>
          </div>
          <p className="text-3xl font-extrabold text-green-600">{ENV_SCORE}</p>
          <p className="text-xs text-[#6B7A8D]">/100</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="w-4 h-4 text-[#4A90D9]" />
            <p className="text-xs text-[#6B7A8D]">Geri Dönüşüm Oranı</p>
          </div>
          <p className="text-3xl font-extrabold text-[#4A90D9]">
            {recycleRate}%
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <p className="text-xs text-[#6B7A8D]">CO₂ Tasarrufu</p>
          </div>
          <p className="text-3xl font-extrabold text-purple-600">
            {CO2_SAVED_KG}
          </p>
          <p className="text-xs text-[#6B7A8D]">kg bu ay</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-[#F2A23A]" />
            <p className="text-xs text-[#6B7A8D]">Sertifikalar</p>
          </div>
          <p className="text-3xl font-extrabold text-[#F2A23A]">
            {CERTS.length}
          </p>
        </div>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="schedule">Geri Dönüşüm Takvimi</TabsTrigger>
          <TabsTrigger value="tracking">Atık Takibi</TabsTrigger>
          <TabsTrigger value="score">Çevre Skoru & Sertifika</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {RECYCLING_SCHEDULE.map((item, i) => (
              <div
                key={item.gun}
                className={`bg-white rounded-xl border-2 p-4 transition-all ${
                  i === todayScheduleIdx
                    ? "border-[#4A90D9] shadow-md"
                    : "border-[#E5EAF2]"
                }`}
              >
                {i === todayScheduleIdx && (
                  <Badge className="bg-[#4A90D9] text-white border-0 text-xs mb-2">
                    Bugün
                  </Badge>
                )}
                <div
                  className={`w-10 h-10 rounded-full ${item.renk} flex items-center justify-center text-xl mb-3`}
                >
                  {item.icon}
                </div>
                <p className="font-bold text-[#0E1116]">{item.gun}</p>
                <p className="text-sm text-[#3A4654] font-medium">{item.tur}</p>
                <p className="text-xs text-[#6B7A8D] mt-1">{item.aciklama}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="mt-4 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Bu Ayki Atık Miktarları (kg)
            </h3>
            <div className="space-y-3">
              {CATEGORIES.map((c) => {
                const val = LATEST_MONTH[
                  c.key as keyof typeof LATEST_MONTH
                ] as number;
                return (
                  <div key={c.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-[#0E1116]">
                        {c.name}
                      </span>
                      <span className="font-bold" style={{ color: c.color }}>
                        {val} kg
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F6FB] rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(val / totalWaste) * 100}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              6 Aylık Atık Trendi
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MONTHLY_WASTE}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                {CATEGORIES.map((c) => (
                  <Bar
                    key={c.key}
                    dataKey={c.key}
                    name={c.name}
                    fill={c.color}
                    stackId="a"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="score" className="mt-4 space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E5EAF2] p-6">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Çevre Performans Skoru
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <title>Çevre Skoru</title>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E5EAF2"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="12"
                      strokeDasharray={`${(ENV_SCORE / 100) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-green-600">
                      {ENV_SCORE}
                    </span>
                    <span className="text-xs text-[#6B7A8D]">/100</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Geri Dönüşüm Oranı", val: recycleRate },
                  { label: "Enerji Verimliliği", val: 78 },
                  { label: "Su Tasarrufu", val: 65 },
                  { label: "Karbon Ayak İzi Azaltma", val: 71 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-[#6B7A8D] mb-1">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <Progress value={item.val} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5EAF2] p-6">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Bina Sertifikaları
              </h3>
              <div className="space-y-3">
                {CERTS.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center justify-between p-3 bg-[#F3F6FB] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#F2A23A]" />
                      <div>
                        <p className="font-semibold text-sm text-[#0E1116]">
                          {cert.name}
                        </p>
                        <p className="text-xs text-[#6B7A8D]">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                    </div>
                    <Badge className={`border-0 text-xs ${cert.color}`}>
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">
                    CO₂ Tasarruf Hesabı
                  </h4>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {CO2_SAVED_KG} kg
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Bu ay geri dönüşümle sağlanan CO₂ tasarrufu
                </p>
                <p className="text-xs text-green-700">
                  {Math.round(CO2_SAVED_KG * 12)} kg yıllık tahmini tasarruf
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
