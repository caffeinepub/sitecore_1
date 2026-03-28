import { r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, B as Button, P as Plus, U as Users, e as Badge, az as SquareCheckBig, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-DOWBo6uK.js";
import { S as Star } from "./star-CGMJnKZa.js";
import { P as Pen } from "./pen-BvJSkUKP.js";
import { T as Trash2 } from "./trash-2-DB3FeD1o.js";
const KEY = (id) => `sitecore_staff_${id}`;
const TASK_KEY = (id) => `sitecore_tasks_${id}`;
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const SHIFT_OPTIONS = ["-", "Sabah", "Öğle", "Gece", "İzin"];
function StaffManagement({ buildingId, isOwner, t }) {
  const [staff, setStaff] = reactExports.useState([]);
  const [tasks, setTasks] = reactExports.useState([]);
  const [showStaffDialog, setShowStaffDialog] = reactExports.useState(false);
  const [showTaskDialog, setShowTaskDialog] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    role: "cleaning",
    phone: "",
    startDate: "",
    schedule: {},
    performanceRating: 0
  });
  const [taskForm, setTaskForm] = reactExports.useState({ title: "", assigneeId: "" });
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    const taskRaw = localStorage.getItem(TASK_KEY(buildingId));
    if (raw) setStaff(JSON.parse(raw));
    else {
      const seed = [
        {
          id: "s1",
          name: "Fatma Hanım",
          role: "cleaning",
          phone: "0533 456 78 90",
          startDate: "2024-01-15",
          schedule: { Pzt: "Sabah", Çar: "Sabah", Cum: "Sabah" },
          performanceRating: 4
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
            Cum: "Gece"
          },
          performanceRating: 5
        },
        {
          id: "s3",
          name: "Ali Usta",
          role: "technician",
          phone: "0555 111 22 33",
          startDate: "2025-03-10",
          schedule: { Sal: "Öğle", Per: "Öğle" },
          performanceRating: 3
        }
      ];
      setStaff(seed);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
    if (taskRaw) setTasks(JSON.parse(taskRaw));
    else {
      const seedTasks = [
        {
          id: "t1",
          title: "Merdivenler temizlenecek",
          assigneeId: "s1",
          done: false,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "t2",
          title: "Asansör bakımı yapılacak",
          assigneeId: "s3",
          done: false,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "t3",
          title: "Giriş kapısı kilidi kontrol edilecek",
          assigneeId: "s2",
          done: true,
          createdAt: new Date(Date.now() - 864e5).toISOString()
        }
      ];
      setTasks(seedTasks);
      localStorage.setItem(TASK_KEY(buildingId), JSON.stringify(seedTasks));
    }
  }, [buildingId]);
  const saveStaff = (updated) => {
    setStaff(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };
  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem(TASK_KEY(buildingId), JSON.stringify(updated));
  };
  const handleStaffSubmit = () => {
    if (!form.name.trim()) return;
    if (editTarget) {
      saveStaff(
        staff.map((s) => s.id === editTarget.id ? { ...s, ...form } : s)
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
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
    setShowTaskDialog(false);
    setTaskForm({ title: "", assigneeId: "" });
  };
  const toggleTask = (id) => saveTasks(
    tasks.map(
      (task) => task.id === id ? { ...task, done: !task.done } : task
    )
  );
  const setRating = (staffId, rating) => {
    saveStaff(
      staff.map(
        (s) => s.id === staffId ? { ...s, performanceRating: rating } : s
      )
    );
  };
  const roleLabel = (role) => {
    const map = {
      cleaning: t.cleaningRole || "Temizlik",
      security: t.securityRole || "Güvenlik",
      gardener: t.gardenerRole || "Bahçıvan",
      technician: t.technicianRole || "Teknisyen",
      other: t.other || "Diğer"
    };
    return map[role] || role;
  };
  const roleColor = {
    cleaning: "bg-blue-100 text-blue-700",
    security: "bg-indigo-100 text-indigo-700",
    gardener: "bg-green-100 text-green-700",
    technician: "bg-orange-100 text-orange-700",
    other: "bg-gray-100 text-gray-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.staffManagement || "Personel Yönetimi" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "staff", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "staff", "data-ocid": "staffmgmt.tab", children: t.staffMgmt || "Personel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tasks", "data-ocid": "staffmgmt.tab", children: t.addTask || "Görevler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "staff", className: "space-y-4 mt-4", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => {
              setEditTarget(null);
              setForm({
                name: "",
                role: "cleaning",
                phone: "",
                startDate: "",
                schedule: {},
                performanceRating: 0
              });
              setShowStaffDialog(true);
            },
            className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
            "data-ocid": "staffmgmt.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              t.addStaff || "Personel Ekle"
            ]
          }
        ) }),
        staff.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center",
            "data-ocid": "staffmgmt.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-[#D7DEE9] mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noStaff || "Kayıtlı personel yok." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: staff.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white rounded-2xl border border-[#E8EDF5] p-4",
            "data-ocid": `staffmgmt.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: roleColor[s.role] || "bg-gray-100 text-gray-600",
                      children: roleLabel(s.role)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: s.phone }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#9CA8B4] mt-1", children: [
                  t.staffStart || "Başlangıç",
                  ": ",
                  s.startDate
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                  [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setRating(s.id, star),
                      className: "focus:outline-none",
                      title: `${star} yıldız`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          className: `w-4 h-4 ${star <= (s.performanceRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} hover:text-yellow-300 transition-colors`
                        }
                      )
                    },
                    star
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D] ml-1", children: s.performanceRating ? `${s.performanceRating}/5` : "Puan yok" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "px-1 py-1 text-center text-[#6B7A8D] font-medium w-9",
                      children: day
                    },
                    day
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: DAYS.map((day) => {
                    const shift = s.schedule[day] || "-";
                    const shiftColor = shift === "Sabah" ? "bg-yellow-100 text-yellow-700" : shift === "Öğle" ? "bg-blue-100 text-blue-700" : shift === "Gece" ? "bg-indigo-100 text-indigo-700" : shift === "İzin" ? "bg-red-100 text-red-600" : "bg-gray-50 text-gray-400";
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-0.5 py-1 text-center",
                        children: isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            value: shift,
                            onChange: (e) => {
                              const newSchedule = { ...s.schedule };
                              if (e.target.value === "-")
                                delete newSchedule[day];
                              else
                                newSchedule[day] = e.target.value;
                              saveStaff(
                                staff.map(
                                  (x) => x.id === s.id ? {
                                    ...x,
                                    schedule: newSchedule
                                  } : x
                                )
                              );
                            },
                            className: `w-full text-xs rounded px-0.5 py-0.5 border-0 cursor-pointer ${shiftColor}`,
                            children: SHIFT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt, children: opt }, opt))
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `inline-block px-1 py-0.5 rounded text-[10px] ${shiftColor}`,
                            children: shift
                          }
                        )
                      },
                      day
                    );
                  }) }) })
                ] }) })
              ] }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 ml-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => {
                      setEditTarget(s);
                      setForm({
                        name: s.name,
                        role: s.role,
                        phone: s.phone,
                        startDate: s.startDate,
                        schedule: { ...s.schedule },
                        performanceRating: s.performanceRating || 0
                      });
                      setShowStaffDialog(true);
                    },
                    "data-ocid": `staffmgmt.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => saveStaff(staff.filter((x) => x.id !== s.id)),
                    className: "text-red-500",
                    "data-ocid": `staffmgmt.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
                  }
                )
              ] })
            ] })
          },
          s.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "tasks", className: "space-y-4 mt-4", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowTaskDialog(true),
            className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
            "data-ocid": "staffmgmt.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
              t.addTask || "Görev Ekle"
            ]
          }
        ) }),
        tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-[#E8EDF5] p-12 text-center",
            "data-ocid": "staffmgmt.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-10 w-10 text-[#D7DEE9] mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: t.noTasks || "Görev bulunamadı." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tasks.map((task, i) => {
          const assignee = staff.find((s) => s.id === task.assigneeId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-white rounded-xl border border-[#E8EDF5] p-4 flex items-center gap-3 ${task.done ? "opacity-60" : ""}`,
              "data-ocid": `staffmgmt.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: task.done,
                    onChange: () => toggleTask(task.id),
                    className: "w-4 h-4 rounded",
                    "data-ocid": `staffmgmt.checkbox.${i + 1}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-sm font-medium ${task.done ? "line-through text-[#9CA8B4]" : "text-[#0E1116]"}`,
                      children: task.title
                    }
                  ),
                  assignee && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: assignee.name })
                ] })
              ]
            },
            task.id
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showStaffDialog, onOpenChange: setShowStaffDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "staffmgmt.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? t.editStaff || "Personel Düzenle" : t.addStaff || "Personel Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.staffName || "Ad Soyad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              "data-ocid": "staffmgmt.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.staffRole || "Görev" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.role,
              onChange: (e) => setForm((p) => ({
                ...p,
                role: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "staffmgmt.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cleaning", children: t.cleaningRole || "Temizlik" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "security", children: t.securityRole || "Güvenlik" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gardener", children: t.gardenerRole || "Bahçıvan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "technician", children: t.technicianRole || "Teknisyen" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: t.other || "Diğer" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.staffPhone || "Telefon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.staffStart || "Başlangıç Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.startDate,
              onChange: (e) => setForm((p) => ({ ...p, startDate: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Performans Puanı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm((p) => ({ ...p, performanceRating: star })),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-5 h-5 ${star <= form.performanceRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                }
              )
            },
            star
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-2", children: t.weeklySchedule || "Haftalık Vardiya" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-center px-1 py-1 text-[#6B7A8D] font-medium text-xs",
                children: day
              },
              day
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-0.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.schedule[day] || "-",
                onChange: (e) => {
                  const updated = { ...form.schedule };
                  if (e.target.value === "-") delete updated[day];
                  else updated[day] = e.target.value;
                  setForm((p) => ({ ...p, schedule: updated }));
                },
                className: "w-full text-xs border border-[#D7DEE9] rounded px-0.5 py-1",
                children: SHIFT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt, children: opt }, opt))
              }
            ) }, day)) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleStaffSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "staffmgmt.submit_button",
              children: editTarget ? t.save || "Kaydet" : t.addStaff || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowStaffDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "staffmgmt.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showTaskDialog, onOpenChange: setShowTaskDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "staffmgmt.task_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addTask || "Görev Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.taskTitle || "Görev Başlığı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: taskForm.title,
              onChange: (e) => setTaskForm((p) => ({ ...p, title: e.target.value })),
              "data-ocid": "staffmgmt.task_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.taskAssignee || "Atanan Personel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: taskForm.assigneeId,
              onChange: (e) => setTaskForm((p) => ({ ...p, assigneeId: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t.selectStaff || "Personel seçin" }),
                staff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleTaskSubmit,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "staffmgmt.task_submit_button",
              children: t.addTask || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowTaskDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "staffmgmt.task_cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  StaffManagement as default
};
