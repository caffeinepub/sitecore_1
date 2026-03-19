import { Plus, UserCheck } from "lucide-react";
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
import type { Apartment, Visitor } from "../types";

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const APT_KEY = (id: string) => `sitecore_apartments_${id}`;
const VIS_KEY = (id: string) => `sitecore_visitors_${id}`;

export default function VisitorManagement({
  buildingId,
  isOwner: _isOwner,
  t,
}: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const [form, setForm] = useState({
    name: "",
    apartmentId: "",
    expectedDate: "",
    description: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(APT_KEY(buildingId));
    if (raw) setApartments(JSON.parse(raw));
    const vRaw = localStorage.getItem(VIS_KEY(buildingId));
    if (vRaw) setVisitors(JSON.parse(vRaw));
  }, [buildingId]);

  const save = (updated: Visitor[]) => {
    setVisitors(updated);
    localStorage.setItem(VIS_KEY(buildingId), JSON.stringify(updated));
  };

  const resetForm = () =>
    setForm({ name: "", apartmentId: "", expectedDate: "", description: "" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const v: Visitor = {
      id: crypto.randomUUID(),
      buildingId,
      name: form.name.trim(),
      apartmentId: form.apartmentId,
      expectedDate: form.expectedDate,
      description: form.description.trim(),
      status: "expected",
      createdAt: Date.now(),
    };
    save([...visitors, v]);
    setShowDialog(false);
    resetForm();
  };

  const updateStatus = (id: string, status: Visitor["status"]) => {
    save(
      visitors.map((v) =>
        v.id === id
          ? {
              ...v,
              status,
              arrivedAt: status === "arrived" ? Date.now() : v.arrivedAt,
              leftAt: status === "left" ? Date.now() : v.leftAt,
            }
          : v,
      ),
    );
  };

  const getAptLabel = (aptId: string) => {
    const apt = apartments.find((a) => a.id === aptId);
    if (!apt) return aptId;
    return `${apt.block ? `${apt.block}-` : ""}${apt.number}`;
  };

  const statusBadge = (status: Visitor["status"]) => {
    if (status === "arrived")
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          {t.markArrived}
        </Badge>
      );
    if (status === "left")
      return (
        <Badge className="bg-gray-100 text-gray-600 border-gray-200">
          {t.markLeft}
        </Badge>
      );
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
        {t.expectedVisitors}
      </Badge>
    );
  };

  const VisitorCard = ({ v, idx }: { v: Visitor; idx: number }) => (
    <div
      data-ocid={`visitors.item.${idx + 1}`}
      className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-[#0E1116]">{v.name}</p>
          <p className="text-sm text-[#3A4654] mt-0.5">
            <UserCheck className="w-3 h-3 inline mr-1" />
            {t.visitingApartment}: {getAptLabel(v.apartmentId) || "-"}
          </p>
          {v.expectedDate && (
            <p className="text-xs text-[#3A4654]/60 mt-0.5">
              {new Date(v.expectedDate).toLocaleString()}
            </p>
          )}
          {v.description && (
            <p className="text-sm text-[#3A4654] mt-1">{v.description}</p>
          )}
        </div>
        {statusBadge(v.status)}
      </div>
      <div className="flex gap-2 mt-3">
        {v.status === "expected" && (
          <Button
            data-ocid={`visitors.toggle.${idx + 1}`}
            onClick={() => updateStatus(v.id, "arrived")}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs"
          >
            {t.markArrived}
          </Button>
        )}
        {v.status === "arrived" && (
          <Button
            onClick={() => updateStatus(v.id, "left")}
            size="sm"
            variant="outline"
            className="rounded-full text-xs"
          >
            {t.markLeft}
          </Button>
        )}
      </div>
    </div>
  );

  const expected = visitors.filter((v) => v.status === "expected");
  const active = visitors.filter((v) => v.status === "arrived");
  const past = visitors.filter((v) => v.status === "left");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">{t.visitors}</h2>
        <Button
          data-ocid="visitors.primary_button"
          onClick={() => setShowDialog(true)}
          className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          {t.addVisitor}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {expected.length}
          </p>
          <p className="text-[#3A4654] text-sm mt-1">{t.expectedVisitors}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-blue-600">{active.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">{t.activeVisitors}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#3A4654]">{past.length}</p>
          <p className="text-[#3A4654] text-sm mt-1">{t.visitHistory}</p>
        </div>
      </div>

      <Tabs defaultValue="expected">
        <TabsList className="mb-4">
          <TabsTrigger data-ocid="visitors.tab" value="expected">
            {t.expectedVisitors} ({expected.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            {t.activeVisitors} ({active.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            {t.visitHistory} ({past.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expected">
          {expected.length === 0 ? (
            <div
              data-ocid="visitors.empty_state"
              className="py-10 text-center text-[#3A4654]"
            >
              {t.noVisitors}
            </div>
          ) : (
            <div className="space-y-3">
              {expected.map((v, idx) => (
                <VisitorCard key={v.id} v={v} idx={idx} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="active">
          {active.length === 0 ? (
            <div className="py-10 text-center text-[#3A4654]">
              {t.noVisitors}
            </div>
          ) : (
            <div className="space-y-3">
              {active.map((v, idx) => (
                <VisitorCard key={v.id} v={v} idx={idx} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {past.length === 0 ? (
            <div className="py-10 text-center text-[#3A4654]">
              {t.noVisitors}
            </div>
          ) : (
            <div className="space-y-3">
              {past.map((v, idx) => (
                <VisitorCard key={v.id} v={v} idx={idx} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.addVisitor}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.visitorName} *
              </p>
              <Input
                data-ocid="visitors.input"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.visitingApartment}
              </p>
              <select
                value={form.apartmentId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, apartmentId: e.target.value }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]"
              >
                <option value="">-</option>
                {apartments.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.block ? `${a.block}-` : ""}
                    {a.number} {a.residentName ? `(${a.residentName})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.expectedDate}
              </p>
              <Input
                type="datetime-local"
                value={form.expectedDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, expectedDate: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.description}
              </p>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Ziyaret amacı..."
              />
            </div>
            <Button
              data-ocid="visitors.submit_button"
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full"
            >
              {t.addVisitor}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
