import { ArrowDown, ArrowUp, Filter, Home, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
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

const APARTMENTS = [
  {
    id: "A1",
    no: "A-1",
    tip: "2+1",
    alan: 85,
    kat: 1,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 2850000,
    m2Fiyat: 33529,
  },
  {
    id: "A2",
    no: "A-2",
    tip: "3+1",
    alan: 120,
    kat: 1,
    yon: "Güney",
    durum: "Satılık",
    deger: 4200000,
    m2Fiyat: 35000,
  },
  {
    id: "A3",
    no: "A-3",
    tip: "1+1",
    alan: 55,
    kat: 2,
    yon: "Doğu",
    durum: "Kiralık",
    deger: 1650000,
    m2Fiyat: 30000,
  },
  {
    id: "A4",
    no: "A-4",
    tip: "2+1",
    alan: 85,
    kat: 2,
    yon: "Batı",
    durum: "Dolu",
    deger: 2900000,
    m2Fiyat: 34118,
  },
  {
    id: "B1",
    no: "B-1",
    tip: "2+1",
    alan: 90,
    kat: 3,
    yon: "Güney",
    durum: "Dolu",
    deger: 3200000,
    m2Fiyat: 35556,
  },
  {
    id: "B2",
    no: "B-2",
    tip: "3+1",
    alan: 125,
    kat: 3,
    yon: "Güney",
    durum: "Satılık",
    deger: 4750000,
    m2Fiyat: 38000,
  },
  {
    id: "B3",
    no: "B-3",
    tip: "1+1",
    alan: 58,
    kat: 4,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 1720000,
    m2Fiyat: 29655,
  },
  {
    id: "B4",
    no: "B-4",
    tip: "2+1",
    alan: 88,
    kat: 4,
    yon: "Güney",
    durum: "Kiralık",
    deger: 3350000,
    m2Fiyat: 38068,
  },
  {
    id: "C1",
    no: "C-1",
    tip: "4+1",
    alan: 160,
    kat: 5,
    yon: "Güney",
    durum: "Dolu",
    deger: 7200000,
    m2Fiyat: 45000,
  },
  {
    id: "C2",
    no: "C-2",
    tip: "3+1",
    alan: 130,
    kat: 5,
    yon: "Doğu",
    durum: "Satılık",
    deger: 5100000,
    m2Fiyat: 39231,
  },
  {
    id: "C3",
    no: "C-3",
    tip: "2+1",
    alan: 92,
    kat: 5,
    yon: "Batı",
    durum: "Dolu",
    deger: 3600000,
    m2Fiyat: 39130,
  },
  {
    id: "D1",
    no: "D-1",
    tip: "1+1",
    alan: 52,
    kat: 1,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 1480000,
    m2Fiyat: 28462,
  },
];

const ILCE_ORT_M2 = 32000;
const BINA_ORT_M2 = Math.round(
  APARTMENTS.reduce((a, b) => a + b.m2Fiyat, 0) / APARTMENTS.length,
);

const COMPARISON_DATA = [
  { name: "Bu Bina Ort.", fiyat: BINA_ORT_M2 },
  { name: "İlçe Ort.", fiyat: ILCE_ORT_M2 },
  { name: "Şehir Ort.", fiyat: 35000 },
  {
    name: "En Düşük Daire",
    fiyat: Math.min(...APARTMENTS.map((a) => a.m2Fiyat)),
  },
  {
    name: "En Yüksek Daire",
    fiyat: Math.max(...APARTMENTS.map((a) => a.m2Fiyat)),
  },
];

const HISTORY_DATA = [
  { ay: "Nis", ort: 29500 },
  { ay: "May", ort: 30200 },
  { ay: "Haz", ort: 30800 },
  { ay: "Tem", ort: 31200 },
  { ay: "Ağu", ort: 31000 },
  { ay: "Eyl", ort: 31800 },
  { ay: "Eki", ort: 32500 },
  { ay: "Kas", ort: 33100 },
  { ay: "Ara", ort: 33400 },
  { ay: "Oca", ort: 34000 },
  { ay: "Şub", ort: 34500 },
  { ay: "Mar", ort: BINA_ORT_M2 },
];

const DURUM_COLORS: Record<string, string> = {
  Dolu: "bg-green-100 text-green-700",
  Satılık: "bg-blue-100 text-blue-700",
  Kiralık: "bg-purple-100 text-purple-700",
};

const YON_ICONS: Record<string, string> = {
  Kuzey: "⬆",
  Güney: "⬇",
  Doğu: "➡",
  Batı: "⬅",
};

export default function ApartmentValuation({
  buildingId: _buildingId,
  t: _t,
}: Props) {
  const [filterKat, setFilterKat] = useState("Tümü");
  const [filterTip, setFilterTip] = useState("Tümü");
  const [filterDurum, setFilterDurum] = useState("Tümü");
  const [sortBy, setSortBy] = useState<"deger" | "m2Fiyat" | "alan">("deger");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const katlar = [
    "Tümü",
    ...Array.from(new Set(APARTMENTS.map((a) => String(a.kat)))).sort(),
  ];
  const tipler = ["Tümü", ...Array.from(new Set(APARTMENTS.map((a) => a.tip)))];
  const durumlar = ["Tümü", "Dolu", "Satılık", "Kiralık"];

  const filtered = APARTMENTS.filter(
    (a) => filterKat === "Tümü" || String(a.kat) === filterKat,
  )
    .filter((a) => filterTip === "Tümü" || a.tip === filterTip)
    .filter((a) => filterDurum === "Tümü" || a.durum === filterDurum)
    .sort((a, b) =>
      sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy],
    );

  const totalValue = APARTMENTS.reduce((s, a) => s + a.deger, 0);
  const avgValue = Math.round(totalValue / APARTMENTS.length);
  const satılikCount = APARTMENTS.filter((a) => a.durum === "Satılık").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0E1116]">
          Daire Değerleme & Piyasa Takibi
        </h2>
        <p className="text-sm text-[#6B7A8D] mt-1">
          Daire değerleri, m² birim fiyatları ve piyasa karşılaştırması
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-[#0B1B2E]">
            {(totalValue / 1000000).toFixed(1)}M ₺
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Toplam Değer</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-[#4A90D9]">
            {(avgValue / 1000000).toFixed(2)}M ₺
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Ortalama Değer</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-green-600">
            {BINA_ORT_M2.toLocaleString("tr")} ₺
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Ortalama m² Fiyatı</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-purple-600">{satılikCount}</p>
          <p className="text-xs text-[#6B7A8D] mt-1">Satılık Daire</p>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="list">Daire Listesi</TabsTrigger>
          <TabsTrigger value="comparison">Piyasa Karşılaştırması</TabsTrigger>
          <TabsTrigger value="history">Değer Geçmişi</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4 space-y-3">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-4 h-4 text-[#6B7A8D]" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7A8D]">Kat:</span>
                <select
                  className="border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm"
                  value={filterKat}
                  onChange={(e) => setFilterKat(e.target.value)}
                  data-ocid="valuation.select"
                >
                  {katlar.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7A8D]">Tip:</span>
                <select
                  className="border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm"
                  value={filterTip}
                  onChange={(e) => setFilterTip(e.target.value)}
                >
                  {tipler.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7A8D]">Durum:</span>
                <select
                  className="border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm"
                  value={filterDurum}
                  onChange={(e) => setFilterDurum(e.target.value)}
                >
                  {durumlar.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-[#6B7A8D]">Sırala:</span>
                <select
                  className="border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="deger">Değer</option>
                  <option value="m2Fiyat">m² Fiyatı</option>
                  <option value="alan">Alan</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                  }
                  className="p-1 rounded border border-[#D7DEE9] hover:bg-[#F3F6FB]"
                >
                  {sortDir === "desc" ? (
                    <ArrowDown className="w-4 h-4" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5EAF2] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F3F6FB] border-b border-[#E5EAF2]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Daire
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Tip
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Alan
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Kat
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Yön
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    m² Fiyatı
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Tahmini Değer
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[#F3F6FB]">
                    <td className="px-4 py-3 font-semibold text-[#0E1116]">
                      {a.no}
                    </td>
                    <td className="px-4 py-3 text-[#3A4654]">{a.tip}</td>
                    <td className="px-4 py-3 text-[#3A4654]">{a.alan} m²</td>
                    <td className="px-4 py-3 text-[#3A4654]">{a.kat}. Kat</td>
                    <td className="px-4 py-3 text-[#3A4654]">
                      {YON_ICONS[a.yon]} {a.yon}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#0B1B2E]">
                      {a.m2Fiyat.toLocaleString("tr")} ₺
                    </td>
                    <td className="px-4 py-3 font-bold text-[#0B1B2E]">
                      {(a.deger / 1000000).toFixed(2)}M ₺
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`border-0 text-xs ${DURUM_COLORS[a.durum]}`}
                      >
                        {a.durum}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Bölge Karşılaştırması (₺/m²)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={COMPARISON_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(v: any) => [
                    `${v.toLocaleString("tr")} ₺/m²`,
                    "Fiyat",
                  ]}
                />
                <Bar dataKey="fiyat" fill="#4A90D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-[#F3F6FB] rounded-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-[#3A4654]">
                Bu binanın ortalama m² fiyatı (
                {BINA_ORT_M2.toLocaleString("tr")} ₺), ilçe ortalamasının{" "}
                <strong>
                  {(((BINA_ORT_M2 - ILCE_ORT_M2) / ILCE_ORT_M2) * 100).toFixed(
                    1,
                  )}
                  % üzerinde
                </strong>
                .
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              12 Aylık Ortalama m² Değer Trendi
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={HISTORY_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(v: any) => [
                    `${v.toLocaleString("tr")} ₺`,
                    "Ort. m² Fiyatı",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="ort"
                  stroke="#4A90D9"
                  strokeWidth={2.5}
                  dot={{ fill: "#4A90D9", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-[#F3F6FB] rounded-lg">
                <p className="text-xs text-[#6B7A8D]">12 Ay Önceki</p>
                <p className="font-bold text-[#0B1B2E]">
                  {HISTORY_DATA[0].ort.toLocaleString("tr")} ₺
                </p>
              </div>
              <div className="text-center p-3 bg-[#F3F6FB] rounded-lg">
                <p className="text-xs text-[#6B7A8D]">Güncel</p>
                <p className="font-bold text-[#0B1B2E]">
                  {BINA_ORT_M2.toLocaleString("tr")} ₺
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-[#6B7A8D]">Değer Artışı</p>
                <p className="font-bold text-green-600">
                  +
                  {(
                    ((BINA_ORT_M2 - HISTORY_DATA[0].ort) /
                      HISTORY_DATA[0].ort) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
