import {
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Trash2,
  User,
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
import { Checkbox } from "../components/ui/checkbox";
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
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const DAYS = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];
const TIMES = ["Sabah", "Öğlen", "Akşam"];

interface Task {
  id: string;
  area: string;
  staff: string;
  day: string;
  time: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    area: "Giriş Holü",
    staff: "Ali Yılmaz",
    day: "Pazartesi",
    time: "Sabah",
    completed: true,
  },
  {
    id: "2",
    area: "Asansör",
    staff: "Fatma Demir",
    day: "Pazartesi",
    time: "Öğlen",
    completed: true,
  },
  {
    id: "3",
    area: "Otopark",
    staff: "Mehmet Kaya",
    day: "Pazartesi",
    time: "Akşam",
    completed: false,
  },
  {
    id: "4",
    area: "Merdiven Boşluğu",
    staff: "Ali Yılmaz",
    day: "Salı",
    time: "Sabah",
    completed: true,
  },
  {
    id: "5",
    area: "Çatı Katı",
    staff: "Fatma Demir",
    day: "Salı",
    time: "Öğlen",
    completed: false,
  },
  {
    id: "6",
    area: "Bahçe",
    staff: "Hasan Çelik",
    day: "Çarşamba",
    time: "Sabah",
    completed: true,
  },
  {
    id: "7",
    area: "Giriş Holü",
    staff: "Fatma Demir",
    day: "Çarşamba",
    time: "Akşam",
    completed: true,
  },
  {
    id: "8",
    area: "Asansör",
    staff: "Ali Yılmaz",
    day: "Perşembe",
    time: "Sabah",
    completed: false,
  },
  {
    id: "9",
    area: "Spor Salonu",
    staff: "Mehmet Kaya",
    day: "Perşembe",
    time: "Öğlen",
    completed: true,
  },
  {
    id: "10",
    area: "Çamaşırhane",
    staff: "Hasan Çelik",
    day: "Cuma",
    time: "Sabah",
    completed: false,
  },
  {
    id: "11",
    area: "Otopark",
    staff: "Ali Yılmaz",
    day: "Cuma",
    time: "Akşam",
    completed: true,
  },
  {
    id: "12",
    area: "Bahçe",
    staff: "Fatma Demir",
    day: "Cumartesi",
    time: "Sabah",
    completed: true,
  },
  {
    id: "13",
    area: "Giriş Holü",
    staff: "Hasan Çelik",
    day: "Pazar",
    time: "Öğlen",
    completed: false,
  },
];

const AREAS = [
  "Giriş Holü",
  "Asansör",
  "Otopark",
  "Merdiven Boşluğu",
  "Çatı Katı",
  "Bahçe",
  "Spor Salonu",
  "Çamaşırhane",
  "Toplantı Odası",
];
const STAFF = [
  "Ali Yılmaz",
  "Fatma Demir",
  "Mehmet Kaya",
  "Hasan Çelik",
  "Zeynep Arslan",
];

