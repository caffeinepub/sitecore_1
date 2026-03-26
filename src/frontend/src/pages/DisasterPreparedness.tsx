import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Circle,
  FileText,
  Flame,
  MapPin,
  Phone,
  Shield,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

const scenarios = [
  {
    id: "earthquake",
    icon: Waves,
    color: "#E67E22",
    bg: "#FEF9F0",
    label: "Deprem",
    beforeSteps: [
      "Mobilyaları duvara sabitleyin",
      "Gaz vanasını nerede olduğunu öğrenin",
      "Acil çanta hazırlayın (su, yiyecek, ilaç, belgeler)",
      "Toplanma noktalarını tüm sakinlerle paylaşın",
      "Yapı güvenlik raporunu güncel tutun",
    ],
    duringSteps: [
      "Çök, Kapan, Tutun pozisyonu alın",
      "Pencere ve dış duvarlardan uzak durun",
      "Asansör kullanmayın",
      "Panik yapmadan sakin kalın",
    ],
    afterSteps: [
      "Binadan çıkın ve toplanma noktasına gidin",
      "Gaz kaçağı kontrolü yapın",
      "Hasarlı yapıya girmeyin",
      "AFAD bildirim hattını arayın: 122",
    ],
  },
  {
    id: "fire",
    icon: Flame,
    color: "#E74C3C",
    bg: "#FDF5F5",
    label: "Yangın",
    beforeSteps: [
      "Yangın söndürücülerin yerini öğrenin",
      "Acil çıkış yollarını ezberleyin",
      "Yangın dedektörlerini düzenli test edin",
      "Elektrik panelinin yerini bilin",
    ],
    duringSteps: [
      "Yangın alarmını çalıştırın",
      "İtfaiyeyi arayın: 110",
      "Kapı aralığından duman kontrolü yapın",
      "Merdiveni kullanın, asansöre binmeyin",
      "Dumanın altında kalarak hareket edin",
    ],
    afterSteps: [
      "Binadan tamamen çıkın",
      "Hiçbir şey almak için geri dönmeyin",
      "Toplanma noktasında tüm sakinleri sayın",
      "İtfaiyenin onayı olmadan binaya girmeyin",
    ],
  },
  {
    id: "flood",
    icon: Waves,
    color: "#2980B9",
    bg: "#F0F7FF",
    label: "Su Baskını",
    beforeSteps: [
      "Bodrum katta değerli eşyaları yüksekte tutun",
      "Su vanasının yerini öğrenin",
      "Drenaj kanallarını düzenli temizletin",
      "Su pompasının çalışırlığını kontrol edin",
    ],
    duringSteps: [
      "Su vanasını kapatın",
      "Elektrik panosunu devre dışı bırakın",
      "Üst katlara çıkın",
      "Akan suya girmeyin",
    ],
    afterSteps: [
      "Bina yapısal hasarını kontrol ettirin",
      "Elektrik bağlantılarını kontrol ettirin",
      "Islak alanları hızla kurulayın (nem/mantar riski)",
    ],
  },
  {
    id: "power",
    icon: Zap,
    color: "#8E44AD",
    bg: "#F9F0FF",
    label: "Uzun Süreli Elektrik Kesintisi",
    beforeSteps: [
      "Jeneratörün yakıt durumunu düzenli kontrol edin",
      "El feneri ve pil stoğu bulundurun",
      "UPS ve kesintisiz güç kaynaklarını test edin",
    ],
    duringSteps: [
      "Jeneratörü devreye alın",
      "Asansör bloke ise sakinlere duyurun",
      "DASK veya sigorta şirketini bilgilendirin",
    ],
    afterSteps: [
      "Elektrik geldiğinde tüm sistemleri kontrol edin",
      "Bozulan gıdaları imha edin",
      "Tekrar eden kesintileri TEDAŞ'a bildirin",
    ],
  },
];

