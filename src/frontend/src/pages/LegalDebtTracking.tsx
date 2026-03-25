import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  Phone,
  Plus,
  Scale,
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

interface LegalCase {
  id: string;
  apartmentNo: string;
  residentName: string;
  debtAmount: number;
  debtMonths: number;
  processType: "ihtar" | "noter" | "icra" | "dava" | "çözüldü";
  lawyerName: string;
  lawyerPhone: string;
  startDate: string;
  lastUpdateDate: string;
  nextActionDate: string;
  notes: string;
  documents: string[];
}

const INITIAL_CASES: LegalCase[] = [
  {
    id: "1",
    apartmentNo: "B-204",
    residentName: "Hüseyin Yıldız",
    debtAmount: 8400,
    debtMonths: 7,
    processType: "icra",
    lawyerName: "Av. Berna Soylu",
    lawyerPhone: "0555 123 4567",
    startDate: "2025-10-01",
    lastUpdateDate: "2026-02-15",
    nextActionDate: "2026-04-10",
    notes:
      "İcra müdürlüğüne dosya iletildi. Banka hesaplarına haciz kararı bekleniyor.",
    documents: ["ihtar_belgesi.pdf", "noter_ihtari.pdf"],
  },
  {
    id: "2",
    apartmentNo: "A-312",
    residentName: "Selin Arslan",
    debtAmount: 3600,
    debtMonths: 3,
    processType: "noter",
    lawyerName: "Av. Berna Soylu",
    lawyerPhone: "0555 123 4567",
    startDate: "2026-01-20",
    lastUpdateDate: "2026-03-01",
    nextActionDate: "2026-04-01",
    notes: "Noter ihtarnamesi gönderildi. Yanıt bekleniyor.",
    documents: ["noter_ihtari.pdf"],
  },
  {
    id: "3",
    apartmentNo: "C-105",
    residentName: "Mustafa Öztürk",
    debtAmount: 12000,
    debtMonths: 10,
    processType: "dava",
    lawyerName: "Av. Kadir Alp",
    lawyerPhone: "0532 987 6543",
    startDate: "2025-06-15",
    lastUpdateDate: "2026-03-10",
    nextActionDate: "2026-05-20",
    notes: "Dava devam ediyor. İlk duruşma Mayıs 2026.",
    documents: ["dava_dilekce.pdf", "icra_takip.pdf", "noter_ihtari.pdf"],
  },
  {
    id: "4",
    apartmentNo: "A-208",
    residentName: "Gülşen Kara",
    debtAmount: 2400,
    debtMonths: 2,
    processType: "çözüldü",
    lawyerName: "",
    lawyerPhone: "",
    startDate: "2025-12-10",
    lastUpdateDate: "2026-02-28",
    nextActionDate: "",
    notes: "Tüm borç ödendi, dosya kapatıldı.",
    documents: ["odeme_makbuzu.pdf"],
  },
];

const PROCESS_STEPS = [
  { key: "ihtar", label: "İhtar", color: "bg-yellow-100 text-yellow-800" },
  { key: "noter", label: "Noter", color: "bg-orange-100 text-orange-800" },
  { key: "icra", label: "İcra", color: "bg-red-100 text-red-800" },
  { key: "dava", label: "Dava", color: "bg-purple-100 text-purple-800" },
  { key: "çözüldü", label: "Çözüldü", color: "bg-green-100 text-green-800" },
];

