import { r as reactExports, j as jsxRuntimeExports, D as Dialog, s as DialogTrigger, B as Button, P as Plus, a as DialogContent, b as DialogHeader, d as DialogTitle, o as DialogFooter, t as User } from "./index-huPFjtKr.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BNzburN1.js";
import { C as Checkbox } from "./checkbox-D6ELl7Zt.js";
import { L as Label } from "./label-C8xbp7_u.js";
import { P as Progress } from "./progress-Yb2aJa0v.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BNo0-bwN.js";
import { C as CircleCheck } from "./circle-check-Bo4pyHpg.js";
import { C as Clock } from "./clock-CTDtSScP.js";
import { T as Trash2 } from "./trash-2-B-7knzjU.js";
import "./index-BeimOfld.js";
const DAYS = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar"
];
const TIMES = ["Sabah", "Öğlen", "Akşam"];
const initialTasks = [
  {
    id: "1",
    area: "Giriş Holü",
    staff: "Ali Yılmaz",
    day: "Pazartesi",
    time: "Sabah",
    completed: true
  },
  {
    id: "2",
    area: "Asansör",
    staff: "Fatma Demir",
    day: "Pazartesi",
    time: "Öğlen",
    completed: true
  },
  {
    id: "3",
    area: "Otopark",
    staff: "Mehmet Kaya",
    day: "Pazartesi",
    time: "Akşam",
    completed: false
  },
  {
    id: "4",
    area: "Merdiven Boşluğu",
    staff: "Ali Yılmaz",
    day: "Salı",
    time: "Sabah",
    completed: true
  },
  {
    id: "5",
    area: "Çatı Katı",
    staff: "Fatma Demir",
    day: "Salı",
    time: "Öğlen",
    completed: false
  },
  {
    id: "6",
    area: "Bahçe",
    staff: "Hasan Çelik",
    day: "Çarşamba",
    time: "Sabah",
    completed: true
  },
  {
    id: "7",
    area: "Giriş Holü",
    staff: "Fatma Demir",
    day: "Çarşamba",
    time: "Akşam",
    completed: true
  },
  {
    id: "8",
    area: "Asansör",
    staff: "Ali Yılmaz",
    day: "Perşembe",
    time: "Sabah",
    completed: false
  },
  {
    id: "9",
    area: "Spor Salonu",
    staff: "Mehmet Kaya",
    day: "Perşembe",
    time: "Öğlen",
    completed: true
  },
  {
    id: "10",
    area: "Çamaşırhane",
    staff: "Hasan Çelik",
    day: "Cuma",
    time: "Sabah",
    completed: false
  },
  {
    id: "11",
    area: "Otopark",
    staff: "Ali Yılmaz",
    day: "Cuma",
    time: "Akşam",
    completed: true
  },
  {
    id: "12",
    area: "Bahçe",
    staff: "Fatma Demir",
    day: "Cumartesi",
    time: "Sabah",
    completed: true
  },
  {
    id: "13",
    area: "Giriş Holü",
    staff: "Hasan Çelik",
    day: "Pazar",
    time: "Öğlen",
    completed: false
  }
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
  "Toplantı Odası"
];
const STAFF = [
  "Ali Yılmaz",
  "Fatma Demir",
  "Mehmet Kaya",
  "Hasan Çelik",
  "Zeynep Arslan"
];
function CleaningSchedule(_props) {
  const [tasks, setTasks] = reactExports.useState(initialTasks);
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ area: "", staff: "", day: "", time: "" });
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
  const toggleTask = (id) => {
    setTasks(
      (prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  const addTask = () => {
    if (!form.area || !form.staff || !form.day || !form.time) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form, completed: false }
    ]);
    setForm({ area: "", staff: "", day: "", time: "" });
    setOpen(false);
  };
  const getTasksForCell = (day, time) => tasks.filter((t) => t.day === day && t.time === time);
  const monthlyTotal = 124;
  const monthlyCompleted = 98;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Temizlik & Ortak Alan Programı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Haftalık görev takvimi ve takip sistemi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "cleaning.open_modal_button", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " Görev Ekle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Görev Ekle" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ortak Alan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.area,
                  onValueChange: (v) => setForm((f) => ({ ...f, area: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "cleaning.area.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Alan seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: AREAS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a }, a)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Sorumlu Personel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.staff,
                  onValueChange: (v) => setForm((f) => ({ ...f, staff: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "cleaning.staff.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Personel seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STAFF.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Gün" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.day,
                    onValueChange: (v) => setForm((f) => ({ ...f, day: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "cleaning.day.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Gün" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Saat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.time,
                    onValueChange: (v) => setForm((f) => ({ ...f, time: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "cleaning.time.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Saat" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIMES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "İptal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "cleaning.submit_button", onClick: addTask, children: "Ekle" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Haftalık Tamamlanma Oranı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-green-600", children: [
          percentage,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: percentage,
          className: "h-3",
          "data-ocid": "cleaning.loading_state"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
        completedCount,
        " / ",
        totalCount,
        " görev tamamlandı"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
        " Haftalık Program"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 w-20 text-muted-foreground", children: "Saat" }),
          DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-center p-2 text-muted-foreground font-medium",
              children: day
            },
            day
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: TIMES.map((time) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-muted-foreground font-medium text-xs", children: time }),
          DAYS.map((day) => {
            const cellTasks = getTasksForCell(day, time);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-1 align-top min-w-[110px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: cellTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded p-1.5 border text-xs flex items-start gap-1 group ${task.completed ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800" : "bg-muted border-border"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: task.completed,
                      onCheckedChange: () => toggleTask(task.id),
                      className: "mt-0.5 h-3 w-3",
                      "data-ocid": `cleaning.checkbox.${task.id}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-medium leading-tight ${task.completed ? "line-through text-muted-foreground" : ""}`,
                        children: task.area
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-2.5 h-2.5" }),
                      task.staff.split(" ")[0]
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => deleteTask(task.id),
                      className: "opacity-0 group-hover:opacity-100 text-destructive",
                      "data-ocid": `cleaning.delete_button.${task.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              task.id
            )) }) }, day);
          })
        ] }, time)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bu Ay Toplam Görev" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-1", children: monthlyTotal })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tamamlanan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold mt-1 text-green-600", children: monthlyCompleted })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aylık Başarı Oranı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold mt-1 text-blue-600", children: [
          Math.round(monthlyCompleted / monthlyTotal * 100),
          "%"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }),
        " Personel Görev Özeti"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: STAFF.map((staff) => {
        const staffTasks = tasks.filter((t) => t.staff === staff);
        const done = staffTasks.filter((t) => t.completed).length;
        const pct = staffTasks.length > 0 ? Math.round(done / staffTasks.length * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 text-sm font-medium truncate", children: staff }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "flex-1 h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground w-20 text-right", children: [
            done,
            "/",
            staffTasks.length,
            " (",
            pct,
            "%)"
          ] })
        ] }, staff);
      }) }) })
    ] })
  ] });
}
export {
  CleaningSchedule as default
};
