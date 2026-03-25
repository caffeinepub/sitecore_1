import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Flame,
  MapPin,
  Phone,
  Plus,
  Shield,
  Users,
  X,
  Zap,
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
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const SCENARIOS = [
  {
    id: "fire",
    title: "Yangın",
    icon: Flame,
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
    assemblyPoint: "Bina önü - Açık otopark alanı",
    routes: [
      { floor: "5. Kat", route: "Acil merdiven A → Zemin kat çıkışı" },
      { floor: "4. Kat", route: "Acil merdiven A → Zemin kat çıkışı" },
      { floor: "3. Kat", route: "Acil merdiven B → Yan çıkış" },
      { floor: "2. Kat", route: "Acil merdiven B → Yan çıkış" },
      { floor: "1. Kat", route: "Ana kapı veya yan kapı" },
      { floor: "Zemin", route: "Ana kapı veya arka bahçe kapısı" },
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "İtfaiyeyi ara, kapıları aç",
      },
      {
        role: "Kat Sorumlusu (4-5)",
        person: "Mehmet Demir",
        duty: "Üst katları boşalt",
      },
      {
        role: "Kat Sorumlusu (1-3)",
        person: "Ayşe Kaya",
        duty: "Alt katları boşalt",
      },
      {
        role: "Yardım Ekibi",
        person: "Fatma Çelik",
        duty: "Yaşlı/engelli sakine yardım",
      },
    ],
  },
  {
    id: "earthquake",
    title: "Deprem",
    icon: AlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
    assemblyPoint: "Bina karşısı park alanı - Açık alan",
    routes: [
      { floor: "5. Kat", route: "Sallantı bitince: Merdiven A → Açık alana" },
      { floor: "4. Kat", route: "Sallantı bitince: Merdiven A → Açık alana" },
      { floor: "3. Kat", route: "Sallantı bitince: Merdiven B → Açık alana" },
      { floor: "2. Kat", route: "Sallantı bitince: Merdiven B → Açık alana" },
      { floor: "1. Kat", route: "Ana kapıdan çık, duvarlardan uzak dur" },
      { floor: "Zemin", route: "Hemen açık alana çık" },
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "AFAD'ı ara, gaz vanasını kapat",
      },
      {
        role: "İlk Yardım Sorumlusu",
        person: "Dr. Zeynep Arslan",
        duty: "Yaralılara ilk müdahale",
      },
      {
        role: "Hasar Tespiti",
        person: "Mehmet Demir",
        duty: "Yapısal hasar kontrolü",
      },
      {
        role: "İletişim Sorumlusu",
        person: "Selin Yurt",
        duty: "Sakinleri say, kayıp varsa bildir",
      },
    ],
  },
  {
    id: "flood",
    title: "Su Baskını",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
    assemblyPoint: "3. Kat ve üzeri - Bodrum boşaltılır",
    routes: [
      { floor: "Bodrum", route: "Acil çıkış kapısı → Üst kata çık" },
      { floor: "Zemin", route: "Su girmesi durumunda 1. kata çık" },
      { floor: "1. Kat", route: "Bekleme alanı, gerekirse 2. kata çık" },
      { floor: "2-5. Kat", route: "Yerinde bekle, yönetim bilgilendirecek" },
    ],
    tasks: [
      {
        role: "Tesisat Sorumlusu",
        person: "İbrahim Şahin",
        duty: "Ana su vanasını kapat",
      },
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "Acil servisleri ara",
      },
      {
        role: "Bodrum Sorumlusu",
        person: "Recep Aydın",
        duty: "Bodrum katı boşalt",
      },
      { role: "Yönetici", person: "Yönetim", duty: "Sakinleri bilgilendir" },
    ],
  },
  {
    id: "gas",
    title: "Gaz Kaçağı",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-700",
    assemblyPoint: "Bina dışı - Rüzgar yönü dikkate alınarak açık alan",
    routes: [
      { floor: "Tüm Katlar", route: "Asansör KULLANMA → Merdiven → Bina dışı" },
      { floor: "Not", route: "Işık anahtarına dokunma, cep telefonu kullanma" },
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "Doğalgaz şirketini ve itfaiyeyi ara",
      },
      {
        role: "Tesisat Sorumlusu",
        person: "İbrahim Şahin",
        duty: "Ana gaz vanasını kapat",
      },
      {
        role: "Tahliye Sorumlusu",
        person: "Mehmet Demir",
        duty: "Tüm sakinleri tahliye et",
      },
      {
        role: "Elektrik Sorumlusu",
        person: "Kadir Yıldız",
        duty: "Elektriği kes (sigorta kutusu)",
      },
    ],
  },
];

