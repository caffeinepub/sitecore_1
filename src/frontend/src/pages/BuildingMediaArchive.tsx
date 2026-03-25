import {
  Calendar,
  Download,
  Film,
  FolderOpen,
  Grid,
  Image,
  List,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface MediaAlbum {
  id: string;
  name: string;
  category: string;
  date: string;
  mediaCount: number;
  coverColor: string;
  description: string;
  items: MediaItem[];
}

interface MediaItem {
  id: string;
  title: string;
  type: "photo" | "video";
  date: string;
  uploader: string;
  tags: string[];
}

const INITIAL_ALBUMS: MediaAlbum[] = [
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
        tags: ["öncesi", "giriş"],
      },
      {
        id: "1b",
        title: "Sonrası - Ana giriş",
        type: "photo",
        date: "2026-02-15",
        uploader: "Yönetici",
        tags: ["sonrası", "giriş"],
      },
      {
        id: "1c",
        title: "Yeni zemin kaplama",
        type: "photo",
        date: "2026-02-15",
        uploader: "Yönetici",
        tags: ["zemin"],
      },
    ],
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
        tags: ["etkinlik", "yemek"],
      },
      {
        id: "2b",
        title: "Etkinlik videosu",
        type: "video",
        date: "2026-01-01",
        uploader: "M. Kaya",
        tags: ["video"],
      },
    ],
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
        tags: ["asansör", "bakım"],
      },
      {
        id: "3b",
        title: "Makine dairesi",
        type: "photo",
        date: "2026-01-20",
        uploader: "Teknisyen",
        tags: ["asansör"],
      },
    ],
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
        tags: ["çatı", "hasar"],
      },
      {
        id: "4b",
        title: "Tamir sonrası",
        type: "photo",
        date: "2025-11-10",
        uploader: "Müteahhit",
        tags: ["çatı", "tamir"],
      },
    ],
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
        tags: ["bahçe", "öncesi"],
      },
      {
        id: "5b",
        title: "Yeni peyzaj",
        type: "photo",
        date: "2025-09-25",
        uploader: "Peyzaj Firması",
        tags: ["bahçe", "sonrası"],
      },
    ],
  },
];

const CATEGORIES = ["Tümü", "Bakım", "Etkinlik", "Teknik", "Peyzaj"];

export default function BuildingMediaArchive({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [albums, setAlbums] = useState<MediaAlbum[]>(INITIAL_ALBUMS);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaAlbum | null>(null);
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tümü");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    category: "Bakım",
    description: "",
  });

  const filtered = albums.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
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
      "from-pink-400 to-pink-600",
    ];
    const album: MediaAlbum = {
      id: Date.now().toString(),
      name: newAlbum.name,
      category: newAlbum.category,
      date: new Date().toISOString().split("T")[0],
      mediaCount: 0,
      coverColor: colors[Math.floor(Math.random() * colors.length)],
      description: newAlbum.description,
      items: [],
    };
    setAlbums((prev) => [album, ...prev]);
    setShowNewAlbum(false);
    setNewAlbum({ name: "", category: "Bakım", description: "" });
  };

  const totalMedia = albums.reduce((sum, a) => sum + a.mediaCount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Image className="w-7 h-7 text-teal-600" /> Bina Medya Arşivi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Ortak alan fotoğrafları, bakım kayıtları ve etkinlik albümleri
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowNewAlbum(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Albüm
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">
            {albums.length}
          </div>
          <div className="text-sm text-gray-500">Toplam Albüm</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-teal-600">{totalMedia}</div>
          <div className="text-sm text-gray-500">Toplam Medya</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {albums.filter((a) => a.category === "Bakım").length}
          </div>
          <div className="text-sm text-gray-500">Bakım Albümü</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">
            {albums.filter((a) => a.category === "Etkinlik").length}
          </div>
          <div className="text-sm text-gray-500">Etkinlik Albümü</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Albüm ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${filterCat === cat ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:bg-gray-100"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:bg-gray-100"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Albums Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((album) => (
            <div
              key={album.id}
              onClick={() => setSelectedAlbum(album)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedAlbum(album);
              }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition overflow-hidden"
            >
              <div
                className={`h-32 bg-gradient-to-br ${album.coverColor} flex items-center justify-center relative`}
              >
                <FolderOpen className="w-12 h-12 text-white opacity-80" />
                <span className="absolute top-3 right-3 bg-white bg-opacity-90 text-xs font-semibold px-2 py-0.5 rounded-full text-gray-700">
                  {album.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {album.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {album.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Image className="w-3 h-3" /> {album.mediaCount} medya
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {album.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Albüm Adı
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Kategori
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Medya Sayısı
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Tarih
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((album) => (
                <tr
                  key={album.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedAlbum(album)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedAlbum(album);
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${album.coverColor} flex items-center justify-center`}
                      >
                        <FolderOpen className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {album.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {album.description.substring(0, 50)}
                          {album.description.length > 50 ? "..." : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                      {album.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {album.mediaCount}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {album.date}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="text-teal-600 text-sm hover:underline"
                    >
                      Görüntüle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Album Detail Modal */}
      <Dialog
        open={!!selectedAlbum}
        onOpenChange={() => setSelectedAlbum(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAlbum && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-teal-600" />
                  {selectedAlbum.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-4">
                  {selectedAlbum.description}
                </p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span>{selectedAlbum.category}</span>
                  <span>{selectedAlbum.date}</span>
                  <span>{selectedAlbum.mediaCount} medya dosyası</span>
                </div>
                <div className="space-y-2">
                  {selectedAlbum.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {item.type === "video" ? (
                          <Film className="w-5 h-5 text-purple-500" />
                        ) : (
                          <Image className="w-5 h-5 text-teal-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.uploader} · {item.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                        <button
                          type="button"
                          className="text-gray-400 hover:text-teal-600"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedAlbum.items.length === 0 && (
                    <p className="text-center text-gray-400 py-8">
                      Henüz medya eklenmemiş
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Album Modal */}
      <Dialog open={showNewAlbum} onOpenChange={setShowNewAlbum}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Yeni Albüm Oluştur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div>
              <label
                htmlFor="bma-name"
                className="text-xs font-medium text-gray-600"
              >
                Albüm Adı
              </label>
              <Input
                value={newAlbum.name}
                onChange={(e) =>
                  setNewAlbum((a) => ({ ...a, name: e.target.value }))
                }
                placeholder="Asansör Bakımı 2026"
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="bma-category"
                className="text-xs font-medium text-gray-600"
              >
                Kategori
              </label>
              <select
                id="bma-category"
                value={newAlbum.category}
                onChange={(e) =>
                  setNewAlbum((a) => ({ ...a, category: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              >
                {CATEGORIES.filter((c) => c !== "Tümü").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="bma-description"
                className="text-xs font-medium text-gray-600"
              >
                Açıklama
              </label>
              <textarea
                id="bma-description"
                value={newAlbum.description}
                onChange={(e) =>
                  setNewAlbum((a) => ({ ...a, description: e.target.value }))
                }
                placeholder="Albüm hakkında kısa bilgi..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 h-20 resize-none"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleCreateAlbum}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                Oluştur
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewAlbum(false)}
                className="flex-1"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
