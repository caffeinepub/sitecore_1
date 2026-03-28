import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Droplets,
  Flame,
  RefreshCw,
  TrendingUp,
  Zap,
} from "lucide-react";
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

const monthlyData = [
  { ay: "Oca", elektrik: 4200, su: 320, dogalgaz: 1850 },
  { ay: "Şub", elektrik: 3900, su: 290, dogalgaz: 2100 },
  { ay: "Mar", elektrik: 3600, su: 310, dogalgaz: 1700 },
  { ay: "Nis", elektrik: 3400, su: 350, dogalgaz: 1200 },
  { ay: "May", elektrik: 3200, su: 420, dogalgaz: 600 },
  { ay: "Haz", elektrik: 3800, su: 510, dogalgaz: 200 },
  { ay: "Tem", elektrik: 4800, su: 580, dogalgaz: 150 },
  { ay: "Ağu", elektrik: 5100, su: 560, dogalgaz: 160 },
  { ay: "Eyl", elektrik: 4200, su: 430, dogalgaz: 480 },
  { ay: "Eki", elektrik: 3700, su: 370, dogalgaz: 1100 },
  { ay: "Kas", elektrik: 4100, su: 330, dogalgaz: 1800 },
  { ay: "Ara", elektrik: 4500, su: 300, dogalgaz: 2200 },
];

const meters = [
  {
    id: "1",
    daire: "Daire 1",
    tipi: "Elektrik",
    sonOkuma: "4.821 kWh",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 4750,
    simdiki: 4821,
    fark: 71,
  },
  {
    id: "2",
    daire: "Daire 2",
    tipi: "Elektrik",
    sonOkuma: "3.102 kWh",
    tarih: "2026-03-27",
    durum: "yuksek",
    onceki: 2980,
    simdiki: 3102,
    fark: 122,
  },
  {
    id: "3",
    daire: "Daire 3",
    tipi: "Su",
    sonOkuma: "182 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 178,
    simdiki: 182,
    fark: 4,
  },
  {
    id: "4",
    daire: "Daire 4",
    tipi: "Su",
    sonOkuma: "241 m³",
    tarih: "2026-03-27",
    durum: "anormal",
    onceki: 228,
    simdiki: 241,
    fark: 13,
  },
  {
    id: "5",
    daire: "Daire 5",
    tipi: "Doğalgaz",
    sonOkuma: "1.204 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 1198,
    simdiki: 1204,
    fark: 6,
  },
  {
    id: "6",
    daire: "Daire 6",
    tipi: "Doğalgaz",
    sonOkuma: "987 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 981,
    simdiki: 987,
    fark: 6,
  },
  {
    id: "7",
    daire: "Daire 7",
    tipi: "Elektrik",
    sonOkuma: "5.432 kWh",
    tarih: "2026-03-26",
    durum: "yuksek",
    onceki: 5280,
    simdiki: 5432,
    fark: 152,
  },
  {
    id: "8",
    daire: "Ortak Alan",
    tipi: "Elektrik",
    sonOkuma: "12.841 kWh",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 12700,
    simdiki: 12841,
    fark: 141,
  },
];

const okumaTarihleri = [
  {
    tarih: "27 Mar 2026",
    daire: "Daire 1",
    tipi: "Elektrik",
    deger: "4.821 kWh",
    durum: "Otomatik",
  },
  {
    tarih: "27 Mar 2026",
    daire: "Daire 4",
    tipi: "Su",
    deger: "241 m³",
    durum: "Anormallik Tespit",
  },
  {
    tarih: "27 Mar 2026",
    daire: "Daire 2",
    tipi: "Elektrik",
    deger: "3.102 kWh",
    durum: "Yüksek Tüketim",
  },
  {
    tarih: "26 Mar 2026",
    daire: "Daire 7",
    tipi: "Elektrik",
    deger: "5.432 kWh",
    durum: "Yüksek Tüketim",
  },
  {
    tarih: "25 Mar 2026",
    daire: "Tüm Daireler",
    tipi: "Toplu",
    deger: "—",
    durum: "Otomatik Okuma",
  },
];