const assemblyPoints = [
  {
    id: 1,
    name: "Ana Toplanma Noktası",
    location: "Bina önü - Ana Giriş Karşısı",
    capacity: 120,
    type: "primary",
  },
  {
    id: 2,
    name: "Yedek Toplanma Noktası",
    location: "Otopark arkası - Açık alan",
    capacity: 80,
    type: "secondary",
  },
  {
    id: 3,
    name: "3. Toplanma Noktası",
    location: "Park - Kuzey çıkışı",
    capacity: 60,
    type: "tertiary",
  },
];

const insuranceData = {
  dask: {
    label: "DASK (Zorunlu Deprem Sigortası)",
    policyNo: "DASK-2024-00341",
    insurer: "Mapfre Sigorta",
    coverage: "450.000 ₺",
    expiry: "31.12.2025",
    status: "active",
  },
  building: {
    label: "Bina Yangın & Doğal Afet Sigortası",
    policyNo: "YNG-2024-8821",
    insurer: "Allianz Türkiye",
    coverage: "2.500.000 ₺",
    expiry: "15.06.2025",
    status: "active",
  },
  liability: {
    label: "Sorumluluk Sigortası",
    policyNo: "SOR-2023-4491",
    insurer: "AXA Sigorta",
    coverage: "500.000 ₺",
    expiry: "01.03.2025",
    status: "expiring",
  },
};

const emergencyContacts = [
  { label: "İtfaiye", number: "110", color: "#E74C3C" },
  { label: "Ambulans", number: "112", color: "#27AE60" },
  { label: "Polis", number: "155", color: "#2980B9" },
  { label: "AFAD", number: "122", color: "#E67E22" },
  { label: "Gaz Arıza", number: "187", color: "#8E44AD" },
  { label: "Elektrik Arıza", number: "186", color: "#F39C12" },
];

const preparednessChecklist = [
  { id: 1, item: "Acil durum çantası hazırlandı", category: "Hazırlık" },
  {
    id: 2,
    item: "Toplanma noktaları tüm sakenlere duyuruldu",
    category: "Hazırlık",
  },
  {
    id: 3,
    item: "Yangın söndürücüler kontrol edildi (son 6 ay)",
    category: "Güvenlik",
  },
  { id: 4, item: "Yangın dedektörleri test edildi", category: "Güvenlik" },
  { id: 5, item: "Gaz vanası konumu işaretlendi", category: "Altyapı" },
  { id: 6, item: "Su vanası konumu işaretlendi", category: "Altyapı" },
  { id: 7, item: "Elektrik panosu etiketi güncellendi", category: "Altyapı" },
  { id: 8, item: "DASK poliçesi geçerli", category: "Sigorta" },
  { id: 9, item: "Bina sigortası geçerli", category: "Sigorta" },
  {
    id: 10,
    item: "Acil tahliye tatbikatı yapıldı (son 1 yıl)",
    category: "Tatbikat",
  },
  { id: 11, item: "Jeneratör yakıt kontrolü yapıldı", category: "Altyapı" },
  { id: 12, item: "İlk yardım kiti güncellendi", category: "Hazırlık" },
];

