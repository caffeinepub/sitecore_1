import {
  BookOpen,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Flame,
  Info,
  Layers,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

const techSections = [
  {
    id: "genel",
    title: "Genel Yapı Bilgileri",
    icon: Building2,
    color: "#3B82F6",
    items: [
      { label: "Yapı Yılı", value: "2008" },
      { label: "Kat Sayısı", value: "12 Kat" },
      { label: "Toplam Daire", value: "48 Daire" },
      { label: "Toplam İnşaat Alanı", value: "6.240 m²" },
      { label: "Arsa Alanı", value: "1.800 m²" },
      { label: "Yapı Kullanım İzni", value: "Alındı (2009)" },
      { label: "Yapı Tipi", value: "Betonarme Karkas" },
      { label: "Deprem Yönetmeliği", value: "1998 DBYBHY" },
    ],
  },
  {
    id: "malzeme",
    title: "Yapı Malzemeleri",
    icon: Layers,
    color: "#8B5CF6",
    items: [
      { label: "Beton Sınıfı", value: "C25" },
      { label: "Çelik Sınıfı", value: "S420" },
      { label: "Dış Cephe", value: "Kompozit Panel + Isı Yalıtımı (8cm XPS)" },
      { label: "İç Duvarlar", value: "Gazbeton (20cm)" },
      { label: "Çatı", value: "Shingle Kaplama + Su Yalıtımı" },
      { label: "Pencereler", value: "Isıcamlı PVC Doğrama" },
      { label: "Döşemeler", value: "Seramik / Laminat (daire)" },
      { label: "Asansör Kuyusu", value: "Betonarme" },
    ],
  },
  {
    id: "mekanik",
    title: "Mekanik Sistemler",
    icon: Wrench,
    color: "#F59E0B",
    items: [
      { label: "Isıtma Sistemi", value: "Merkezi Doğalgaz Kalorifer" },
      { label: "Su Tesisatı", value: "PPR Boru, Galvaniz Ana Hat" },
      { label: "Sıcak Su", value: "Merkezi Solar Sistem + Kazan" },
      { label: "Asansör Markası", value: "Otis Gen2 (2 Kabin)" },
      { label: "Asansör Kapasitesi", value: "8 Kişi / 630 kg" },
      { label: "Pompa Sistemi", value: "Hidrofor (Grundfos, 2+1 pompa)" },
      { label: "Havalandırma", value: "Mekanik Egzoz (bodrum/otopark)" },
      { label: "Klima Altyapısı", value: "Daire bazlı split hazırlığı" },
    ],
  },
  {
    id: "elektrik",
    title: "Elektrik & Güç Sistemleri",
    icon: Zap,
    color: "#EF4444",
    items: [
      { label: "Abonelik Gücü", value: "150 kW (Orta Gerilim)" },
      { label: "Trafo", value: "400 kVA (Bina İçi)" },
      { label: "Jeneratör", value: "100 kVA Dizel Jeneratör" },
      { label: "Topraklama", value: "TN-S Sistemi" },
      { label: "Otomasyon", value: "BMS (Bina Yönetim Sistemi)" },
      { label: "Zayıf Akım", value: "Kat Kablolaması CAT6" },
      { label: "Güvenlik Kameraları", value: "16 Kamera (IP, H.264)" },
      { label: "Yangın Alarm", value: "Adresli Yangın Alarm Paneli" },
    ],
  },
  {
    id: "yangin",
    title: "Yangın & Güvenlik Sistemleri",
    icon: Flame,
    color: "#DC2626",
    items: [
      { label: "Yangın Algılama", value: "Adresli Duman + Isı Dedektörü" },
      { label: "Söndürme", value: "Yağmurlama (Bodrum + Otopark)" },
      { label: "Yangın Dolabı", value: "Her katta 1 adet" },
      { label: "Tahliye Merdiveni", value: "Kaçış Merdiveni (Bölmeli)" },
      { label: "Acil Aydınlatma", value: "UPS Destekli LED" },
      { label: "Son Bakım", value: "Mart 2025" },
      { label: "Sorumlu Firma", value: "ProTech Yangın Sistemleri" },
      { label: "Sertifika Geçerlilik", value: "Mart 2026" },
    ],
  },
];

const handbookSections = [
  {
    id: "tasinma",
    title: "Taşınma & İlk Yerleşim",
    icon: "🏠",
    rules: [
      "Taşınma yalnızca hafta içi 08:00–18:00 saatleri arasında yapılabilir.",
      "Taşınma öncesi yöneticiden asansör rezervasyonu alınması zorunludur.",
      "Ortak alanların taşınma sırasında zarar görmesi halinde sakin sorumludur.",
      "Anahtarlar ve bina kartları teslim tutanağı imzalanarak teslim alınır.",
      "İlk 30 gün içinde daire fotoğrafları yöneticiyle paylaşılmalıdır.",
    ],
  },
  {
    id: "ortak",
    title: "Ortak Alan Kullanımı",
    icon: "🏢",
    rules: [
      "Lobide sigara içilmesi kesinlikle yasaktır.",
      "Asansörlerde bisiklet, motosiklet veya büyük eşya taşınamaz.",
      "Otopark alanları yalnızca tahsis edilen sakinlere aittir.",
      "Depo alanları için kilit sorumluluğu sakine aittir.",
      "Çamaşırhane 07:00–22:00 arasında kullanılabilir.",
      "Ortak alanlarda tamirat izni alınmadan yapılamaz.",
    ],
  },
  {
    id: "gurultu",
    title: "Gürültü & Komşuluk Kuralları",
    icon: "🔇",
    rules: [
      "22:00–08:00 arasında gürültü yapılmamalıdır.",
      "Tadilat çalışmaları yalnızca hafta içi 09:00–17:00 saatleri arasında yapılabilir.",
      "Evcil hayvanlar ortak alanlarda tasmalı olmalıdır.",
      "Müzik aleti çalımı için izolasyon yapılması veya belirli saatlere uyulması gerekir.",
      "Tekrarlayan gürültü şikayetleri uyarı ve para cezasına konu olabilir.",
    ],
  },
  {
    id: "aidat",
    title: "Aidat & Finansal Yükümlülükler",
    icon: "💳",
    rules: [
      "Aylık aidat her ayın 1–5 günleri arasında ödenmek zorundadır.",
      "5 günü geçen ödemeler için aylık %2 gecikme faizi uygulanır.",
      "3 ay birikmiş borç için yasal süreç başlatılabilir.",
      "Aidat ödemesini durdurmak, ortak alan kullanım hakkını etkilemez (yasal hak).",
      "İtirazlar yönetim kuruluna yazılı olarak iletilmelidir.",
    ],
  },
  {
    id: "tadilatizin",
    title: "Tadilat & Değişiklik Kuralları",
    icon: "🔧",
    rules: [
      "Her türlü tadilat öncesinde yönetimden yazılı izin alınmalıdır.",
      "Taşıyıcı elemanlara dokunmak kesinlikle yasaktır.",
      "Dış cepheye müdahale (klima, anten) yönetim onayına bağlıdır.",
      "Tadilat atıkları günlük olarak temizlenmeli, bina dışına taşınmalıdır.",
      "Yetkisiz tadilat tespit edilmesi halinde eski hale getirme masrafı sakine yansıtılır.",
    ],
  },
  {
    id: "acil",
    title: "Acil Durum Prosedürleri",
    icon: "🚨",
    rules: [
      "Yangın durumunda asansör kullanılmaz, kaçış merdiveni kullanılır.",
      "Depremde masa altı / iç duvar yanı korunma pozisyonu alınır.",
      "Bina içi acil hat: Güvenlik (İç Hat: 100), Yönetici (İç Hat: 101).",
      "Toplanma noktası: Binanın doğu girişi, otopark karşısı yeşil alan.",
      "Doğalgaz kokusu alındığında doğalgaz vanası kapatılır, pencereler açılır.",
    ],
  },
];

export default function BuildingTechSpec({ isOwner, t: _t }: Props) {
  const [activeView, setActiveView] = useState<"techspec" | "handbook">(
    "techspec",
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "genel",
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0E1116]">
            Bina Teknik Şartname & Konut El Kitabı
          </h2>
          <p className="text-[#6B7A8D] mt-1">
            Binanın teknik özellikleri ve sakin kullanım rehberi
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveView("techspec")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeView === "techspec"
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText size={15} /> Teknik Şartname
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("handbook")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeView === "handbook"
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen size={15} /> Konut El Kitabı
            </span>
          </button>
        </div>
      </div>

      {activeView === "techspec" && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Yapı Yılı",
                value: "2008",
                icon: Building2,
                color: "#3B82F6",
              },
              {
                label: "Toplam Daire",
                value: "48",
                icon: Layers,
                color: "#8B5CF6",
              },
              {
                label: "İnşaat Alanı",
                value: "6.240 m²",
                icon: Wrench,
                color: "#F59E0B",
              },
              {
                label: "Kat Sayısı",
                value: "12",
                icon: Info,
                color: "#10B981",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${card.color}20` }}
                  >
                    <card.icon size={18} style={{ color: card.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7A8D]">{card.label}</p>
                    <p className="text-lg font-bold text-[#0E1116]">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Accordion Sections */}
          <div className="space-y-3">
            {techSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id,
                    )
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: `${section.color}20` }}
                    >
                      <section.icon
                        size={18}
                        style={{ color: section.color }}
                      />
                    </div>
                    <span className="font-semibold text-[#0E1116]">
                      {section.title}
                    </span>
                    <span className="text-xs text-[#6B7A8D] bg-gray-100 px-2 py-0.5 rounded-full">
                      {section.items.length} özellik
                    </span>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronDown size={18} className="text-[#6B7A8D]" />
                  ) : (
                    <ChevronRight size={18} className="text-[#6B7A8D]" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between px-6 py-3"
                      >
                        <span className="text-sm text-[#6B7A8D]">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-[#0E1116]">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {isOwner && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
              <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Yönetici Notu
                </p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Teknik şartname bilgilerini güncellemek için destek ekibinizle
                  iletişime geçin veya bina belgelerinizi Belge Yönetimi
                  modülüne yükleyin.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === "handbook" && (
        <div className="space-y-4">
          {/* Intro Banner */}
          <div className="bg-gradient-to-r from-[#0B1B2E] to-[#1a3a6b] rounded-xl p-5 text-white">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} />
              <h3 className="text-lg font-bold">Konut Kullanım El Kitabı</h3>
            </div>
            <p className="text-blue-200 text-sm">
              Bu el kitabı binadaki yaşamınızı kolaylaştırmak ve ortak kuralları
              bilginize sunmak amacıyla hazırlanmıştır. Tüm sakinlerimizin bu
              kurallara uyması beklenmektedir.
            </p>
          </div>

          {/* Handbook Sections */}
          <div className="space-y-3">
            {handbookSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id,
                    )
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <span className="font-semibold text-[#0E1116]">
                      {section.title}
                    </span>
                    <span className="text-xs text-[#6B7A8D] bg-gray-100 px-2 py-0.5 rounded-full">
                      {section.rules.length} kural
                    </span>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronDown size={18} className="text-[#6B7A8D]" />
                  ) : (
                    <ChevronRight size={18} className="text-[#6B7A8D]" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                    {section.rules.map((rule) => (
                      <div
                        key={rule.slice(0, 20)}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle
                          size={15}
                          className="text-green-500 mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-[#3A4654]">{rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
            <Shield size={18} className="text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Kurallara Uyum
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Kurallara uyulmaması durumunda yönetim kurulu uyarı, para cezası
                veya yasal işlem başlatma yetkisine sahiptir. Şikayetleriniz
                için Şikayet Kutusu veya Anlaşmazlık Çözüm modülünü
                kullanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
