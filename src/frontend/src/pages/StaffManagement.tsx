import { CheckSquare, Edit2, Plus, Star, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
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

interface Staff {
  id: string;
  name: string;
  role: "cleaning" | "security" | "gardener" | "technician" | "other";
  phone: string;
  startDate: string;
  schedule: Record<string, string>;
  performanceRating?: number;
}

interface Task {
  id: string;
  title: string;
  assigneeId: string;
  done: boolean;
  createdAt: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_staff_${id}`;
const TASK_KEY = (id: string) => `sitecore_tasks_${id}`;
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const SHIFT_OPTIONS = ["-", "Sabah", "Öğle", "Gece", "İzin"];

export default function StaffManagement({ buildingId, isOwner, t }: Props) {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showStaffDialog, setShowStaffDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Staff | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "cleaning" as Staff["role"],
    phone: "",
    startDate: "",
    schedule: {} as Record<string, string>,
    performanceRating: 0,
  });
  const [taskForm, setTaskForm] = useState({ title: "", assigneeId: "" });

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    const taskRaw = localStorage.getItem(TASK_KEY(buildingId));
    if (raw) setStaff(JSON.parse(raw));
    else {
      const seed: Staff[] = [
        {
          id: "s1",
          name: "Fatma Hanım",
          role: "cleaning",
          phone: "0533 456 78 90",
          startDate: "2024-01-15",
          schedule: { Pzt: "Sabah", Çar: "Sabah", Cum: "Sabah" },
          performanceRating: 4,
        },
        {
          id: "s2",
          name: "Kemal Bey",
          role: "security",
          phone: "0542 789 01 23",
          startDate: "2023-06-01",
          schedule: {
            Pzt: "Gece",
            Sal: "Gece",
            Çar: "Gece",
            Per: "Gece",
            Cum: "Gece",
          },
          performanceRating: 5,
        },
        {
          id: "s3",
          name: "Ali Usta",
          role: "technician",
          phone: "0555 111 22 33",
          startDate: "2025-03-10",
          schedule: { Sal: "Öğle", Per: "Öğle" },
          performanceRating: 3,
        },
      ];
      setStaff(seed);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
    if (taskRaw) setTasks(JSON.parse(taskRaw));
    else {
      const seedTasks: Task[] = [
        {
          id: "t1",
          title: "Merdivenler temizlenecek",
          assigneeId: "s1",
          done: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "t2",
          title: "Asansör bakımı yapılacak",
          assigneeId: "s3",
          done: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "t3",
          title: "Giriş kapısı kilidi kontrol edilecek",
          assigneeId: "s2",
          done: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setTasks(seedTasks);
      localStorage.setItem(TASK_KEY(buildingId), JSON.stringify(seedTasks));
    }
  }, [buildingId]);

  const saveStaff = (updated: Staff[]) => {
    setStaff(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };

  const saveTasks = (updated: Task[]) => {
    setTasks(updated);
    localStorage.setItem(TASK_KEY(buildingId), JSON.stringify(updated));
  };

  const handleStaffSubmit = () => {
    if (!form.name.trim()) return;
    if (editTarget) {
      saveStaff(
        staff.map((s) => (s.id === editTarget.id ? { ...s, ...form } : s)),
      );
    } else {
      saveStaff([...staff, { id: Date.now().toString(), ...form }]);
    }
    setShowStaffDialog(false);
  };

  const handleTaskSubmit = () => {
    if (!taskForm.title.trim()) return;
    saveTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: taskForm.title,
        assigneeId: taskForm.assigneeId,
        done: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setShowTaskDialog(false);
    setTaskForm({ title: "", assigneeId: "" });
  };

  const toggleTask = (id: string) =>
    saveTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );

  const setRating = (staffId: string, rating: number) => {
    saveStaff(
      staff.map((s) =>
        s.id === staffId ? { ...s, performanceRating: rating } : s,
      ),
    );
  };

  const roleLabel = (role: string) => {
    const map: Record<string, string> = {
      cleaning: t.cleaningRole || "Temizlik",
      security: t.securityRole || "Güvenlik",
      gardener: t.gardenerRole || "Bahçıvan",
      technician: t.technicianRole || "Teknisyen",
      other: t.other || "Diğer",
    };
    return map[role] || role;
  };

  const roleColor: Record<string, string> = {
    cleaning: "bg-blue-100 text-blue-700",
    security: "bg-indigo-100 text-indigo-700",
    gardener: "bg-green-100 text-green-700",
    technician: "bg-orange-100 text-orange-700",
    other: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.staffManagement || "Personel Yönetimi"}
        </h2>
      </div>

      <Tabs defaultValue="staff">
        <TabsList className="bg-[#F3F6FB] rounded-xl">
          <TabsTrigger value="staff" data-ocid="staffmgmt.tab">
            {t.staffMgmt || "Personel"}
          </TabsTrigger>
          <TabsTrigger value="tasks" data-ocid="staffmgmt.tab">
            {t.addTask || "Görevler"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4 mt-4">
          {isOwner && (
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setEditTarget(null);
                  setForm({
                    name: "",
                    role: "cleaning",
                    phone: "",
                    startDate: "",
                    schedule: {},
                    performanceRating: 0,
                  });
                  setShowStaffDialog(true);
                }}
                className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="staffmgmt.primary_button"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.addStaff || "Personel Ekle"}
              </Button>
            </div>
          )}
          {staff.length === 0 ? (
            <div
              className="bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center"
              data-ocid="staffmgmt.empty_state"
            >
              <Users className="h-10 w-10 text-[#D7DEE9] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">
                {t.noStaff || "Kayıtlı personel yok."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((s, i) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-[#E8EDF5] p-4"
                  data-ocid={`staffmgmt.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#0E1116]">
                          {s.name}
                        </h3>
                        <Badge
                          className={
                            roleColor[s.role] || "bg-gray-100 text-gray-600"
                          }
                        >
                          {roleLabel(s.role)}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B7A8D]">{s.phone}</p>
                      <p className="text-xs text-[#9CA8B4] mt-1">
                        {t.staffStart || "Başlangıç"}: {s.startDate}
                      </p>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(s.id, star)}
                            className="focus:outline-none"
                            title={`${star} yıldız`}
                          >
                            <Star
                              className={`w-4 h-4 ${star <= (s.performanceRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} hover:text-yellow-300 transition-colors`}
                            />
                          </button>
                        ))}
                        <span className="text-xs text-[#6B7A8D] ml-1">
                          {s.performanceRating
                            ? `${s.performanceRating}/5`
                            : "Puan yok"}
                        </span>
                      </div>

                      {/* Weekly Schedule Table */}
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr>
                              {DAYS.map((day) => (
                                <th
                                  key={day}
                                  className="px-1 py-1 text-center text-[#6B7A8D] font-medium w-9"
                                >
                                  {day}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {DAYS.map((day) => {
                                const shift = s.schedule[day] || "-";
                                const shiftColor =
                                  shift === "Sabah"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : shift === "Öğle"
                                      ? "bg-blue-100 text-blue-700"
                                      : shift === "Gece"
                                        ? "bg-indigo-100 text-indigo-700"
                                        : shift === "İzin"
                                          ? "bg-red-100 text-red-600"
                                          : "bg-gray-50 text-gray-400";
                                return (
                                  <td
                                    key={day}
                                    className="px-0.5 py-1 text-center"
                                  >
                                    {isOwner ? (
                                      <select
                                        value={shift}
                                        onChange={(e) => {
                                          const newSchedule = { ...s.schedule };
                                          if (e.target.value === "-")
                                            delete newSchedule[day];
                                          else
                                            newSchedule[day] = e.target.value;
                                          saveStaff(
                                            staff.map((x) =>
                                              x.id === s.id
                                                ? {
                                                    ...x,
                                                    schedule: newSchedule,
                                                  }
                                                : x,
                                            ),
                                          );
                                        }}
                                        className={`w-full text-xs rounded px-0.5 py-0.5 border-0 cursor-pointer ${shiftColor}`}
                                      >
                                        {SHIFT_OPTIONS.map((opt) => (
                                          <option key={opt} value={opt}>
                                            {opt}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      <span
                                        className={`inline-block px-1 py-0.5 rounded text-[10px] ${shiftColor}`}
                                      >
                                        {shift}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {isOwner && (
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditTarget(s);
                            setForm({
                              name: s.name,
                              role: s.role,
                              phone: s.phone,
                              startDate: s.startDate,
                              schedule: { ...s.schedule },
                              performanceRating: s.performanceRating || 0,
                            });
                            setShowStaffDialog(true);
                          }}
                          data-ocid={`staffmgmt.edit_button.${i + 1}`}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            saveStaff(staff.filter((x) => x.id !== s.id))
                          }
                          className="text-red-500"
                          data-ocid={`staffmgmt.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-4">
          {isOwner && (
            <div className="flex justify-end">
              <Button
                onClick={() => setShowTaskDialog(true)}
                className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="staffmgmt.secondary_button"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.addTask || "Görev Ekle"}
              </Button>
            </div>
          )}
          {tasks.length === 0 ? (
            <div
              className="bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center"
              data-ocid="staffmgmt.empty_state"
            >
              <CheckSquare className="h-10 w-10 text-[#D7DEE9] mx-auto mb-3" />
              <p className="text-[#6B7A8D]">
                {t.noTasks || "Görev bulunamadı."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task, i) => {
                const assignee = staff.find((s) => s.id === task.assigneeId);
                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl border border-[#E8EDF5] p-4 flex items-center gap-3 ${task.done ? "opacity-60" : ""}`}
                    data-ocid={`staffmgmt.item.${i + 1}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 rounded"
                      data-ocid={`staffmgmt.checkbox.${i + 1}`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${task.done ? "line-through text-[#9CA8B4]" : "text-[#0E1116]"}`}
                      >
                        {task.title}
                      </p>
                      {assignee && (
                        <p className="text-xs text-[#6B7A8D]">
                          {assignee.name}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Staff Dialog */}
      <Dialog open={showStaffDialog} onOpenChange={setShowStaffDialog}>
        <DialogContent className="max-w-md" data-ocid="staffmgmt.dialog">
          <DialogHeader>
            <DialogTitle>
              {editTarget
                ? t.editStaff || "Personel Düzenle"
                : t.addStaff || "Personel Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.staffName || "Ad Soyad"}
              </p>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="staffmgmt.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.staffRole || "Görev"}
              </p>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    role: e.target.value as Staff["role"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="staffmgmt.select"
              >
                <option value="cleaning">{t.cleaningRole || "Temizlik"}</option>
                <option value="security">{t.securityRole || "Güvenlik"}</option>
                <option value="gardener">{t.gardenerRole || "Bahçıvan"}</option>
                <option value="technician">
                  {t.technicianRole || "Teknisyen"}
                </option>
                <option value="other">{t.other || "Diğer"}</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.staffPhone || "Telefon"}
              </p>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.staffStart || "Başlangıç Tarihi"}
              </p>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, startDate: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                Performans Puanı
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setForm((p) => ({ ...p, performanceRating: star }))
                    }
                  >
                    <Star
                      className={`w-5 h-5 ${star <= form.performanceRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-2">
                {t.weeklySchedule || "Haftalık Vardiya"}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          className="text-center px-1 py-1 text-[#6B7A8D] font-medium text-xs"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {DAYS.map((day) => (
                        <td key={day} className="px-0.5 py-1">
                          <select
                            value={form.schedule[day] || "-"}
                            onChange={(e) => {
                              const updated = { ...form.schedule };
                              if (e.target.value === "-") delete updated[day];
                              else updated[day] = e.target.value;
                              setForm((p) => ({ ...p, schedule: updated }));
                            }}
                            className="w-full text-xs border border-[#D7DEE9] rounded px-0.5 py-1"
                          >
                            {SHIFT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleStaffSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="staffmgmt.submit_button"
              >
                {editTarget ? t.save || "Kaydet" : t.addStaff || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStaffDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="staffmgmt.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-md" data-ocid="staffmgmt.task_dialog">
          <DialogHeader>
            <DialogTitle>{t.addTask || "Görev Ekle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.taskTitle || "Görev Başlığı"}
              </p>
              <Input
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="staffmgmt.task_input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.taskAssignee || "Atanan Personel"}
              </p>
              <select
                value={taskForm.assigneeId}
                onChange={(e) =>
                  setTaskForm((p) => ({ ...p, assigneeId: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
              >
                <option value="">{t.selectStaff || "Personel seçin"}</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleTaskSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="staffmgmt.task_submit_button"
              >
                {t.addTask || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTaskDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="staffmgmt.task_cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
