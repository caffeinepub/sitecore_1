import { Calendar, Clock, MapPin, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useTranslation } from "../hooks/useTranslation";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  attendees: string[];
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
      attendees: [userId],
      status: "upcoming",
      createdBy: userId,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");

  const handleCreate = () => {
    if (!title || !date || !time) return;
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      date,
      time,
      location,
      agenda,
      attendees: [userId],
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

  const handleDelete = (meetingId: string) => {
    setMeetings(meetings.filter((m) => m.id !== meetingId));
  };

  const handleComplete = (meetingId: string) => {
    setMeetings(
      meetings.map((m) =>
        m.id === meetingId ? { ...m, status: "completed" } : m,
      ),
    );
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

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Upcoming meetings */}
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
                <div
                  key={meeting.id}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-5"
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
                          {meeting.attendees.length}{" "}
                          {t.attendees || "katılımcı"}
                        </span>
                      </div>
                      {meeting.agenda && (
                        <p className="text-sm text-[#3A4654] mt-2 bg-[#F3F6FB] rounded p-2">
                          <span className="font-medium">
                            {t.meetingAgenda || "Gündem"}:
                          </span>{" "}
                          {meeting.agenda}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant={
                          meeting.attendees.includes(userId)
                            ? "outline"
                            : "default"
                        }
                        className={
                          meeting.attendees.includes(userId)
                            ? "border-green-500 text-green-700 hover:bg-green-50"
                            : "bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                        }
                        onClick={() => handleAttend(meeting.id)}
                      >
                        {meeting.attendees.includes(userId)
                          ? t.meetingAttending || "Katılıyorum ✓"
                          : t.meetingAttend || "Katılacağım"}
                      </Button>
                      {isOwnerOrManager && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => handleComplete(meeting.id)}
                          >
                            {t.meetingMarkDone || "Tamamlandı"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(meeting.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#3A4654] uppercase tracking-wide">
                {t.pastMeetings || "Geçmiş Toplantılar"}
              </h3>
              {past.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 opacity-70"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#3A4654]">
                          {meeting.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(meeting.status)}`}
                        >
                          {statusLabel(meeting.status)}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7A8D] mt-1">
                        <span>
                          {meeting.date} {meeting.time}
                        </span>
                        <span>
                          {meeting.attendees.length}{" "}
                          {t.attendees || "katılımcı"}
                        </span>
                      </div>
                    </div>
                    {isOwnerOrManager && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(meeting.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Meeting Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
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
                  t.meetingLocationPlaceholder || "Örn: Lobi, Toplantı Salonu"
                }
              />
            </div>
            <div>
              <label
                htmlFor="meeting-5"
                className="text-sm font-medium text-[#3A4654] mb-1 block"
              >
                {t.meetingAgenda || "Gündem"}
              </label>
              <textarea
                id="meeting-5"
                className="w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder={
                  t.meetingAgendaPlaceholder || "Toplantı gündemini yazın..."
                }
              />
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
    </div>
  );
}