export default function CleaningSchedule(_props: {
  buildingId?: string;
  userId?: string;
  isOwner?: boolean;
  t?: unknown;
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ area: "", staff: "", day: "", time: "" });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addTask = () => {
    if (!form.area || !form.staff || !form.day || !form.time) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form, completed: false },
    ]);
    setForm({ area: "", staff: "", day: "", time: "" });
    setOpen(false);
  };

  const getTasksForCell = (day: string, time: string) =>
    tasks.filter((t) => t.day === day && t.time === time);

  // Monthly stats mock
  const monthlyTotal = 124;
  const monthlyCompleted = 98;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Temizlik & Ortak Alan Programı
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Haftalık görev takvimi ve takip sistemi
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-ocid="cleaning.open_modal_button" className="gap-2">
              <Plus className="w-4 h-4" /> Görev Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Görev Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Ortak Alan</Label>
                <Select
                  value={form.area}
                  onValueChange={(v) => setForm((f) => ({ ...f, area: v }))}
                >
                  <SelectTrigger data-ocid="cleaning.area.select">
                    <SelectValue placeholder="Alan seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREAS.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Sorumlu Personel</Label>
                <Select
                  value={form.staff}
                  onValueChange={(v) => setForm((f) => ({ ...f, staff: v }))}
                >
                  <SelectTrigger data-ocid="cleaning.staff.select">
                    <SelectValue placeholder="Personel seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAFF.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Gün</Label>
                  <Select
                    value={form.day}
                    onValueChange={(v) => setForm((f) => ({ ...f, day: v }))}
                  >
                    <SelectTrigger data-ocid="cleaning.day.select">
                      <SelectValue placeholder="Gün" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Saat</Label>
                  <Select
                    value={form.time}
                    onValueChange={(v) => setForm((f) => ({ ...f, time: v }))}
                  >
                    <SelectTrigger data-ocid="cleaning.time.select">
                      <SelectValue placeholder="Saat" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                İptal
              </Button>
              <Button data-ocid="cleaning.submit_button" onClick={addTask}>
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Haftalık Tamamlanma Oranı</span>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {percentage}%
            </span>
          </div>
          <Progress
            value={percentage}
            className="h-3"
            data-ocid="cleaning.loading_state"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {completedCount} / {totalCount} görev tamamlandı
          </p>
        </CardContent>
      </Card>

      {/* Weekly Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> Haftalık Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2 w-20 text-muted-foreground">
                    Saat
                  </th>
                  {DAYS.map((day) => (
                    <th
                      key={day}
                      className="text-center p-2 text-muted-foreground font-medium"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time) => (
                  <tr key={time} className="border-t">
                    <td className="p-2 text-muted-foreground font-medium text-xs">
                      {time}
                    </td>
                    {DAYS.map((day) => {
                      const cellTasks = getTasksForCell(day, time);
                      return (
                        <td key={day} className="p-1 align-top min-w-[110px]">
                          <div className="space-y-1">
                            {cellTasks.map((task) => (
                              <div
                                key={task.id}
                                className={`rounded p-1.5 border text-xs flex items-start gap-1 group ${
                                  task.completed
                                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                    : "bg-muted border-border"
                                }`}
                              >
                                <Checkbox
                                  checked={task.completed}
                                  onCheckedChange={() => toggleTask(task.id)}
                                  className="mt-0.5 h-3 w-3"
                                  data-ocid={`cleaning.checkbox.${task.id}`}
                                />
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`font-medium leading-tight ${task.completed ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {task.area}
                                  </p>
                                  <p className="text-muted-foreground flex items-center gap-0.5">
                                    <User className="w-2.5 h-2.5" />
                                    {task.staff.split(" ")[0]}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => deleteTask(task.id)}
                                  className="opacity-0 group-hover:opacity-100 text-destructive"
                                  data-ocid={`cleaning.delete_button.${task.id}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Bu Ay Toplam Görev</p>
            <p className="text-3xl font-bold mt-1">{monthlyTotal}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tamamlanan</p>
            <p className="text-3xl font-bold mt-1 text-green-600">
              {monthlyCompleted}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Aylık Başarı Oranı</p>
            <p className="text-3xl font-bold mt-1 text-blue-600">
              {Math.round((monthlyCompleted / monthlyTotal) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" /> Personel Görev Özeti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {STAFF.map((staff) => {
              const staffTasks = tasks.filter((t) => t.staff === staff);
              const done = staffTasks.filter((t) => t.completed).length;
              const pct =
                staffTasks.length > 0
                  ? Math.round((done / staffTasks.length) * 100)
                  : 0;
              return (
                <div key={staff} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium truncate">
                    {staff}
                  </div>
                  <Progress value={pct} className="flex-1 h-2" />
                  <div className="text-sm text-muted-foreground w-20 text-right">
                    {done}/{staffTasks.length} ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
