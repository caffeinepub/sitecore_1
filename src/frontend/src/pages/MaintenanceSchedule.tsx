import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Wrench,
  X,
} from "lucide-react";
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

interface EquipmentHistory {
  id: string;
  date: string;
  description: string;
  technician: string;
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  periodMonths: number;
  history: EquipmentHistory[];
  photoUrl?: string;
}

const DEFAULT_EQUIPMENT: Equipment[] = [
  {
    id: "1",
    name: "Asansör A Bloğu",
    type: "Asansör",
    lastMaintenanceDate: "2026-01-15",
    nextMaintenanceDate: "2026-04-15",
    periodMonths: 3,
    history: [
      {
        id: "h1",
        date: "2026-01-15",
        description: "Periyodik bakım yapıldı",
        technician: "Kaya Teknik",
      },
    ],
    photoUrl: "",
  },
  {
    id: "2",
    name: "Jeneratör",
    type: "Elektrik",
    lastMaintenanceDate: "2025-11-01",
    nextMaintenanceDate: "2026-05-01",
    periodMonths: 6,
    history: [],
  },
  {
    id: "3",
    name: "Hidrofor Sistemi",
    type: "Su Tesisatı",
    lastMaintenanceDate: "2026-02-10",
    nextMaintenanceDate: "2026-08-10",
    periodMonths: 6,
    history: [],
  },
  {
    id: "4",
    name: "Yangın Tüpleri",
    type: "Yangın Güvenliği",
    lastMaintenanceDate: "2025-12-01",
    nextMaintenanceDate: "2026-03-01",
    periodMonths: 3,
    history: [],
  },
];

