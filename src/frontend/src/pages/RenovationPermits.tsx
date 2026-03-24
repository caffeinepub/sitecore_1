import { CheckCircle, HardHat, Plus, XCircle } from "lucide-react";
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
import { Textarea } from "../components/ui/textarea";

interface Permit {
  id: string;
  applicantName: string;
  apartmentNo: string;
  workType: string;
  startDate: string;
  endDate: string;
  workHours: string;
  affectedFloors: string;
  description: string;
  neighborNote: string;
  status: "pending" | "approved" | "rejected" | "completed";
  reviewNote?: string;
  createdAt: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_renovation_${id}`;
const WORK_TYPES = ["Elektrik", "Su Tesisatı", "Tadilat", "Boyama", "Diğer"];

const STATUS_COLORS: Record<Permit["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-gray-100 text-gray-600 border-gray-200",
};
const STATUS_LABELS: Record<Permit["status"], string> = {
  pending: "Beklemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  completed: "Tamamlandı",
};

export default function RenovationPermits({
  buildingId,
  userId: _userId,
  isOwner,
  t: _t,
}: Props) {
  const [permits, setPermits] = useState<Permit[]>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: "rp1",
        applicantName: "Ahmet Yılmaz",
        apartmentNo: "A-12",
        workType: "Tadilat",
        startDate: "2026-04-01",
        endDate: "2026-04-07",
        workHours: "09:00-17:00",
        affectedFloors: "4",
        description: "Mutfak dolap yenileme ve zemin kaplaması değişimi.",
        neighborNote: "4. kat komşular bilgilendirildi.",
        status: "approved",
        reviewNote: "Saatler uygun, onaylandı.",
        createdAt: "2026-03-20T10:00:00Z",
      },
      {
        id: "rp2",
        applicantName: "Sevda Kaya",
        apartmentNo: "B-7",
        workType: "Su Tesisatı",
        startDate: "2026-04-05",
        endDate: "2026-04-06",
        workHours: "10:00-16:00",
        affectedFloors: "3",
        description: "Banyo musluğu ve duş armatürü değişimi.",
        neighborNote: "Kısa süreli su kesintisi olabilir.",
        status: "pending",
        createdAt: "2026-03-22T14:30:00Z",
      },
      {
        id: "rp3",
        applicantName: "Murat Demir",
        apartmentNo: "C-3",
        workType: "Boyama",
        startDate: "2026-03-15",
        endDate: "2026-03-18",
        workHours: "08:00-18:00",
        affectedFloors: "1",
        description: "Tüm iç mekân boyama.",
        neighborNote: "",
        status: "completed",
        createdAt: "2026-03-10T09:00:00Z",
      },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Permit | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [form, setForm] = useState({
    applicantName: "",
    apartmentNo: "",
    workType: "Tadilat",
    startDate: "",
    endDate: "",
    workHours: "08:00-18:00",
    affectedFloors: "",
    description: "",
    neighborNote: "",
  });

  const save = (list: Permit[]) => {
    setPermits(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!form.applicantName || !form.apartmentNo || !form.startDate) return;
    const p: Permit = {
      id: Date.now().toString(),
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    save([p, ...permits]);
    setShowForm(false);
    setForm({
      applicantName: "",
      apartmentNo: "",
      workType: "Tadilat",
      startDate: "",
      endDate: "",
      workHours: "08:00-18:00",
      affectedFloors: "",
      description: "",
      neighborNote: "",
    });
  };

  const handleReview = (action: "approved" | "rejected") => {
    if (!reviewTarget) return;
    save(
      permits.map((p) =>
        p.id === reviewTarget.id ? { ...p, status: action, reviewNote } : p,
      ),
    );
    setReviewTarget(null);
    setReviewNote("");
  };

  const handleComplete = (id: string) => {
    save(permits.map((p) => (p.id === id ? { ...p, status: "completed" } : p)));
  };

  const total = permits.length;
  const approved = permits.filter((p) => p.status === "approved").length;
  const pending = permits.filter((p) => p.status === "pending").length;
  const completed = permits.filter((p) => p.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardHat className="w-6 h-6 text-[#0B1B2E]" />
          <h2 className="text-xl font-bold text-[#0E1116]">
            İzin & Tadilat Yönetimi
          </h2>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
        >
          <Plus className="w-4 h-4" /> Başvuru Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Toplam", val: total, color: "text-[#0B1B2E]" },
          { label: "Onaylı", val: approved, color: "text-green-600" },
          { label: "Bekleyen", val: pending, color: "text-yellow-600" },
          { label: "Tamamlanan", val: completed, color: "text-gray-500" },
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
        {permits.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-[#0E1116]">
                    {p.applicantName}
                  </span>
                  <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                    {p.apartmentNo}
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-0 text-xs">
                    {p.workType}
                  </Badge>
                  <Badge
                    className={`border text-xs ${STATUS_COLORS[p.status]}`}
                  >
                    {STATUS_LABELS[p.status]}
                  </Badge>
                </div>
                <p className="text-sm text-[#3A4654]">{p.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-[#6B7A8D]">
                  <span>
                    📅 {p.startDate} → {p.endDate}
                  </span>
                  <span>⏰ {p.workHours}</span>
                  {p.affectedFloors && <span>🏢 {p.affectedFloors}. kat</span>}
                </div>
                {p.reviewNote && (
                  <p className="text-xs text-[#6B7A8D] mt-1 italic">
                    Not: {p.reviewNote}
                  </p>
                )}
              </div>
            </div>
            {isOwner && p.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1"
                  onClick={() => setReviewTarget(p)}
                >
                  <CheckCircle className="w-3 h-3" /> İncele
                </Button>
              </div>
            )}
            {isOwner && p.status === "approved" && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 text-xs rounded-full"
                onClick={() => handleComplete(p.id)}
              >
                Tamamlandı İşaretle
              </Button>
            )}
          </div>
        ))}
        {permits.length === 0 && (
          <p className="text-[#3A4654] text-center py-10">
            Henüz başvuru bulunmuyor.
          </p>
        )}
      </div>

      {/* New Permit Form */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tadilat İzin Başvurusu</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Başvuran Ad Soyad</p>
                <Input
                  value={form.applicantName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, applicantName: e.target.value }))
                  }
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Daire No</p>
                <Input
                  value={form.apartmentNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, apartmentNo: e.target.value }))
                  }
                  placeholder="A-12"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">İş Türü</p>
              <select
                value={form.workType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, workType: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {WORK_TYPES.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Başlangıç</p>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Bitiş</p>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Çalışma Saatleri</p>
                <Input
                  value={form.workHours}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, workHours: e.target.value }))
                  }
                  placeholder="08:00-18:00"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Etkilenen Kat(lar)</p>
                <Input
                  value={form.affectedFloors}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, affectedFloors: e.target.value }))
                  }
                  placeholder="3, 4"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">İş Açıklaması</p>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                placeholder="Yapılacak işleri açıklayın..."
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">
                Komşu Bilgilendirme Notu
              </p>
              <Input
                value={form.neighborNote}
                onChange={(e) =>
                  setForm((f) => ({ ...f, neighborNote: e.target.value }))
                }
                placeholder="Komşulara iletilecek not (isteğe bağlı)"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={
                !form.applicantName || !form.apartmentNo || !form.startDate
              }
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Başvuru Gönder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog
        open={!!reviewTarget}
        onOpenChange={() => {
          setReviewTarget(null);
          setReviewNote("");
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Başvuruyu İncele</DialogTitle>
          </DialogHeader>
          {reviewTarget && (
            <div className="space-y-3">
              <p className="text-sm text-[#3A4654]">
                {reviewTarget.applicantName} – {reviewTarget.apartmentNo} –{" "}
                {reviewTarget.workType}
              </p>
              <p className="text-sm text-[#0E1116]">
                {reviewTarget.description}
              </p>
              <div>
                <p className="text-sm font-medium mb-1">İnceleme Notu</p>
                <Textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  rows={2}
                  placeholder="İsteğe bağlı not..."
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 text-white rounded-full"
                  onClick={() => handleReview("approved")}
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Onayla
                </Button>
                <Button
                  className="flex-1 bg-red-500 text-white rounded-full"
                  onClick={() => handleReview("rejected")}
                >
                  <XCircle className="w-4 h-4 mr-1" /> Reddet
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
