import {
  Bell,
  Building2,
  Check,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Lock,
  User,
} from "lucide-react";
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

const LANGUAGES = [
  { value: "tr", label: "🇹🇷 Türkçe" },
  { value: "en", label: "🇬🇧 English" },
  { value: "de", label: "🇩🇪 Deutsch" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "es", label: "🇪🇸 Español" },
  { value: "ar", label: "🇸🇦 العربية" },
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "ja", label: "🇯🇵 日本語" },
  { value: "pt", label: "🇵🇹 Português" },
];

const BUILDINGS = [
  {
    id: "1",
    name: "Yeşilvadi Sitesi",
    role: "Yönetici",
    joined: "2022-03-15",
    roleColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: "2",
    name: "Gül Apartmanı",
    role: "Sakin",
    joined: "2020-09-01",
    roleColor:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  {
    id: "3",
    name: "Merkez Plaza",
    role: "Destek Personeli",
    joined: "2024-01-10",
    roleColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
];

const ENTRY_CODE = "AX7K-2M9P-4RQT-8VWZ";

export default function ProfileSettings(_props: {
  userId?: string;
  t?: unknown;
}) {
  const [name, setName] = useState("Ahmet Yılmaz");
  const [phone, setPhone] = useState("0532 111 22 33");
  const [language, setLanguage] = useState("tr");
  const [showCode, setShowCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const [notifs, setNotifs] = useState({
    dues: true,
    maintenance: true,
    announcements: true,
    visitor: false,
    meeting: true,
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(ENTRY_CODE.replace(/-/g, "")).then(() => {
      setCodeCopied(true);
      toast.success("Giriş kodu kopyalandı!");
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  const saveInfo = () => {
    setEditInfo(false);
    toast.success("Bilgiler güncellendi");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil Ayarları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kişisel bilgiler, tercihler ve bina üyelikleri
        </p>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" /> Kullanıcı Bilgileri
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditInfo(!editInfo)}
              data-ocid="profile.edit_button"
            >
              {editInfo ? "İptal" : "Düzenle"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Ad Soyad</Label>
              <Input
                data-ocid="profile.name.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editInfo}
              />
            </div>
            <div className="space-y-1">
              <Label>Telefon</Label>
              <Input
                data-ocid="profile.phone.input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editInfo}
              />
            </div>
          </div>
          {editInfo && (
            <Button
              data-ocid="profile.save_button"
              className="gap-2"
              onClick={saveInfo}
            >
              <Check className="w-4 h-4" /> Kaydet
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" /> Dil Tercihi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs space-y-1">
            <Label>Arayüz Dili</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger data-ocid="profile.language.select">
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

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" /> Bildirim Tercihleri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              {
                key: "dues",
                label: "Aidat Hatırlatmaları",
                desc: "Ödeme tarihi yaklaşınca bildirim al",
              },
              {
                key: "maintenance",
                label: "Bakım Bildirimleri",
                desc: "Bakım ve arıza güncellemeleri",
              },
              {
                key: "announcements",
                label: "Duyurular",
                desc: "Yönetici duyuruları",
              },
              {
                key: "visitor",
                label: "Ziyaretçi Bildirimleri",
                desc: "Ziyaretçi girişlerinde bildir",
              },
              {
                key: "meeting",
                label: "Toplantı Davetleri",
                desc: "Etkinlik ve toplantı davetleri",
              },
            ] as const
          ).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                data-ocid={`profile.${key}.switch`}
                checked={notifs[key]}
                onCheckedChange={() => toggleNotif(key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Buildings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" /> Bağlı Binalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {BUILDINGS.map((b, i) => (
              <div
                key={b.id}
                data-ocid={`profile.item.${i + 1}`}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Üyelik: {b.joined}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${b.roleColor}`}
                >
                  {b.role}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Entry Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" /> Giriş Kodu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            16 haneli giriş kodunuz. Kimseyle paylaşmayın.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 font-mono text-lg tracking-widest bg-muted rounded-lg px-4 py-3 select-all">
              {showCode ? ENTRY_CODE : "●●●● ●●●● ●●●● ●●●●"}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowCode(!showCode)}
              data-ocid="profile.show_code.button"
            >
              {showCode ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={copyCode}
              data-ocid="profile.copy_code.button"
            >
              {codeCopied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" /> Güvenlik Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Son Giriş</p>
              <p className="font-semibold mt-1">20 Mar 2025, 09:14</p>
              <p className="text-xs text-muted-foreground">
                İstanbul, TR · Chrome / Windows
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Aktif Oturum</p>
              <p className="font-semibold mt-1">2 cihaz</p>
              <p className="text-xs text-muted-foreground">Web · Mobil</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
