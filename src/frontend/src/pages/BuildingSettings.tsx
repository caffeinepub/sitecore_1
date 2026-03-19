import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface BuildingSettingsProps {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
  building: { name: string; address: string } | null;
}

interface BuildingSettingsData {
  name: string;
  address: string;
  totalFloors: number;
  totalUnits: number;
}

export default function BuildingSettings({
  buildingId,
  isOwner,
  t,
  building,
}: BuildingSettingsProps) {
  const storageKey = `sitecore_bsettings_${buildingId}`;

  const loadSettings = (): BuildingSettingsData => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: building?.name || "",
      address: building?.address || "",
      totalFloors: 1,
      totalUnits: 1,
    };
  };

  const [settings, setSettings] = useState<BuildingSettingsData>(loadSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#0E1116] mb-2">
        {t.buildingSettings}
      </h2>
      <p className="text-[#3A4654] text-sm mb-6">{t.editBuildingInfo}</p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] max-w-lg">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
              {t.buildingName}
            </Label>
            {isOwner ? (
              <Input
                data-ocid="building_settings.input"
                value={settings.name}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, name: e.target.value }))
                }
                className="border-[#D7DEE9]"
              />
            ) : (
              <p className="text-[#0E1116] px-3 py-2 bg-[#F3F6FB] rounded-lg">
                {settings.name}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
              {t.address}
            </Label>
            {isOwner ? (
              <Input
                data-ocid="building_settings.address.input"
                value={settings.address}
                onChange={(e) =>
                  setSettings((p) => ({ ...p, address: e.target.value }))
                }
                className="border-[#D7DEE9]"
              />
            ) : (
              <p className="text-[#0E1116] px-3 py-2 bg-[#F3F6FB] rounded-lg">
                {settings.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                {t.totalFloors}
              </Label>
              {isOwner ? (
                <Input
                  data-ocid="building_settings.floors.input"
                  type="number"
                  min={1}
                  value={settings.totalFloors}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      totalFloors: Number(e.target.value),
                    }))
                  }
                  className="border-[#D7DEE9]"
                />
              ) : (
                <p className="text-[#0E1116] px-3 py-2 bg-[#F3F6FB] rounded-lg">
                  {settings.totalFloors}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-[#3A4654] mb-1 block">
                {t.totalUnits}
              </Label>
              {isOwner ? (
                <Input
                  data-ocid="building_settings.units.input"
                  type="number"
                  min={1}
                  value={settings.totalUnits}
                  onChange={(e) =>
                    setSettings((p) => ({
                      ...p,
                      totalUnits: Number(e.target.value),
                    }))
                  }
                  className="border-[#D7DEE9]"
                />
              ) : (
                <p className="text-[#0E1116] px-3 py-2 bg-[#F3F6FB] rounded-lg">
                  {settings.totalUnits}
                </p>
              )}
            </div>
          </div>

          {isOwner && (
            <div className="pt-2">
              {saved ? (
                <div
                  data-ocid="building_settings.success_state"
                  className="flex items-center gap-2 text-green-600 text-sm"
                >
                  <Check className="w-4 h-4" />
                  {t.settingsSaved}
                </div>
              ) : (
                <Button
                  data-ocid="building_settings.save_button"
                  onClick={handleSave}
                  className="bg-[#4A90D9] hover:bg-[#3A80C9] text-white rounded-full px-6"
                >
                  {t.saveSettings}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
