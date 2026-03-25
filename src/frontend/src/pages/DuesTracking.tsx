import { Bell, DollarSign, Settings, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { toast } from "sonner";
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
import type { Apartment, DueRecord } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

interface ReminderLog {
  id: string;
  daire: string;
  date: string;
  month: string;
}

const APT_KEY = (id: string) => `sitecore_apartments_${id}`;
const DUES_KEY = (id: string) => `sitecore_dues_${id}`;
const REMINDER_KEY = (id: string) => `sitecore_reminders_${id}`;

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const MONTH_LABELS: Record<string, string> = {
  "01": "Oca",
  "02": "Şub",
  "03": "Mar",
  "04": "Nis",
  "05": "May",
  "06": "Haz",
  "07": "Tem",
  "08": "Āğu",
  "09": "Eyl",
  "10": "Eki",
  "11": "Kas",
  "12": "Ara",
};

function formatMonth(m: string) {
  const [yr, mo] = m.split("-");
  return `${MONTH_LABELS[mo] || mo} ${yr.slice(2)}`;
}

function monthDiffFromNow(month: string): number {
  const [yr, mo] = month.split("-").map(Number);
  const now = new Date();
  return (now.getFullYear() - yr) * 12 + (now.getMonth() + 1 - mo);
}

function calcInterest(
  amount: number,
  month: string,
  dailyRate: number,
): number {
  const days = monthDiffFromNow(month) * 30;
  if (days <= 0) return 0;
  return Math.round(amount * dailyRate * days);
}

export default function DuesTracking({ buildingId, isOwner, t }: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [dues, setDues] = useState<DueRecord[]>([]);
  const [month, setMonth] = useState(currentMonth());
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkAmount, setBulkAmount] = useState("");
  const [proofFiles, setProofFiles] = useState<Record<string, string>>({});
  const [reminders, setReminders] = useState<ReminderLog[]>([]);
  const [dailyRate, setDailyRate] = useState(0.001); // 0.1% per day
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [rateInput, setRateInput] = useState("0.1");

  useEffect(() => {
    const raw = localStorage.getItem(APT_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const dRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (dRaw) setDues(JSON.parse(dRaw));
    const rRaw = localStorage.getItem(REMINDER_KEY(buildingId));
    if (rRaw) setReminders(JSON.parse(rRaw));
  }, [buildingId]);

  const saveDues = (updated: DueRecord[]) => {
    setDues(updated);
    localStorage.setItem(DUES_KEY(buildingId), JSON.stringify(updated));
  };

  const saveReminders = (updated: ReminderLog[]) => {
    setReminders(updated);
    localStorage.setItem(REMINDER_KEY(buildingId), JSON.stringify(updated));
  };

  const monthDues = useMemo(
    () => dues.filter((d) => d.month === month),
    [dues, month],
  );

  const getDue = (aptId: string) =>
    monthDues.find((d) => d.apartmentId === aptId);

  const ensureDue = (aptId: string, amount = 0): DueRecord => {
    const existing = getDue(aptId);
    if (existing) return existing;
    const newDue: DueRecord = {
      id: crypto.randomUUID(),
      buildingId,
      apartmentId: aptId,
      month,
      amount,
      status: "pending",
      note: "",
    };
    const updated = [...dues, newDue];
    saveDues(updated);
    return newDue;
  };

  const setStatus = (aptId: string, status: DueRecord["status"]) => {
    const due = ensureDue(aptId);
    const updated = dues.map((d) =>
      d.id === due.id
        ? { ...d, status, paidAt: status === "paid" ? Date.now() : d.paidAt }
        : d,
    );
    saveDues(updated);
  };

  const setAmount = (aptId: string, amount: number) => {
    const due = getDue(aptId);
    if (due) {
      saveDues(dues.map((d) => (d.id === due.id ? { ...d, amount } : d)));
    } else {
      ensureDue(aptId, amount);
    }
  };

  const applyBulkAmount = () => {
    const amt = Number(bulkAmount);
    if (!amt) return;
    const updated = [...dues];
    for (const apt of apartments) {
      const idx = updated.findIndex(
        (d) => d.apartmentId === apt.id && d.month === month,
      );
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], amount: amt };
      } else {
        updated.push({
          id: crypto.randomUUID(),
          buildingId,
          apartmentId: apt.id,
          month,
          amount: amt,
          status: "pending",
          note: "",
        });
      }
    }
    saveDues(updated);
    setShowBulkDialog(false);
    setBulkAmount("");
    toast.success(`${apartments.length} daire için aidat dönemi oluşturuldu.`);
  };

  const handleBulkReminder = () => {
    const overdueCount = monthDues.filter(
      (d) => d.status === "overdue" || d.status === "pending",
    ).length;
    toast.success(
      `${overdueCount} gecikmiş daire için hatırlatma kuyruğa alındı.`,
    );
  };

  const handleSendReminder = (apt: Apartment) => {
    const newReminder: ReminderLog = {
      id: crypto.randomUUID(),
      daire: `${apt.block ? `${apt.block}-` : ""}${apt.number}`,
      date: new Date().toLocaleString("tr-TR"),
      month: formatMonth(month),
    };
    saveReminders([newReminder, ...reminders]);
    toast.success(`Daire ${apt.number} için hatırlatma gönderildi.`);
  };

  const handleProofUpload = (aptId: string, fileName: string) => {
    setProofFiles((prev) => ({ ...prev, [aptId]: fileName }));
    toast.success(`Ödeme kanıtı kaydedildi: ${fileName}`);
  };

  const handleSaveRate = () => {
    const r = Number(rateInput) / 100;
    if (r > 0) setDailyRate(r);
    setShowRateDialog(false);
    toast.success(`Günlük faiz oranı güncellendi: %${rateInput}`);
  };

  const totalCollected = monthDues
    .filter((d) => d.status === "paid")
    .reduce((s, d) => s + d.amount, 0);
  const totalPending = monthDues
    .filter((d) => d.status === "pending")
    .reduce((s, d) => s + d.amount, 0);
  const totalOverdue = monthDues
    .filter((d) => d.status === "overdue")
    .reduce((s, d) => s + d.amount, 0);

  // Last 6 months chart data
  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const mDues = dues.filter((dd) => dd.month === m);
      return {
        name: formatMonth(m),
        Tahsilat: mDues
          .filter((dd) => dd.status === "paid")
          .reduce((s, dd) => s + dd.amount, 0),
        Bekleyen: mDues
          .filter((dd) => dd.status !== "paid")
          .reduce((s, dd) => s + dd.amount, 0),
      };
    });
  }, [dues]);

  // Debt aging
  const agingData = useMemo(() => {
    const overdueRecords = dues.filter(
      (d) =>
        d.status === "overdue" ||
        (d.status === "pending" && monthDiffFromNow(d.month) > 0),
    );
    const buckets = {
      "1-30": [] as DueRecord[],
      "31-60": [] as DueRecord[],
      "60+": [] as DueRecord[],
    };
    for (const d of overdueRecords) {
      const days = monthDiffFromNow(d.month) * 30;
      if (days <= 30) buckets["1-30"].push(d);
      else if (days <= 60) buckets["31-60"].push(d);
      else buckets["60+"].push(d);
    }
    return buckets;
  }, [dues]);

  const statusBadge = (status?: DueRecord["status"]) => {
    if (status === "paid")
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          {t.paid}
        </Badge>
      );
    if (status === "overdue")
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          {t.overdue}
        </Badge>
      );
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
        {t.pending}
      </Badge>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.dues}</h2>
        <div className="flex items-center gap-2">
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-40 text-sm"
          />
          {isOwner && (
            <>
              <Button
                data-ocid="dues.secondary_button"
                onClick={handleBulkReminder}
                variant="outline"
                className="text-sm rounded-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Toplu Hatırlatma Gönder
              </Button>
              <Button
                data-ocid="dues.toggle"
                onClick={() => setShowRateDialog(true)}
                variant="outline"
                className="text-sm rounded-full border-gray-300 text-gray-600"
              >
                <Settings className="w-3.5 h-3.5 mr-1" /> Faiz Ayarı
              </Button>
              <Button
                data-ocid="dues.primary_button"
                onClick={() => setShowBulkDialog(true)}
                className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full text-sm"
              >
                {t.setMonthlyDues}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-green-600">
            {totalCollected.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> {t.totalCollected}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-yellow-600">
            {totalPending.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.totalPending}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
          <p className="text-3xl font-bold text-red-500">
            {totalOverdue.toLocaleString()} ₺
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.overdue}</p>
        </div>
      </div>

      <Tabs defaultValue="table">
        <TabsList className="bg-[#F3F6FB] mb-4">
          <TabsTrigger value="table">Aidat Tablosu</TabsTrigger>
          <TabsTrigger value="aging">Borç Yaşlandırma</TabsTrigger>
          <TabsTrigger value="reminders">Hatırlatma Geçmişi</TabsTrigger>
          <TabsTrigger value="chart">Grafik</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden mb-6">
            {apartments.length === 0 ? (
              <div
                data-ocid="dues.empty_state"
                className="py-12 text-center text-[#3A4654]"
              >
                {t.noApartments}
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#F3F6FB] border-b border-[#E5EAF2]">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      {t.apartmentNumber}
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      {t.resident}
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      {t.dueAmount}
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      Gecikme Faizi
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      {t.status}
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-[#3A4654]">
                      Ödeme Kanıtı
                    </th>
                    {isOwner && <th className="px-4 py-3" />}
                  </tr>
                </thead>
                <tbody>
                  {apartments.map((apt, idx) => {
                    const due = getDue(apt.id);
                    const proofFile = proofFiles[apt.id];
                    const isOverdue =
                      due?.status === "overdue" ||
                      (due?.status === "pending" &&
                        monthDiffFromNow(month) > 0);
                    const interest =
                      isOverdue && due
                        ? calcInterest(due.amount, due.month, dailyRate)
                        : 0;
                    return (
                      <tr
                        key={apt.id}
                        data-ocid={`dues.item.${idx + 1}`}
                        className="border-b border-[#E5EAF2] last:border-0 hover:bg-[#F9FAFB]"
                      >
                        <td className="px-4 py-3 font-medium text-[#0E1116]">
                          {apt.block ? `${apt.block}-` : ""}
                          {apt.number}
                        </td>
                        <td className="px-4 py-3 text-[#3A4654]">
                          {apt.residentName || (
                            <span className="text-[#3A4654]/40">
                              {t.noResident}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isOwner ? (
                            <Input
                              type="number"
                              value={due?.amount ?? ""}
                              onChange={(e) =>
                                setAmount(apt.id, Number(e.target.value))
                              }
                              className="w-24 h-7 text-sm"
                              placeholder="0"
                            />
                          ) : (
                            <span className="text-[#0E1116]">
                              {due?.amount ?? 0} ₺
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {interest > 0 ? (
                            <span className="text-red-500 text-sm font-medium">
                              +{interest.toLocaleString()} ₺
                            </span>
                          ) : (
                            <span className="text-[#9CA8B4] text-sm">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {statusBadge(due?.status)}
                        </td>
                        <td className="px-4 py-3">
                          {proofFile ? (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <Upload className="w-3 h-3" /> {proofFile}
                            </span>
                          ) : (
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleProofUpload(apt.id, file.name);
                                }}
                              />
                              <span className="text-xs text-[#4A90D9] hover:underline flex items-center gap-1">
                                <Upload className="w-3 h-3" /> Yükle
                              </span>
                            </label>
                          )}
                        </td>
                        {isOwner && (
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 justify-end">
                              <Button
                                data-ocid={`dues.secondary_button.${idx + 1}`}
                                onClick={() => handleSendReminder(apt)}
                                size="sm"
                                variant="outline"
                                className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full h-7 gap-1"
                              >
                                <Bell className="w-3 h-3" /> Hatırlat
                              </Button>
                              <Button
                                data-ocid={`dues.toggle.${idx + 1}`}
                                onClick={() => setStatus(apt.id, "paid")}
                                size="sm"
                                variant="outline"
                                className="text-xs text-green-600 border-green-200 hover:bg-green-50 rounded-full h-7"
                              >
                                {t.markPaid}
                              </Button>
                              <Button
                                onClick={() => setStatus(apt.id, "overdue")}
                                size="sm"
                                variant="outline"
                                className="text-xs text-red-500 border-red-200 hover:bg-red-50 rounded-full h-7"
                              >
                                {t.markOverdue}
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="aging">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                1–30 Gün
              </p>
              <p className="text-2xl font-bold text-amber-600">
                {agingData["1-30"].length}
              </p>
              <p className="text-xs text-amber-500 mt-1">
                {agingData["1-30"]
                  .reduce((s, d) => s + d.amount, 0)
                  .toLocaleString()}{" "}
                ₺
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-orange-700 mb-1">
                31–60 Gün
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {agingData["31-60"].length}
              </p>
              <p className="text-xs text-orange-500 mt-1">
                {agingData["31-60"]
                  .reduce((s, d) => s + d.amount, 0)
                  .toLocaleString()}{" "}
                ₺
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-red-700 mb-1">60+ Gün</p>
              <p className="text-2xl font-bold text-red-600">
                {agingData["60+"].length}
              </p>
              <p className="text-xs text-red-500 mt-1">
                {agingData["60+"]
                  .reduce((s, d) => s + d.amount, 0)
                  .toLocaleString()}{" "}
                ₺
              </p>
            </div>
          </div>
          {Object.entries(agingData).map(([bucket, records]) =>
            records.length > 0 ? (
              <div
                key={bucket}
                className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden mb-3"
              >
                <div className="px-4 py-2 bg-[#F3F6FB] font-semibold text-sm text-[#3A4654]">
                  {bucket} Gün — {records.length} daire
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {records.map((d) => {
                      const apt = apartments.find(
                        (a) => a.id === d.apartmentId,
                      );
                      const interest = calcInterest(
                        d.amount,
                        d.month,
                        dailyRate,
                      );
                      return (
                        <tr key={d.id} className="border-t border-[#F0F3F8]">
                          <td className="px-4 py-2 font-medium text-[#0E1116]">
                            Daire {apt?.block ? `${apt.block}-` : ""}
                            {apt?.number || d.apartmentId}
                          </td>
                          <td className="px-4 py-2 text-[#3A4654]">
                            {apt?.residentName || "—"}
                          </td>
                          <td className="px-4 py-2 font-semibold text-red-600">
                            {d.amount.toLocaleString()} ₺
                          </td>
                          <td className="px-4 py-2 text-red-400 text-xs">
                            Faiz: +{interest.toLocaleString()} ₺
                          </td>
                          <td className="px-4 py-2 text-[#6B7A8D]">
                            {formatMonth(d.month)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null,
          )}
          {Object.values(agingData).every((r) => r.length === 0) && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-10 text-center">
              <p className="text-[#6B7A8D]">Vadesi geçmiş borç bulunmuyor.</p>
            </div>
          )}
          <div className="bg-[#EEF3FA] border border-[#C5D5EA] rounded-xl p-3 mt-3 text-xs text-[#4A90D9]">
            Günlük gecikme faiz oranı: %{(dailyRate * 100).toFixed(1)} • Aylık:
            %{(dailyRate * 30 * 100).toFixed(1)}
            {isOwner && (
              <button
                type="button"
                className="ml-2 underline"
                onClick={() => setShowRateDialog(true)}
              >
                Değiştir
              </button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reminders">
          <div className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden">
            <div className="bg-[#F3F6FB] px-4 py-3 border-b border-[#E5EAF2]">
              <h3 className="font-semibold text-sm text-[#0E1116] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#4A90D9]" /> Gönderilen
                Hatırlatmalar
              </h3>
            </div>
            {reminders.length === 0 ? (
              <div
                data-ocid="dues.empty_state"
                className="py-12 text-center text-[#6B7A8D]"
              >
                Henüz hatırlatma gönderilmedi.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-[#F3F6FB] border-b border-[#E5EAF2]">
                  <tr>
                    <th className="text-left px-4 py-2 text-[#3A4654]">
                      Daire
                    </th>
                    <th className="text-left px-4 py-2 text-[#3A4654]">
                      İlgili Dönem
                    </th>
                    <th className="text-left px-4 py-2 text-[#3A4654]">
                      Gönderilme Tarihi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((r, i) => (
                    <tr
                      key={r.id}
                      data-ocid={`dues.item.${i + 1}`}
                      className="border-t border-[#F0F3F8] hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-2 font-medium text-[#0E1116]">
                        {r.daire}
                      </td>
                      <td className="px-4 py-2 text-[#3A4654]">{r.month}</td>
                      <td className="px-4 py-2 text-[#6B7A8D]">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Son 6 Ay Aidat Geçmişi
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6B7A8D" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6B7A8D" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E5EAF2",
                  }}
                  formatter={(v) => [`${Number(v).toLocaleString()} ₺`]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Tahsilat" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Bekleyen" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bulk Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.setMonthlyDues}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-[#6B7A8D]">
              {formatMonth(month)} ayı için tüm dairelere toplu aidat dönemi
              oluşturulacak.
            </p>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.dueAmount} (₺)
              </p>
              <Input
                data-ocid="dues.input"
                type="number"
                value={bulkAmount}
                onChange={(e) => setBulkAmount(e.target.value)}
                placeholder="500"
              />
            </div>
            <Button
              data-ocid="dues.submit_button"
              onClick={applyBulkAmount}
              disabled={!bulkAmount}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.applyToAll}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rate Dialog */}
      <Dialog open={showRateDialog} onOpenChange={setShowRateDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Gecikme Faizi Ayarı
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-[#6B7A8D]">
              Vadesi geçmiş aidat borcu için günlük uygulanacak faiz oranını
              belirleyin.
            </p>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Günlük Faiz Oranı (%)
              </p>
              <Input
                data-ocid="dues.input"
                type="number"
                step="0.01"
                min="0"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                placeholder="0.1"
              />
              <p className="text-xs text-[#6B7A8D] mt-1">
                Aylık karşılığı: %{(Number(rateInput) * 30).toFixed(1)}
              </p>
            </div>
            <Button
              data-ocid="dues.submit_button"
              onClick={handleSaveRate}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
