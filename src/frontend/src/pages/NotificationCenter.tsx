import { Bell, BellOff, CheckCheck, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useTranslation } from "../hooks/useTranslation";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "urgent";
  senderId: string;
  targetAll: boolean;
  targetUserId?: string;
  readBy: string[];
  createdAt: string;
}

interface Props {
  userId: string;
  isOwnerOrManager: boolean;
}

export default function NotificationCenter({
  userId,
  isOwnerOrManager,
}: Props) {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Asansör Bakımı",
      message: "Yarın saat 10:00-14:00 arası asansör bakımda olacaktır.",
      type: "warning",
      senderId: "system",
      targetAll: true,
      readBy: [],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      title: "Hoş Geldiniz!",
      message:
        "SiteCore platformuna hoş geldiniz. Sorularınız için yöneticiye ulaşabilirsiniz.",
      type: "info",
      senderId: "system",
      targetAll: true,
      readBy: [],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifType, setNotifType] = useState<Notification["type"]>("info");

  const myNotifications = notifications.filter(
    (n) => n.targetAll || n.targetUserId === userId,
  );

  const unreadCount = myNotifications.filter(
    (n) => !n.readBy.includes(userId),
  ).length;

  const handleSend = () => {
    if (!notifTitle || !notifMessage) return;
    const newNotif: Notification = {
      id: Date.now().toString(),
      title: notifTitle,
      message: notifMessage,
      type: notifType,
      senderId: userId,
      targetAll: true,
      readBy: [],
      createdAt: new Date().toISOString(),
    };
    setNotifications([newNotif, ...notifications]);
    setNotifTitle("");
    setNotifMessage("");
    setNotifType("info");
    setShowModal(false);
  };

  const handleRead = (notifId: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notifId && !n.readBy.includes(userId)
          ? { ...n, readBy: [...n.readBy, userId] }
          : n,
      ),
    );
  };

  const handleReadAll = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        readBy: n.readBy.includes(userId) ? n.readBy : [...n.readBy, userId],
      })),
    );
  };

  const handleDelete = (notifId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notifId));
  };

  const typeColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "border-l-blue-400 bg-blue-50";
      case "warning":
        return "border-l-yellow-400 bg-yellow-50";
      case "urgent":
        return "border-l-red-400 bg-red-50";
    }
  };

  const typeLabel = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return t.notifTypeInfo || "Bilgi";
      case "warning":
        return t.notifTypeWarning || "Uyarı";
      case "urgent":
        return t.notifTypeUrgent || "Acil";
    }
  };

  const typeBadge = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "urgent":
        return "bg-red-100 text-red-700";
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000);
    if (diffH < 1) return t.justNow || "Az önce";
    if (diffH < 24) return `${diffH} ${t.hoursAgo || "saat önce"}`;
    return d.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#0B1B2E]">
              {t.notifications || "Bildirim Merkezi"}
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {unreadCount} {t.unread || "okunmamış bildirim"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              className="gap-2 text-sm"
              onClick={handleReadAll}
            >
              <CheckCheck className="w-4 h-4" />
              {t.markAllRead || "Tümünü Okundu İşaretle"}
            </Button>
          )}
          {isOwnerOrManager && (
            <Button
              onClick={() => setShowModal(true)}
              className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              {t.sendNotification || "Bildirim Gönder"}
            </Button>
          )}
        </div>
      </div>

      {/* Notification list */}
      {myNotifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center">
          <BellOff className="w-10 h-10 text-[#B0BAC6] mx-auto mb-3" />
          <p className="text-[#6B7A8D]">
            {t.noNotifications || "Henüz bildirim yok."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {myNotifications.map((notif) => {
            const isRead = notif.readBy.includes(userId);
            return (
              <button
                type="button"
                key={notif.id}
                tabIndex={0}
                className={`w-full text-left bg-white rounded-xl border-l-4 border border-[#E2E8F0] p-4 cursor-pointer transition-opacity ${typeColor(
                  notif.type,
                )} ${isRead ? "opacity-60" : ""}`}
                onClick={() => handleRead(notif.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                      <span className="font-semibold text-[#0B1B2E]">
                        {notif.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge(notif.type)}`}
                      >
                        {typeLabel(notif.type)}
                      </span>
                    </div>
                    <p className="text-sm text-[#3A4654]">{notif.message}</p>
                    <p className="text-xs text-[#6B7A8D] mt-1">
                      {formatTime(notif.createdAt)}
                    </p>
                  </div>
                  {isOwnerOrManager && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notif.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Send Notification Modal */}
      {isOwnerOrManager && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t.sendNotification || "Bildirim Gönder"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <label
                  htmlFor="notif-title"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.notifTitle || "Başlık"}
                </label>
                <Input
                  id="notif-title"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder={t.notifTitle || "Bildirim başlığı"}
                />
              </div>
              <div>
                <label
                  htmlFor="notif-msg"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.notifMessage || "Mesaj"}
                </label>
                <textarea
                  id="notif-msg"
                  className="w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder={
                    t.notifMessagePlaceholder || "Bildirimi yazın..."
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="notif-type"
                  className="text-sm font-medium text-[#3A4654] mb-1 block"
                >
                  {t.notifType || "Tür"}
                </label>
                <select
                  id="notif-type"
                  className="w-full border border-[#E2E8F0] rounded-lg p-2.5 text-sm text-[#0B1B2E] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                  value={notifType}
                  onChange={(e) =>
                    setNotifType(e.target.value as Notification["type"])
                  }
                >
                  <option value="info">{t.notifTypeInfo || "Bilgi"}</option>
                  <option value="warning">
                    {t.notifTypeWarning || "Uyarı"}
                  </option>
                  <option value="urgent">{t.notifTypeUrgent || "Acil"}</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  {t.cancel || "İptal"}
                </Button>
                <Button
                  className="bg-[#1A3A5C] hover:bg-[#0B1B2E] text-white"
                  onClick={handleSend}
                >
                  {t.send || "Gönder"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
