import { Bell, Building2, Clock, Eye, Lock, Palette, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const changeLog = [
  {
    who: "Ahmet Yılmaz (Yönetici)",
    what: "Maksimum ziyaretçi sayısı güncellendi: 3 → 5",
    when: "20 Mar 2025, 14:32",
  },
  {
    who: "Fatma Demir (Yönetici)",
    what: "Aidat hatırlatma günü değiştirildi: 5 → 3 gün",
    when: "18 Mar 2025, 09:15",
  },
  {
    who: "Ahmet Yılmaz (Yönetici)",
    what: "Bina adı güncellendi",
    when: "10 Mar 2025, 16:45",
  },
  {
    who: "Sistem",
    what: "Otomatik yedekleme ayarları güncellendi",
    when: "5 Mar 2025, 00:00",
  },
  {
    who: "Mehmet Kaya (Site Sahibi)",
    what: "Yeni yönetici atandı: Fatma Demir",
    when: "1 Mar 2025, 11:00",
  },
];

const THEME_COLORS = [
  { label: "Koyu Lacivert", value: "navy", bg: "bg-slate-800" },
  { label: "Koyu Yeşil", value: "green", bg: "bg-emerald-800" },
  { label: "Bordo", value: "red", bg: "bg-red-900" },
  { label: "Derin Mor", value: "purple", bg: "bg-purple-900" },
];

const LANGUAGES = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

export default function BuildingSettings(_props: {
  buildingId?: string;
  userId?: string;
  isOwner?: boolean;
  t?: unknown;
  building?: unknown;
}) {
  // General
  const [buildingName, setBuildingName] = useState("Yeşilvadi Sitesi");
  const [address, setAddress] = useState(
    "Bağcılar Mah. Lale Sok. No:12, İstanbul",
  );
  const [managerName, setManagerName] = useState("Ahmet Yılmaz");
  const [managerPhone, setManagerPhone] = useState("0532 111 22 33");
  const [unitCount, setUnitCount] = useState("48");
  const [foundedDate, setFoundedDate] = useState("2015-06-01");

  // Security
  const [visitorRequired, setVisitorRequired] = useState(true);
  const [entryRestriction, setEntryRestriction] = useState(false);
  const [maxVisitors, setMaxVisitors] = useState("5");

  // Notifications
  const [duesReminderDays, setDuesReminderDays] = useState("3");
  const [maintenanceNotif, setMaintenanceNotif] = useState(true);
  const [eventNotif, setEventNotif] = useState(true);

  // Appearance
  const [themeColor, setThemeColor] = useState("navy");
  const [defaultLang, setDefaultLang] = useState("tr");

  const saveSettings = () => {
    toast.success("Ayarlar başarıyla kaydedildi");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bina Ayarları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Bina yapılandırması ve tercihler
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList
          className="grid grid-cols-4 w-full max-w-xl"
          data-ocid="settings.tab"
        >
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Genel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Bina Adı</Label>
                  <Input
                    data-ocid="settings.building_name.input"
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Yönetici Adı</Label>
                  <Input
                    data-ocid="settings.manager_name.input"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label>Adres</Label>
                  <Input
                    data-ocid="settings.address.input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Yönetici Telefonu</Label>
                  <Input
                    data-ocid="settings.manager_phone.input"
                    value={managerPhone}
                    onChange={(e) => setManagerPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Daire Sayısı</Label>
                  <Input
                    data-ocid="settings.unit_count.input"
                    type="number"
                    value={unitCount}
                    onChange={(e) => setUnitCount(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Kuruluş Tarihi</Label>
                  <Input
                    data-ocid="settings.founded_date.input"
                    type="date"
                    value={foundedDate}
                    onChange={(e) => setFoundedDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" /> Güvenlik Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ziyaretçi Kaydı Zorunlu</p>
                  <p className="text-sm text-muted-foreground">
                    Tüm ziyaretçilerin kayıt yaptırması zorunlu olsun
                  </p>
                </div>
                <Switch
                  data-ocid="settings.visitor_required.switch"
                  checked={visitorRequired}
                  onCheckedChange={setVisitorRequired}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Giriş Saati Kısıtlaması</p>
                  <p className="text-sm text-muted-foreground">
                    Gece saatlerinde giriş kısıtlansın (00:00 - 06:00)
                  </p>
                </div>
                <Switch
                  data-ocid="settings.entry_restriction.switch"
                  checked={entryRestriction}
                  onCheckedChange={setEntryRestriction}
                />
              </div>
              <div className="space-y-1 max-w-xs">
                <Label>Maksimum Eş Zamanlı Ziyaretçi</Label>
                <Input
                  data-ocid="settings.max_visitors.input"
                  type="number"
                  value={maxVisitors}
                  onChange={(e) => setMaxVisitors(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" /> Bildirim Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1 max-w-xs">
                <Label>Aidat Hatırlatması (Kaç gün önce)</Label>
                <Input
                  data-ocid="settings.dues_reminder.input"
                  type="number"
                  value={duesReminderDays}
                  onChange={(e) => setDuesReminderDays(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bakım Bildirimleri</p>
                  <p className="text-sm text-muted-foreground">
                    Bakım ve arıza güncellemelerinde bildirim gönder
                  </p>
                </div>
                <Switch
                  data-ocid="settings.maintenance_notif.switch"
                  checked={maintenanceNotif}
                  onCheckedChange={setMaintenanceNotif}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Etkinlik Bildirimleri</p>
                  <p className="text-sm text-muted-foreground">
                    Toplantı ve etkinlik davetlerinde bildirim gönder
                  </p>
                </div>
                <Switch
                  data-ocid="settings.event_notif.switch"
                  checked={eventNotif}
                  onCheckedChange={setEventNotif}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" /> Görünüm Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tema Rengi</Label>
                <div className="flex gap-3 flex-wrap">
                  {THEME_COLORS.map((tc) => (
                    <button
                      type="button"
                      key={tc.value}
                      data-ocid={`settings.theme.${tc.value}.button`}
                      onClick={() => setThemeColor(tc.value)}
                      className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all ${
                        themeColor === tc.value
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${tc.bg}`} />
                      <span className="text-sm">{tc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1 max-w-xs">
                <Label>Varsayılan Dil</Label>
                <Select value={defaultLang} onValueChange={setDefaultLang}>
                  <SelectTrigger data-ocid="settings.default_lang.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button
        data-ocid="settings.save_button"
        className="gap-2"
        onClick={saveSettings}
      >
        <Save className="w-4 h-4" /> Ayarları Kaydet
      </Button>

      {/* Change Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> Değişiklik Geçmişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {changeLog.map((entry, i) => (
              <div
                key={entry.when}
                data-ocid={`settings.item.${i + 1}`}
                className="flex items-start gap-3 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{entry.what}</p>
                  <p className="text-muted-foreground">
                    {entry.who} · {entry.when}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
