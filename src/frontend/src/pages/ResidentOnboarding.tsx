import {
  CheckCheck,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Home,
  Key,
  Plus,
  UserPlus,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface OnboardingRecord {
  id: string;
  residentName: string;
  apartment: string;
  moveInDate: string;
  status: "pending" | "in_progress" | "completed";
  keyHandover: boolean;
  cardHandover: boolean;
  remoteHandover: boolean;
  buildingGuideShared: boolean;
  emergencyContactCollected: boolean;
  parkingAssigned: boolean;
  rulesAcknowledged: boolean;
  welcomePackageSent: boolean;
  notes: string;
  createdBy: string;
}

const INITIAL: OnboardingRecord[] = [
  {
    id: "1",
    residentName: "Ayşe Demir",
    apartment: "A-5",
    moveInDate: "2026-03-15",
    status: "completed",
    keyHandover: true,
    cardHandover: true,
    remoteHandover: true,
    buildingGuideShared: true,
    emergencyContactCollected: true,
    parkingAssigned: true,
    rulesAcknowledged: true,
    welcomePackageSent: true,
    notes: "Tüm teslim tamamlandı.",
    createdBy: "Yönetici",
  },
  {
    id: "2",
    residentName: "Can Kaya",
    apartment: "B-12",
    moveInDate: "2026-03-22",
    status: "in_progress",
    keyHandover: true,
    cardHandover: true,
    remoteHandover: false,
    buildingGuideShared: true,
    emergencyContactCollected: false,
    parkingAssigned: false,
    rulesAcknowledged: false,
    welcomePackageSent: false,
    notes: "Uzaktan kumanda temin ediliyor.",
    createdBy: "Yönetici",
  },
  {
    id: "3",
    residentName: "Zeynep Arslan",
    apartment: "C-3",
    moveInDate: "2026-04-01",
    status: "pending",
    keyHandover: false,
    cardHandover: false,
    remoteHandover: false,
    buildingGuideShared: false,
    emergencyContactCollected: false,
    parkingAssigned: false,
    rulesAcknowledged: false,
    welcomePackageSent: false,
    notes: "",
    createdBy: "Yönetici",
  },
];

const CHECKLIST_ITEMS: {
  key: keyof OnboardingRecord;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "keyHandover", label: "Anahtar Teslimi", icon: Key },
  { key: "cardHandover", label: "Giriş Kartı Teslimi", icon: Key },
  { key: "remoteHandover", label: "Uzaktan Kumanda Teslimi", icon: Home },
  {
    key: "buildingGuideShared",
    label: "Bina Rehberi Paylaşıldı",
    icon: FileText,
  },
  {
    key: "emergencyContactCollected",
    label: "Acil İletişim Bilgisi Alındı",
    icon: UserPlus,
  },
  { key: "parkingAssigned", label: "Park Yeri Atandı", icon: Home },
  {
    key: "rulesAcknowledged",
    label: "Bina Kuralları Onaylandı",
    icon: FileText,
  },
  {
    key: "welcomePackageSent",
    label: "Hoş Geldin Paketi Gönderildi",
    icon: CheckCheck,
  },
];

function getProgress(record: OnboardingRecord): number {
  const keys = CHECKLIST_ITEMS.map((i) => i.key);
  const done = keys.filter((k) => record[k] === true).length;
  return Math.round((done / keys.length) * 100);
}

function statusLabel(status: string) {
  if (status === "completed")
    return { label: "Tamamlandı", color: "bg-green-100 text-green-700" };
  if (status === "in_progress")
    return { label: "Devam Ediyor", color: "bg-blue-100 text-blue-700" };
  return { label: "Bekliyor", color: "bg-gray-100 text-gray-700" };
}