export default function SmartMeterManagement({
  buildingId: _buildingId,
}: { buildingId?: string }) {
  const [aktifSekme, setAktifSekme] = useState<
    "sayaclar" | "grafik" | "okumalar" | "uyarilar"
  >("sayaclar");
  const [filtreTyp, setFiltreTyp] = useState("Tümü");
  const [okumayapiliyor, setOkumayapiliyor] = useState(false);

  const anormalSayaclar = meters.filter(
    (m) => m.durum === "anormal" || m.durum === "yuksek",
  );

  const handleOtomatikOkuma = () => {
    setOkumayapiliyor(true);
    setTimeout(() => setOkumayapiliyor(false), 2000);
  };

  const filtrelenmis =
    filtreTyp === "Tümü" ? meters : meters.filter((m) => m.tipi === filtreTyp);

  const durumBadge = (durum: string) => {
    if (durum === "normal")
      return (
        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
          Normal
        </span>
      );
    if (durum === "yuksek")
      return (
        <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">
          Yüksek
        </span>
      );
    return (
      <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
        Anormal
      </span>
    );
  };

  const tipIkon = (tipi: string) => {
    if (tipi === "Elektrik") return <Zap className="w-4 h-4 text-yellow-500" />;
    if (tipi === "Su") return <Droplets className="w-4 h-4 text-blue-500" />;
    return <Flame className="w-4 h-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Akıllı Sayaç & Otomatik Okuma
          </h2>
          <p className="text-sm text-[#3A4654]">
            Elektrik, su ve doğalgaz sayaçlarının uzaktan otomatik takibi
          </p>
        </div>
        <button
          type="button"
          onClick={handleOtomatikOkuma}
          disabled={okumayapiliyor}
          className="flex items-center gap-2 bg-[#0B1B2E] text-white px-4 py-2 rounded-full text-sm hover:bg-[#112843] disabled:opacity-60"
        >
          <RefreshCw
            className={`w-4 h-4 ${okumayapiliyor ? "animate-spin" : ""}`}
          />
          {okumayapiliyor ? "Okunuyor..." : "Otomatik Oku"}
        </button>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E8EDF4]">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-[#3A4654]">Elektrik</span>
          </div>
          <p className="text-lg font-bold text-[#0E1116]">4.320 kWh</p>
          <p className="text-xs text-[#3A4654]">Bu ay ortalama/daire</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EDF4]">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-[#3A4654]">Su</span>
          </div>
          <p className="text-lg font-bold text-[#0E1116]">28 m³</p>
          <p className="text-xs text-[#3A4654]">Bu ay ortalama/daire</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EDF4]">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-[#3A4654]">Doğalgaz</span>
          </div>
          <p className="text-lg font-bold text-[#0E1116]">6 m³</p>
          <p className="text-xs text-[#3A4654]">Bu ay ortalama/daire</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EDF4]">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-[#3A4654]">Uyarı</span>
          </div>
          <p className="text-lg font-bold text-red-600">
            {anormalSayaclar.length}
          </p>
          <p className="text-xs text-[#3A4654]">Anormal/yüksek tüketim</p>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 flex-wrap">
        {(["sayaclar", "grafik", "okumalar", "uyarilar"] as const).map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setAktifSekme(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              aktifSekme === s
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-[#E8EDF4] hover:bg-[#F3F6FB]"
            }`}
          >
            {s === "sayaclar" && "Sayaçlar"}
            {s === "grafik" && "Tüketim Grafiği"}
            {s === "okumalar" && "Okuma Geçmişi"}
            {s === "uyarilar" && `Uyarılar (${anormalSayaclar.length})`}
          </button>
        ))}
      </div>

      {/* Sayaçlar Sekmesi */}
      {aktifSekme === "sayaclar" && (
        <div className="bg-white rounded-xl border border-[#E8EDF4] overflow-hidden">
          <div className="p-4 border-b border-[#E8EDF4] flex items-center gap-3">
            <select
              value={filtreTyp}
              onChange={(e) => setFiltreTyp(e.target.value)}
              className="border border-[#D7DEE9] rounded-lg px-3 py-1.5 text-sm text-[#0E1116]"
            >
              <option>Tümü</option>
              <option>Elektrik</option>
              <option>Su</option>
              <option>Doğalgaz</option>
            </select>
            <span className="text-sm text-[#3A4654]">
              {filtrelenmis.length} sayaç
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F3F6FB]">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Daire
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Tip
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Son Okuma
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Fark
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Tarih
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtrelenmis.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-[#F3F6FB] hover:bg-[#F8FAFC]"
                  >
                    <td className="px-4 py-2 font-medium text-[#0E1116]">
                      {m.daire}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1">
                        {tipIkon(m.tipi)}
                        <span className="text-[#3A4654]">{m.tipi}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[#0E1116]">{m.sonOkuma}</td>
                    <td
                      className={`px-4 py-2 font-medium ${m.fark > 100 ? "text-red-600" : "text-green-600"}`}
                    >
                      +{m.fark}
                    </td>
                    <td className="px-4 py-2 text-[#3A4654]">{m.tarih}</td>
                    <td className="px-4 py-2">{durumBadge(m.durum)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grafik Sekmesi */}
      {aktifSekme === "grafik" && (
        <div className="bg-white rounded-xl border border-[#E8EDF4] p-4 space-y-4">
          <h3 className="text-sm font-semibold text-[#0E1116]">
            12 Aylık Tüketim Trendi
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F6FB" />
              <XAxis dataKey="ay" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="elektrik"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Elektrik (kWh)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="su"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Su (L×10)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="dogalgaz"
                stroke="#F97316"
                strokeWidth={2}
                name="Doğalgaz (m³)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-1 bg-amber-400 inline-block rounded" />
              Elektrik
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-1 bg-blue-500 inline-block rounded" />
              Su
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-1 bg-orange-500 inline-block rounded" />
              Doğalgaz
            </div>
          </div>
        </div>
      )}

      {/* Okuma Geçmişi Sekmesi */}
      {aktifSekme === "okumalar" && (
        <div className="bg-white rounded-xl border border-[#E8EDF4] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F3F6FB]">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                  Tarih
                </th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                  Daire
                </th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                  Tip
                </th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                  Değer
                </th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-[#3A4654]">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody>
              {okumaTarihleri.map((o) => (
                <tr
                  key={`${o.tarih}-${o.daire}`}
                  className="border-t border-[#F3F6FB] hover:bg-[#F8FAFC]"
                >
                  <td className="px-4 py-2 text-[#3A4654]">{o.tarih}</td>
                  <td className="px-4 py-2 font-medium text-[#0E1116]">
                    {o.daire}
                  </td>
                  <td className="px-4 py-2 text-[#3A4654]">{o.tipi}</td>
                  <td className="px-4 py-2 text-[#0E1116]">{o.deger}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        o.durum === "Otomatik" || o.durum === "Otomatik Okuma"
                          ? "bg-green-100 text-green-700"
                          : o.durum === "Yüksek Tüketim"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.durum}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Uyarılar Sekmesi */}
      {aktifSekme === "uyarilar" && (
        <div className="space-y-3">
          {anormalSayaclar.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E8EDF4] p-8 text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-[#3A4654]">Tüm sayaçlar normal aralıkta.</p>
            </div>
          ) : (
            anormalSayaclar.map((m) => (
              <div
                key={m.id}
                className={`bg-white rounded-xl border p-4 flex items-start gap-3 ${
                  m.durum === "anormal" ? "border-red-200" : "border-amber-200"
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${m.durum === "anormal" ? "text-red-500" : "text-amber-500"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#0E1116]">
                      {m.daire}
                    </span>
                    <span className="text-xs text-[#3A4654]">
                      — {m.tipi} Sayacı
                    </span>
                    {durumBadge(m.durum)}
                  </div>
                  <p className="text-sm text-[#3A4654]">
                    Son okuma: <strong>{m.sonOkuma}</strong> &nbsp;|&nbsp;
                    Önceki dönem farkı: <strong>+{m.fark}</strong> (normal
                    üzeri)
                  </p>
                  <p className="text-xs text-[#3A4654] mt-1">
                    Okuma tarihi: {m.tarih}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
