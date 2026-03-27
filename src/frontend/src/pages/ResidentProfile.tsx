import { Bell, Globe, Lock, Phone, Save, Shield, User } from "lucide-react";
import { useState } from "react";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

const LANGUAGES = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
];

const KEY = (id: string) => `sitecore_resident_profile_${id}`;

interface Profile {
  name: string;
  apartmentNo: string;
  phone: string;
  moveInDate: string;
  residentType: "owner" | "tenant";
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  language: string;
  notifyAnnouncements: boolean;
  notifyDues: boolean;
  notifyMaintenance: boolean;
  notifyEvents: boolean;
  notifyForum: boolean;
  profileVisible: boolean;
  phoneVisible: boolean;
  apartmentVisible: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: "Sakin Adı",
  apartmentNo: "1",
  phone: "",
  moveInDate: "2024-01-01",
  residentType: "owner",
  email: "",
  emergencyContact: "",
  emergencyPhone: "",
  language: "tr",
  notifyAnnouncements: true,
  notifyDues: true,
  notifyMaintenance: true,
  notifyEvents: true,
  notifyForum: false,
  profileVisible: true,
  phoneVisible: false,
  apartmentVisible: true,
};

export default function ResidentProfile({ buildingId }: Props) {
  const [activeTab, setActiveTab] = useState<"profile" | "prefs" | "privacy">(
    "profile",
  );
  const [profile, setProfile] = useState<Profile>(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  });
  const [saved, setSaved] = useState(false);

  const update = (patch: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(KEY(buildingId), JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Completion score
  const fields: (keyof Profile)[] = [
    "name",
    "phone",
    "moveInDate",
    "emergencyContact",
    "emergencyPhone",
  ];
  const filled = fields.filter((f) => String(profile[f]).trim() !== "").length;
  const completion = Math.round((filled / fields.length) * 100);

  const tabs = [
    { key: "profile" as const, label: "Profil", icon: User },
    { key: "prefs" as const, label: "Tercihler", icon: Bell },
    { key: "privacy" as const, label: "Gizlilik", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Sakin Profil & Tercih Yönetimi
          </h2>
          <p className="text-sm text-[#3A4654] mt-1">
            Kişisel bilgiler, bildirim tercihleri ve gizlilik ayarları
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            saved
              ? "bg-green-600 text-white"
              : "bg-[#1B3A5C] text-white hover:bg-[#16324f]"
          }`}
        >
          <Save size={15} /> {saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-xl border border-[#D7DEE9] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#0E1116]">
            Profil Tamamlanma
          </span>
          <span className="text-sm font-bold text-[#1B3A5C]">
            {completion}%
          </span>
        </div>
        <div className="h-2.5 bg-[#F3F6FB] rounded-full">
          <div
            className={`h-full rounded-full transition-all ${
              completion === 100
                ? "bg-green-500"
                : completion >= 60
                  ? "bg-[#4A90D9]"
                  : "bg-yellow-400"
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>
        {completion < 100 && (
          <p className="text-xs text-[#3A4654] mt-1.5">
            Profili tamamlamak için telefon, acil kişi ve diğer bilgileri
            doldurun.
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#D7DEE9]">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            type="button"
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              activeTab === key
                ? "border-[#1B3A5C] text-[#1B3A5C]"
                : "border-transparent text-[#3A4654] hover:text-[#0E1116]"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-[#D7DEE9] p-5 space-y-4">
            <h3 className="font-semibold text-[#0E1116] text-sm">
              Kişisel Bilgiler
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Ad Soyad
                </p>
                <input
                  value={profile.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Daire No
                </p>
                <input
                  value={profile.apartmentNo}
                  onChange={(e) => update({ apartmentNo: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="1"
                />
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  <Phone size={12} className="inline mr-1" />
                  Telefon
                </p>
                <input
                  value={profile.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="05xx xxx xx xx"
                />
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Taşınma Tarihi
                </p>
                <input
                  type="date"
                  value={profile.moveInDate}
                  onChange={(e) => update({ moveInDate: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Sakin Türü
                </p>
                <select
                  value={profile.residentType}
                  onChange={(e) =>
                    update({
                      residentType: e.target.value as Profile["residentType"],
                    })
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="owner">Malik (Ev Sahibi)</option>
                  <option value="tenant">Kiracı</option>
                </select>
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  E-posta (isteğe bağlı)
                </p>
                <input
                  value={profile.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="ornek@mail.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#D7DEE9] p-5 space-y-4">
            <h3 className="font-semibold text-[#0E1116] text-sm">
              Acil İletişim Kişisi
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Ad Soyad
                </p>
                <input
                  value={profile.emergencyContact}
                  onChange={(e) => update({ emergencyContact: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="Acil iletişim kişisi"
                />
              </div>
              <div>
                <p className="block text-xs font-medium text-[#3A4654] mb-1.5">
                  Telefon
                </p>
                <input
                  value={profile.emergencyPhone}
                  onChange={(e) => update({ emergencyPhone: e.target.value })}
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                  placeholder="05xx xxx xx xx"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "prefs" && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-[#D7DEE9] p-5">
            <h3 className="font-semibold text-[#0E1116] text-sm mb-4">
              <Bell size={14} className="inline mr-2" />
              Bildirim Tercihleri
            </h3>
            <div className="space-y-3">
              {(
                [
                  {
                    key: "notifyAnnouncements" as const,
                    label: "Duyurular",
                    desc: "Bina duyuruları ve önemli bildirimler",
                  },
                  {
                    key: "notifyDues" as const,
                    label: "Aidat Hatırlatmaları",
                    desc: "Ödeme tarihleri ve gecikme bildirimleri",
                  },
                  {
                    key: "notifyMaintenance" as const,
                    label: "Bakım & Arıza",
                    desc: "Planlı bakım ve arıza bildirimleri",
                  },
                  {
                    key: "notifyEvents" as const,
                    label: "Etkinlikler",
                    desc: "Toplantılar ve bina etkinlikleri",
                  },
                  {
                    key: "notifyForum" as const,
                    label: "Komşu Forumu",
                    desc: "Yeni forum gönderileri ve yanıtlar",
                  },
                ] as const
              ).map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b border-[#F3F6FB] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0E1116]">
                      {label}
                    </p>
                    <p className="text-xs text-[#3A4654]">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => update({ [key]: !profile[key] })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      profile[key] ? "bg-[#1B3A5C]" : "bg-[#D7DEE9]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        profile[key] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#D7DEE9] p-5">
            <h3 className="font-semibold text-[#0E1116] text-sm mb-4">
              <Globe size={14} className="inline mr-2" />
              Dil Tercihi
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  type="button"
                  key={lang.code}
                  onClick={() => update({ language: lang.code })}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition ${
                    profile.language === lang.code
                      ? "border-[#1B3A5C] bg-[#1B3A5C]/5 text-[#1B3A5C] font-medium"
                      : "border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"
                  }`}
                >
                  <span className="font-semibold">
                    {lang.code.toUpperCase()}
                  </span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-[#D7DEE9] p-5">
            <h3 className="font-semibold text-[#0E1116] text-sm mb-1">
              <Lock size={14} className="inline mr-2" />
              Profil Görünürlüğü
            </h3>
            <p className="text-xs text-[#3A4654] mb-4">
              Diğer sakinlerin profilinizde hangi bilgileri görebileceğini
              seçin.
            </p>
            <div className="space-y-3">
              {(
                [
                  {
                    key: "profileVisible" as const,
                    label: "Profilim görünür",
                    desc: "Diğer sakinler profilinizi görebilir",
                  },
                  {
                    key: "phoneVisible" as const,
                    label: "Telefon numaramı göster",
                    desc: "Diğer sakinler telefon numaranızı görebilir",
                  },
                  {
                    key: "apartmentVisible" as const,
                    label: "Daire bilgimi göster",
                    desc: "Daire numaranız sakin listesinde görünür",
                  },
                ] as const
              ).map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3 border-b border-[#F3F6FB] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0E1116]">
                      {label}
                    </p>
                    <p className="text-xs text-[#3A4654]">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => update({ [key]: !profile[key] })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      profile[key] ? "bg-[#1B3A5C]" : "bg-[#D7DEE9]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        profile[key] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FEF9EC] border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-800 font-medium mb-1">
              Veri Güvenliği
            </p>
            <p className="text-xs text-yellow-700">
              Tüm profil bilgileriniz bu cihazda yerel olarak saklanır. Bina
              yönetimine paylaşılan bilgiler sadece yönetici rolündeki
              kullanıcılar tarafından görülebilir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