export default function ResidentOnboarding({
  buildingId: _buildingId,
  isOwner,
}: {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}) {
  const [records, setRecords] = useState<OnboardingRecord[]>(INITIAL);
  const [selected, setSelected] = useState<OnboardingRecord | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newForm, setNewForm] = useState({
    residentName: "",
    apartment: "",
    moveInDate: "",
    notes: "",
  });

  function toggleCheck(id: string, key: keyof OnboardingRecord) {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [key]: !r[key] };
        const prog = getProgress(updated);
        updated.status =
          prog === 100 ? "completed" : prog > 0 ? "in_progress" : "pending";
        return updated;
      }),
    );
    if (selected?.id === id) {
      setSelected((prev) => {
        if (!prev) return null;
        const updated = { ...prev, [key]: !prev[key] };
        const prog = getProgress(updated);
        updated.status =
          prog === 100 ? "completed" : prog > 0 ? "in_progress" : "pending";
        return updated;
      });
    }
  }

  function handleAdd() {
    if (!newForm.residentName || !newForm.apartment) return;
    const r: OnboardingRecord = {
      id: Date.now().toString(),
      residentName: newForm.residentName,
      apartment: newForm.apartment,
      moveInDate: newForm.moveInDate,
      status: "pending",
      keyHandover: false,
      cardHandover: false,
      remoteHandover: false,
      buildingGuideShared: false,
      emergencyContactCollected: false,
      parkingAssigned: false,
      rulesAcknowledged: false,
      welcomePackageSent: false,
      notes: newForm.notes,
      createdBy: "Yönetici",
    };
    setRecords((prev) => [...prev, r]);
    setShowAdd(false);
    setNewForm({ residentName: "", apartment: "", moveInDate: "", notes: "" });
  }

  const completed = records.filter((r) => r.status === "completed").length;
  const inProgress = records.filter((r) => r.status === "in_progress").length;
  const pending = records.filter((r) => r.status === "pending").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1116]">
            Sakin Onboarding & Karşılama
          </h1>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Yeni taşınan sakinler için dijital teslim ve karşılama sürecini
            yönetin
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Sakin
          </Button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Tamamlandı",
            value: completed,
            color: "bg-green-100",
            textColor: "text-green-700",
          },
          {
            label: "Devam Ediyor",
            value: inProgress,
            color: "bg-blue-100",
            textColor: "text-blue-700",
          },
          {
            label: "Bekliyor",
            value: pending,
            color: "bg-gray-100",
            textColor: "text-gray-700",
          },
        ].map((s) => (
          <Card key={s.label} className="bg-white border-none shadow-sm">
            <CardContent className="pt-4">
              <div
                className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-2`}
              >
                <span className={`font-bold text-lg ${s.textColor}`}>
                  {s.value}
                </span>
              </div>
              <p className="text-sm text-[#6B7A8D]">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Records */}
      <div className="grid gap-4">
        {records.map((record) => {
          const progress = getProgress(record);
          const st = statusLabel(record.status);
          return (
            <Card
              key={record.id}
              className="bg-white border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(record)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F1F4F8] flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-[#4A90D9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0E1116]">
                        {record.residentName}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">
                        Daire {record.apartment} • Taşınma:{" "}
                        {record.moveInDate || "—"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${st.color}`}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-[#6B7A8D] mb-1">
                    <span>İlerleme</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-[#E5EAF2] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${progress === 100 ? "bg-green-500" : "bg-[#4A90D9]"}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selected.residentName} — Daire {selected.apartment}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7A8D]">
                  Taşınma Tarihi: {selected.moveInDate || "—"}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${statusLabel(selected.status).color}`}
                >
                  {statusLabel(selected.status).label}
                </span>
              </div>
              <div className="w-full bg-[#E5EAF2] rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#4A90D9] transition-all"
                  style={{ width: `${getProgress(selected)}%` }}
                />
              </div>
              <div className="space-y-2">
                {CHECKLIST_ITEMS.map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    className="w-full flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg cursor-pointer hover:bg-[#F1F4F8] text-left"
                    onKeyDown={(e) =>
                      e.key === "Enter" && toggleCheck(selected.id, key)
                    }
                    onClick={() => toggleCheck(selected.id, key)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#6B7A8D]" />
                      <span
                        className={`text-sm ${selected[key] ? "text-green-700 line-through" : "text-[#0E1116]"}`}
                      >
                        {label}
                      </span>
                    </div>
                    {selected[key] ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#D7DEE9]" />
                    )}
                  </button>
                ))}
              </div>
              {selected.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">{selected.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yeni Sakin Onboarding</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Sakin adı soyadı"
              value={newForm.residentName}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, residentName: e.target.value }))
              }
            />
            <Input
              placeholder="Daire (örn. A-5)"
              value={newForm.apartment}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, apartment: e.target.value }))
              }
            />
            <Input
              type="date"
              value={newForm.moveInDate}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, moveInDate: e.target.value }))
              }
            />
            <textarea
              placeholder="Notlar (isteğe bağlı)"
              value={newForm.notes}
              onChange={(e) =>
                setNewForm((p) => ({ ...p, notes: e.target.value }))
              }
              className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
            />
            <Button
              onClick={handleAdd}
              disabled={!newForm.residentName || !newForm.apartment}
              className="w-full bg-[#0B1B2E] text-white rounded-full"
            >
              Oluştur
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
