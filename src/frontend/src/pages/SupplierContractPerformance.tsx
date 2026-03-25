import {
  Award,
  FileText,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
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

type ContractStatus = "Aktif" | "Yenilenecek" | "Sona Erdi" | "İptal";
type PerformanceLevel = "Mükemmel" | "İyi" | "Orta" | "Kötü" | "Kara Liste";

interface PerformanceRecord {
  id: string;
  date: string;
  jobDescription: string;
  score: number; // 1-5
  comment: string;
}

interface SupplierContract {
  id: string;
  supplierName: string;
  category: string;
  contractTitle: string;
  startDate: string;
  endDate: string;
  contractValue: number;
  status: ContractStatus;
  autoRenew: boolean;
  performanceRecords: PerformanceRecord[];
  avgScore: number;
  blacklisted: boolean;
  notes: string;
}

const DEFAULT_CONTRACTS: SupplierContract[] = [
  {
    id: "1",
    supplierName: "Güneş Temizlik",
    category: "Temizlik",
    contractTitle: "Ortak Alan Temizlik Hizmet Sözleşmesi",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    contractValue: 36000,
    status: "Yenilenecek",
    autoRenew: false,
    performanceRecords: [
      {
        id: "p1",
        date: "2026-02-01",
        jobDescription: "Şubat ayı ortak alan temizliği",
        score: 5,
        comment: "Zamanında, titiz çalışma.",
      },
      {
        id: "p2",
        date: "2026-01-01",
        jobDescription: "Ocak ayı temizliği",
        score: 4,
        comment: "Bodrum kat eksik kaldı.",
      },
    ],
    avgScore: 4.5,
    blacklisted: false,
    notes: "Sözleşme Aralık sonunda bitiyor, yenileme görüşmesi yapılacak.",
  },
  {
    id: "2",
    supplierName: "Yılmaz Tesisat",
    category: "Tesisatçı",
    contractTitle: "Yıllık Bakım & Acil Servis Sözleşmesi",
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    contractValue: 18000,
    status: "Aktif",
    autoRenew: true,
    performanceRecords: [
      {
        id: "p3",
        date: "2026-03-10",
        jobDescription: "Bodrum su borusu tamiri",
        score: 5,
        comment: "Hızlı müdahale, 2 saatte tamamladı.",
      },
    ],
    avgScore: 5,
    blacklisted: false,
    notes: "",
  },
  {
    id: "3",
    supplierName: "Hızlı Asansör A.Ş.",
    category: "Asansör Bakım",
    contractTitle: "Asansör Bakım & Onarım Sözleşmesi",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    contractValue: 24000,
    status: "Sona Erdi",
    autoRenew: false,
    performanceRecords: [
      {
        id: "p4",
        date: "2025-04-15",
        jobDescription: "Yıllık bakım",
        score: 2,
        comment: "Bakım 3 gün gecikti, iletişim zayıf.",
      },
      {
        id: "p5",
        date: "2024-11-20",
        jobDescription: "Acil arıza müdahalesi",
        score: 1,
        comment: "4 saat beklettiler, kabul edilemez.",
      },
    ],
    avgScore: 1.5,
    blacklisted: true,
    notes: "Sözleşme yenilenmedi. Alternatif tedarikçi aranıyor.",
  },
];

const STATUS_COLORS: Record<ContractStatus, string> = {
  Aktif: "bg-green-100 text-green-700",
  Yenilenecek: "bg-yellow-100 text-yellow-700",
  "Sona Erdi": "bg-gray-100 text-gray-600",
  İptal: "bg-red-100 text-red-700",
};

function getPerformanceLevel(avg: number): PerformanceLevel {
  if (avg === 0) return "Orta";
  if (avg >= 4.5) return "Mükemmel";
  if (avg >= 3.5) return "İyi";
  if (avg >= 2.5) return "Orta";
  if (avg >= 1.5) return "Kötü";
  return "Kara Liste";
}

const PERF_COLORS: Record<PerformanceLevel, string> = {
  Mükemmel: "bg-green-100 text-green-700",
  İyi: "bg-blue-100 text-blue-700",
  Orta: "bg-yellow-100 text-yellow-700",
  Kötü: "bg-orange-100 text-orange-700",
  "Kara Liste": "bg-red-100 text-red-700",
};

export default function SupplierContractPerformance({
  buildingId,
  isOwner,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const key = `sitecore_supplier_contracts_${buildingId}`;
  const load = (): SupplierContract[] => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_CONTRACTS;
    } catch {
      return DEFAULT_CONTRACTS;
    }
  };
  const [contracts, setContracts] = useState<SupplierContract[]>(load);
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [perfForm, setPerfForm] = useState({
    date: "",
    jobDescription: "",
    score: 5,
    comment: "",
  });
  const [form, setForm] = useState({
    supplierName: "",
    category: "Temizlik",
    contractTitle: "",
    startDate: "",
    endDate: "",
    contractValue: "",
    status: "Aktif" as ContractStatus,
    autoRenew: false,
    notes: "",
  });

  const save = (data: SupplierContract[]) => {
    setContracts(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const filtered =
    filterStatus === "Tümü"
      ? contracts
      : filterStatus === "Kara Liste"
        ? contracts.filter((c) => c.blacklisted)
        : contracts.filter((c) => c.status === filterStatus);

  const detail = contracts.find((c) => c.id === showDetail);

  const handleAdd = () => {
    if (!form.supplierName.trim() || !form.contractTitle.trim()) return;
    save([
      ...contracts,
      {
        id: Date.now().toString(),
        ...form,
        contractValue: Number.parseFloat(form.contractValue) || 0,
        performanceRecords: [],
        avgScore: 0,
        blacklisted: false,
      },
    ]);
    setShowAdd(false);
    setForm({
      supplierName: "",
      category: "Temizlik",
      contractTitle: "",
      startDate: "",
      endDate: "",
      contractValue: "",
      status: "Aktif",
      autoRenew: false,
      notes: "",
    });
  };

  const handleAddPerf = (id: string) => {
    if (!perfForm.date || !perfForm.jobDescription) return;
    const updated = contracts.map((c) => {
      if (c.id !== id) return c;
      const records = [
        { id: Date.now().toString(), ...perfForm },
        ...c.performanceRecords,
      ];
      const avg = records.reduce((acc, r) => acc + r.score, 0) / records.length;
      return { ...c, performanceRecords: records, avgScore: avg };
    });
    save(updated);
    setPerfForm({ date: "", jobDescription: "", score: 5, comment: "" });
  };

  const handleBlacklist = (id: string) => {
    save(
      contracts.map((c) =>
        c.id === id ? { ...c, blacklisted: !c.blacklisted } : c,
      ),
    );
  };

  const handleDelete = (id: string) =>
    save(contracts.filter((c) => c.id !== id));

  const activeCount = contracts.filter((c) => c.status === "Aktif").length;
  const renewCount = contracts.filter((c) => c.status === "Yenilenecek").length;
  const blacklistCount = contracts.filter((c) => c.blacklisted).length;
  const avgPerf =
    contracts.filter((c) => c.avgScore > 0).length > 0
      ? (
          contracts
            .filter((c) => c.avgScore > 0)
            .reduce((acc, c) => acc + c.avgScore, 0) /
          contracts.filter((c) => c.avgScore > 0).length
        ).toFixed(1)
      : "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Tedarikçi Sözleşme & Performans
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Sözleşme Ekle
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Aktif Sözleşme</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-yellow-500">{renewCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Yenilenecek</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#4A90D9]">{avgPerf}</p>
          <p className="text-sm text-[#3A4654] mt-1">Ort. Performans</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-red-500">{blacklistCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Kara Listede</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          "Tümü",
          "Aktif",
          "Yenilenecek",
          "Sona Erdi",
          "İptal",
          "Kara Liste",
        ].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterStatus === s
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((c) => {
          const perfLevel = getPerformanceLevel(c.avgScore);
          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl p-5 shadow-sm border ${
                c.blacklisted ? "border-red-200 bg-red-50" : "border-[#E5EAF2]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-[#0E1116]">
                      {c.supplierName}
                    </span>
                    <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                      {c.category}
                    </Badge>
                    <Badge
                      className={`text-xs border-0 ${STATUS_COLORS[c.status]}`}
                    >
                      {c.status}
                    </Badge>
                    {c.blacklisted && (
                      <Badge className="bg-red-100 text-red-700 border-0 text-xs flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" /> Kara Liste
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#3A4654] mb-1">
                    {c.contractTitle}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#6B7A8D]">
                    <span>
                      {c.startDate} → {c.endDate}
                    </span>
                    <span>{c.contractValue.toLocaleString("tr-TR")} ₺/yıl</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= Math.round(c.avgScore)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-[#6B7A8D] ml-1">
                        {c.avgScore > 0 ? c.avgScore.toFixed(1) : "Puansız"}
                      </span>
                    </div>
                    <Badge
                      className={`text-xs border-0 ${PERF_COLORS[perfLevel]}`}
                    >
                      {perfLevel}
                    </Badge>
                  </div>
                  {c.notes && (
                    <p className="text-sm text-[#6B7A8D] mt-1 italic">
                      {c.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-3 flex-col items-end">
                  <Button
                    onClick={() => setShowDetail(c.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                  >
                    Detay
                  </Button>
                  {isOwner && (
                    <>
                      <Button
                        onClick={() => handleBlacklist(c.id)}
                        variant="ghost"
                        size="sm"
                        className={`rounded-full text-xs ${
                          c.blacklisted
                            ? "text-green-600 hover:text-green-700"
                            : "text-red-400 hover:text-red-600"
                        }`}
                      >
                        {c.blacklisted ? (
                          <ThumbsUp className="w-4 h-4" />
                        ) : (
                          <ThumbsDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDelete(c.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-600 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-[#3A4654] py-10">Kayıt bulunamadı.</p>
        )}
      </div>

      {/* Add Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sözleşme Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Tedarikçi Adı</p>
              <Input
                value={form.supplierName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, supplierName: e.target.value }))
                }
                placeholder="Tedarikçi / Firma"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Kategori</p>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {[
                    "Temizlik",
                    "Tesisatçı",
                    "Elektrikçi",
                    "Asansör Bakım",
                    "Güvenlik",
                    "Peyzaj",
                    "Diğer",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Durum</p>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      status: e.target.value as ContractStatus,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option>Aktif</option>
                  <option>Yenilenecek</option>
                  <option>Sona Erdi</option>
                  <option>İptal</option>
                </select>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Sözleşme Başlığı</p>
              <Input
                value={form.contractTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contractTitle: e.target.value }))
                }
                placeholder="Sözleşme adı"
              />
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
            <div>
              <p className="text-sm font-medium mb-1">Yıllık Değer (₺)</p>
              <Input
                type="number"
                value={form.contractValue}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contractValue: e.target.value }))
                }
                placeholder="0"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.autoRenew}
                onChange={(e) =>
                  setForm((f) => ({ ...f, autoRenew: e.target.checked }))
                }
              />
              <span className="text-sm">Otomatik Yenileme</span>
            </label>
            <div>
              <p className="text-sm font-medium mb-1">Notlar</p>
              <Input
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Ek bilgi..."
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.supplierName.trim() || !form.contractTitle.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#4A90D9]" />
                {detail?.supplierName} — Performans
              </div>
            </DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[#6B7A8D]">Sözleşme</p>
                  <p className="font-medium">{detail.contractTitle}</p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Süre</p>
                  <p className="font-medium">
                    {detail.startDate} → {detail.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Yıllık Değer</p>
                  <p className="font-medium">
                    {detail.contractValue.toLocaleString("tr-TR")} ₺
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Ort. Puan</p>
                  <p className="font-medium">
                    {detail.avgScore > 0
                      ? `${detail.avgScore.toFixed(1)} / 5`
                      : "Puansız"}
                  </p>
                </div>
              </div>

              {isOwner && (
                <div className="bg-[#F3F6FB] rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Performans Kaydı Ekle
                  </p>
                  <Input
                    type="date"
                    value={perfForm.date}
                    onChange={(e) =>
                      setPerfForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                  <Input
                    value={perfForm.jobDescription}
                    onChange={(e) =>
                      setPerfForm((f) => ({
                        ...f,
                        jobDescription: e.target.value,
                      }))
                    }
                    placeholder="Yapılan iş açıklaması"
                  />
                  <div>
                    <p className="text-sm mb-1">Puan</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setPerfForm((f) => ({ ...f, score: s }))
                          }
                        >
                          <Star
                            className={`w-6 h-6 cursor-pointer ${
                              s <= perfForm.score
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input
                    value={perfForm.comment}
                    onChange={(e) =>
                      setPerfForm((f) => ({ ...f, comment: e.target.value }))
                    }
                    placeholder="Yorum (opsiyonel)"
                  />
                  <Button
                    onClick={() => handleAddPerf(detail.id)}
                    disabled={!perfForm.date || !perfForm.jobDescription}
                    className="w-full bg-[#4A90D9] text-white rounded-full text-sm"
                  >
                    Kaydet
                  </Button>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Performans Geçmişi</p>
                {detail.performanceRecords.length === 0 ? (
                  <p className="text-sm text-[#6B7A8D]">Kayıt yok.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {detail.performanceRecords.map((r) => (
                      <div key={r.id} className="bg-[#F3F6FB] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#6B7A8D]">
                            {r.date}
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= r.score
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#0E1116]">
                          {r.jobDescription}
                        </p>
                        {r.comment && (
                          <p className="text-xs text-[#6B7A8D] italic">
                            {r.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
