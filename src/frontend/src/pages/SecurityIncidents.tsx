import {
  AlertTriangle,
  Clock,
  Grid3X3,
  Plus,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
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
import { Textarea } from "../components/ui/textarea";

interface Incident {
  id: string;
  type: "theft" | "noise" | "vandalism" | "fire" | "other";
  date: string;
  time: string;
  location: string;
  description: string;
  status: "open" | "investigating" | "closed";
  reportedBy: string;
  resolutionNote?: string;
  createdAt: number;
}

interface VisitorLog {
  id: string;
  name: string;
  apartment: string;
  entryTime: string;
  exitTime?: string;
  date: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner?: boolean;
  isOwnerOrManager?: boolean;
  t: any;
}
const INC_KEY = (id: string) => `sitecore_incidents_${id}`;
const VIS_KEY = (id: string) => `sitecore_security_visitors_${id}`;

const INCIDENT_TYPES = [
  { value: "theft", label: "Hırsızlık", color: "bg-red-100 text-red-700" },
  { value: "noise", label: "Gürültü", color: "bg-yellow-100 text-yellow-700" },
  {
    value: "vandalism",
    label: "Vandalizm",
    color: "bg-orange-100 text-orange-700",
  },
  { value: "fire", label: "Yangın", color: "bg-red-200 text-red-800" },
  { value: "other", label: "Diğer", color: "bg-gray-100 text-gray-600" },
];

const ZONES = [
  "Giriş",
  "Otopark",
  "Bahçe",
  "1. Kat",
  "2. Kat",
  "3. Kat",
  "4. Kat",
  "5. Kat",
  "Çatı",
  "Asansör",
];

const SEED_INCIDENTS: Incident[] = [
  {
    id: "i1",
    type: "noise",
    date: "2026-03-20",
    time: "23:15",
    location: "3. Kat",
    description: "Gece geç saatte müzik sesi şikayeti",
    status: "closed",
    reportedBy: "Daire 301",
    resolutionNote: "Sakinle görüşüldü.",
    createdAt: Date.now() - 172800000,
  },
  {
    id: "i2",
    type: "vandalism",
    date: "2026-03-21",
    time: "14:30",
    location: "Otopark",
    description: "Araçta çizik tespit edildi",
    status: "investigating",
    reportedBy: "Güvenlik",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "i3",
    type: "other",
    date: "2026-03-22",
    time: "09:00",
    location: "Giriş",
    description: "Kapı kilidi arızalandı",
    status: "open",
    reportedBy: "Kapıcı",
    createdAt: Date.now() - 3600000,
  },
];

export default function SecurityIncidents({
  buildingId,
  userId,
  isOwner,
  isOwnerOrManager,
  t,
}: Props) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showVisitorDialog, setShowVisitorDialog] = useState(false);
  const [resolveTarget, setResolveTarget] = useState<Incident | null>(null);
  const [resolveNote, setResolveNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [form, setForm] = useState({
    type: "other" as Incident["type"],
    date: new Date().toISOString().split("T")[0],
    time: "",
    location: "",
    description: "",
  });
  const [visitorForm, setVisitorForm] = useState({
    name: "",
    apartment: "",
    entryTime: "",
    date: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    const raw = localStorage.getItem(INC_KEY(buildingId));
    if (raw) setIncidents(JSON.parse(raw));
    else {
      setIncidents(SEED_INCIDENTS);
      localStorage.setItem(INC_KEY(buildingId), JSON.stringify(SEED_INCIDENTS));
    }
    const vRaw = localStorage.getItem(VIS_KEY(buildingId));
    if (vRaw) setVisitorLogs(JSON.parse(vRaw));
  }, [buildingId]);

  const saveInc = (u: Incident[]) => {
    setIncidents(u);
    localStorage.setItem(INC_KEY(buildingId), JSON.stringify(u));
  };
  const saveVis = (u: VisitorLog[]) => {
    setVisitorLogs(u);
    localStorage.setItem(VIS_KEY(buildingId), JSON.stringify(u));
  };

  const handleSubmit = () => {
    if (!form.description.trim() || !form.location.trim()) return;
    const inc: Incident = {
      id: crypto.randomUUID(),
      ...form,
      status: "open",
      reportedBy: userId,
      createdAt: Date.now(),
    };
    saveInc([inc, ...incidents]);
    setShowDialog(false);
    setForm({
      type: "other",
      date: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      description: "",
    });
  };

  const handleResolve = () => {
    if (!resolveTarget) return;
    saveInc(
      incidents.map((i) =>
        i.id === resolveTarget.id
          ? { ...i, status: "closed", resolutionNote: resolveNote }
          : i,
      ),
    );
    setResolveTarget(null);
    setResolveNote("");
  };

  const handleAddVisitor = () => {
    if (!visitorForm.name.trim()) return;
    const vl: VisitorLog = { id: crypto.randomUUID(), ...visitorForm };
    saveVis([vl, ...visitorLogs]);
    setShowVisitorDialog(false);
    setVisitorForm({
      name: "",
      apartment: "",
      entryTime: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleExit = (id: string) => {
    saveVis(
      visitorLogs.map((v) =>
        v.id === id
          ? { ...v, exitTime: new Date().toTimeString().slice(0, 5) }
          : v,
      ),
    );
  };

  const typeInfo = (type: string) =>
    INCIDENT_TYPES.find((it) => it.value === type) || INCIDENT_TYPES[4];

  const statusBadge = (status: Incident["status"]) => {
    if (status === "open")
      return <Badge className="bg-red-100 text-red-700 border-0">Açık</Badge>;
    if (status === "investigating")
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-0">
          İnceleniyor
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700 border-0">Kapalı</Badge>
    );
  };

  const filteredInc =
    statusFilter === "all"
      ? incidents
      : incidents.filter((i) => i.status === statusFilter);

  const openCount = incidents.filter((i) => i.status === "open").length;
  const investigatingCount = incidents.filter(
    (i) => i.status === "investigating",
  ).length;
  const closedCount = incidents.filter((i) => i.status === "closed").length;

  // Type breakdown
  const typeCounts: Record<string, number> = {};
  for (const i of incidents) {
    typeCounts[i.type] = (typeCounts[i.type] || 0) + 1;
  }

  // Zone heatmap
  const zoneCounts: Record<string, number> = {};
  for (const i of incidents) {
    const matched = ZONES.find((z) => i.location.includes(z));
    if (matched) zoneCounts[matched] = (zoneCounts[matched] || 0) + 1;
  }
  const maxZone = Math.max(...Object.values(zoneCounts), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.security || "Güvenlik & Olay Yönetimi"}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowVisitorDialog(true)}
            variant="outline"
            className="rounded-full gap-2"
          >
            <User className="w-4 h-4" />
            Ziyaretçi
          </Button>
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2"
            data-ocid="security.primary_button"
          >
            <Plus className="w-4 h-4" />
            Olay Bildir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-2xl font-bold text-[#0B1B2E]">
            {incidents.length}
          </p>
          <p className="text-xs text-[#3A4654] mt-1">Toplam Olay</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-red-100 text-center">
          <p className="text-2xl font-bold text-red-600">{openCount}</p>
          <p className="text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Açık
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-100 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {investigatingCount}
          </p>
          <p className="text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> İnceleniyor
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 text-center">
          <p className="text-2xl font-bold text-green-600">{closedCount}</p>
          <p className="text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Kapalı
          </p>
        </div>
      </div>

      <Tabs defaultValue="incidents">
        <TabsList className="mb-4">
          <TabsTrigger value="incidents">Olaylar</TabsTrigger>
          <TabsTrigger value="map">Bölge Haritası</TabsTrigger>
          <TabsTrigger value="visitors">
            Ziyaretçi Logu ({visitorLogs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          {/* Status filter */}
          <div className="flex gap-2 mb-4">
            {["all", "open", "investigating", "closed"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={statusFilter === s ? "default" : "outline"}
                onClick={() => setStatusFilter(s)}
                className={
                  statusFilter === s
                    ? "bg-[#0B1B2E] text-white rounded-full"
                    : "rounded-full"
                }
              >
                {s === "all"
                  ? "Tümü"
                  : s === "open"
                    ? "Açık"
                    : s === "investigating"
                      ? "İnceleniyor"
                      : "Kapalı"}
              </Button>
            ))}
          </div>
          {filteredInc.length === 0 ? (
            <div
              data-ocid="security.empty_state"
              className="bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]"
            >
              <Shield className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">Olay kaydı bulunamadı.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInc.map((inc, idx) => (
                <div
                  key={inc.id}
                  data-ocid={`security.item.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${typeInfo(inc.type).color} border-0`}
                        >
                          {typeInfo(inc.type).label}
                        </Badge>
                        {statusBadge(inc.status)}
                      </div>
                      <p className="font-medium text-[#0E1116]">
                        {inc.description}
                      </p>
                      <p className="text-sm text-[#3A4654] mt-0.5">
                        {inc.location} — {inc.date} {inc.time}
                      </p>
                      <p className="text-xs text-[#6B7A8D] mt-0.5">
                        Bildiren: {inc.reportedBy}
                      </p>
                      {inc.resolutionNote && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ {inc.resolutionNote}
                        </p>
                      )}
                    </div>
                    {(isOwner || isOwnerOrManager) &&
                      inc.status !== "closed" && (
                        <Button
                          onClick={() => setResolveTarget(inc)}
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs"
                        >
                          Kapat
                        </Button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="map">
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
            <p className="font-semibold text-[#0E1116] mb-4 flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" /> Bölge Bazlı Olay Dağılımı
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ZONES.map((zone) => {
                const count = zoneCounts[zone] || 0;
                const intensity =
                  count > 0 ? Math.max(count / maxZone, 0.2) : 0;
                return (
                  <div
                    key={zone}
                    className="rounded-xl p-4 border text-center"
                    style={{
                      backgroundColor:
                        count > 0
                          ? `rgba(239, 68, 68, ${intensity * 0.3})`
                          : "#F9FAFB",
                      borderColor: count > 0 ? "#FCA5A5" : "#E5EAF2",
                    }}
                  >
                    <p className="font-semibold text-sm text-[#0E1116]">
                      {zone}
                    </p>
                    <p
                      className={`text-2xl font-bold mt-1 ${count > 0 ? "text-red-600" : "text-[#3A4654]/30"}`}
                    >
                      {count}
                    </p>
                    <p className="text-xs text-[#6B7A8D]">
                      {count > 0 ? "olay" : "temiz"}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <p className="font-semibold text-sm text-[#0E1116] mb-2">
                Tür Bazlı Dağılım
              </p>
              <div className="flex flex-wrap gap-2">
                {INCIDENT_TYPES.map(({ value, label, color }) => (
                  <div
                    key={value}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${color}`}
                  >
                    <span>{label}</span>
                    <span className="font-bold">{typeCounts[value] || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visitors">
          <div className="space-y-3">
            {visitorLogs.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]">
                <User className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
                <p className="text-[#6B7A8D]">Ziyaretçi logu boş.</p>
              </div>
            ) : (
              visitorLogs.map((v, idx) => (
                <div
                  key={v.id}
                  data-ocid={`security.visitor.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-[#0E1116]">{v.name}</p>
                    <p className="text-sm text-[#3A4654]">
                      Daire {v.apartment} — {v.date}
                    </p>
                    <p className="text-xs text-[#6B7A8D]">
                      Giriş: {v.entryTime}
                      {v.exitTime ? ` — Çıkış: ${v.exitTime}` : " — İçeride"}
                    </p>
                  </div>
                  {!v.exitTime && (
                    <Button
                      onClick={() => handleExit(v.id)}
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs"
                    >
                      Çıkış
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Olay Bildir</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Olay Türü
              </p>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    type: e.target.value as Incident["type"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="security.select"
              >
                {INCIDENT_TYPES.map((it) => (
                  <option key={it.value} value={it.value}>
                    {it.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Tarih</p>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Saat</p>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Konum</p>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Örn: 3. Kat, Otopark, Giriş"
                data-ocid="security.input"
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
                rows={3}
                data-ocid="security.textarea"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={!form.description.trim() || !form.location.trim()}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
                data-ocid="security.submit_button"
              >
                Gönder
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="security.cancel_button"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resolve Dialog */}
      <Dialog
        open={!!resolveTarget}
        onOpenChange={() => setResolveTarget(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Olayı Kapat</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-[#3A4654]">Çözüm Notu (isteğe bağlı)</p>
            <Textarea
              value={resolveNote}
              onChange={(e) => setResolveNote(e.target.value)}
              rows={3}
              placeholder="Alınan önlemler, çözüm yöntemi..."
            />
            <div className="flex gap-3">
              <Button
                onClick={handleResolve}
                className="flex-1 bg-green-700 text-white rounded-full"
                data-ocid="security.confirm_button"
              >
                Kapat
              </Button>
              <Button
                variant="outline"
                onClick={() => setResolveTarget(null)}
                className="flex-1 rounded-full"
                data-ocid="security.close_button"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visitor Dialog */}
      <Dialog open={showVisitorDialog} onOpenChange={setShowVisitorDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ziyaretçi Girişi</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Ziyaretçi Adı
              </p>
              <Input
                value={visitorForm.name}
                onChange={(e) =>
                  setVisitorForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Ziyaret Edilen Daire
              </p>
              <Input
                value={visitorForm.apartment}
                onChange={(e) =>
                  setVisitorForm((p) => ({ ...p, apartment: e.target.value }))
                }
                placeholder="101"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Tarih</p>
                <Input
                  type="date"
                  value={visitorForm.date}
                  onChange={(e) =>
                    setVisitorForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Giriş Saati
                </p>
                <Input
                  type="time"
                  value={visitorForm.entryTime}
                  onChange={(e) =>
                    setVisitorForm((p) => ({ ...p, entryTime: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddVisitor}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowVisitorDialog(false)}
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
