import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  PartyPopper,
  Plus,
  Users,
} from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface SocialEventsProps {
  buildingId?: string;
  isOwner?: boolean;
  t?: any;
}

type EventCategory = "Spor" | "Sosyal" | "Kültür" | "Toplantı" | "Eğlence";
type EventStatus = "Planlandı" | "Devam Ediyor" | "Tamamlandı" | "İptal";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: EventCategory;
  capacity: number;
  attendees: string[];
  status: EventStatus;
}

const SAMPLE_EVENTS: Event[] = [
  {
    id: 1,
    title: "Yaz Barbeku Partisi",
    description:
      "Tüm sakinlerin katılımına açık yıllık yaz barbeku etkinliği. Müzik ve eğlence sizi bekliyor!",
    date: "2026-04-05",
    time: "17:00",
    location: "Bina Bahçesi",
    organizer: "Ahmet Yılmaz",
    category: "Eğlence",
    capacity: 80,
    attendees: [
      "Mehmet K.",
      "Ayşe T.",
      "Fatma D.",
      "Ali R.",
      "Zeynep S.",
      "Burak Ö.",
      "Hale M.",
      "Deniz A.",
    ],
    status: "Planlandı",
  },
  {
    id: 2,
    title: "Yoga & Meditasyon Sabahı",
    description:
      "Her hafta Cumartesi sabahı 7:30'da çatı terasında yoga seansı. Tüm seviyeler için uygun.",
    date: "2026-03-28",
    time: "07:30",
    location: "Çatı Terası",
    organizer: "Selin Aydın",
    category: "Spor",
    capacity: 20,
    attendees: ["Zeynep S.", "Hale M.", "Nur E.", "Berna T.", "Cansu K."],
    status: "Planlandı",
  },
  {
    id: 3,
    title: "Kitap Kulübü Toplantısı",
    description:
      "Bu ayki kitabımız 'Tutunamayanlar'. Birlikte okuyup tartışacağız.",
    date: "2026-03-30",
    time: "19:00",
    location: "Toplantı Salonu",
    organizer: "Figen Kaya",
    category: "Kültür",
    capacity: 15,
    attendees: ["Ahmet Y.", "Mehmet K.", "Figen K.", "Serdar B."],
    status: "Planlandı",
  },
  {
    id: 4,
    title: "Olağan Genel Kurul",
    description:
      "2026 yılı bütçe ve yönetim planlaması için olağan genel kurul toplantısı.",
    date: "2026-04-10",
    time: "20:00",
    location: "Toplantı Salonu",
    organizer: "Site Yönetimi",
    category: "Toplantı",
    capacity: 120,
    attendees: ["Tüm Sakinler"],
    status: "Planlandı",
  },
  {
    id: 5,
    title: "Çocuk Sinema Gecesi",
    description: "Çocuklar için animasyon film gösterimi. Popcorn ücretsiz!",
    date: "2026-03-27",
    time: "18:30",
    location: "Konferans Salonu",
    organizer: "Ayşe Demir",
    category: "Eğlence",
    capacity: 40,
    attendees: [
      "Kadir Ö.",
      "Merve B.",
      "Tolga S.",
      "İpek Y.",
      "Kemal A.",
      "Sude T.",
    ],
    status: "Devam Ediyor",
  },
  {
    id: 6,
    title: "Futbol Turnuvası",
    description:
      "Bina sakinleri arası 5'er kişilik takımlar halinde futbol turnuvası.",
    date: "2026-03-15",
    time: "10:00",
    location: "Spor Alanı",
    organizer: "Burak Öztürk",
    category: "Spor",
    capacity: 30,
    attendees: [
      "Ahmet Y.",
      "Mehmet K.",
      "Ali R.",
      "Burak Ö.",
      "Serdar B.",
      "Tolga S.",
      "Kemal A.",
      "Kadir Ö.",
    ],
    status: "Tamamlandı",
  },
  {
    id: 7,
    title: "Resim Atölyesi",
    description:
      "Yetişkinler için suluboya tekniğine giriş atölyesi. Malzemeler sağlanacaktır.",
    date: "2026-03-10",
    time: "14:00",
    location: "Hobi Odası",
    organizer: "Sibel Arslan",
    category: "Kültür",
    capacity: 12,
    attendees: ["Zeynep S.", "Hale M.", "Nur E.", "Figen K.", "Berna T."],
    status: "Tamamlandı",
  },
  {
    id: 8,
    title: "Komşu Tanışma Kahvaltısı",
    description:
      "Yeni taşınan komşularımızı tanımak için açık büfe kahvaltı organizasyonu.",
    date: "2026-02-20",
    time: "10:00",
    location: "Bina Bahçesi",
    organizer: "Site Yönetimi",
    category: "Sosyal",
    capacity: 50,
    attendees: [
      "Ahmet Y.",
      "Selin A.",
      "Figen K.",
      "Sibel A.",
      "Cansu K.",
      "İpek Y.",
      "Merve B.",
      "Deniz A.",
      "Serdar B.",
      "Berna T.",
    ],
    status: "Tamamlandı",
  },
  {
    id: 9,
    title: "Bahçe Sulama Nöbet Toplantısı",
    description: "Yaz sezonu bahçe sulama nöbet çizelgesinin belirlenmesi.",
    date: "2026-04-15",
    time: "19:30",
    location: "Toplantı Salonu",
    organizer: "Hüseyin Çelik",
    category: "Toplantı",
    capacity: 25,
    attendees: [],
    status: "Planlandı",
  },
  {
    id: 10,
    title: "Gece Koşusu",
    description: "Her Çarşamba akşamı bina çevresinde 5km'lik organize koşu.",
    date: "2026-04-02",
    time: "20:00",
    location: "Bina Çevresi",
    organizer: "Murat Şahin",
    category: "Spor",
    capacity: 30,
    attendees: ["Burak Ö.", "Serdar B.", "Kemal A.", "Murat Ş."],
    status: "Planlandı",
  },
];

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Spor: "bg-green-100 text-green-700 border-green-200",
  Sosyal: "bg-orange-100 text-orange-700 border-orange-200",
  Kültür: "bg-purple-100 text-purple-700 border-purple-200",
  Toplantı: "bg-blue-100 text-blue-700 border-blue-200",
  Eğlence: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const STATUS_COLORS: Record<EventStatus, string> = {
  Planlandı: "bg-sky-100 text-sky-700 border-sky-200",
  "Devam Ediyor": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Tamamlandı: "bg-gray-100 text-gray-600 border-gray-200",
  İptal: "bg-red-100 text-red-700 border-red-200",
};

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export default function SocialEvents({ isOwner }: SocialEventsProps) {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [filterCategory, setFilterCategory] = useState<string>("Tümü");
  const [filterStatus, setFilterStatus] = useState<string>("Tümü");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 27));
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(
    new Set([2, 3]),
  );

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Sosyal" as EventCategory,
    capacity: 30,
  });

  const filtered = events.filter((e) => {
    if (filterCategory !== "Tümü" && e.category !== filterCategory)
      return false;
    if (filterStatus !== "Tümü" && e.status !== filterStatus) return false;
    return true;
  });

  const now = new Date(2026, 2, 27);
  const upcoming = events.filter(
    (e) => new Date(e.date) >= now && e.status !== "İptal",
  );
  const thisMonth = events.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const totalParticipants = events.reduce(
    (sum, e) => sum + e.attendees.length,
    0,
  );

  function handleJoin(eventId: number) {
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  }

  function handleCreate() {
    if (!newEvent.title || !newEvent.date) return;
    const created: Event = {
      id: events.length + 1,
      ...newEvent,
      organizer: "Yönetici",
      attendees: [],
      status: "Planlandı",
    };
    setEvents((prev) => [...prev, created]);
    setCreateOpen(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Sosyal",
      capacity: 30,
    });
  }

  // Calendar helpers
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventsByDate: Record<string, Event[]> = {};
  for (const e of events) {
    if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
    eventsByDate[e.date].push(e);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100">
            <PartyPopper className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Sosyal Etkinlik & Organizasyon
            </h1>
            <p className="text-sm text-gray-500">
              Bina etkinliklerini görüntüle, katıl ve organize et
            </p>
          </div>
        </div>
        {isOwner && (
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                data-ocid="social_events.open_modal_button"
              >
                <Plus className="w-4 h-4" />
                Etkinlik Oluştur
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-lg"
              data-ocid="social_events.dialog"
            >
              <DialogHeader>
                <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>Etkinlik Adı</Label>
                  <Input
                    placeholder="Etkinlik adını girin"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent((p) => ({ ...p, title: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="social_events.input"
                  />
                </div>
                <div>
                  <Label>Açıklama</Label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                    rows={3}
                    placeholder="Etkinlik hakkında kısa açıklama"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    data-ocid="social_events.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Tarih</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent((p) => ({ ...p, date: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Saat</Label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent((p) => ({ ...p, time: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Konum</Label>
                  <Input
                    placeholder="Etkinlik yeri"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent((p) => ({ ...p, location: e.target.value }))
                    }
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Kategori</Label>
                    <Select
                      value={newEvent.category}
                      onValueChange={(v) =>
                        setNewEvent((p) => ({
                          ...p,
                          category: v as EventCategory,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="social_events.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          [
                            "Spor",
                            "Sosyal",
                            "Kültür",
                            "Toplantı",
                            "Eğlence",
                          ] as EventCategory[]
                        ).map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Kapasite</Label>
                    <Input
                      type="number"
                      value={newEvent.capacity}
                      onChange={(e) =>
                        setNewEvent((p) => ({
                          ...p,
                          capacity: Number(e.target.value),
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setCreateOpen(false)}
                    data-ocid="social_events.cancel_button"
                  >
                    İptal
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleCreate}
                    data-ocid="social_events.submit_button"
                  >
                    Oluştur
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Toplam Etkinlik",
            value: events.length,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          {
            label: "Bu Ay",
            value: thisMonth.length,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Toplam Katılım",
            value: totalParticipants,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Yaklaşan",
            value: upcoming.length,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((s) => (
          <Card key={s.label} className={`${s.bg} border-0 shadow-sm`}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list">
        <TabsList className="bg-white border" data-ocid="social_events.tab">
          <TabsTrigger value="list">Etkinlik Listesi</TabsTrigger>
          <TabsTrigger value="calendar">Takvim</TabsTrigger>
        </TabsList>

        {/* Event List Tab */}
        <TabsContent value="list" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger
                className="w-36 bg-white"
                data-ocid="social_events.select"
              >
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Tümü",
                  "Spor",
                  "Sosyal",
                  "Kültür",
                  "Toplantı",
                  "Eğlence",
                ].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger
                className="w-40 bg-white"
                data-ocid="social_events.select"
              >
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Tümü",
                  "Planlandı",
                  "Devam Ediyor",
                  "Tamamlandı",
                  "İptal",
                ].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Cards */}
          <div className="grid gap-4">
            {filtered.map((event, idx) => (
              <Card
                key={event.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-l-4 bg-white"
                style={{
                  borderLeftColor:
                    event.status === "İptal"
                      ? "#ef4444"
                      : event.status === "Tamamlandı"
                        ? "#9ca3af"
                        : event.status === "Devam Ediyor"
                          ? "#10b981"
                          : "#f97316",
                }}
                onClick={() => setSelectedEvent(event)}
                data-ocid={`social_events.item.${idx + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {event.title}
                        </h3>
                        <Badge
                          className={`text-xs border ${CATEGORY_COLORS[event.category]}`}
                          variant="outline"
                        >
                          {event.category}
                        </Badge>
                        <Badge
                          className={`text-xs border ${STATUS_COLORS[event.status]}`}
                          variant="outline"
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {event.description}
                      </p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {event.date} {event.time && `· ${event.time}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.attendees.length}/{event.capacity} katılımcı
                        </span>
                      </div>
                    </div>
                    {event.status === "Planlandı" && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoin(event.id);
                        }}
                        className={
                          joinedEvents.has(event.id)
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }
                        data-ocid={`social_events.toggle.${idx + 1}`}
                      >
                        {joinedEvents.has(event.id) ? "Ayrıl" : "Katıl"}
                      </Button>
                    )}
                  </div>
                  {/* Attendance bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-orange-400 transition-all"
                        style={{
                          width: `${Math.min(100, (event.attendees.length / event.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div
                className="text-center py-16 text-gray-400"
                data-ocid="social_events.empty_state"
              >
                <PartyPopper className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Filtreyle eşleşen etkinlik bulunamadı.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {MONTHS[month]} {year}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCalendarDate(new Date(year, month - 1, 1))
                    }
                    data-ocid="social_events.pagination_prev"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCalendarDate(new Date(year, month + 1, 1))
                    }
                    data-ocid="social_events.pagination_next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-medium text-gray-500 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: offset }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: offset cells have no stable id
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayEvents = eventsByDate[dateStr] || [];
                  const isToday = day === 27 && month === 2 && year === 2026;
                  return (
                    <div
                      key={day}
                      className={`min-h-[64px] rounded-lg p-1 border transition-colors ${
                        isToday
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${isToday ? "text-orange-600" : "text-gray-700"}`}
                      >
                        {day}
                      </p>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <button
                            type="button"
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`w-full text-left text-[10px] font-medium px-1 py-0.5 rounded truncate block ${
                              ev.category === "Spor"
                                ? "bg-green-100 text-green-700"
                                : ev.category === "Sosyal"
                                  ? "bg-orange-100 text-orange-700"
                                  : ev.category === "Kültür"
                                    ? "bg-purple-100 text-purple-700"
                                    : ev.category === "Toplantı"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {ev.title}
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-gray-400 px-1">
                            +{dayEvents.length - 2} daha
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Detail Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={(o) => !o && setSelectedEvent(null)}
      >
        <DialogContent className="max-w-lg" data-ocid="social_events.modal">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedEvent.title}
                  <Badge
                    className={`text-xs border ${CATEGORY_COLORS[selectedEvent.category]}`}
                    variant="outline"
                  >
                    {selectedEvent.category}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {selectedEvent.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays className="w-4 h-4 text-orange-500" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{selectedEvent.time || "Belirtilmedi"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>
                      {selectedEvent.attendees.length}/{selectedEvent.capacity}{" "}
                      katılımcı
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Katılımcılar
                  </p>
                  {selectedEvent.attendees.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.attendees.map((a) => (
                        <Badge
                          key={a}
                          variant="outline"
                          className="text-xs bg-gray-50"
                        >
                          {a}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Henüz katılımcı yok.
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Badge
                    className={`border ${STATUS_COLORS[selectedEvent.status]}`}
                    variant="outline"
                  >
                    {selectedEvent.status}
                  </Badge>
                  {selectedEvent.status === "Planlandı" && (
                    <Button
                      onClick={() => handleJoin(selectedEvent.id)}
                      className={
                        joinedEvents.has(selectedEvent.id)
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }
                      data-ocid="social_events.button"
                    >
                      {joinedEvents.has(selectedEvent.id)
                        ? "Etkinlikten Ayrıl"
                        : "Etkinliğe Katıl"}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
