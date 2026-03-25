import {
  AlertTriangle,
  Camera,
  Clock,
  Grid3X3,
  MapPin,
  Plus,
  Shield,
  ShieldCheck,
  User,
  UserCheck,
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

// ---- Shift Log ----
interface ShiftLog {
  id: string;
  date: string;
  time: string;
  incoming: string;
  outgoing: string;
  notes: string;
}

const SEED_SHIFT_LOGS: ShiftLog[] = [
  {
    id: "sl1",
    date: "2026-03-25",
    time: "08:00",
    incoming: "Kadir Şahin",
    outgoing: "Murat Acar",
    notes: "Gece sakin geçti, bir ziyaretçi girişi kaydedildi.",
  },
  {
    id: "sl2",
    date: "2026-03-24",
    time: "16:00",
    incoming: "Murat Acar",
    outgoing: "Serhat Kaya",
    notes: "Asansör arızası teknisyene bildirildi.",
  },
  {
    id: "sl3",
    date: "2026-03-24",
    time: "08:00",
    incoming: "Serhat Kaya",
    outgoing: "Kadir Şahin",
    notes: "Normal devir, ek not yok.",
  },
  {
    id: "sl4",
    date: "2026-03-23",
    time: "16:00",
    incoming: "Kadir Şahin",
    outgoing: "Murat Acar",
    notes: "Otopark B-12 boş bırakıldı, sakin bilgilendirildi.",
  },
];

// ---- Camera Zones ----
interface CameraZone {
  id: string;
  zone: string;
  cameraCount: number;
  status: "Aktif" | "Bakımda" | "Arızalı";
}

const SEED_CAMERAS: CameraZone[] = [
  { id: "cz1", zone: "Giriş", cameraCount: 3, status: "Aktif" },
  { id: "cz2", zone: "Asansör", cameraCount: 2, status: "Aktif" },
  { id: "cz3", zone: "Otopark", cameraCount: 4, status: "Aktif" },
  { id: "cz4", zone: "Bahçe", cameraCount: 2, status: "Bakımda" },
  { id: "cz5", zone: "1. Kat Koridor", cameraCount: 2, status: "Aktif" },
  { id: "cz6", zone: "2. Kat Koridor", cameraCount: 2, status: "Aktif" },
  { id: "cz7", zone: "3. Kat Koridor", cameraCount: 2, status: "Arızalı" },
  { id: "cz8", zone: "Çatı", cameraCount: 1, status: "Aktif" },
];

// ---- Patrol Logs ----
interface PatrolLog {
  id: string;
  date: string;
  time: string;
  personnel: string;
  zones: string[];
  duration: number;
  notes: string;
}

const PATROL_ZONES = [
  "Giriş",
  "Asansör",
  "Otopark",
  "Bahçe",
  "1. Kat Koridor",
  "2. Kat Koridor",
  "3. Kat Koridor",
  "Çatı",
];

const SEED_PATROLS: PatrolLog[] = [
  {
    id: "p1",
    date: "2026-03-25",
    time: "09:00",
    personnel: "Kadir Şahin",
    zones: ["Giriş", "Otopark", "Bahçe"],
    duration: 25,
    notes: "Her şey normal.",
  },
  {
    id: "p2",
    date: "2026-03-25",
    time: "15:00",
    personnel: "Murat Acar",
    zones: ["Giriş", "Asansör", "1. Kat Koridor", "2. Kat Koridor"],
    duration: 30,
    notes: "2. katta açık kapı tespit edildi, kapatıldı.",
  },
  {
    id: "p3",
    date: "2026-03-24",
    time: "10:00",
    personnel: "Serhat Kaya",
    zones: ["Giriş", "Otopark", "Çatı"],
    duration: 20,
    notes: "Çatı kapısı kilitli kontrol edildi.",
  },
  {
    id: "p4",
    date: "2026-03-24",
    time: "18:00",
    personnel: "Kadir Şahin",
    zones: ["Giriş", "Bahçe", "3. Kat Koridor"],
    duration: 22,
    notes: "Bahçede yabancı şahıs görüldü, gözetlendi, ayrıldı.",
  },
];

const SHIFT_KEY = (id: string) => `sitecore_shift_log_${id}`;
const CAM_KEY = (id: string) => `sitecore_cameras_${id}`;
const PATROL_KEY = (id: string) => `sitecore_patrols_${id}`;

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

  // Shift log state
  const [shiftLogs, setShiftLogs] = useState<ShiftLog[]>([]);
  const [showShiftDialog, setShowShiftDialog] = useState(false);
  const [shiftForm, setShiftForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "08:00",
    incoming: "",
    outgoing: "",
    notes: "",
  });

  // Camera zones state
  const [cameraZones, setCameraZones] = useState<CameraZone[]>([]);

  // Patrol log state
  const [patrolLogs, setPatrolLogs] = useState<PatrolLog[]>([]);
  const [showPatrolDialog, setShowPatrolDialog] = useState(false);
  const [patrolForm, setPatrolForm] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    personnel: "",
    zones: [] as string[],
    duration: 20,
    notes: "",
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

    // Shift logs
    try {
      const slRaw = localStorage.getItem(SHIFT_KEY(buildingId));
      if (slRaw) setShiftLogs(JSON.parse(slRaw));
      else {
        setShiftLogs(SEED_SHIFT_LOGS);
        localStorage.setItem(
          SHIFT_KEY(buildingId),
          JSON.stringify(SEED_SHIFT_LOGS),
        );
      }
    } catch {
      setShiftLogs(SEED_SHIFT_LOGS);
    }

    // Camera zones
    try {
      const camRaw = localStorage.getItem(CAM_KEY(buildingId));
      if (camRaw) setCameraZones(JSON.parse(camRaw));
      else {
        setCameraZones(SEED_CAMERAS);
        localStorage.setItem(CAM_KEY(buildingId), JSON.stringify(SEED_CAMERAS));
      }
    } catch {
      setCameraZones(SEED_CAMERAS);
    }

    // Patrol logs
    try {
      const patRaw = localStorage.getItem(PATROL_KEY(buildingId));
      if (patRaw) setPatrolLogs(JSON.parse(patRaw));
      else {
        setPatrolLogs(SEED_PATROLS);
        localStorage.setItem(
          PATROL_KEY(buildingId),
          JSON.stringify(SEED_PATROLS),
        );
      }
    } catch {
      setPatrolLogs(SEED_PATROLS);
    }
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

  const saveShifts = (u: ShiftLog[]) => {
    setShiftLogs(u);
    localStorage.setItem(SHIFT_KEY(buildingId), JSON.stringify(u));
  };
  const handleAddShift = () => {
    if (!shiftForm.incoming.trim() || !shiftForm.outgoing.trim()) return;
    const sl: ShiftLog = { id: crypto.randomUUID(), ...shiftForm };
    saveShifts([sl, ...shiftLogs]);
    setShowShiftDialog(false);
    setShiftForm({
      date: new Date().toISOString().split("T")[0],
      time: "08:00",
      incoming: "",
      outgoing: "",
      notes: "",
    });
  };

  const saveCameras = (u: CameraZone[]) => {
    setCameraZones(u);
    localStorage.setItem(CAM_KEY(buildingId), JSON.stringify(u));
  };
  const cycleCameraStatus = (id: string) => {
    const cycle: CameraZone["status"][] = ["Aktif", "Bakımda", "Arızalı"];
    saveCameras(
      cameraZones.map((c) =>
        c.id === id
          ? { ...c, status: cycle[(cycle.indexOf(c.status) + 1) % 3] }
          : c,
      ),
    );
  };

  const savePatrols = (u: PatrolLog[]) => {
    setPatrolLogs(u);
    localStorage.setItem(PATROL_KEY(buildingId), JSON.stringify(u));
  };
  const handleAddPatrol = () => {
    if (!patrolForm.personnel.trim()) return;
    const pl: PatrolLog = { id: crypto.randomUUID(), ...patrolForm };
    savePatrols([pl, ...patrolLogs]);
    setShowPatrolDialog(false);
    setPatrolForm({
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      personnel: "",
      zones: [],
      duration: 20,
      notes: "",
    });
  };
  const togglePatrolZone = (zone: string) => {
    setPatrolForm((prev) => ({
      ...prev,
      zones: prev.zones.includes(zone)
        ? prev.zones.filter((z) => z !== zone)
        : [...prev.zones, zone],
    }));
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
        <TabsList className="mb-4 flex flex-wrap gap-1">
          <TabsTrigger value="incidents">Olaylar</TabsTrigger>
          <TabsTrigger value="map">Bölge Haritası</TabsTrigger>
          <TabsTrigger value="visitors">
            Ziyaretçi Logu ({visitorLogs.length})
          </TabsTrigger>
          <TabsTrigger value="shifts">Nöbet Logu</TabsTrigger>
          <TabsTrigger value="cameras">Kamera Haritası</TabsTrigger>
          <TabsTrigger value="patrols">Tur Kaydı</TabsTrigger>
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

        {/* Nöbet Logu */}
        <TabsContent value="shifts">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-[#0E1116] flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Nöbet Devir Logu
            </p>
            {isOwnerOrManager && (
              <Button
                onClick={() => setShowShiftDialog(true)}
                size="sm"
                className="bg-[#0B1B2E] text-white rounded-full gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Devir Ekle
              </Button>
            )}
          </div>
          {shiftLogs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]">
              <UserCheck className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">Nöbet logu boş.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shiftLogs.map((sl, idx) => (
                <div
                  key={sl.id}
                  data-ocid={`security.shift.item.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[#0E1116]">
                        {sl.date} — {sl.time}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-[#3A4654]">
                        <span>
                          ⬆️ Gelen: <strong>{sl.incoming}</strong>
                        </span>
                        <span>
                          ⬇️ Giden: <strong>{sl.outgoing}</strong>
                        </span>
                      </div>
                      {sl.notes && (
                        <p className="text-xs text-[#6B7A8D] mt-1 italic">
                          {sl.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Kamera Haritası */}
        <TabsContent value="cameras">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-[#0E1116] flex items-center gap-2">
              <Camera className="w-4 h-4" /> Kamera Bölge Haritası
            </p>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />{" "}
                Aktif
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />{" "}
                Bakımda
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />{" "}
                Arızalı
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cameraZones.map((cz) => {
              const statusColor =
                cz.status === "Aktif"
                  ? "border-green-200 bg-green-50"
                  : cz.status === "Bakımda"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-red-200 bg-red-50";
              const dotColor =
                cz.status === "Aktif"
                  ? "bg-green-500"
                  : cz.status === "Bakımda"
                    ? "bg-yellow-500"
                    : "bg-red-500";
              const badgeColor =
                cz.status === "Aktif"
                  ? "bg-green-100 text-green-700"
                  : cz.status === "Bakımda"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700";
              return (
                <div
                  key={cz.id}
                  className={`rounded-2xl p-4 border ${statusColor}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Camera className="w-4 h-4 text-[#4A90D9]" />
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                  </div>
                  <p className="font-semibold text-sm text-[#0E1116]">
                    {cz.zone}
                  </p>
                  <p className="text-xs text-[#6B7A8D] mt-0.5">
                    {cz.cameraCount} kamera
                  </p>
                  <Badge className={`mt-2 text-xs border-0 ${badgeColor}`}>
                    {cz.status}
                  </Badge>
                  {isOwnerOrManager && (
                    <button
                      type="button"
                      onClick={() => cycleCameraStatus(cz.id)}
                      className="mt-2 text-xs text-[#4A90D9] hover:underline block"
                    >
                      Durum Değiştir
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 bg-white rounded-2xl p-4 border border-[#E5EAF2]">
            <p className="text-sm font-medium text-[#3A4654] mb-2">Özet</p>
            <div className="flex gap-4 text-sm">
              <span className="text-green-700">
                ✅ Aktif:{" "}
                {cameraZones
                  .filter((c) => c.status === "Aktif")
                  .reduce((s, c) => s + c.cameraCount, 0)}{" "}
                kamera
              </span>
              <span className="text-yellow-700">
                ⚠️ Bakımda:{" "}
                {cameraZones
                  .filter((c) => c.status === "Bakımda")
                  .reduce((s, c) => s + c.cameraCount, 0)}{" "}
                kamera
              </span>
              <span className="text-red-700">
                ❌ Arızalı:{" "}
                {cameraZones
                  .filter((c) => c.status === "Arızalı")
                  .reduce((s, c) => s + c.cameraCount, 0)}{" "}
                kamera
              </span>
            </div>
          </div>
        </TabsContent>

        {/* Tur Kaydı */}
        <TabsContent value="patrols">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-[#0E1116] flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Güvenlik Tur Kayıtları
            </p>
            {isOwnerOrManager && (
              <Button
                onClick={() => setShowPatrolDialog(true)}
                size="sm"
                className="bg-[#0B1B2E] text-white rounded-full gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tur Ekle
              </Button>
            )}
          </div>
          {patrolLogs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#E5EAF2]">
              <MapPin className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">Tur kaydı bulunamadı.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {patrolLogs.map((pl, idx) => (
                <div
                  key={pl.id}
                  data-ocid={`security.patrol.item.${idx + 1}`}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#0E1116]">
                          {pl.date} {pl.time}
                        </p>
                        <Badge className="bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs">
                          {pl.duration} dk
                        </Badge>
                      </div>
                      <p className="text-sm text-[#3A4654] mt-0.5">
                        Personel: <strong>{pl.personnel}</strong>
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pl.zones.map((z) => (
                          <Badge
                            key={z}
                            className="bg-[#F3F6FB] text-[#3A4654] border-0 text-xs"
                          >
                            {z}
                          </Badge>
                        ))}
                      </div>
                      {pl.notes && (
                        <p className="text-xs text-[#6B7A8D] mt-1 italic">
                          {pl.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Shift Dialog */}
      <Dialog open={showShiftDialog} onOpenChange={setShowShiftDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nöbet Devri Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Tarih</p>
                <Input
                  type="date"
                  value={shiftForm.date}
                  onChange={(e) =>
                    setShiftForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Saat</p>
                <Input
                  type="time"
                  value={shiftForm.time}
                  onChange={(e) =>
                    setShiftForm((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Gelen Nöbetçi
              </p>
              <Input
                placeholder="Ad Soyad"
                value={shiftForm.incoming}
                onChange={(e) =>
                  setShiftForm((p) => ({ ...p, incoming: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Giden Nöbetçi
              </p>
              <Input
                placeholder="Ad Soyad"
                value={shiftForm.outgoing}
                onChange={(e) =>
                  setShiftForm((p) => ({ ...p, outgoing: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Notlar</p>
              <Textarea
                placeholder="Devir notu..."
                value={shiftForm.notes}
                onChange={(e) =>
                  setShiftForm((p) => ({ ...p, notes: e.target.value }))
                }
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddShift}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowShiftDialog(false)}
                className="flex-1 rounded-full"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Patrol Dialog */}
      <Dialog open={showPatrolDialog} onOpenChange={setShowPatrolDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Güvenlik Turu Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Tarih</p>
                <Input
                  type="date"
                  value={patrolForm.date}
                  onChange={(e) =>
                    setPatrolForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">Saat</p>
                <Input
                  type="time"
                  value={patrolForm.time}
                  onChange={(e) =>
                    setPatrolForm((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Personel Adı
              </p>
              <Input
                placeholder="Ad Soyad"
                value={patrolForm.personnel}
                onChange={(e) =>
                  setPatrolForm((p) => ({ ...p, personnel: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Ziyaret Edilen Bölgeler
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PATROL_ZONES.map((zone) => (
                  <label
                    key={zone}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={patrolForm.zones.includes(zone)}
                      onChange={() => togglePatrolZone(zone)}
                    />
                    {zone}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Süre (dakika)
              </p>
              <Input
                type="number"
                value={patrolForm.duration}
                onChange={(e) =>
                  setPatrolForm((p) => ({
                    ...p,
                    duration: Number(e.target.value),
                  }))
                }
                min={1}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">Notlar</p>
              <Textarea
                placeholder="Tur notu..."
                value={patrolForm.notes}
                onChange={(e) =>
                  setPatrolForm((p) => ({ ...p, notes: e.target.value }))
                }
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddPatrol}
                className="flex-1 bg-[#0B1B2E] text-white rounded-full"
              >
                Ekle
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPatrolDialog(false)}
                className="flex-1 rounded-full"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