export default function DisasterPreparedness({ isOwner }: Props) {
  const [activeScenario, setActiveScenario] = useState("earthquake");
  const [expandedStep, setExpandedStep] = useState<
    "before" | "during" | "after"
  >("before");
  const [checked, setChecked] = useState<Set<number>>(new Set([1, 3, 8, 9]));
  const [activeTab, setActiveTab] = useState<
    "scenarios" | "assembly" | "insurance" | "checklist"
  >("scenarios");

  const scenario = scenarios.find((s) => s.id === activeScenario)!;
  const Icon = scenario.icon;

  const toggleCheck = (id: number) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };

  const completionRate = Math.round(
    (checked.size / preparednessChecklist.length) * 100,
  );

  const tabs = [
    { key: "scenarios", label: "Senaryo Rehberleri", icon: AlertTriangle },
    { key: "assembly", label: "Toplanma Noktaları", icon: MapPin },
    { key: "insurance", label: "Sigorta Poliçeleri", icon: FileText },
    { key: "checklist", label: "Hazırlık Kontrol", icon: CheckCircle },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0B1B2E]">
            Doğal Afet Hazırlık & Sigorta Kılavuzu
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Acil senaryolar, sigorta poliçeleri ve hazırlık kontrol listesi
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-green-700">
            Hazırlık: {completionRate}%
          </span>
        </div>
      </div>

      {/* Emergency Contacts Quick Bar */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" /> Acil Numaralar
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {emergencyContacts.map((c) => (
            <div
              key={c.number}
              className="text-center bg-white rounded-lg py-2 px-1 border border-red-100"
            >
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className="text-base font-bold" style={{ color: c.color }}>
                {c.number}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
        {tabs.map(({ key, label, icon: TabIcon }) => (
          <button
            type="button"
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-white text-[#0B1B2E] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <TabIcon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Scenarios Tab */}
      {activeTab === "scenarios" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Scenario List */}
          <div className="space-y-2">
            {scenarios.map((s) => {
              const SIcon = s.icon;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setActiveScenario(s.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    activeScenario === s.id
                      ? "border-2 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  style={
                    activeScenario === s.id
                      ? { borderColor: s.color, backgroundColor: s.bg }
                      : {}
                  }
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}20` }}
                  >
                    <SIcon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <span className="font-medium text-[#0B1B2E]">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scenario Detail */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div
              className="p-5 flex items-center gap-3 border-b"
              style={{ backgroundColor: scenario.bg }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${scenario.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: scenario.color }} />
              </div>
              <div>
                <h3 className="font-bold text-[#0B1B2E] text-lg">
                  {scenario.label} Senaryo Rehberi
                </h3>
                <p className="text-sm text-gray-500">
                  Önce / Sırasında / Sonrasında yapılacaklar
                </p>
              </div>
            </div>

            <div className="divide-y">
              {(["before", "during", "after"] as const).map((phase) => {
                const phaseLabels = {
                  before: "Öncesinde",
                  during: "Sırasında",
                  after: "Sonrasında",
                };
                const phaseColors = {
                  before: "#3498DB",
                  during: "#E67E22",
                  after: "#27AE60",
                };
                const steps =
                  scenario[
                    `${phase}Steps` as
                      | "beforeSteps"
                      | "duringSteps"
                      | "afterSteps"
                  ];
                const isOpen = expandedStep === phase;
                return (
                  <div key={phase}>
                    <button
                      type="button"
                      onClick={() => setExpandedStep(phase)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: phaseColors[phase] }}
                        >
                          {phase === "before"
                            ? "1"
                            : phase === "during"
                              ? "2"
                              : "3"}
                        </div>
                        <span className="font-semibold text-[#0B1B2E]">
                          {scenario.label} {phaseLabels[phase]}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {steps.map((step, i) => (
                            <li
                              key={step}
                              className="flex items-start gap-3 text-sm text-gray-700"
                            >
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: phaseColors[phase] }}
                              >
                                {i + 1}
                              </div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Assembly Points Tab */}
      {activeTab === "assembly" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Acil tahliye durumunda tüm sakinler aşağıdaki toplanma noktalarına
              yönlendirilmelidir. En yakın noktayı kullanın ve personel
              yokluğunda kıdemli komşunuza bildirin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assemblyPoints.map((point) => {
              const colors = {
                primary: "#27AE60",
                secondary: "#F39C12",
                tertiary: "#3498DB",
              };
              const labels = {
                primary: "Birincil",
                secondary: "İkincil",
                tertiary: "Üçüncül",
              };
              const color = colors[point.type as keyof typeof colors];
              return (
                <div
                  key={point.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div
                    className="p-4 text-white"
                    style={{ backgroundColor: color }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-90">
                        {labels[point.type as keyof typeof labels]}
                      </span>
                      <MapPin className="w-5 h-5 opacity-80" />
                    </div>
                    <p className="text-lg font-bold mt-1">{point.name}</p>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {point.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      Kapasite:{" "}
                      <span className="font-semibold text-[#0B1B2E]">
                        {point.capacity} kişi
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drill History */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-[#0B1B2E] mb-4">
              Tatbikat Geçmişi
            </h3>
            <div className="space-y-3">
              {[
                {
                  date: "15 Mart 2024",
                  type: "Yangın Tatbikatı",
                  participants: 87,
                  result: "Başarılı",
                },
                {
                  date: "20 Eylül 2023",
                  type: "Deprem Tatbikatı",
                  participants: 72,
                  result: "Başarılı",
                },
                {
                  date: "10 Mart 2023",
                  type: "Yangın Tatbikatı",
                  participants: 65,
                  result: "Kısmen Başarılı",
                },
              ].map((drill) => (
                <div
                  key={drill.date}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-[#0B1B2E] text-sm">
                      {drill.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {drill.date} • {drill.participants} katılımcı
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      drill.result === "Başarılı"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {drill.result}
                  </span>
                </div>
              ))}
            </div>
            {isOwner && (
              <button
                type="button"
                className="mt-4 w-full py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                + Yeni Tatbikat Kaydı Ekle
              </button>
            )}
          </div>
        </div>
      )}

      {/* Insurance Tab */}
      {activeTab === "insurance" && (
        <div className="space-y-4">
          {Object.values(insuranceData).map((ins) => (
            <div
              key={ins.policyNo}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      ins.status === "active" ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    <FileText
                      className={`w-5 h-5 ${
                        ins.status === "active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2E]">{ins.label}</p>
                    <p className="text-xs text-gray-500">
                      Poliçe No: {ins.policyNo}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ins.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {ins.status === "active" ? "Geçerli" : "Yenileme Gerekli"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Sigorta Şirketi</p>
                  <p className="text-sm font-medium text-[#0B1B2E]">
                    {ins.insurer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Teminat Tutarı</p>
                  <p className="text-sm font-semibold text-[#0B1B2E]">
                    {ins.coverage}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bitiş Tarihi</p>
                  <p
                    className={`text-sm font-medium ${
                      ins.status === "expiring"
                        ? "text-yellow-600"
                        : "text-[#0B1B2E]"
                    }`}
                  >
                    {ins.expiry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === "checklist" && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-[#0B1B2E]">
                Genel Hazırlık Durumu
              </p>
              <span
                className={`text-lg font-bold ${
                  completionRate >= 80
                    ? "text-green-600"
                    : completionRate >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {completionRate}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  completionRate >= 80
                    ? "bg-green-500"
                    : completionRate >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {checked.size} / {preparednessChecklist.length} madde tamamlandı
            </p>
          </div>

          {/* Checklist by Category */}
          {["Hazırlık", "Güvenlik", "Altyapı", "Sigorta", "Tatbikat"].map(
            (cat) => {
              const items = preparednessChecklist.filter(
                (i) => i.category === cat,
              );
              return (
                <div
                  key={cat}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className="px-5 py-3 bg-gray-50 border-b">
                    <p className="font-semibold text-sm text-[#0B1B2E]">
                      {cat}
                    </p>
                  </div>
                  <div className="divide-y">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 px-5 py-3"
                      >
                        <button
                          type="button"
                          onClick={() => toggleCheck(item.id)}
                          className="flex-shrink-0"
                        >
                          {checked.has(item.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                        <p
                          className={`text-sm ${
                            checked.has(item.id)
                              ? "text-gray-400 line-through"
                              : "text-[#0B1B2E]"
                          }`}
                        >
                          {item.item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