const DRILLS = [
  {
    id: "d1",
    title: "Yangın Tatbikatı",
    date: "2026-04-15",
    type: "Yangın",
    planned: true,
    participation: 0,
    notes: "Tüm sakinlerin katılımı beklenmektedir",
  },
  {
    id: "d2",
    title: "Deprem Tatbikatı",
    date: "2026-06-20",
    type: "Deprem",
    planned: true,
    participation: 0,
    notes: "AFAD uzmanı katılımıyla",
  },
  {
    id: "d3",
    title: "Yangın Tatbikatı",
    date: "2025-10-12",
    type: "Yangın",
    planned: false,
    participation: 78,
    notes: "Başarıyla tamamlandı",
  },
  {
    id: "d4",
    title: "Genel Tahliye Tatbikatı",
    date: "2025-05-08",
    type: "Genel",
    planned: false,
    participation: 85,
    notes: "Tahliye süresi 4 dk 20 sn",
  },
  {
    id: "d5",
    title: "Deprem Tatbikatı",
    date: "2024-11-20",
    type: "Deprem",
    planned: false,
    participation: 72,
    notes: "İyileştirme alanları belirlendi",
  },
];

const EQUIPMENT = [
  {
    id: "e1",
    name: "Yangın Söndürücü",
    location: "Her kat merdiven başı",
    count: 6,
    status: "Aktif",
    lastCheck: "2026-02-10",
    nextCheck: "2026-08-10",
  },
  {
    id: "e2",
    name: "Yangın Söndürücü",
    location: "Bodrum kat teknik oda",
    count: 2,
    status: "Aktif",
    lastCheck: "2026-02-10",
    nextCheck: "2026-08-10",
  },
  {
    id: "e3",
    name: "İlk Yardım Çantası",
    location: "Kapıcı dairesi",
    count: 1,
    status: "Aktif",
    lastCheck: "2026-01-15",
    nextCheck: "2026-07-15",
  },
  {
    id: "e4",
    name: "İlk Yardım Çantası",
    location: "5. Kat ortak alan",
    count: 1,
    status: "Yenileme Gerekli",
    lastCheck: "2025-09-01",
    nextCheck: "2026-03-01",
  },
  {
    id: "e5",
    name: "Sedye",
    location: "Bodrum kat deposu",
    count: 1,
    status: "Aktif",
    lastCheck: "2026-01-20",
    nextCheck: "2027-01-20",
  },
  {
    id: "e6",
    name: "Yangın Alarm Sistemi",
    location: "Tüm kat koridorları",
    count: 12,
    status: "Aktif",
    lastCheck: "2026-03-01",
    nextCheck: "2026-09-01",
  },
  {
    id: "e7",
    name: "Acil Aydınlatma",
    location: "Merdiven boşlukları",
    count: 8,
    status: "Aktif",
    lastCheck: "2026-02-20",
    nextCheck: "2026-08-20",
  },
  {
    id: "e8",
    name: "Toprak Hattı",
    location: "Elektrik panosu",
    count: 1,
    status: "Aktif",
    lastCheck: "2025-12-10",
    nextCheck: "2026-12-10",
  },
];

