import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as Image, B as Button, P as Plus, S as Search, I as Input, n as Calendar, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-Gmz9ZzBN.js";
import { G as Grid3x3 } from "./grid-3x3-COWQ4l-g.js";
import { D as Download } from "./download-vmUASJrF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
const INITIAL_ALBUMS = [
  {
    id: "1",
    name: "Giriş & Lobi Yenileme",
    category: "Bakım",
    date: "2026-02-10",
    mediaCount: 24,
    coverColor: "from-blue-400 to-blue-600",
    description: "Şubat 2026 lobi renovasyon öncesi ve sonrası fotoğrafları",
    items: [
      {
        id: "1a",
        title: "Öncesi - Ana giriş",
        type: "photo",
        date: "2026-02-10",
        uploader: "Yönetici",
        tags: ["öncesi", "giriş"]
      },
      {
        id: "1b",
        title: "Sonrası - Ana giriş",
        type: "photo",
        date: "2026-02-15",
        uploader: "Yönetici",
        tags: ["sonrası", "giriş"]
      },
      {
        id: "1c",
        title: "Yeni zemin kaplama",
        type: "photo",
        date: "2026-02-15",
        uploader: "Yönetici",
        tags: ["zemin"]
      }
    ]
  },
  {
    id: "2",
    name: "Yılbaşı Etkinliği 2026",
    category: "Etkinlik",
    date: "2026-01-01",
    mediaCount: 47,
    coverColor: "from-purple-400 to-purple-600",
    description: "Bina sakinlerinin yılbaşı kutlama etkinliği",
    items: [
      {
        id: "2a",
        title: "Yılbaşı yemeği",
        type: "photo",
        date: "2026-01-01",
        uploader: "A. Yılmaz",
        tags: ["etkinlik", "yemek"]
      },
      {
        id: "2b",
        title: "Etkinlik videosu",
        type: "video",
        date: "2026-01-01",
        uploader: "M. Kaya",
        tags: ["video"]
      }
    ]
  },
  {
    id: "3",
    name: "Asansör Bakımı",
    category: "Teknik",
    date: "2026-01-20",
    mediaCount: 12,
    coverColor: "from-orange-400 to-orange-600",
    description: "Aylık asansör bakım kaydı",
    items: [
      {
        id: "3a",
        title: "Bakım öncesi kontrol",
        type: "photo",
        date: "2026-01-20",
        uploader: "Teknisyen",
        tags: ["asansör", "bakım"]
      },
      {
        id: "3b",
        title: "Makine dairesi",
        type: "photo",
        date: "2026-01-20",
        uploader: "Teknisyen",
        tags: ["asansör"]
      }
    ]
  },
  {
    id: "4",
    name: "Çatı Tamiri",
    category: "Bakım",
    date: "2025-11-05",
    mediaCount: 18,
    coverColor: "from-red-400 to-red-600",
    description: "Kasım 2025 çatı su yalıtım tamiri",
    items: [
      {
        id: "4a",
        title: "Hasar tespiti",
        type: "photo",
        date: "2025-11-05",
        uploader: "Yönetici",
        tags: ["çatı", "hasar"]
      },
      {
        id: "4b",
        title: "Tamir sonrası",
        type: "photo",
        date: "2025-11-10",
        uploader: "Müteahhit",
        tags: ["çatı", "tamir"]
      }
    ]
  },
  {
    id: "5",
    name: "Ortak Bahçe Düzenlemesi",
    category: "Peyzaj",
    date: "2025-09-15",
    mediaCount: 31,
    coverColor: "from-green-400 to-green-600",
    description: "Eylül 2025 bahçe yenileme projesi",
    items: [
      {
        id: "5a",
        title: "Bahçe öncesi",
        type: "photo",
        date: "2025-09-15",
        uploader: "Yönetici",
        tags: ["bahçe", "öncesi"]
      },
      {
        id: "5b",
        title: "Yeni peyzaj",
        type: "photo",
        date: "2025-09-25",
        uploader: "Peyzaj Firması",
        tags: ["bahçe", "sonrası"]
      }
    ]
  }
];
const CATEGORIES = ["Tümü", "Bakım", "Etkinlik", "Teknik", "Peyzaj"];
function BuildingMediaArchive({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [albums, setAlbums] = reactExports.useState(INITIAL_ALBUMS);
  const [selectedAlbum, setSelectedAlbum] = reactExports.useState(null);
  const [showNewAlbum, setShowNewAlbum] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [filterCat, setFilterCat] = reactExports.useState("Tümü");
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [newAlbum, setNewAlbum] = reactExports.useState({
    name: "",
    category: "Bakım",
    description: ""
  });
  const filtered = albums.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Tümü" || a.category === filterCat;
    return matchSearch && matchCat;
  });
  const handleCreateAlbum = () => {
    if (!newAlbum.name) return;
    const colors = [
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-orange-400 to-orange-600",
      "from-pink-400 to-pink-600"
    ];
    const album = {
      id: Date.now().toString(),
      name: newAlbum.name,
      category: newAlbum.category,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      mediaCount: 0,
      coverColor: colors[Math.floor(Math.random() * colors.length)],
      description: newAlbum.description,
      items: []
    };
    setAlbums((prev) => [album, ...prev]);
    setShowNewAlbum(false);
    setNewAlbum({ name: "", category: "Bakım", description: "" });
  };
  const totalMedia = albums.reduce((sum, a) => sum + a.mediaCount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-7 h-7 text-teal-600" }),
          " Bina Medya Arşivi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Ortak alan fotoğrafları, bakım kayıtları ve etkinlik albümleri" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowNewAlbum(true),
          className: "bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Albüm"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-900", children: albums.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Albüm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-teal-600", children: totalMedia }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Medya" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: albums.filter((a) => a.category === "Bakım").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Bakım Albümü" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-600", children: albums.filter((a) => a.category === "Etkinlik").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Etkinlik Albümü" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Albüm ara...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterCat(cat),
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition ${filterCat === cat ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`,
          children: cat
        },
        cat
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setViewMode("grid"),
            className: `p-2 rounded-lg ${viewMode === "grid" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:bg-gray-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setViewMode("list"),
            className: `p-2 rounded-lg ${viewMode === "list" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:bg-gray-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    viewMode === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((album) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => setSelectedAlbum(album),
        onKeyDown: (e) => {
          if (e.key === "Enter") setSelectedAlbum(album);
        },
        className: "bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `h-32 bg-gradient-to-br ${album.coverColor} flex items-center justify-center relative`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-12 h-12 text-white opacity-80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 bg-white bg-opacity-90 text-xs font-semibold px-2 py-0.5 rounded-full text-gray-700", children: album.category })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: album.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-3 line-clamp-2", children: album.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
                " ",
                album.mediaCount,
                " medya"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                " ",
                album.date
              ] })
            ] })
          ] })
        ]
      },
      album.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Albüm Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Kategori" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Medya Sayısı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3", children: "Tarih" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map((album) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-gray-50 cursor-pointer",
          onClick: () => setSelectedAlbum(album),
          onKeyDown: (e) => {
            if (e.key === "Enter") setSelectedAlbum(album);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-lg bg-gradient-to-br ${album.coverColor} flex items-center justify-center`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900", children: album.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
                  album.description.substring(0, 50),
                  album.description.length > 50 ? "..." : ""
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium", children: album.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600", children: album.mediaCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-600 text-sm", children: album.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-teal-600 text-sm hover:underline",
                children: "Görüntüle"
              }
            ) })
          ]
        },
        album.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedAlbum,
        onOpenChange: () => setSelectedAlbum(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: selectedAlbum && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5 text-teal-600" }),
            selectedAlbum.name
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-4", children: selectedAlbum.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedAlbum.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedAlbum.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                selectedAlbum.mediaCount,
                " medya dosyası"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              selectedAlbum.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      item.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-purple-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-teal-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900", children: item.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
                          item.uploader,
                          " · ",
                          item.date
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      item.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600",
                          children: tag
                        },
                        tag
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "text-gray-400 hover:text-teal-600",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ]
                },
                item.id
              )),
              selectedAlbum.items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-400 py-8", children: "Henüz medya eklenmemiş" })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewAlbum, onOpenChange: setShowNewAlbum, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Albüm Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "bma-name",
              className: "text-xs font-medium text-gray-600",
              children: "Albüm Adı"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: newAlbum.name,
              onChange: (e) => setNewAlbum((a) => ({ ...a, name: e.target.value })),
              placeholder: "Asansör Bakımı 2026",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "bma-category",
              className: "text-xs font-medium text-gray-600",
              children: "Kategori"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "bma-category",
              value: newAlbum.category,
              onChange: (e) => setNewAlbum((a) => ({ ...a, category: e.target.value })),
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1",
              children: CATEGORIES.filter((c) => c !== "Tümü").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "bma-description",
              className: "text-xs font-medium text-gray-600",
              children: "Açıklama"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "bma-description",
              value: newAlbum.description,
              onChange: (e) => setNewAlbum((a) => ({ ...a, description: e.target.value })),
              placeholder: "Albüm hakkında kısa bilgi...",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 h-20 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCreateAlbum,
              className: "flex-1 bg-teal-600 hover:bg-teal-700 text-white",
              children: "Oluştur"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowNewAlbum(false),
              className: "flex-1",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BuildingMediaArchive as default
};