export default function MaintenanceSchedule({
  buildingId,
  isOwner,
}: { buildingId: string; userId: string; isOwner: boolean; t: any }) {
  const storageKey = `sitecore_maint_schedule_${buildingId}`;
  const load = (): Equipment[] => {
    try {
      const d = localStorage.getItem(storageKey);
      return d ? JSON.parse(d) : DEFAULT_EQUIPMENT;
    } catch {
      return DEFAULT_EQUIPMENT;
    }
  };
  const [items, setItems] = useState<Equipment[]>(load);
  const [showAdd, setShowAdd] = useState(false);
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    lastMaintenanceDate: "",
    periodMonths: 3,
    photoUrl: "",
  });
  const [histForm, setHistForm] = useState({
    date: "",
    description: "",
    technician: "",
  });

  const save = (data: Equipment[]) => {
    setItems(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const getStatus = (eq: Equipment) => {
    const today = new Date();
    const next = new Date(eq.nextMaintenanceDate);
    const diff = (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "overdue";
    if (diff <= 30) return "soon";
    return "ok";
  };

  const statusBadge = (status: string) => {
    if (status === "overdue")
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          Gecikmiş
        </Badge>
      );
    if (status === "soon")
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          Yaklaşıyor
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200">
        Güncel
      </Badge>
    );
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const last =
      form.lastMaintenanceDate || new Date().toISOString().slice(0, 10);
    const nextDate = new Date(last);
    nextDate.setMonth(nextDate.getMonth() + form.periodMonths);
    const eq: Equipment = {
      id: Date.now().toString(),
      name: form.name.trim(),
      type: form.type.trim() || "Diğer",
      lastMaintenanceDate: last,
      nextMaintenanceDate: nextDate.toISOString().slice(0, 10),
      periodMonths: form.periodMonths,
      history: [],
      photoUrl: form.photoUrl.trim() || undefined,
    };
    save([...items, eq]);
    setShowAdd(false);
    setForm({
      name: "",
      type: "",
      lastMaintenanceDate: "",
      periodMonths: 3,
      photoUrl: "",
    });
  };

  const handleComplete = (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const updated = items.map((eq) => {
      if (eq.id !== id) return eq;
      const next = new Date(today);
      next.setMonth(next.getMonth() + eq.periodMonths);
      const histEntry: EquipmentHistory = {
        id: Date.now().toString(),
        date: today,
        description: "Periyodik bakım tamamlandı",
        technician: "",
      };
      return {
        ...eq,
        lastMaintenanceDate: today,
        nextMaintenanceDate: next.toISOString().slice(0, 10),
        history: [histEntry, ...eq.history],
      };
    });
    save(updated);
  };

  const handleAddHistory = (id: string) => {
    if (!histForm.date || !histForm.description) return;
    const updated = items.map((eq) =>
      eq.id !== id
        ? eq
        : {
            ...eq,
            history: [
              { id: Date.now().toString(), ...histForm },
              ...eq.history,
            ],
          },
    );
    save(updated);
    setHistForm({ date: "", description: "", technician: "" });
  };

  const handleDelete = (id: string) => save(items.filter((eq) => eq.id !== id));

  const overdue = items.filter((eq) => getStatus(eq) === "overdue").length;
  const soon = items.filter((eq) => getStatus(eq) === "soon").length;
  const selected = items.find((eq) => eq.id === showHistory);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Bakım Takvimi & Ekipman Takibi
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Ekipman Ekle
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#0B1B2E]">{items.length}</p>
          <p className="text-sm text-[#3A4654] mt-1">Toplam Ekipman</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-red-600">{overdue}</p>
          <p className="text-sm text-[#3A4654] mt-1">Gecikmiş Bakım</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-yellow-600">{soon}</p>
          <p className="text-sm text-[#3A4654] mt-1">Yaklaşan Bakım</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((eq) => {
          const status = getStatus(eq);
          return (
            <div
              key={eq.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border ${status === "overdue" ? "border-red-200" : status === "soon" ? "border-yellow-200" : "border-[#E5EAF2]"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {eq.photoUrl && (
                    <div className="mb-3">
                      <img
                        src={eq.photoUrl}
                        alt={eq.name}
                        className="w-24 h-24 object-cover rounded-xl border border-[#E5EAF2]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-[#4A90D9]" />
                    <span className="font-semibold text-[#0E1116]">
                      {eq.name}
                    </span>
                    <Badge className="bg-[#F1F4F8] text-[#3A4654] text-xs">
                      {eq.type}
                    </Badge>
                    {statusBadge(status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-[#3A4654]">
                    <div>
                      <span className="font-medium">Son Bakım:</span>{" "}
                      {eq.lastMaintenanceDate}
                    </div>
                    <div>
                      <span className="font-medium">Sonraki Bakım:</span>{" "}
                      {eq.nextMaintenanceDate}
                    </div>
                    <div>
                      <span className="font-medium">Periyot:</span>{" "}
                      {eq.periodMonths} ay
                    </div>
                    <div>
                      <span className="font-medium">Geçmiş:</span>{" "}
                      {eq.history.length} kayıt
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 flex-wrap justify-end">
                  <Button
                    onClick={() => setShowHistory(eq.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    Geçmiş
                  </Button>
                  {isOwner && (
                    <Button
                      onClick={() => handleComplete(eq.id)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Tamamlandı
                    </Button>
                  )}
                  {isOwner && (
                    <Button
                      onClick={() => handleDelete(eq.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-600 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              {status === "overdue" && (
                <div className="mt-3 flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>
                    Bakım tarihi geçti! Lütfen en kısa sürede bakım yaptırın.
                  </span>
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-center text-[#3A4654] py-10">
            Ekipman kaydı bulunmuyor.
          </p>
        )}
      </div>

      {/* Add Equipment Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ekipman Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Ekipman Adı</p>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="ör. Asansör B Bloğu"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Tür</p>
              <Input
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                placeholder="ör. Asansör, Elektrik, Su Tesisatı"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Son Bakım Tarihi</p>
              <Input
                type="date"
                value={form.lastMaintenanceDate}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    lastMaintenanceDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Bakım Periyodu (ay)</p>
              <select
                value={form.periodMonths}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    periodMonths: Number(e.target.value),
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                <option value={1}>1 ay</option>
                <option value={3}>3 ay</option>
                <option value={6}>6 ay</option>
                <option value={12}>12 ay</option>
                <option value={24}>24 ay</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">
                Fotoğraf URL (opsiyonel)
              </p>
              <Input
                value={form.photoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, photoUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog open={!!showHistory} onOpenChange={() => setShowHistory(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.name} – Bakım Geçmişi</DialogTitle>
          </DialogHeader>
          {isOwner && (
            <div className="space-y-2 mb-4 p-3 bg-[#F3F6FB] rounded-xl">
              <p className="text-sm font-medium">Yeni Kayıt Ekle</p>
              <Input
                type="date"
                value={histForm.date}
                onChange={(e) =>
                  setHistForm((f) => ({ ...f, date: e.target.value }))
                }
              />
              <Input
                value={histForm.description}
                onChange={(e) =>
                  setHistForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Açıklama"
              />
              <Input
                value={histForm.technician}
                onChange={(e) =>
                  setHistForm((f) => ({ ...f, technician: e.target.value }))
                }
                placeholder="Teknisyen / Firma (opsiyonel)"
              />
              <Button
                onClick={() => showHistory && handleAddHistory(showHistory)}
                disabled={!histForm.date || !histForm.description}
                className="w-full bg-[#4A90D9] text-white rounded-full text-sm"
              >
                Kaydet
              </Button>
            </div>
          )}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(selected?.history || []).length === 0 && (
              <p className="text-center text-[#3A4654] py-4">
                Kayıt bulunmuyor.
              </p>
            )}
            {(selected?.history || []).map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-xl p-3 border border-[#E5EAF2]"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[#0E1116]">{h.date}</span>
                  {h.technician && (
                    <span className="text-[#3A4654]">{h.technician}</span>
                  )}
                </div>
                <p className="text-sm text-[#3A4654] mt-1">{h.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