export default function LegalDebtTracking({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [cases, setCases] = useState<LegalCase[]>(INITIAL_CASES);
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("hepsi");
  const [form, setForm] = useState({
    apartmentNo: "",
    residentName: "",
    debtAmount: "",
    debtMonths: "",
    processType: "ihtar",
    lawyerName: "",
    lawyerPhone: "",
    nextActionDate: "",
    notes: "",
  });

  const activeCases = cases.filter((c) => c.processType !== "çözüldü");
  const totalDebt = activeCases.reduce((sum, c) => sum + c.debtAmount, 0);

  const filteredCases = cases.filter(
    (c) => filterStatus === "hepsi" || c.processType === filterStatus,
  );

  const handleSave = () => {
    if (!form.apartmentNo || !form.residentName || !form.debtAmount) return;
    const newCase: LegalCase = {
      id: Date.now().toString(),
      apartmentNo: form.apartmentNo,
      residentName: form.residentName,
      debtAmount: Number(form.debtAmount),
      debtMonths: Number(form.debtMonths),
      processType: form.processType as any,
      lawyerName: form.lawyerName,
      lawyerPhone: form.lawyerPhone,
      startDate: new Date().toISOString().split("T")[0],
      lastUpdateDate: new Date().toISOString().split("T")[0],
      nextActionDate: form.nextActionDate,
      notes: form.notes,
      documents: [],
    };
    setCases((prev) => [newCase, ...prev]);
    setShowModal(false);
  };

  const getStepColor = (type: string) =>
    PROCESS_STEPS.find((s) => s.key === type)?.color ||
    "bg-gray-100 text-gray-700";

  const advanceProcess = (id: string) => {
    const order = ["ihtar", "noter", "icra", "dava", "çözüldü"];
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = order.indexOf(c.processType);
        return {
          ...c,
          processType: order[Math.min(idx + 1, order.length - 1)] as any,
          lastUpdateDate: new Date().toISOString().split("T")[0],
        };
      }),
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Scale className="w-7 h-7 text-purple-600" /> Hukuki Süreç & Borç
            Takibi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Yasal yola başvurulan aidat borçları ve süreç takibi
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Dosya
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{cases.length}</div>
          <div className="text-sm text-gray-500">Toplam Dosya</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-red-600">
            {activeCases.length}
          </div>
          <div className="text-sm text-gray-500">Aktif Süreç</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">
            ₺{totalDebt.toLocaleString("tr-TR")}
          </div>
          <div className="text-sm text-gray-500">Toplam Alacak</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {cases.filter((c) => c.processType === "çözüldü").length}
          </div>
          <div className="text-sm text-gray-500">Çözüme Kavuşan</div>
        </div>
      </div>

      {/* Process Pipeline */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Süreç Aşamaları</h3>
        <div className="flex flex-wrap gap-3">
          {PROCESS_STEPS.map((step) => {
            const count = cases.filter(
              (c) => c.processType === step.key,
            ).length;
            return (
              <div
                key={step.key}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${step.color} font-medium text-sm`}
              >
                <span>{step.label}</span>
                <span className="bg-white bg-opacity-60 rounded-full px-2 py-0.5 font-bold text-xs">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex gap-2 flex-wrap">
          {["hepsi", ...PROCESS_STEPS.map((s) => s.key)].map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${filterStatus === f ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {f === "hepsi"
                ? "Tümü"
                : PROCESS_STEPS.find((s) => s.key === f)?.label}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {filteredCases.map((c) => (
            <div key={c.id} className="p-4">
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setExpandedId(expandedId === c.id ? null : c.id);
                }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {c.residentName}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({c.apartmentNo})
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStepColor(c.processType)}`}
                      >
                        {
                          PROCESS_STEPS.find((s) => s.key === c.processType)
                            ?.label
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm font-bold text-red-600">
                        ₺{c.debtAmount.toLocaleString("tr-TR")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {c.debtMonths} ay borç
                      </span>
                      <span className="text-xs text-gray-400">
                        Son güncelleme: {c.lastUpdateDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.nextActionDate && (
                    <span className="text-xs text-orange-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {c.nextActionDate}
                    </span>
                  )}
                  {expandedId === c.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              {expandedId === c.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {c.notes && (
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                      {c.notes}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {c.lawyerName && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Scale className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">{c.lawyerName}</span>
                        {c.lawyerPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {c.lawyerPhone}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.documents.map((doc) => (
                      <span
                        key={doc}
                        className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        <FileText className="w-3 h-3" /> {doc}
                      </span>
                    ))}
                  </div>
                  {isOwner && c.processType !== "çözüldü" && (
                    <div className="flex gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => advanceProcess(c.id)}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        Süreci İlerlet →
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {filteredCases.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Kayıt bulunamadı
            </div>
          )}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Hukuki Dosya Aç</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="ld-apt-no"
                  className="text-xs font-medium text-gray-600"
                >
                  Daire No
                </label>
                <Input
                  id="ld-apt-no"
                  value={form.apartmentNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, apartmentNo: e.target.value }))
                  }
                  placeholder="B-204"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="ld-resident-name"
                  className="text-xs font-medium text-gray-600"
                >
                  Sakin Adı
                </label>
                <Input
                  id="ld-resident-name"
                  value={form.residentName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, residentName: e.target.value }))
                  }
                  placeholder="Ad Soyad"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="ld-debt-amount"
                  className="text-xs font-medium text-gray-600"
                >
                  Borç Tutarı (₺)
                </label>
                <Input
                  id="ld-debt-amount"
                  type="number"
                  value={form.debtAmount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, debtAmount: e.target.value }))
                  }
                  placeholder="5000"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="ld-debt-months"
                  className="text-xs font-medium text-gray-600"
                >
                  Borç Ay Sayısı
                </label>
                <Input
                  id="ld-debt-months"
                  type="number"
                  value={form.debtMonths}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, debtMonths: e.target.value }))
                  }
                  placeholder="5"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="ld-process-type"
                className="text-xs font-medium text-gray-600"
              >
                Süreç Aşaması
              </label>
              <select
                id="ld-process-type"
                value={form.processType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, processType: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              >
                {PROCESS_STEPS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="ld-lawyer-name"
                  className="text-xs font-medium text-gray-600"
                >
                  Avukat Adı
                </label>
                <Input
                  id="ld-lawyer-name"
                  value={form.lawyerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lawyerName: e.target.value }))
                  }
                  placeholder="Av. Ad Soyad"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="ld-lawyer-phone"
                  className="text-xs font-medium text-gray-600"
                >
                  Avukat Telefonu
                </label>
                <Input
                  id="ld-lawyer-phone"
                  value={form.lawyerPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lawyerPhone: e.target.value }))
                  }
                  placeholder="0555 000 0000"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="ld-next-action"
                className="text-xs font-medium text-gray-600"
              >
                Sonraki İşlem Tarihi
              </label>
              <Input
                id="ld-next-action"
                type="date"
                value={form.nextActionDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nextActionDate: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="ld-notes"
                className="text-xs font-medium text-gray-600"
              >
                Notlar
              </label>
              <textarea
                id="ld-notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Süreç notları..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 h-20 resize-none"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSave}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Dosya Aç
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="flex-1"
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