const COMM_TREE = [
  { level: 1, name: "Yönetici", phone: "0532 111 2233", role: "Koordinatör" },
  {
    level: 2,
    name: "Güvenlik Ahmet Y.",
    phone: "0533 222 3344",
    role: "Saha Sorumlusu",
  },
  {
    level: 2,
    name: "Kapıcı İbrahim Ş.",
    phone: "0534 333 4455",
    role: "Bina İçi Koordinasyon",
  },
  {
    level: 3,
    name: "Kat 4-5 Sorumlusu",
    phone: "0535 444 5566",
    role: "Sakin Tahliye",
  },
  {
    level: 3,
    name: "Kat 2-3 Sorumlusu",
    phone: "0536 555 6677",
    role: "Sakin Tahliye",
  },
  {
    level: 3,
    name: "Kat 0-1 Sorumlusu",
    phone: "0537 666 7788",
    role: "Sakin Tahliye",
  },
  { level: 4, name: "İtfaiye", phone: "110", role: "Acil Hizmet" },
  { level: 4, name: "Ambulans", phone: "112", role: "Acil Hizmet" },
  { level: 4, name: "Polis", phone: "155", role: "Acil Hizmet" },
  { level: 4, name: "Doğalgaz Acil", phone: "187", role: "Acil Hizmet" },
];

