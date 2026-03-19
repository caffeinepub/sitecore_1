import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";
import { LANGUAGES } from "../i18n";

interface ProfileSettingsProps {
  userId: string;
  t: any;
}

export default function ProfileSettings({ userId, t }: ProfileSettingsProps) {
  const { language, setLanguage } = useAuth();

  const storageKey = `sitecore_profile_${userId}`;
  const loadProfile = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { displayName: "", language };
  };

  const initial = loadProfile();
  const [displayName, setDisplayName] = useState<string>(
    initial.displayName || "",
  );
  const [selectedLang, setSelectedLang] = useState<string>(
    initial.language || language,
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const profile = { displayName, language: selectedLang };
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setLanguage(selectedLang);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#0E1116] mb-6">
        {t.profileSettings}
      </h2>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] max-w-lg">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
              Kullanıcı ID / User ID
            </Label>
            <p className="font-mono text-xs text-[#0E1116] bg-[#F3F6FB] px-3 py-2 rounded-lg break-all">
              {userId}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
              {t.displayName || "Görünen Ad / Display Name"}
            </Label>
            <Input
              data-ocid="profile.input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="..."
              className="border-[#D7DEE9]"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
              {t.preferredLanguage}
            </Label>
            <select
              data-ocid="profile.select"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116] bg-white"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            {saved ? (
              <div
                data-ocid="profile.success_state"
                className="flex items-center gap-2 text-green-600 text-sm"
              >
                <Check className="w-4 h-4" />
                {t.profileUpdated}
              </div>
            ) : (
              <Button
                data-ocid="profile.save_button"
                onClick={handleSave}
                className="bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-6"
              >
                {t.updateProfile}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
