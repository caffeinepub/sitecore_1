import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const CHECKLIST_ITEMS = [
  "Boya durumu",
  "Kapılar",
  "Pencereler",
  "Mutfak",
  "Banyo",
  "Elektrik prizleri",
  "Su tesisatı",
  "Sayaçlar",
  "Genel temizlik",
];

interface ChecklistItem {
  label: string;
  status: "Tamam" | "Sorunlu" | "N/A";
  note: string;
}

interface MovingRecord {
  id: string;
  apartmentNo: string;
  residentName: string;
  date: string;
  timeSlot: string;
  type: "Giriş" | "Çıkış";
  status: "Bekliyor" | "Onaylandı" | "Tamamlandı";
  keyCount: number;
  checklist: ChecklistItem[];
  notes: string;
  createdBy: string;
}

const DEFAULT_RECORDS: MovingRecord[] = [
  {
    id: "1",
    apartmentNo: "5",
    residentName: "Ahmet Yıldız",
    date: "2026-04-01",
    timeSlot: "09:00-12:00",
    type: "Giriş",
    status: "Onaylandı",
    keyCount: 2,
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "Tamam",
      note: "",
    })),
    notes: "Nakliye firması ile gelecek.",
    createdBy: "yönetici",
  },
  {
    id: "2",
    apartmentNo: "12",
    residentName: "Ayşe Demir",
    date: "2026-04-05",
    timeSlot: "13:00-17:00",
    type: "Çıkış",
    status: "Bekliyor",
    keyCount: 3,
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "N/A",
      note: "",
    })),
    notes: "",
    createdBy: "yönetici",
  },
];

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_moving_${id}`;

export default function MovingManagement({
  buildingId,
  userId,
  isOwner,
  t,
}: Props) {
  const [records, setRecords] = useState<MovingRecord[]>(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? JSON.parse(raw) : DEFAULT_RECORDS;
  });

  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(0);
  const [detailRecord, setDetailRecord] = useState<MovingRecord | null>(null);
  const [calMonth, setCalMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  // Wizard form state
  const [wizardForm, setWizardForm] = useState({
    apartmentNo: "",
    residentName: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "09:00-12:00",
    type: "Giriş" as MovingRecord["type"],
    keyCount: 1,
    notes: "",
    checklist: CHECKLIST_ITEMS.map((l) => ({
      label: l,
      status: "N/A" as ChecklistItem["status"],
      note: "",
    })),
  });

  const save = (u: MovingRecord[]) => {
    setRecords(u);
    localStorage.setItem(KEY(buildingId), JSON.stringify(u));
  };

  const handleWizardNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleWizardBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleWizardSubmit = () => {
    if (!wizardForm.apartmentNo.trim()) return;
    const record: MovingRecord = {
      id: crypto.randomUUID(),
      ...wizardForm,
      status: "Bekliyor",
      createdBy: userId,
    };
    save([record, ...records]);
    setShowWizard(false);
    setStep(0);
    setWizardForm({
      apartmentNo: "",
      residentName: "",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "09:00-12:00",
      type: "Giriş",
      keyCount: 1,
      notes: "",
      checklist: CHECKLIST_ITEMS.map((l) => ({
        label: l,
        status: "N/A",
        note: "",
      })),
    });
  };

  const handleStatusChange = (id: string, status: MovingRecord["status"]) => {
    save(records.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const statusBadge = (status: MovingRecord["status"]) => {
    if (status === "Bekliyor")
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-0">
          Bekliyor
        </Badge>
      );
    if (status === "Onaylandı")
      return (
        <Badge className="bg-blue-100 text-blue-700 border-0">Onaylandı</Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700 border-0">Tamamlandı</Badge>
    );
  };

  const checklistDone = (checklist: ChecklistItem[]) =>
    checklist.filter((c) => c.status !== "N/A").length;
  const checklistPct = (checklist: ChecklistItem[]) =>
    Math.round((checklistDone(checklist) / checklist.length) * 100);

  // Calendar data
  const calDates = records.filter((r) => r.date.startsWith(calMonth));
  const daysInMonth = new Date(
    Number(calMonth.slice(0, 4)),
    Number(calMonth.slice(5, 7)),
    0,
  ).getDate();
  const firstDay = new Date(
    Number(calMonth.slice(0, 4)),
    Number(calMonth.slice(5, 7)) - 1,
    1,
  ).getDay();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.moving || "Taşınma & Teslim Yönetimi"}
        </h2>
        {isOwner && (
          <Button
            onClick={() => {
              setStep(0);
              setShowWizard(true);
            }}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
            data-ocid="moving.primary_button"
          >
            <ClipboardCheck className="w-4 h-4" /> Yeni Taşınma
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {records.filter((r) => r.status === "Bekliyor").length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1">Bekliyor</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-2xl font-bold text-blue-600">
            {records.filter((r) => r.status === "Onaylandı").length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1">Onaylandı</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-2xl font-bold text-green-600">
            {records.filter((r) => r.status === "Tamamlandı").length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1">Tamamlandı</p>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="calendar">Takvim</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {records.length === 0 ? (
            <div
              data-ocid="moving.empty_state"
              className="py-10 text-center text-[#3A4654] bg-white rounded-2xl border border-[#E5EAF2]"
            >
              Kayıt bulunamadı.
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((r, idx) => (
                <div
                  key={r.id}
                  data-ocid={`moving.item.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#0E1116]">
                          Daire {r.apartmentNo}
                        </span>
                        <Badge
                          className={`border-0 text-xs ${r.type === "Giriş" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                        >
                          {r.type}
                        </Badge>
                        {statusBadge(r.status)}
                      </div>
                      <p className="text-sm text-[#3A4654]">
                        {r.residentName} — {r.date} {r.timeSlot}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">
                        {r.keyCount} anahtar
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setDetailRecord(r)}
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs"
                      >
                        Detay
                      </Button>
                      {isOwner && r.status === "Bekliyor" && (
                        <Button
                          onClick={() => handleStatusChange(r.id, "Onaylandı")}
                          size="sm"
                          className="bg-blue-500 text-white rounded-full text-xs"
                        >
                          Onayla
                        </Button>
                      )}
                      {isOwner && r.status === "Onaylandı" && (
                        <Button
                          onClick={() => handleStatusChange(r.id, "Tamamlandı")}
                          size="sm"
                          className="bg-green-600 text-white rounded-full text-xs"
                        >
                          Tamamla
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* Checklist progress */}
                  <div>
                    <div className="flex justify-between text-xs text-[#6B7A8D] mb-1">
                      <span>Kontrol Listesi</span>
                      <span>
                        {checklistDone(r.checklist)}/{r.checklist.length} (
                        {checklistPct(r.checklist)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-[#F3F6FB] rounded-full">
                      <div
                        className="h-full bg-[#4A90D9] rounded-full"
                        style={{ width: `${checklistPct(r.checklist)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const d = new Date(`${calMonth}-01`);
                  d.setMonth(d.getMonth() - 1);
                  setCalMonth(d.toISOString().slice(0, 7));
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <p className="font-semibold text-[#0E1116]">{calMonth}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const d = new Date(`${calMonth}-01`);
                  d.setMonth(d.getMonth() + 1);
                  setCalMonth(d.toISOString().slice(0, 7));
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#6B7A8D] mb-2">
              {["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: placeholder empty cells
                <div key={`e${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${calMonth}-${String(day).padStart(2, "0")}`;
                const dayRecords = calDates.filter((r) => r.date === dateStr);
                return (
                  <div
                    key={day}
                    className={`rounded-lg p-1 text-center text-xs ${dayRecords.length > 0 ? "bg-[#4A90D9]/10 border border-[#4A90D9]/30" : ""}`}
                  >
                    <span className="font-medium">{day}</span>
                    {dayRecords.map((r) => (
                      <div
                        key={r.id}
                        className={`mt-0.5 rounded text-xs px-0.5 truncate ${r.type === "Giriş" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {r.apartmentNo}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      {detailRecord && (
        <Dialog
          open={!!detailRecord}
          onOpenChange={() => setDetailRecord(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Daire {detailRecord.apartmentNo} - {detailRecord.type} Detayı
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Sakin:</span>
                  <span>{detailRecord.residentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Tarih:</span>
                  <span>
                    {detailRecord.date} {detailRecord.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Anahtar:</span>
                  <span>{detailRecord.keyCount} adet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Durum:</span>
                  {statusBadge(detailRecord.status)}
                </div>
                {detailRecord.notes && (
                  <div>
                    <span className="text-[#3A4654]">Not:</span>{" "}
                    {detailRecord.notes}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm mb-2">
                  Kontrol Listesi ({checklistDone(detailRecord.checklist)}/
                  {detailRecord.checklist.length})
                </p>
                <div className="space-y-1">
                  {detailRecord.checklist.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{item.label}</span>
                      <Badge
                        className={`border-0 text-xs ${item.status === "Tamam" ? "bg-green-100 text-green-700" : item.status === "Sorunlu" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Wizard Dialog */}
      <Dialog
        open={showWizard}
        onOpenChange={(v) => {
          if (!v) {
            setShowWizard(false);
            setStep(0);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Taşınma Kayıtı</DialogTitle>
          </DialogHeader>
          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-4">
            {["Daire Seçimi", "Kontrol Listesi", "Onay"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-[#4A90D9] text-white" : "bg-[#E5EAF2] text-[#3A4654]"}`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs ${i <= step ? "text-[#0E1116]" : "text-[#3A4654]/50"}`}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 ${i < step ? "bg-[#4A90D9]" : "bg-[#E5EAF2]"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Daire No *</p>
                  <Input
                    value={wizardForm.apartmentNo}
                    onChange={(e) =>
                      setWizardForm((p) => ({
                        ...p,
                        apartmentNo: e.target.value,
                      }))
                    }
                    placeholder="101"
                    data-ocid="moving.input"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Tip</p>
                  <select
                    value={wizardForm.type}
                    onChange={(e) =>
                      setWizardForm((p) => ({
                        ...p,
                        type: e.target.value as MovingRecord["type"],
                      }))
                    }
                    className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Giriş">Giriş</option>
                    <option value="Çıkış">Çıkış</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Sakin Adı</p>
                <Input
                  value={wizardForm.residentName}
                  onChange={(e) =>
                    setWizardForm((p) => ({
                      ...p,
                      residentName: e.target.value,
                    }))
                  }
                  placeholder="Ad Soyad"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Tarih</p>
                  <Input
                    type="date"
                    value={wizardForm.date}
                    onChange={(e) =>
                      setWizardForm((p) => ({ ...p, date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Saat Aralığı</p>
                  <select
                    value={wizardForm.timeSlot}
                    onChange={(e) =>
                      setWizardForm((p) => ({ ...p, timeSlot: e.target.value }))
                    }
                    className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  >
                    {[
                      "09:00-12:00",
                      "13:00-17:00",
                      "10:00-14:00",
                      "14:00-18:00",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">
                  Teslim Edilen Anahtar Sayısı
                </p>
                <Input
                  type="number"
                  min={1}
                  value={wizardForm.keyCount}
                  onChange={(e) =>
                    setWizardForm((p) => ({
                      ...p,
                      keyCount: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-[#3A4654] mb-2">
                Her madde için durumu belirleyin:
              </p>
              {wizardForm.checklist.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-sm flex-1">{item.label}</span>
                  <div className="flex gap-1">
                    {(
                      ["Tamam", "Sorunlu", "N/A"] as ChecklistItem["status"][]
                    ).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={item.status === s ? "default" : "outline"}
                        onClick={() =>
                          setWizardForm((p) => ({
                            ...p,
                            checklist: p.checklist.map((c, j) =>
                              j === i ? { ...c, status: s } : c,
                            ),
                          }))
                        }
                        className={`text-xs h-7 rounded-full ${item.status === s ? (s === "Tamam" ? "bg-green-600 text-white" : s === "Sorunlu" ? "bg-red-500 text-white" : "bg-gray-400 text-white") : ""}`}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#F3F6FB] rounded-xl p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Daire:</span>
                  <span className="font-medium">{wizardForm.apartmentNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Tip:</span>
                  <span>{wizardForm.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Tarih:</span>
                  <span>
                    {wizardForm.date} {wizardForm.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A4654]">Kontrol:</span>
                  <span>
                    {checklistDone(wizardForm.checklist)}/
                    {wizardForm.checklist.length} tamamlandı
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Notlar</p>
                <textarea
                  value={wizardForm.notes}
                  onChange={(e) =>
                    setWizardForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none"
                  rows={3}
                  placeholder="Ek notlar..."
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handleWizardBack}
                className="rounded-full gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Geri
              </Button>
            )}
            {step < 2 ? (
              <Button
                onClick={handleWizardNext}
                disabled={step === 0 && !wizardForm.apartmentNo.trim()}
                className="flex-1 bg-[#4A90D9] text-white rounded-full gap-1"
              >
                Devam <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleWizardSubmit}
                className="flex-1 bg-green-600 text-white rounded-full"
                data-ocid="moving.submit_button"
              >
                Kaydet
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
