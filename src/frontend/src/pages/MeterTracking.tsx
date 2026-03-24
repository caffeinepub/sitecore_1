import { AlertTriangle, BarChart3, Plus } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface MeterReading {
  id: string;
  apartmentNo: string;
  meterType: "water" | "electricity" | "gas";
  previousReading: number;
  currentReading: number;
  readingDate: string;
  month: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_meters_${id}`;

const SEED: MeterReading[] = [
  {
    id: "m1",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 105,
    currentReading: 120,
    readingDate: "2026-01-01",
    month: "2026-01",
  },
  {
    id: "m2",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 120,
    currentReading: 133,
    readingDate: "2026-02-01",
    month: "2026-02",
  },
  {
    id: "m3",
    apartmentNo: "101",
    meterType: "water",
    previousReading: 133,
    currentReading: 148,
    readingDate: "2026-03-01",
    month: "2026-03",
  },
  {
    id: "m4",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 750,
    currentReading: 820,
    readingDate: "2026-01-01",
    month: "2026-01",
  },
  {
    id: "m5",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 820,
    currentReading: 890,
    readingDate: "2026-02-01",
    month: "2026-02",
  },
  {
    id: "m6",
    apartmentNo: "101",
    meterType: "electricity",
    previousReading: 890,
    currentReading: 920,
    readingDate: "2026-03-01",
    month: "2026-03",
  },
  {
    id: "m7",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 75,
    currentReading: 88,
    readingDate: "2026-01-01",
    month: "2026-01",
  },
  {
    id: "m8",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 88,
    currentReading: 99,
    readingDate: "2026-02-01",
    month: "2026-02",
  },
  {
    id: "m9",
    apartmentNo: "202",
    meterType: "water",
    previousReading: 99,
    currentReading: 115,
    readingDate: "2026-03-01",
    month: "2026-03",
  },
  {
    id: "m10",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 300,
    currentReading: 325,
    readingDate: "2026-01-01",
    month: "2026-01",
  },
  {
    id: "m11",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 325,
    currentReading: 348,
    readingDate: "2026-02-01",
    month: "2026-02",
  },
  {
    id: "m12",
    apartmentNo: "202",
    meterType: "gas",
    previousReading: 348,
    currentReading: 365,
    readingDate: "2026-03-01",
    month: "2026-03",
  },
];

export default function MeterTracking({ buildingId, isOwner, t }: Props) {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [bulkApts, setBulkApts] = useState<{ no: string; reading: string }[]>([
    { no: "", reading: "" },
    { no: "", reading: "" },
    { no: "", reading: "" },
  ]);
  const [bulkType, setBulkType] = useState<MeterReading["meterType"]>("water");
  const [bulkMonth, setBulkMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [form, setForm] = useState({
    apartmentNo: "",
    meterType: "water" as MeterReading["meterType"],
    previousReading: "",
    currentReading: "",
    readingDate: new Date().toISOString().split("T")[0],
    month: new Date().toISOString().slice(0, 7),
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) setReadings(JSON.parse(raw));
    else {
      setReadings(SEED);
      localStorage.setItem(KEY(buildingId), JSON.stringify(SEED));
    }
  }, [buildingId]);

  const save = (updated: MeterReading[]) => {
    setReadings(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!form.apartmentNo.trim() || !form.currentReading) return;
    save([
      ...readings,
      {
        id: Date.now().toString(),
        ...form,
        previousReading: Number(form.previousReading) || 0,
        currentReading: Number(form.currentReading),
      },
    ]);
    setShowDialog(false);
    setForm({
      apartmentNo: "",
      meterType: "water",
      previousReading: "",
      currentReading: "",
      readingDate: new Date().toISOString().split("T")[0],
      month: new Date().toISOString().slice(0, 7),
    });
  };

  const handleBulkSubmit = () => {
    const valid = bulkApts.filter((a) => a.no.trim() && a.reading.trim());
    if (valid.length === 0) return;
    const newReadings = valid.map((a) => ({
      id: Date.now().toString() + Math.random(),
      apartmentNo: a.no.trim(),
      meterType: bulkType,
      previousReading: 0,
      currentReading: Number(a.reading),
      readingDate: new Date().toISOString().split("T")[0],
      month: bulkMonth,
    }));
    save([...readings, ...newReadings]);
    setShowBulk(false);
    setBulkApts([
      { no: "", reading: "" },
      { no: "", reading: "" },
      { no: "", reading: "" },
    ]);
  };

  const filtered =
    filterType === "all"
      ? readings
      : readings.filter((r) => r.meterType === filterType);

  const typeLabel = (type: string) => {
    if (type === "water")
      return {
        label: t.waterMeter || "Su",
        color: "bg-blue-100 text-blue-700",
      };
    if (type === "electricity")
      return {
        label: t.electricityMeter || "Elektrik",
        color: "bg-yellow-100 text-yellow-700",
      };
    return {
      label: t.gasMeter || "Doğalgaz",
      color: "bg-orange-100 text-orange-700",
    };
  };

  const unitLabel = (type: string) =>
    type === "water" ? "m³" : type === "electricity" ? "kWh" : "m³";

  // Trend chart data: group by month for current filter type
  const trendType =
    filterType === "all" ? "water" : (filterType as MeterReading["meterType"]);
  const monthlyConsumption: Record<string, number> = {};
  for (const r of readings.filter((r) => r.meterType === trendType)) {
    const c = r.currentReading - r.previousReading;
    monthlyConsumption[r.month] = (monthlyConsumption[r.month] || 0) + c;
  }
  const trendMonths = Object.keys(monthlyConsumption).sort().slice(-6);
  const trendValues = trendMonths.map((m) => monthlyConsumption[m]);
  const maxVal = Math.max(...trendValues, 1);
  const avg =
    trendValues.length > 0
      ? trendValues.reduce((a, b) => a + b, 0) / trendValues.length
      : 0;

  // Alerts: apartments with current consumption > avg * 1.2
  const aptConsumption: Record<string, number[]> = {};
  for (const r of readings.filter((r) => r.meterType === trendType)) {
    if (!aptConsumption[r.apartmentNo]) aptConsumption[r.apartmentNo] = [];
    aptConsumption[r.apartmentNo].push(r.currentReading - r.previousReading);
  }
  const alerts = Object.entries(aptConsumption)
    .filter(([, vals]) => {
      const last = vals[vals.length - 1];
      const prevAvg =
        vals.slice(0, -1).reduce((a, b) => a + b, 0) /
        Math.max(vals.length - 1, 1);
      return prevAvg > 0 && last > prevAvg * 1.2;
    })
    .map(([apt]) => apt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.meterTracking || "Sayaç Takibi"}
        </h2>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowBulk(true)}
              variant="outline"
              className="rounded-full gap-2"
            >
              <BarChart3 className="w-4 h-4" /> Toplu Giriş
            </Button>
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
              data-ocid="meters.primary_button"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t.addMeterReading || "Okuma Ekle"}
            </Button>
          </div>
        )}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="font-semibold text-orange-700 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" /> Yüksek Tüketim Uyarısı
          </p>
          <p className="text-sm text-orange-600">
            Bu dairelerin son tüketimi ortalamanın %20 üzerinde:{" "}
            <strong>{alerts.join(", ")}</strong>
          </p>
        </div>
      )}

      <Tabs defaultValue="table">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Tablo</TabsTrigger>
          <TabsTrigger value="chart">Trend Grafik</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="flex gap-2 mb-4">
            {["all", "water", "electricity", "gas"].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className={
                  filterType === type
                    ? "bg-[#0B1B2E] text-white rounded-full"
                    : "rounded-full"
                }
                data-ocid="meters.tab"
              >
                {type === "all" ? t.all || "Tümü" : typeLabel(type).label}
              </Button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
            {filtered.length === 0 ? (
              <p
                className="text-center text-[#6B7A8D] py-12"
                data-ocid="meters.empty_state"
              >
                {t.noReadings || "Sayaç okuması bulunamadı."}
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-[#F3F6FB]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.apartmentNo || "Daire"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.meterType || "Tür"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.previousReading || "Önceki"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.currentReading || "Güncel"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.consumption || "Tüketim"}
                    </th>
                    <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                      {t.month || "Ay"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => {
                    const { label, color } = typeLabel(r.meterType);
                    const consumption = r.currentReading - r.previousReading;
                    const isAlert = alerts.includes(r.apartmentNo);
                    return (
                      <tr
                        key={r.id}
                        className={`border-t border-[#F0F3F8] hover:bg-[#FAFBFD] ${isAlert ? "bg-orange-50/30" : ""}`}
                        data-ocid={`meters.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-semibold text-[#0E1116]">
                          {r.apartmentNo}
                          {isAlert && (
                            <AlertTriangle className="w-3 h-3 text-orange-500 inline ml-1" />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={color}>{label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-[#3A4654]">
                          {r.previousReading} {unitLabel(r.meterType)}
                        </td>
                        <td className="px-4 py-3 text-[#3A4654]">
                          {r.currentReading} {unitLabel(r.meterType)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-green-700">
                          {consumption} {unitLabel(r.meterType)}
                        </td>
                        <td className="px-4 py-3 text-[#6B7A8D]">{r.month}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <div className="bg-white rounded-2xl border border-[#E8EDF5] p-6">
            <p className="font-semibold text-[#0E1116] mb-1">
              Tüketim Trendi - {typeLabel(trendType).label}
            </p>
            <p className="text-xs text-[#6B7A8D] mb-6">
              Son 6 ay, {unitLabel(trendType)} cinsinden
            </p>
            {trendMonths.length === 0 ? (
              <p className="text-center text-[#6B7A8D] py-10">
                Yeterli veri yok.
              </p>
            ) : (
              <div className="flex items-end gap-3 h-48">
                {trendMonths.map((month, i) => {
                  const val = trendValues[i];
                  const height = Math.max((val / maxVal) * 100, 4);
                  const isAboveAvg = val > avg * 1.2;
                  return (
                    <div
                      key={month}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="text-xs font-medium text-[#0E1116]">
                        {val}
                      </span>
                      <div
                        className={`w-full rounded-t-lg transition-all ${isAboveAvg ? "bg-orange-400" : "bg-[#4A90D9]"}`}
                        style={{ height: `${height}%` }}
                        title={`${month}: ${val} ${unitLabel(trendType)}`}
                      />
                      <span className="text-xs text-[#6B7A8D] truncate w-full text-center">
                        {month.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {avg > 0 && (
              <p className="text-xs text-[#6B7A8D] mt-4">
                Aylık ortalama:{" "}
                <strong>
                  {Math.round(avg)} {unitLabel(trendType)}
                </strong>{" "}
                | Turuncu barlar ortalamanın %20 üzerindedir.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add single Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="meters.dialog">
          <DialogHeader>
            <DialogTitle>
              {t.addMeterReading || "Sayaç Okuması Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.apartmentNo || "Daire No"}
              </p>
              <Input
                value={form.apartmentNo}
                onChange={(e) =>
                  setForm((p) => ({ ...p, apartmentNo: e.target.value }))
                }
                placeholder="101"
                data-ocid="meters.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.meterType || "Sayaç Türü"}
              </p>
              <select
                value={form.meterType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    meterType: e.target.value as MeterReading["meterType"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="meters.select"
              >
                <option value="water">{t.waterMeter || "Su"}</option>
                <option value="electricity">
                  {t.electricityMeter || "Elektrik"}
                </option>
                <option value="gas">{t.gasMeter || "Doğalgaz"}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.previousReading || "Önceki Okuma"}
                </p>
                <Input
                  type="number"
                  value={form.previousReading}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, previousReading: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.currentReading || "Güncel Okuma"}
                </p>
                <Input
                  type="number"
                  value={form.currentReading}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, currentReading: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.month || "Ay"}
              </p>
              <Input
                type="month"
                value={form.month}
                onChange={(e) =>
                  setForm((p) => ({ ...p, month: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="meters.submit_button"
              >
                {t.addMeterReading || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="meters.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk entry Dialog */}
      <Dialog open={showBulk} onOpenChange={setShowBulk}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Toplu Okuma Girişi</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Sayaç Türü
                </p>
                <select
                  value={bulkType}
                  onChange={(e) =>
                    setBulkType(e.target.value as MeterReading["meterType"])
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="water">Su</option>
                  <option value="electricity">Elektrik</option>
                  <option value="gas">Doğalgaz</option>
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  Ay
                </p>
                <Input
                  type="month"
                  value={bulkMonth}
                  onChange={(e) => setBulkMonth(e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm font-medium text-[#3A4654]">
              Daire No ve Okuma Değerleri:
            </p>
            {bulkApts.map((apt, i) => {
              const bulkKey = `bulk-${i}`;
              return (
                <div key={bulkKey} className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder={`Daire ${i + 1}`}
                    value={apt.no}
                    onChange={(e) =>
                      setBulkApts((p) =>
                        p.map((a, j) =>
                          j === i ? { ...a, no: e.target.value } : a,
                        ),
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Okuma"
                    value={apt.reading}
                    onChange={(e) =>
                      setBulkApts((p) =>
                        p.map((a, j) =>
                          j === i ? { ...a, reading: e.target.value } : a,
                        ),
                      )
                    }
                  />
                </div>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setBulkApts((p) => [...p, { no: "", reading: "" }])
              }
              className="w-full"
            >
              + Satır Ekle
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={handleBulkSubmit}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
              >
                Kaydet
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBulk(false)}
                className="flex-1 rounded-full"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