export default function EmergencyActionPlan({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: Props) {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [showDrillModal, setShowDrillModal] = useState(false);
  const [drillForm, setDrillForm] = useState({
    title: "",
    date: "",
    type: "Yangın",
    notes: "",
  });

  const plannedDrills = DRILLS.filter((d) => d.planned);
  const pastDrills = DRILLS.filter((d) => !d.planned);
  const avgParticipation = Math.round(
    pastDrills.reduce((a, b) => a + b.participation, 0) / pastDrills.length,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Acil Eylem Planı & Tahliye
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-1">
            Acil senaryolar, tahliye planları ve tatbikat takvimi
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowDrillModal(true)}
            className="bg-[#0B1B2E] hover:bg-[#1a2f48] text-white"
            data-ocid="emergency.open_modal_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Tatbikat Planla
          </Button>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-[#0B1B2E]">
            {SCENARIOS.length}
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Senaryo</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-blue-600">
            {plannedDrills.length}
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Planlanan Tatbikat</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-green-600">
            {avgParticipation}%
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Ort. Katılım</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5EAF2]">
          <p className="text-2xl font-bold text-[#F2A23A]">
            {EQUIPMENT.filter((e) => e.status === "Yenileme Gerekli").length}
          </p>
          <p className="text-xs text-[#6B7A8D] mt-1">Ekipman Uyarısı</p>
        </div>
      </div>

      <Tabs defaultValue="scenarios">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="scenarios">Senaryolar</TabsTrigger>
          <TabsTrigger value="drills">Tatbikat Takvimi</TabsTrigger>
          <TabsTrigger value="equipment">Ekipman</TabsTrigger>
          <TabsTrigger value="commtree">İletişim Ağacı</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScenario(s)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedScenario.id === s.id
                    ? `${s.bg} border-current ${s.color}`
                    : "bg-white border-[#E5EAF2] hover:border-[#D7DEE9]"
                }`}
                data-ocid={`emergency.${s.id}.tab`}
              >
                <s.icon
                  className={`w-6 h-6 ${selectedScenario.id === s.id ? s.color : "text-[#6B7A8D]"}`}
                />
                <p className="font-semibold text-sm mt-2 text-[#0E1116]">
                  {s.title}
                </p>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#4A90D9]" />
                <h3 className="font-semibold text-[#0E1116]">
                  Toplanma Noktası
                </h3>
              </div>
              <p className="text-sm text-[#3A4654] bg-blue-50 rounded-lg p-3">
                {selectedScenario.assemblyPoint}
              </p>

              <h4 className="font-semibold text-[#0E1116] mt-4 mb-3">
                Tahliye Rotaları
              </h4>
              <div className="space-y-2">
                {selectedScenario.routes.map((r, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static route list
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="font-medium text-[#0B1B2E] min-w-[80px]">
                      {r.floor}
                    </span>
                    <span className="text-[#6B7A8D]">→ {r.route}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5EAF2] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[#4A90D9]" />
                <h3 className="font-semibold text-[#0E1116]">
                  Acil Görev Atamaları
                </h3>
              </div>
              <div className="space-y-3">
                {selectedScenario.tasks.map((task, i) => (
                  <div
                    key={task.role}
                    className="flex items-start gap-3 p-3 bg-[#F3F6FB] rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                        [
                          "bg-[#4A90D9]",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-[#F2A23A]",
                        ][i % 4]
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#0E1116]">
                        {task.role}
                      </p>
                      <p className="text-xs text-[#6B7A8D]">{task.person}</p>
                      <p className="text-sm text-[#3A4654] mt-1">{task.duty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="drills" className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold text-[#0E1116] mb-3">
              Planlanan Tatbikatlar
            </h3>
            <div className="space-y-2">
              {plannedDrills.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border border-[#E5EAF2] p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0E1116]">{d.title}</p>
                      <p className="text-xs text-[#6B7A8D]">
                        {d.date} · {d.notes}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    {d.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#0E1116] mb-3">
              Geçmiş Tatbikatlar
            </h3>
            <div className="space-y-2">
              {pastDrills.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border border-[#E5EAF2] p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-semibold text-[#0E1116]">
                          {d.title}
                        </p>
                        <p className="text-xs text-[#6B7A8D]">
                          {d.date} · {d.notes}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#0B1B2E]">
                      {d.participation}%
                    </span>
                  </div>
                  <Progress value={d.participation} className="h-2" />
                  <p className="text-xs text-[#6B7A8D] mt-1">Katılım Oranı</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F3F6FB] border-b border-[#E5EAF2]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Ekipman
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Konum
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Adet
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Son Kontrol
                  </th>
                  <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {EQUIPMENT.map((eq) => (
                  <tr key={eq.id} className="hover:bg-[#F3F6FB]">
                    <td className="px-4 py-3 font-medium text-[#0E1116]">
                      {eq.name}
                    </td>
                    <td className="px-4 py-3 text-[#6B7A8D]">{eq.location}</td>
                    <td className="px-4 py-3 text-[#0E1116]">{eq.count}</td>
                    <td className="px-4 py-3 text-[#6B7A8D]">{eq.lastCheck}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`border-0 ${
                          eq.status === "Aktif"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {eq.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="commtree" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E5EAF2] p-5">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Acil İletişim Ağacı
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((level) => {
                const items = COMM_TREE.filter((c) => c.level === level);
                const levelLabels = [
                  "Birincil Koordinatör",
                  "Saha Sorumluları",
                  "Kat Sorumluları",
                  "Acil Servisler",
                ];
                const levelColors = [
                  "bg-[#0B1B2E] text-white",
                  "bg-[#4A90D9] text-white",
                  "bg-purple-500 text-white",
                  "bg-red-500 text-white",
                ];
                return (
                  <div key={level}>
                    <p className="text-xs font-bold text-[#6B7A8D] uppercase mb-2">
                      Seviye {level}: {levelLabels[level - 1]}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {items.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center gap-3 p-3 bg-[#F3F6FB] rounded-lg"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${levelColors[level - 1]}`}
                          >
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-[#0E1116]">
                              {c.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#6B7A8D]" />
                              <p className="text-xs text-[#6B7A8D]">
                                {c.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Drill modal */}
      <Dialog open={showDrillModal} onOpenChange={setShowDrillModal}>
        <DialogContent className="max-w-md" data-ocid="emergency.dialog">
          <DialogHeader>
            <DialogTitle>Tatbikat Planla</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Tatbikat Adı
              </p>
              <input
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={drillForm.title}
                onChange={(e) =>
                  setDrillForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="örn. Yangın Tatbikatı"
                data-ocid="emergency.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Tarih
              </p>
              <input
                type="date"
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={drillForm.date}
                onChange={(e) =>
                  setDrillForm((p) => ({ ...p, date: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Senaryo Türü
              </p>
              <select
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                value={drillForm.type}
                onChange={(e) =>
                  setDrillForm((p) => ({ ...p, type: e.target.value }))
                }
                data-ocid="emergency.select"
              >
                <option>Yangın</option>
                <option>Deprem</option>
                <option>Su Baskını</option>
                <option>Gaz Kaçağı</option>
                <option>Genel</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Notlar
              </p>
              <textarea
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none"
                rows={3}
                value={drillForm.notes}
                onChange={(e) =>
                  setDrillForm((p) => ({ ...p, notes: e.target.value }))
                }
                data-ocid="emergency.textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDrillModal(false)}
                data-ocid="emergency.cancel_button"
              >
                İptal
              </Button>
              <Button
                className="bg-[#0B1B2E] hover:bg-[#1a2f48] text-white"
                onClick={() => setShowDrillModal(false)}
                data-ocid="emergency.confirm_button"
              >
                Kaydet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
