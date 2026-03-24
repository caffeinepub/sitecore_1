import { CheckCircle, Plus, QrCode, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface PreAuth {
  id: string;
  visitorName: string;
  expectedDate: string;
  timeFrom: string;
  timeTo: string;
  purpose: string;
  hostApartment: string;
  accessCode: string;
  status: "waiting" | "approved" | "arrived" | "cancelled";
  createdAt: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_visitor_preauth_${id}`;

const STATUS_COLORS: Record<PreAuth["status"], string> = {
  waiting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-blue-100 text-blue-700 border-blue-200",
  arrived: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};
const STATUS_LABELS: Record<PreAuth["status"], string> = {
  waiting: "Bekliyor",
  approved: "Onaylandı",
  arrived: "Geldi",
  cancelled: "İptal",
};

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function VisitorPreAuth({
  buildingId,
  userId: _userId,
  isOwner,
  t: _t,
}: Props) {
  const [entries, setEntries] = useState<PreAuth[]>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    const today = new Date().toISOString().slice(0, 10);
    return [
      {
        id: "vp1",
        visitorName: "Elif Şahin",
        expectedDate: today,
        timeFrom: "14:00",
        timeTo: "17:00",
        purpose: "Aile ziyareti",
        hostApartment: "A-5",
        accessCode: "482930",
        status: "arrived",
        createdAt: new Date().toISOString(),
      },
      {
        id: "vp2",
        visitorName: "Teknisyen Servis",
        expectedDate: today,
        timeFrom: "10:00",
        timeTo: "12:00",
        purpose: "Klima bakımı",
        hostApartment: "B-8",
        accessCode: "751204",
        status: "waiting",
        createdAt: new Date().toISOString(),
      },
      {
        id: "vp3",
        visitorName: "Paket Kurye",
        expectedDate: today,
        timeFrom: "09:00",
        timeTo: "10:00",
        purpose: "Paket teslimi",
        hostApartment: "C-2",
        accessCode: "318475",
        status: "cancelled",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<PreAuth | null>(null);
  const [form, setForm] = useState({
    visitorName: "",
    expectedDate: "",
    timeFrom: "",
    timeTo: "",
    purpose: "",
    hostApartment: "",
  });

  const save = (list: PreAuth[]) => {
    setEntries(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!form.visitorName || !form.expectedDate || !form.hostApartment) return;
    const entry: PreAuth = {
      id: Date.now().toString(),
      ...form,
      accessCode: generateCode(),
      status: "waiting",
      createdAt: new Date().toISOString(),
    };
    save([entry, ...entries]);
    setShowForm(false);
    setForm({
      visitorName: "",
      expectedDate: "",
      timeFrom: "",
      timeTo: "",
      purpose: "",
      hostApartment: "",
    });
  };

  const handleArrived = (id: string) =>
    save(entries.map((e) => (e.id === id ? { ...e, status: "arrived" } : e)));
  const handleCancel = (id: string) =>
    save(entries.map((e) => (e.id === id ? { ...e, status: "cancelled" } : e)));

  const today = new Date().toISOString().slice(0, 10);
  const todayExpected = entries.filter(
    (e) => e.expectedDate === today && e.status !== "cancelled",
  ).length;
  const todayArrived = entries.filter(
    (e) => e.expectedDate === today && e.status === "arrived",
  ).length;
  const todayCancelled = entries.filter(
    (e) => e.expectedDate === today && e.status === "cancelled",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="w-6 h-6 text-[#0B1B2E]" />
          <h2 className="text-xl font-bold text-[#0E1116]">
            Ziyaretçi Ön İzni & QR Erişim
          </h2>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
        >
          <Plus className="w-4 h-4" /> İzin Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Bugün Beklenen",
            val: todayExpected,
            color: "text-[#0B1B2E]",
          },
          { label: "Geldi", val: todayArrived, color: "text-green-600" },
          { label: "İptal", val: todayCancelled, color: "text-red-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center"
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-sm text-[#6B7A8D] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-[#0E1116]">
                    {entry.visitorName}
                  </span>
                  <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                    {entry.hostApartment}
                  </Badge>
                  <Badge
                    className={`border text-xs ${STATUS_COLORS[entry.status]}`}
                  >
                    {STATUS_LABELS[entry.status]}
                  </Badge>
                </div>
                <div className="text-sm text-[#3A4654]">{entry.purpose}</div>
                <div className="text-xs text-[#6B7A8D] mt-1">
                  📅 {entry.expectedDate} · ⏰ {entry.timeFrom} – {entry.timeTo}
                </div>
              </div>
              {/* Access code display */}
              <button
                type="button"
                onClick={() => setSelectedEntry(entry)}
                className="bg-[#0B1B2E] rounded-xl px-4 py-3 text-center flex-shrink-0 hover:bg-[#112843] transition-colors"
              >
                <p className="text-white/50 text-xs mb-1">Erişim Kodu</p>
                <p className="text-white font-mono text-xl font-bold tracking-widest">
                  {entry.accessCode}
                </p>
              </button>
            </div>
            {isOwner &&
              (entry.status === "waiting" || entry.status === "approved") && (
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1"
                    onClick={() => handleArrived(entry.id)}
                  >
                    <CheckCircle className="w-3 h-3" /> Geldi İşaretle
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50 rounded-full text-xs gap-1"
                    onClick={() => handleCancel(entry.id)}
                  >
                    <XCircle className="w-3 h-3" /> İptal Et
                  </Button>
                </div>
              )}
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-[#3A4654] text-center py-10">
            Henüz ön izin kaydı bulunmuyor.
          </p>
        )}
      </div>

      {/* Code Detail Modal */}
      <Dialog
        open={!!selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
      >
        <DialogContent className="max-w-xs text-center">
          <DialogHeader>
            <DialogTitle>Ziyaretçi Erişim Kodu</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-[#0E1116]">
                  {selectedEntry.visitorName}
                </p>
                <p className="text-sm text-[#6B7A8D]">
                  {selectedEntry.hostApartment} · {selectedEntry.expectedDate}
                </p>
              </div>
              <div className="bg-[#0B1B2E] rounded-2xl p-6 mx-auto">
                <p className="text-white/50 text-xs mb-2">ERİŞİM KODU</p>
                <p className="text-white font-mono text-4xl font-bold tracking-[0.3em]">
                  {selectedEntry.accessCode}
                </p>
              </div>
              <p className="text-xs text-[#6B7A8D]">
                Bu kodu güvenlik görevlisine gösterin.
              </p>
              <Badge
                className={`border mx-auto ${STATUS_COLORS[selectedEntry.status]}`}
              >
                {STATUS_LABELS[selectedEntry.status]}
              </Badge>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Pre-Auth Form */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ziyaretçi Ön İzni Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Ziyaretçi Adı</p>
              <Input
                value={form.visitorName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, visitorName: e.target.value }))
                }
                placeholder="Ad Soyad"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Beklenen Tarih</p>
                <Input
                  type="date"
                  value={form.expectedDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expectedDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Ev Sahibi Daire</p>
                <Input
                  value={form.hostApartment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, hostApartment: e.target.value }))
                  }
                  placeholder="A-5"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Saatten</p>
                <Input
                  type="time"
                  value={form.timeFrom}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timeFrom: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Saate</p>
                <Input
                  type="time"
                  value={form.timeTo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timeTo: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Ziyaret Amacı</p>
              <Input
                value={form.purpose}
                onChange={(e) =>
                  setForm((f) => ({ ...f, purpose: e.target.value }))
                }
                placeholder="Aile ziyareti, teslimat, vb."
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={
                !form.visitorName || !form.expectedDate || !form.hostApartment
              }
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              İzin Oluştur & Kod Üret
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
