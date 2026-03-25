import {
  AlertCircle,
  Building,
  Calendar,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  Filter,
  HardHat,
  Plus,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
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
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

interface Project {
  id: string;
  name: string;
  description: string;
  category: "Yapısal" | "Mekanik" | "Elektrik" | "Peyzaj";
  contractor: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  phase: "Planlama" | "İhale" | "Uygulama" | "Tamamlandı";
  priority: "Düşük" | "Orta" | "Yüksek" | "Kritik";
  notes: string;
}

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Asansör Modernizasyonu",
    description:
      "Binadaki iki asansörün komple yenilenmesi ve modern sistemlere geçiş.",
    category: "Mekanik",
    contractor: "ElevaTek A.Ş.",
    startDate: "2026-02-01",
    endDate: "2026-05-30",
    budget: 480000,
    spent: 210000,
    phase: "Uygulama",
    priority: "Yüksek",
    notes: "Asansör 1 tamamlandı, asansör 2 devam ediyor.",
  },
  {
    id: "p2",
    name: "Çatı Yenileme Projesi",
    description:
      "Tüm bina çatısının yeniden kaplanması ve su yalıtımının güçlendirilmesi.",
    category: "Yapısal",
    contractor: "Yapı İnşaat Ltd.",
    startDate: "2026-04-15",
    endDate: "2026-08-31",
    budget: 720000,
    spent: 0,
    phase: "İhale",
    priority: "Kritik",
    notes: "3 farklı firmadan teklif alındı, değerlendirme sürecinde.",
  },
  {
    id: "p3",
    name: "Bahçe Düzenleme & Peyzaj",
    description:
      "Ortak bahçe alanının yeniden düzenlenmesi, sulama sistemi ve aydınlatma.",
    category: "Peyzaj",
    contractor: "YeşilBahçe Peyzaj",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    budget: 95000,
    spent: 95000,
    phase: "Tamamlandı",
    priority: "Orta",
    notes:
      "Proje başarıyla tamamlandı. Sakinlerden olumlu geri bildirim alındı.",
  },
  {
    id: "p4",
    name: "Güneş Paneli Kurulumu",
    description:
      "Çatıya 50 adet güneş paneli kurulumu ve ortak alan elektrik tasarrufu.",
    category: "Elektrik",
    contractor: "SolarTürk Enerji",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    budget: 340000,
    spent: 0,
    phase: "Planlama",
    priority: "Orta",
    notes:
      "Fizibilite çalışması devam ediyor. Belediye izinleri için başvuru yapıldı.",
  },
];

const PHASES: Project["phase"][] = [
  "Planlama",
  "İhale",
  "Uygulama",
  "Tamamlandı",
];
const CATEGORIES: Project["category"][] = [
  "Yapısal",
  "Mekanik",
  "Elektrik",
  "Peyzaj",
];
const PRIORITIES: Project["priority"][] = ["Düşük", "Orta", "Yüksek", "Kritik"];

function phaseBadge(phase: Project["phase"]) {
  const map: Record<string, string> = {
    Planlama: "bg-blue-100 text-blue-700 border-blue-200",
    İhale: "bg-amber-100 text-amber-700 border-amber-200",
    Uygulama: "bg-orange-100 text-orange-700 border-orange-200",
    Tamamlandı: "bg-green-100 text-green-700 border-green-200",
  };
  return <Badge className={`${map[phase] || ""} text-xs`}>{phase}</Badge>;
}

function priorityBadge(p: Project["priority"]) {
  const map: Record<string, string> = {
    Düşük: "bg-gray-100 text-gray-600",
    Orta: "bg-blue-100 text-blue-700",
    Yüksek: "bg-orange-100 text-orange-700",
    Kritik: "bg-red-100 text-red-700",
  };
  return <Badge className={`${map[p] || ""} text-xs border-0`}>{p}</Badge>;
}

function categoryIcon(cat: Project["category"]) {
  if (cat === "Yapısal") return <Building className="w-4 h-4" />;
  if (cat === "Mekanik") return <Wrench className="w-4 h-4" />;
  if (cat === "Elektrik") return <AlertCircle className="w-4 h-4" />;
  return <HardHat className="w-4 h-4" />;
}

const EMPTY_FORM: Omit<Project, "id"> = {
  name: "",
  description: "",
  category: "Yapısal",
  contractor: "",
  startDate: "",
  endDate: "",
  budget: 0,
  spent: 0,
  phase: "Planlama",
  priority: "Orta",
  notes: "",
};

