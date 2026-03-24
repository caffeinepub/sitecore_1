import { Phone, Plus, Search, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const CATEGORIES = [
  "İtfaiye",
  "Sağlık & Ambulans",
  "Güvenlik & Polis",
  "Bina Acil",
  "Genel Hizmetler",
];

const categoryMeta: Record<string, { emoji: string; color: string }> = {
  İtfaiye: {
    emoji: "🚒",
    color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  "Sağlık & Ambulans": {
    emoji: "🏥",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  },
  "Güvenlik & Polis": {
    emoji: "🚔",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  "Bina Acil": {
    emoji: "🏠",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  "Genel Hizmetler": {
    emoji: "📞",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
};

interface Contact {
  id: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  pinned: boolean;
  updated: string;
}

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "İtfaiye",
    phone: "110",
    category: "İtfaiye",
    desc: "Yangın, gaz sızıntısı ve acil kurtarma",
    pinned: true,
    updated: "2025-01-01",
  },
  {
    id: "2",
    name: "Ambulans",
    phone: "112",
    category: "Sağlık & Ambulans",
    desc: "Acil tıbbi yardım ve ambulans",
    pinned: true,
    updated: "2025-01-01",
  },
  {
    id: "3",
    name: "Polis İmdat",
    phone: "155",
    category: "Güvenlik & Polis",
    desc: "Güvenlik olayları ve acil polis yardımı",
    pinned: true,
    updated: "2025-01-01",
  },
  {
    id: "4",
    name: "Jandarma",
    phone: "156",
    category: "Güvenlik & Polis",
    desc: "Kırsal alan güvenlik acil hattı",
    pinned: false,
    updated: "2025-01-01",
  },
  {
    id: "5",
    name: "Site Güvenlik",
    phone: "0532 000 11 22",
    category: "Bina Acil",
    desc: "7/24 bina güvenlik birimi",
    pinned: true,
    updated: "2025-03-01",
  },
  {
    id: "6",
    name: "Yönetici - Ahmet Bey",
    phone: "0533 111 22 33",
    category: "Bina Acil",
    desc: "Site yöneticisi, acil durum iletişimi",
    pinned: false,
    updated: "2025-02-15",
  },
  {
    id: "7",
    name: "Tesisat Acil",
    phone: "0541 222 33 44",
    category: "Bina Acil",
    desc: "Su, ısıtma ve boru arızaları",
    pinned: false,
    updated: "2025-02-01",
  },
  {
    id: "8",
    name: "Elektrik Arıza",
    phone: "186",
    category: "Genel Hizmetler",
    desc: "BEDAŞ elektrik arıza hattı",
    pinned: false,
    updated: "2025-01-01",
  },
  {
    id: "9",
    name: "Doğalgaz Arıza",
    phone: "187",
    category: "Genel Hizmetler",
    desc: "İGDAŞ doğalgaz acil hattı",
    pinned: false,
    updated: "2025-01-01",
  },
  {
    id: "10",
    name: "Su Arıza",
    phone: "185",
    category: "Genel Hizmetler",
    desc: "İSKİ su arıza hattı",
    pinned: false,
    updated: "2025-01-01",
  },
  {
    id: "11",
    name: "Zehir Danışma",
    phone: "114",
    category: "Sağlık & Ambulans",
    desc: "Zehirlenme ve ilaç aşımı acil hattı",
    pinned: false,
    updated: "2025-01-01",
  },
];

export default function EmergencyContacts(_props: {
  buildingId?: string;
  userId?: string;
  isOwner?: boolean;
  t?: unknown;
}) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: "",
    desc: "",
  });

  const togglePin = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)),
    );
  };

  const addContact = () => {
    if (!form.name || !form.phone || !form.category) return;
    setContacts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...form,
        pinned: false,
        updated: new Date().toISOString().split("T")[0],
      },
    ]);
    setForm({ name: "", phone: "", category: "", desc: "" });
    setOpen(false);
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.desc.toLowerCase().includes(search.toLowerCase()),
  );

  const pinned = filtered.filter((c) => c.pinned);
  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((c) => !c.pinned && c.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Acil İletişim Rehberi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bina ve acil servis iletişim bilgileri
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="emergency.open_modal_button" className="gap-2">
              <Plus className="w-4 h-4" /> Kişi Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni İletişim Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>İsim / Kurum</Label>
                <Input
                  data-ocid="emergency.name.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Örn: Site Güvenlik"
                />
              </div>
              <div className="space-y-1">
                <Label>Telefon</Label>
                <Input
                  data-ocid="emergency.phone.input"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="0532 000 00 00"
                />
              </div>
              <div className="space-y-1">
                <Label>Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="emergency.category.select">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Açıklama</Label>
                <Textarea
                  data-ocid="emergency.desc.textarea"
                  value={form.desc}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, desc: e.target.value }))
                  }
                  placeholder="Kısa açıklama..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                İptal
              </Button>
              <Button data-ocid="emergency.submit_button" onClick={addContact}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="emergency.search_input"
          className="pl-9"
          placeholder="İsim, telefon veya açıklama ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Star className="w-5 h-5 fill-yellow-400" /> Önemli Kişiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pinned.map((c, i) => (
                <ContactCard
                  key={c.id}
                  contact={c}
                  idx={i + 1}
                  onPin={togglePin}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* By Category */}
      {byCategory.map(({ cat, items }) => {
        const meta = categoryMeta[cat];
        return (
          <Card key={cat}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{meta.emoji}</span> {cat}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((c, i) => (
                  <ContactCard
                    key={c.id}
                    contact={c}
                    idx={i + 1}
                    onPin={togglePin}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ContactCard({
  contact,
  idx,
  onPin,
}: {
  contact: Contact;
  idx: number;
  onPin: (id: string) => void;
}) {
  const meta = categoryMeta[contact.category];
  return (
    <div
      data-ocid={`emergency.item.${idx}`}
      className="rounded-lg border p-4 space-y-2"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{contact.name}</p>
          <a
            href={`tel:${contact.phone}`}
            className="text-blue-600 font-mono text-sm hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            {contact.phone}
          </a>
        </div>
        <button
          type="button"
          onClick={() => onPin(contact.id)}
          data-ocid={`emergency.toggle.${idx}`}
          className={
            contact.pinned
              ? "text-yellow-500"
              : "text-muted-foreground hover:text-yellow-400"
          }
        >
          <Star
            className={`w-4 h-4 ${contact.pinned ? "fill-yellow-400" : ""}`}
          />
        </button>
      </div>
      {contact.desc && (
        <p className="text-xs text-muted-foreground">{contact.desc}</p>
      )}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`}
        >
          {contact.category}
        </span>
        <span className="text-xs text-muted-foreground">
          Güncelleme: {contact.updated}
        </span>
      </div>
    </div>
  );
}
