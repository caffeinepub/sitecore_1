import { Building2, Layers, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";
import { LANGUAGES } from "../i18n";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, logout, setLanguage, language } = useAuth();
  const { t } = useTranslation();

  const roles = [
    {
      key: "owner",
      label: t.buildingOwner,
      desc: t.owner_desc,
      icon: Building2,
      color: "bg-[#0B1B2E] hover:bg-[#112843]",
      btnClass: "bg-[#0E2A47] hover:bg-[#0B1B2E]",
    },
    {
      key: "manager",
      label: t.buildingManager,
      desc: t.manager_desc,
      icon: Users,
      color: "bg-white",
      btnClass: "bg-[#4A90D9] hover:bg-[#3B82C4]",
    },
    {
      key: "resident",
      label: t.resident,
      desc: t.resident_desc,
      icon: Shield,
      color: "bg-white",
      btnClass: "bg-[#2F3A46] hover:bg-[#1f2a35]",
    },
    {
      key: "staff",
      label: t.staff,
      desc: t.staff_desc,
      icon: Layers,
      color: "bg-white",
      btnClass: "bg-[#F2A23A] hover:bg-[#e0921a]",
    },
  ];

  const features = [
    { title: t.feature1Title, desc: t.feature1Desc },
    { title: t.feature2Title, desc: t.feature2Desc },
    { title: t.feature3Title, desc: t.feature3Desc },
    { title: t.feature4Title, desc: t.feature4Desc },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-[#0B1B2E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-white w-7 h-7" />
            <span className="text-white text-xl font-bold tracking-wide">
              SITECORE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#112843] text-white text-sm border border-[#1e3a5f] rounded-full px-3 py-1.5 cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full px-5 text-sm"
                >
                  {t.dashboard}
                </Button>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-5 text-sm"
                >
                  {t.logout}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full px-5 text-sm"
              >
                {t.login}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#F3F6FB] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-[#0E1116] leading-tight mb-6">
              {t.tagline}
            </h1>
            <p className="text-[#3A4654] text-lg mb-8 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full px-8 py-3 text-base font-semibold"
              >
                {t.explore}
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-[#D7DEE9] text-[#0E1116] hover:bg-[#E8EFF8] rounded-full px-8 py-3 text-base"
              >
                {t.login}
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-[#E5EAF2]">
                <div className="bg-[#F1F4F8] rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-8 h-8 text-[#4A90D9]" />
                    <div>
                      <div className="font-semibold text-[#0E1116]">
                        Merkez Apartman
                      </div>
                      <div className="text-xs text-[#3A4654]">
                        42 kullanıcı • 8 daire
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["24 Sakin", "3 Yönetici", "5 Personel"].map((s) => (
                      <div
                        key={s}
                        className="bg-white rounded-lg p-2 text-center text-xs font-medium text-[#0E1116] shadow-sm"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                    <span className="text-sm text-[#3A4654]">Son Duyuru</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Yeni
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                    <span className="text-sm text-[#3A4654]">Bakım Talebi</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      Bekliyor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Login Section */}
      <section className="bg-gradient-to-br from-[#0B1B2E] to-[#112843] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Kullanıcı Türünüze Göre Giriş Yapın
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div
                key={role.key}
                className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4"
              >
                <div className="bg-[#F1F4F8] rounded-full p-4">
                  <role.icon className="w-10 h-10 text-[#1F2A37]" />
                </div>
                <h3 className="text-lg font-bold text-[#0E1116] text-center">
                  {role.label}
                </h3>
                <p className="text-sm text-[#3A4654] text-center">
                  {role.desc}
                </p>
                <Button
                  onClick={() => navigate(`/login?role=${role.key}`)}
                  className={`${role.btnClass} text-white rounded-full w-full font-semibold`}
                >
                  {t.login}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#F3F6FB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0E1116] text-center mb-12">
            {t.features}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static display list
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-[#F1F4F8] w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-[#1F2A37] font-bold text-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-[#0E1116]">{f.title}</h3>
                <p className="text-[#3A4654] text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SiteCore */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#0E1116] mb-4">
              {t.whySitecore}
            </h2>
            <p className="text-[#3A4654] mb-6">{t.whyDesc}</p>
            <ul className="space-y-2 text-[#3A4654]">
              {[
                t.feature1Desc,
                t.feature2Desc,
                t.feature3Desc,
                t.feature4Desc,
              ].map((d, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4A90D9] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => navigate("/login")}
              className="mt-8 bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full px-8"
            >
              {t.login}
            </Button>
          </div>
          <div className="bg-[#F3F6FB] rounded-2xl p-8 border border-[#E5EAF2] shadow-lg">
            <div className="space-y-4">
              {[t.buildingOwner, t.buildingManager, t.resident, t.staff].map(
                (r) => (
                  <div
                    key={r}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#4A90D9] flex items-center justify-center text-white text-xs font-bold">
                      {r[0]}
                    </div>
                    <span className="text-[#0E1116] font-medium">{r}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1B2E] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6" />
              <span className="font-bold">SiteCore</span>
            </div>
            <p className="text-white/60 text-sm">{t.tagline}</p>
          </div>
          {[
            ["Hizmetler", ["Bina Sahibi", "Yönetici", "Sakin", "Personel"]],
            ["Destek", ["Yardım", "Dokümanlar", "SSS"]],
            ["Yasal", ["Gizlilik", "Kullanım Koşulları"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h4 className="font-semibold mb-3">{title as string}</h4>
              <ul className="space-y-2">
                {(items as string[]).map((item) => (
                  <li
                    key={item}
                    className="text-white/60 text-sm hover:text-white cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 SiteCore. Tüm hakları saklıdır.
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#112843] text-white text-sm border border-[#1e3a5f] rounded-full px-3 py-1.5"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.label}
              </option>
            ))}
          </select>
        </div>
      </footer>
    </div>
  );
}
