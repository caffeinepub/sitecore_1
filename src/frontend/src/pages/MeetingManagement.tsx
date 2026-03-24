import {
  Calendar,
  CalendarDays,
  Check,
  Clock,
  FileText,
  MapPin,
  Plus,
  Printer,
  Trash2,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { useTranslation } from "../hooks/useTranslation";

interface AgendaItem {
  id: string;
  text: string;
}

interface AttendeeRecord {
  name: string;
  attended: boolean;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  agendaItems: AgendaItem[];
  meetingNotes: string;
  decisions: string;
  attendees: string[];
  attendeeList: AttendeeRecord[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdBy: string;
  createdAt: string;
}

interface Props {
  userId: string;
  isOwnerOrManager: boolean;
}

export default function MeetingManagement({ userId, isOwnerOrManager }: Props) {
  const { t } = useTranslation();
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Ocak Ayı Olağan Toplantısı",
      date: "2026-02-15",
      time: "19:00",
      location: "Lobi / Toplantı Salonu",
      agenda: "Aidat artışı ve ortak alan bakımı görüşülecek.",
      agendaItems: [
        { id: "a1", text: "2026 yılı aidat artış oranlarının belirlenmesi" },
        { id: "a2", text: "Bahçe renovasyonu teklifi değerlendirilmesi" },
        { id: "a3", text: "Asansör bakım sözleşmesi uzatma" },
      ],
      meetingNotes: "",
      decisions: "",
      attendees: [userId],
      attendeeList: [
        { name: "Ahmet Yılmaz (D:101)", attended: false },
        { name: "Fatma Kaya (D:202)", attended: false },
        { name: "Mehmet Demir (D:301)", attended: false },
      ],
      status: "upcoming",
      createdBy: userId,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [detailMeeting, setDetailMeeting] = useState<Meeting | null>(null);
  const [printMeeting, setPrintMeeting] = useState<Meeting | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [agendaItems, setAgendaItems] = useState<string[]>([""]);
  const [editNotes, setEditNotes] = useState("");
  const [editDecisions, setEditDecisions] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const handleCreate = () => {
    if (!title || !date || !time) return;
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location,
      agenda,
      agendaItems: agendaItems
        .filter((a) => a.trim())
        .map((text) => ({ id: crypto.randomUUID(), text })),
      meetingNotes: "",
      decisions: "",
      attendees: [userId],
      attendeeList: [],
      status: "upcoming",
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };
    setMeetings([newMeeting, ...meetings]);
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setAgenda("");
    setAgendaItems([""]);
    setShowModal(false);
  };

  const handleAttend = (meetingId: string) => {
    setMeetings(
      meetings.map((m) => {
        if (m.id !== meetingId) return m;
        const already = m.attendees.includes(userId);
        return {
          ...m,
          attendees: already
            ? m.attendees.filter((a) => a !== userId)
            : [...m.attendees, userId],
        };
      }),
    );
  };

  const handleDelete = (meetingId: string) =>
    setMeetings(meetings.filter((m) => m.id !== meetingId));

  const handleComplete = (meetingId: string) =>
    setMeetings(
      meetings.map((m) =>
        m.id === meetingId ? { ...m, status: "completed" } : m,
      ),
    );

  const handleSaveNotes = () => {
    if (!detailMeeting) return;
    setMeetings(
      meetings.map((m) =>
        m.id === detailMeeting.id
          ? { ...m, meetingNotes: editNotes, decisions: editDecisions }
          : m,
      ),
    );
    setDetailMeeting(null);
  };

  const toggleAttendee = (meetingId: string, name: string) => {
    setMeetings(
      meetings.map((m) =>
        m.id === meetingId
          ? {
              ...m,
              attendeeList: m.attendeeList.map((a) =>
                a.name === name ? { ...a, attended: !a.attended } : a,
              ),
            }
          : m,
      ),
    );
  };

  const openDetail = (meeting: Meeting) => {
    setDetailMeeting(meeting);
    setEditNotes(meeting.meetingNotes);
    setEditDecisions(meeting.decisions);
  };

  const statusColor = (status: Meeting["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "ongoing":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  const statusLabel = (status: Meeting["status"]) => {
    switch (status) {
      case "upcoming":
        return t.meetingUpcoming || "Yaklaşan";
      case "ongoing":
        return t.meetingOngoing || "Devam Ediyor";
      case "completed":
        return t.meetingCompleted || "Tamamlandı";
      case "cancelled":
        return t.meetingCancelled || "İptal";
    }
  };

  const upcoming = meetings.filter(
    (m) => m.status === "upcoming" || m.status === "ongoing",
  );
  const past = meetings.filter(
    (m) => m.status === "completed" || m.status === "cancelled",
  );

  // Calendar
  const calendarMeetings = useMemo(() => {
    return meetings.filter((m) => m.date.startsWith(calendarMonth));
  }, [meetings, calendarMonth]);

  const calendarDays = useMemo(() => {
    const [yr, mo] = calendarMonth.split("-").map(Number);
    const daysInMonth = new Date(yr, mo, 0).getDate();
    const firstDay = new Date(yr, mo - 1, 1).getDay();
    return { daysInMonth, firstDay };
  }, [calendarMonth]);

  const meetingsByDay = useMemo(() => {
    const map: Record<number, Meeting[]> = {};
    for (const m of calendarMeetings) {
      const day = Number(m.date.split("-")[2]);
      if (!map[day]) map[day] = [];
      map[day].push(m);
    }
    return map;
  }, [calendarMeetings]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#0B1B2E]">
            {t.meetings || "Toplantı Yönetimi"}
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {upcoming.length} {t.meetingUpcoming || "yaklaşan toplantı"}
          </p>
        </div>
        {isOwnerOrManager && (
          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            {t.createMeeting || "Toplantı Oluştur"}
          </Button>
        )}
      </div>

      <Tabs defaultValue="list">
        <TabsList className="bg-[#F3F6FB]">
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDays className="w-3.5 h-3.5 mr-1" /> Takvim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          {upcoming.length === 0 && past.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center">
              <Calendar className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">
                {t.noMeetings || "Henüz toplantı planlanmadı."}
              </p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#3A4654] uppercase tracking-wide">
                    {t.upcomingMeetings || "Yaklaşan Toplantılar"}
                  </h3>
                  {upcoming.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      userId={userId}
                      isOwnerOrManager={isOwnerOrManager}
                      statusColor={statusColor}
                      statusLabel={statusLabel}
                      onAttend={handleAttend}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                      onOpenDetail={openDetail}
                      onPrint={setPrintMeeting}
                      t={t}
                    />
                  ))}
                </div>
              )}
              {past.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-sm font-semibold text-[#3A4654] uppercase tracking-wide">
                    {t.pastMeetings || "Geçmiş Toplantılar"}
                  </h3>
                  {past.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      userId={userId}
                      isOwnerOrManager={isOwnerOrManager}
                      statusColor={statusColor}
                      statusLabel={statusLabel}
                      onAttend={handleAttend}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                      onOpenDetail={openDetail}
                      onPrint={setPrintMeeting}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#0B1B2E]">
                {new Date(`${calendarMonth}-01`).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                })}
              </h3>
              <Input
                type="month"
                value={calendarMonth}
                onChange={(e) => setCalendarMonth(e.target.value)}
                className="w-44 text-sm"
              />
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs font-medium text-[#6B7A8D] mb-2">
              {["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"].map((d) => (
                <div key={d} className="text-center py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: calendarDays.firstDay }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: calendar empty cells
                <div key={`empty-${i}`} />
              ))}
              {Array.from(
                { length: calendarDays.daysInMonth },
                (_, i) => i + 1,
              ).map((day) => {
                const dayMeetings = meetingsByDay[day] || [];
                return (
                  <div
                    key={day}
                    className={`min-h-[56px] rounded-lg p-1 text-xs ${
                      dayMeetings.length > 0
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-[#F8FAFC] border border-transparent"
                    }`}
                  >
                    <span
                      className={`font-medium ${dayMeetings.length > 0 ? "text-blue-700" : "text-[#3A4654]"}`}
                    >
                      {day}
                    </span>
                    {dayMeetings.map((m) => (
                      <div
                        key={m.id}
                        className="mt-1 bg-blue-600 text-white rounded px-1 py-0.5 truncate"
                      >
                        {m.time} {m.title.slice(0, 12)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            {calendarMeetings.length === 0 && (
              <p className="text-center text-sm text-[#6B7A8D] mt-4">
                Bu ay toplantı bulunmuyor.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Meeting Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t.createMeeting || "Toplantı Oluştur"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label
                htmlFor="meeting-1"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.meetingTitle || "Toplantı Başlığı"}
              </label>
              <Input
                id="meeting-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.meetingTitle || "Toplantı Başlığı"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="meeting-2"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.meetingDate || "Tarih"}
                </label>
                <Input
                  id="meeting-2"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="meeting-3"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.meetingTime || "Saat"}
                </label>
                <Input
                  id="meeting-3"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="meeting-4"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.meetingLocation || "Yer"}
              </label>
              <Input
                id="meeting-4"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={
                  t.meetingLocationPlaceholder || "Lobi, Toplantı Salonu"
                }
              />
            </div>
            <div>
              <label
                htmlFor="meeting-5"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.meetingAgenda || "Gündem (genel)"}
              </label>
              <textarea
                id="meeting-5"
                className="w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="Toplantı gündemini yazın..."
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] mb-1">
                Gündem Maddeleri
              </p>
              <div className="space-y-2">
                {agendaItems.map((item, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional
                  <div key={`agenda-${idx}`} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        setAgendaItems((prev) =>
                          prev.map((a, i) => (i === idx ? e.target.value : a)),
                        )
                      }
                      placeholder={`Madde ${idx + 1}`}
                    />
                    {idx > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-2 text-red-400"
                        onClick={() =>
                          setAgendaItems((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                      >
                        -
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-full"
                  onClick={() => setAgendaItems((prev) => [...prev, ""])}
                >
                  + Madde Ekle
                </Button>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {t.cancel || "İptal"}
              </Button>
              <Button
                className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                onClick={handleCreate}
              >
                {t.save || "Kaydet"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail/Notes Dialog */}
      <Dialog
        open={!!detailMeeting}
        onOpenChange={() => setDetailMeeting(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {detailMeeting?.title} — Notlar & Kararlar
            </DialogTitle>
          </DialogHeader>
          {detailMeeting && (
            <div className="space-y-4 mt-2">
              {detailMeeting.agendaItems.length > 0 && (
                <div className="bg-[#F3F6FB] rounded-lg p-3">
                  <p className="text-xs font-semibold text-[#3A4654] mb-2">
                    Gündem Maddeleri
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {detailMeeting.agendaItems.map((item) => (
                      <li key={item.id} className="text-sm text-[#3A4654]">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {detailMeeting.attendeeList.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#3A4654] mb-2">
                    Katılımcı Yoklaması
                  </p>
                  <div className="space-y-1">
                    {detailMeeting.attendeeList.map((a) => (
                      <label
                        key={a.name}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={a.attended}
                          onChange={() =>
                            toggleAttendee(detailMeeting.id, a.name)
                          }
                        />
                        <span
                          className={
                            a.attended
                              ? "text-green-700 font-medium"
                              : "text-[#3A4654]"
                          }
                        >
                          {a.name}
                        </span>
                        {a.attended && (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Toplantı Notları
                </p>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder="Toplantı sırasında alınan notlar..."
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3A4654] mb-1">
                  Alınan Kararlar
                </p>
                <Textarea
                  value={editDecisions}
                  onChange={(e) => setEditDecisions(e.target.value)}
                  rows={3}
                  placeholder="Alınan kararları yazın..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDetailMeeting(null)}
                >
                  {t.cancel || "İptal"}
                </Button>
                <Button
                  className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                  onClick={handleSaveNotes}
                >
                  Kaydet
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Print/Minutes Dialog */}
      <Dialog open={!!printMeeting} onOpenChange={() => setPrintMeeting(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              <FileText className="w-4 h-4 inline mr-2" />
              Toplantı Tutanağı
            </DialogTitle>
          </DialogHeader>
          {printMeeting && (
            <div className="space-y-4">
              <div className="border border-[#E2E8F0] rounded-xl p-4 space-y-3">
                <div className="border-b border-[#E2E8F0] pb-3">
                  <h3 className="text-lg font-bold text-[#0B1B2E]">
                    {printMeeting.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[#6B7A8D] mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {printMeeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {printMeeting.time}
                    </span>
                    {printMeeting.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {printMeeting.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {printMeeting.attendees.length} katılımcı
                    </span>
                  </div>
                </div>
                {printMeeting.agendaItems.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-[#3A4654] uppercase mb-1">
                      GÜNDEM
                    </p>
                    <ol className="list-decimal list-inside space-y-0.5">
                      {printMeeting.agendaItems.map((item) => (
                        <li key={item.id} className="text-sm text-[#3A4654]">
                          {item.text}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {printMeeting.attendeeList.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-[#3A4654] uppercase mb-1">
                      YOKLAMA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {printMeeting.attendeeList.map((a) => (
                        <Badge
                          key={a.name}
                          className={
                            a.attended
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {a.attended ? "✓" : "✕"} {a.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {printMeeting.meetingNotes && (
                  <div>
                    <p className="text-xs font-bold text-[#3A4654] uppercase mb-1">
                      TOPLANTI NOTLARI
                    </p>
                    <p className="text-sm text-[#3A4654] bg-amber-50 rounded p-2">
                      {printMeeting.meetingNotes}
                    </p>
                  </div>
                )}
                {printMeeting.decisions && (
                  <div>
                    <p className="text-xs font-bold text-[#3A4654] uppercase mb-1">
                      ALINAN KARARLAR
                    </p>
                    <p className="text-sm text-[#3A4654] bg-green-50 rounded p-2">
                      {printMeeting.decisions}
                    </p>
                  </div>
                )}
              </div>
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" /> Yazdır
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MeetingCard({
  meeting,
  userId,
  isOwnerOrManager,
  statusColor,
  statusLabel,
  onAttend,
  onComplete,
  onDelete,
  onOpenDetail,
  onPrint,
  t,
}: {
  meeting: Meeting;
  userId: string;
  isOwnerOrManager: boolean;
  statusColor: (s: Meeting["status"]) => string;
  statusLabel: (s: Meeting["status"]) => string;
  onAttend: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenDetail: (m: Meeting) => void;
  onPrint: (m: Meeting) => void;
  t: any;
}) {
  const isPast =
    meeting.status === "completed" || meeting.status === "cancelled";
  const attendedCount = meeting.attendeeList.filter((a) => a.attended).length;
  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 ${isPast ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-[#0B1B2E]">
              {meeting.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(meeting.status)}`}
            >
              {statusLabel(meeting.status)}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#6B7A8D] mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {meeting.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {meeting.time}
            </span>
            {meeting.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {meeting.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {meeting.attendees.length} {t.attendees || "katılımcı"}
            </span>
            {meeting.attendeeList.length > 0 && (
              <span className="flex items-center gap-1 text-green-600">
                <Check className="w-3.5 h-3.5" />
                {attendedCount}/{meeting.attendeeList.length} yoklama
              </span>
            )}
          </div>
          {meeting.agendaItems.length > 0 && (
            <div className="mt-2 bg-[#F3F6FB] rounded p-2">
              <p className="text-xs font-semibold text-[#3A4654] mb-1">
                Gündem Maddeleri:
              </p>
              <ul className="list-disc list-inside space-y-0.5">
                {meeting.agendaItems.map((item) => (
                  <li key={item.id} className="text-xs text-[#3A4654]">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(meeting.meetingNotes || meeting.decisions) && (
            <div className="mt-2 space-y-1">
              {meeting.meetingNotes && (
                <div className="bg-amber-50 rounded p-2">
                  <p className="text-xs font-semibold text-amber-700 mb-0.5">
                    Toplantı Notları:
                  </p>
                  <p className="text-xs text-amber-800">
                    {meeting.meetingNotes}
                  </p>
                </div>
              )}
              {meeting.decisions && (
                <div className="bg-green-50 rounded p-2">
                  <p className="text-xs font-semibold text-green-700 mb-0.5">
                    Alınan Kararlar:
                  </p>
                  <p className="text-xs text-green-800">{meeting.decisions}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {!isPast && (
            <Button
              size="sm"
              variant={
                meeting.attendees.includes(userId) ? "outline" : "default"
              }
              className={
                meeting.attendees.includes(userId)
                  ? "border-green-500 text-green-700 hover:bg-green-50"
                  : "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
              }
              onClick={() => onAttend(meeting.id)}
            >
              {meeting.attendees.includes(userId)
                ? t.meetingAttending || "Katılıyorum ✓"
                : t.meetingAttend || "Katılacağım"}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1"
            onClick={() => onPrint(meeting)}
          >
            <FileText className="w-3 h-3" /> Tutanak
          </Button>
          {isOwnerOrManager && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => onOpenDetail(meeting)}
              >
                Notlar / Kararlar
              </Button>
              {!isPast && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => onComplete(meeting.id)}
                >
                  {t.meetingMarkDone || "Tamamlandı"}
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => onDelete(meeting.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