export default function ProjectManagement({ buildingId, isOwner }: Props) {
  const storageKey = `sitecore_projects_${buildingId}`;
  const [projects, setProjects] = useState<Project[]>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : SAMPLE_PROJECTS;
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_FORM);

  const save = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([...projects, { ...form, id: crypto.randomUUID() }]);
    setShowAddModal(false);
    setForm(EMPTY_FORM);
  };

  const activeCount = projects.filter((p) => p.phase !== "Tamamlandı").length;
  const doneCount = projects.filter((p) => p.phase === "Tamamlandı").length;
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  const filtered = projects.filter((p) => {
    if (filterPhase !== "all" && p.phase !== filterPhase) return false;
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    return true;
  });

  const budgetChartData = filtered.map((p) => ({
    name: p.name.length > 14 ? `${p.name.slice(0, 14)}…` : p.name,
    Bütçe: p.budget / 1000,
    Harcanan: p.spent / 1000,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Proje & Büyük Tadilat Yönetimi
        </h2>
        {isOwner && (
          <Button
            data-ocid="projects.primary_button"
            onClick={() => {
              setForm(EMPTY_FORM);
              setShowAddModal(true);
            }}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Proje
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm">
          <p className="text-3xl font-bold text-[#4A90D9]">{activeCount}</p>
          <p className="text-[#6B7A8D] text-sm mt-1 flex items-center gap-1">
            <ClipboardList className="w-3 h-3" /> Aktif Projeler
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm">
          <p className="text-3xl font-bold text-green-600">{doneCount}</p>
          <p className="text-[#6B7A8D] text-sm mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Tamamlanan
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm">
          <p className="text-3xl font-bold text-[#0B1B2E]">
            {(totalBudget / 1000).toFixed(0)}K ₺
          </p>
          <p className="text-[#6B7A8D] text-sm mt-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Toplam Bütçe
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E5EAF2] shadow-sm">
          <p className="text-3xl font-bold text-orange-600">
            {(totalSpent / 1000).toFixed(0)}K ₺
          </p>
          <p className="text-[#6B7A8D] text-sm mt-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Harcanan
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-[#6B7A8D]" />
          <span className="text-sm text-[#6B7A8D]">Aşama:</span>
        </div>
        {["all", ...PHASES].map((phase) => (
          <Button
            key={phase}
            size="sm"
            variant={filterPhase === phase ? "default" : "outline"}
            onClick={() => setFilterPhase(phase)}
            className={
              filterPhase === phase
                ? "bg-[#4A90D9] text-white rounded-full"
                : "rounded-full"
            }
          >
            {phase === "all" ? "Tümü" : phase}
          </Button>
        ))}
        <div className="flex items-center gap-1 ml-4">
          <span className="text-sm text-[#6B7A8D]">Kategori:</span>
        </div>
        {["all", ...CATEGORIES].map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filterCategory === cat ? "default" : "outline"}
            onClick={() => setFilterCategory(cat)}
            className={
              filterCategory === cat
                ? "bg-[#0B1B2E] text-white rounded-full"
                : "rounded-full"
            }
          >
            {cat === "all" ? "Tümü" : cat}
          </Button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div
            data-ocid="projects.empty_state"
            className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center text-[#6B7A8D]"
          >
            Filtre kriterlerine uygun proje bulunamadı.
          </div>
        ) : (
          filtered.map((project, idx) => {
            const pct =
              project.budget > 0
                ? Math.round((project.spent / project.budget) * 100)
                : 0;
            return (
              <div
                key={project.id}
                data-ocid={`projects.item.${idx + 1}`}
                className="bg-white rounded-2xl border border-[#E5EAF2] shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-[#F3F6FB] rounded-xl text-[#4A90D9]">
                      {categoryIcon(project.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#0E1116]">
                          {project.name}
                        </h3>
                        {phaseBadge(project.phase)}
                        {priorityBadge(project.priority)}
                        <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B7A8D] mt-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]">
                        <span className="flex items-center gap-1">
                          <HardHat className="w-3 h-3" /> {project.contractor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {project.startDate} –{" "}
                          {project.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    data-ocid={`projects.edit_button.${idx + 1}`}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => setDetailProject(project)}
                  >
                    Detay
                  </Button>
                </div>

                {/* Budget progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-[#6B7A8D] mb-1">
                    <span>Harcanan: {project.spent.toLocaleString()} ₺</span>
                    <span>
                      Bütçe: {project.budget.toLocaleString()} ₺ ({pct}%)
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {detailProject && (
        <Dialog
          open={!!detailProject}
          onOpenChange={() => setDetailProject(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {categoryIcon(detailProject.category)}
                {detailProject.name}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="detail">
              <TabsList className="mb-4">
                <TabsTrigger value="detail">Genel Bilgi</TabsTrigger>
                <TabsTrigger value="budget">Bütçe Analizi</TabsTrigger>
                <TabsTrigger value="timeline">Aşama Takibi</TabsTrigger>
                <TabsTrigger value="files">Dosyalar</TabsTrigger>
              </TabsList>

              <TabsContent value="detail" className="space-y-3 text-sm">
                <p className="text-[#3A4654]">{detailProject.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F3F6FB] rounded-xl p-3">
                    <p className="text-[#6B7A8D] text-xs">Kategori</p>
                    <p className="font-medium mt-0.5">
                      {detailProject.category}
                    </p>
                  </div>
                  <div className="bg-[#F3F6FB] rounded-xl p-3">
                    <p className="text-[#6B7A8D] text-xs">Yüklenici</p>
                    <p className="font-medium mt-0.5">
                      {detailProject.contractor}
                    </p>
                  </div>
                  <div className="bg-[#F3F6FB] rounded-xl p-3">
                    <p className="text-[#6B7A8D] text-xs">Başlangıç</p>
                    <p className="font-medium mt-0.5">
                      {detailProject.startDate}
                    </p>
                  </div>
                  <div className="bg-[#F3F6FB] rounded-xl p-3">
                    <p className="text-[#6B7A8D] text-xs">Bitiş</p>
                    <p className="font-medium mt-0.5">
                      {detailProject.endDate}
                    </p>
                  </div>
                </div>
                {detailProject.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-700 font-semibold mb-1">
                      Notlar
                    </p>
                    <p className="text-sm text-amber-900">
                      {detailProject.notes}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="budget">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-600">Toplam Bütçe</p>
                    <p className="text-xl font-bold text-blue-700">
                      {detailProject.budget.toLocaleString()} ₺
                    </p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-orange-600">Harcanan</p>
                    <p className="text-xl font-bold text-orange-700">
                      {detailProject.spent.toLocaleString()} ₺
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart
                    data={[
                      {
                        name: detailProject.name.slice(0, 12),
                        Bütçe: detailProject.budget,
                        Harcanan: detailProject.spent,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v) => [`${Number(v).toLocaleString()} ₺`]}
                    />
                    <Legend />
                    <Bar dataKey="Bütçe" fill="#4A90D9" radius={[4, 4, 0, 0]} />
                    <Bar
                      dataKey="Harcanan"
                      fill="#F2A23A"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="relative mt-2">
                  {PHASES.map((ph, i) => {
                    const phaseIdx = PHASES.indexOf(detailProject.phase);
                    const done = i <= phaseIdx;
                    const active = ph === detailProject.phase;
                    return (
                      <div key={ph} className="flex items-start gap-4 mb-5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            active
                              ? "bg-[#4A90D9] text-white"
                              : done
                                ? "bg-green-500 text-white"
                                : "bg-[#E5EAF2] text-[#6B7A8D]"
                          }`}
                        >
                          {done && !active ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            i + 1
                          )}
                        </div>
                        <div className="flex-1 pb-4 border-b border-[#F0F3F8]">
                          <p
                            className={`font-medium text-sm ${active ? "text-[#4A90D9]" : done ? "text-green-700" : "text-[#6B7A8D]"}`}
                          >
                            {ph}
                          </p>
                          {active && (
                            <p className="text-xs text-[#6B7A8D] mt-0.5">
                              Mevcut aşama
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="files">
                <div className="space-y-2">
                  {[
                    "Proje Sözleşmesi.pdf",
                    "Keşif Raporu.docx",
                    "Teknik Çizimler.zip",
                    "İzin Belgeleri.pdf",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between bg-[#F3F6FB] rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#4A90D9]" />
                        <span className="text-sm font-medium text-[#0E1116]">
                          {f}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#4A90D9] text-xs rounded-full"
                      >
                        İndir
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full rounded-full mt-2 border-dashed"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Dosya Ekle
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Project Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Yeni Proje Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Proje Adı *
              </p>
              <Input
                data-ocid="projects.input"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Asansör Modernizasyonu"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Açıklama
              </p>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                placeholder="Proje detayları..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Kategori
                </p>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      category: e.target.value as Project["category"],
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Öncelik
                </p>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      priority: e.target.value as Project["priority"],
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  {PRIORITIES.map((pr) => (
                    <option key={pr}>{pr}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Yüklenici / Firma
              </p>
              <Input
                value={form.contractor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contractor: e.target.value }))
                }
                placeholder="Firma adı"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Başlangıç Tarihi
                </p>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, startDate: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Bitiş Tarihi
                </p>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, endDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Bütçe (₺)
              </p>
              <Input
                type="number"
                value={form.budget || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: Number(e.target.value) }))
                }
                placeholder="500000"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Aşama</p>
              <select
                value={form.phase}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    phase: e.target.value as Project["phase"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                {PHASES.map((ph) => (
                  <option key={ph}>{ph}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Notlar</p>
              <Textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                rows={2}
              />
            </div>
            <Button
              data-ocid="projects.submit_button"
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              Projeyi Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Budget Chart */}
      {projects.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
          <h3 className="font-semibold text-[#0E1116] mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Proje Bütçe Karşılaştırması (Bin
            ₺)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={budgetChartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7A8D" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A8D" }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E5EAF2" }}
                formatter={(v) => [`${Number(v).toFixed(0)}K ₺`]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Bütçe" fill="#4A90D9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Harcanan" fill="#F2A23A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
