import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Plus,
  Shield,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type PolicyStatus = "aktif" | "yenilenecek" | "sona_erdi";
type ClaimStatus =
  | "inceleniyor"
  | "onaylandi"
  | "reddedildi"
  | "odendi"
  | "beklemede";

interface Policy {
  id: string;
  type: string;
  company: string;
  policyNo: string;
  startDate: string;
  endDate: string;
  coverage: number;
  premium: number;
  status: PolicyStatus;
  description: string;
}

interface Claim {
  id: string;
  policyId: string;
  policyType: string;
  incidentDate: string;
  reportDate: string;
  description: string;
  amount: number;
  status: ClaimStatus;
  adjuster?: string;
  resolution?: string;
}

const POLICIES: Policy[] = [
  {
    id: "p1",
    type: "DASK (Zorunlu Deprem)",
    company: "Güneş Sigorta",
    policyNo: "DSK-2024-00412",
    startDate: "01.01.2024",
    endDate: "31.12.2024",
    coverage: 2500000,
    premium: 3200,
    status: "aktif",
    description: "Bina yapı sigortası, deprem hasarlarını kapsar.",
  },
  {
    id: "p2",
    type: "Konut & Yangın Sigortası",
    company: "Anadolu Sigorta",
    policyNo: "KYS-2024-08831",
    startDate: "15.03.2024",
    endDate: "14.03.2025",
    coverage: 5000000,
    premium: 8750,
    status: "aktif",
    description:
      "Yangın, su baskını, hırsızlık ve doğal afet hasarlarını kapsar.",
  },
  {
    id: "p3",
    type: "Asansör Zorunlu Mali Sorumluluk",
    company: "Allianz",
    policyNo: "AMS-2023-55120",
    startDate: "01.06.2023",
    endDate: "31.05.2024",
    coverage: 1000000,
    premium: 1850,
    status: "yenilenecek",
    description:
      "Asansör kazalarında üçüncü şahıs yaralanma ve hasar tazminatı.",
  },
  {
    id: "p4",
    type: "Ortak Alan Sorumluluk",
    company: "Mapfre",
    policyNo: "OAS-2024-33021",
    startDate: "01.01.2024",
    endDate: "31.12.2024",
    coverage: 500000,
    premium: 2400,
    status: "aktif",
    description:
      "Ortak alanlarda meydana gelen kaza ve yaralanmalara karşı sorumluluk.",
  },
  {
    id: "p5",
    type: "Teknik Ekipman Sigortası",
    company: "HDI Sigorta",
    policyNo: "TES-2022-77811",
    startDate: "01.09.2022",
    endDate: "31.08.2023",
    coverage: 750000,
    premium: 3100,
    status: "sona_erdi",
    description: "Kazan, pompa, jeneratör gibi teknik ekipmanları kapsar.",
  },
];

const CLAIMS: Claim[] = [
  {
    id: "c1",
    policyId: "p2",
    policyType: "Konut & Yangın",
    incidentDate: "12.03.2024",
    reportDate: "13.03.2024",
    description:
      "3. kat ortak su borusu patlaması nedeniyle bodrum depoda su hasarı oluştu. Malzeme ve işçilik masrafı talep edilmektedir.",
    amount: 18500,
    status: "odendi",
    adjuster: "Mehmet Yılmaz",
    resolution: "Hasar tespiti yapıldı, tam tutar ödendi.",
  },
  {
    id: "c2",
    policyId: "p1",
    policyType: "DASK",
    incidentDate: "06.02.2023",
    reportDate: "10.02.2023",
    description:
      "Şubat 2023 depremleri sonrasında bina dış cephesinde çatlaklar ve bölücü duvar hasarları tespit edildi.",
    amount: 145000,
    status: "odendi",
    adjuster: "Ayla Kaya",
    resolution: "Hasar tespiti 3 hafta sürdü, %80 oranında ödeme yapıldı.",
  },
  {
    id: "c3",
    policyId: "p3",
    policyType: "Asansör Mali Sorumluluk",
    incidentDate: "22.08.2024",
    reportDate: "23.08.2024",
    description:
      "Asansör arızası sırasında kabinde mahsur kalan bir sakin panik atağı geçirdi, ambulans çağrıldı. Kişisel yaralanma tazminatı talep ediliyor.",
    amount: 12000,
    status: "inceleniyor",
    adjuster: "Kemal Arslan",
  },
  {
    id: "c4",
    policyId: "p2",
    policyType: "Konut & Yangın",
    incidentDate: "05.11.2024",
    reportDate: "05.11.2024",
    description:
      "Çatı katındaki elektrik panosunda kısa devre, duman hasarı oluştu. Sigorta şirketine hasar bildirimi yapıldı.",
    amount: 28000,
    status: "beklemede",
  },
  {
    id: "c5",
    policyId: "p4",
    policyType: "Ortak Alan Sorumluluk",
    incidentDate: "14.07.2024",
    reportDate: "15.07.2024",
    description:
      "Islak zemin nedeniyle düşen sakin, bilek kırığı geçirdi. Tıbbi masraf tazminatı talep etti.",
    amount: 8500,
    status: "reddedildi",
    resolution:
      "İlliyet bağı kanıtlanamadı, poliçe kapsamı dışında değerlendirildi.",
  },
];

const STATUS_POLICY: Record<PolicyStatus, { label: string; color: string }> = {
  aktif: { label: "Aktif", color: "bg-green-100 text-green-700" },
  yenilenecek: { label: "Yenilenecek", color: "bg-yellow-100 text-yellow-700" },
  sona_erdi: { label: "Sona Erdi", color: "bg-red-100 text-red-700" },
};

const STATUS_CLAIM: Record<
  ClaimStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  inceleniyor: {
    label: "İnceleniyor",
    color: "bg-blue-100 text-blue-700",
    icon: <Clock className="w-3 h-3" />,
  },
  onaylandi: {
    label: "Onaylandı",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  reddedildi: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="w-3 h-3" />,
  },
  odendi: {
    label: "Ödendi",
    color: "bg-purple-100 text-purple-700",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  beklemede: {
    label: "Beklemede",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="w-3 h-3" />,
  },
};

export default function InsuranceClaimManagement() {
  const [tab, setTab] = useState<"policies" | "claims" | "newClaim">(
    "policies",
  );
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [filterStatus, setFilterStatus] = useState("tumu");

  const totalCoverage = POLICIES.filter((p) => p.status === "aktif").reduce(
    (s, p) => s + p.coverage,
    0,
  );
  const totalPremium = POLICIES.filter((p) => p.status === "aktif").reduce(
    (s, p) => s + p.premium,
    0,
  );
  const activeClaims = CLAIMS.filter(
    (c) => c.status === "inceleniyor" || c.status === "beklemede",
  ).length;
  const paidAmount = CLAIMS.filter((c) => c.status === "odendi").reduce(
    (s, c) => s + c.amount,
    0,
  );

  const filteredClaims =
    filterStatus === "tumu"
      ? CLAIMS
      : CLAIMS.filter((c) => c.status === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0B1B2E]">
          Bina Sigorta & Hasar Yönetimi
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">
          Sigorta poliçeleri, hasar başvuruları ve ekspertiz süreçleri
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Aktif Poliçe Teminatı</p>
          <p className="text-xl font-bold text-[#0B1B2E] mt-1">
            {(totalCoverage / 1000000).toFixed(1)}M ₺
          </p>
          <p className="text-xs text-green-600 mt-1">4 aktif poliçe</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Yıllık Prim Toplamı</p>
          <p className="text-xl font-bold text-[#0B1B2E] mt-1">
            {totalPremium.toLocaleString("tr-TR")} ₺
          </p>
          <p className="text-xs text-gray-500 mt-1">Aktif poliçeler</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Açık Hasar Başvurusu</p>
          <p className="text-xl font-bold text-orange-600 mt-1">
            {activeClaims}
          </p>
          <p className="text-xs text-orange-500 mt-1">İşlemde / Beklemede</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Toplam Tahsil Edilen</p>
          <p className="text-xl font-bold text-purple-700 mt-1">
            {paidAmount.toLocaleString("tr-TR")} ₺
          </p>
          <p className="text-xs text-purple-500 mt-1">Ödenen tazminatlar</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(["policies", "claims", "newClaim"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? "border-[#4A90D9] text-[#4A90D9]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "policies"
              ? "Poliçeler"
              : t === "claims"
                ? "Hasar Başvuruları"
                : "Yeni Başvuru"}
          </button>
        ))}
      </div>

      {/* Policies Tab */}
      {tab === "policies" && (
        <div className="space-y-3">
          {POLICIES.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2E] text-sm">
                      {policy.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {policy.company} · Poliçe No: {policy.policyNo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_POLICY[policy.status].color}`}
                  >
                    {STATUS_POLICY[policy.status].label}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPolicy(
                        selectedPolicy?.id === policy.id ? null : policy,
                      )
                    }
                    className="text-gray-400 hover:text-[#4A90D9]"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400">Teminat:</span>{" "}
                  <span className="font-medium">
                    {policy.coverage.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Yıllık Prim:</span>{" "}
                  <span className="font-medium">
                    {policy.premium.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Bitiş:</span>{" "}
                  <span className="font-medium">{policy.endDate}</span>
                </div>
              </div>
              {selectedPolicy?.id === policy.id && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600">{policy.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Geçerlilik: {policy.startDate} – {policy.endDate}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Claims Tab */}
      {tab === "claims" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {["tumu", "beklemede", "inceleniyor", "odendi", "reddedildi"].map(
              (s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filterStatus === s
                      ? "bg-[#4A90D9] text-white border-[#4A90D9]"
                      : "text-gray-500 border-gray-200 hover:border-[#4A90D9]"
                  }`}
                >
                  {s === "tumu"
                    ? "Tümü"
                    : STATUS_CLAIM[s as ClaimStatus]?.label || s}
                </button>
              ),
            )}
          </div>
          {filteredClaims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2E] text-sm">
                      {claim.policyType}
                    </p>
                    <p className="text-xs text-gray-500">
                      Olay: {claim.incidentDate} · Bildirim: {claim.reportDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${STATUS_CLAIM[claim.status].color}`}
                  >
                    {STATUS_CLAIM[claim.status].icon}
                    {STATUS_CLAIM[claim.status].label}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedClaim(
                        selectedClaim?.id === claim.id ? null : claim,
                      )
                    }
                    className="text-gray-400 hover:text-[#4A90D9]"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {claim.description}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-gray-500">
                  Talep Edilen:{" "}
                  <span className="font-semibold text-[#0B1B2E]">
                    {claim.amount.toLocaleString("tr-TR")} ₺
                  </span>
                </span>
                {claim.adjuster && (
                  <span className="text-gray-500">
                    Eksper:{" "}
                    <span className="font-medium">{claim.adjuster}</span>
                  </span>
                )}
              </div>
              {selectedClaim?.id === claim.id && claim.resolution && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-700">Sonuç:</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {claim.resolution}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Claim Tab */}
      {tab === "newClaim" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-lg">
          <h3 className="font-semibold text-[#0B1B2E] mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Yeni Hasar Başvurusu
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="nc-policy"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                İlgili Poliçe
              </label>
              <select
                id="nc-policy"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#4A90D9]"
              >
                <option value="">Poliçe seçin...</option>
                {POLICIES.filter((p) => p.status === "aktif").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.type} – {p.company}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="nc-date"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Olay Tarihi
              </label>
              <input
                id="nc-date"
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9]"
              />
            </div>
            <div>
              <label
                htmlFor="nc-desc"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Hasar Açıklaması
              </label>
              <textarea
                id="nc-desc"
                rows={3}
                placeholder="Hasarın nasıl oluştuğunu ve etkilenen alanları açıklayın..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9] resize-none"
              />
            </div>
            <div>
              <label
                htmlFor="nc-amount"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Tahmini Hasar Tutarı (₺)
              </label>
              <input
                id="nc-amount"
                type="number"
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4A90D9]"
              />
            </div>
            <div>
              <label
                htmlFor="nc-type"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Hasar Türü
              </label>
              <select
                id="nc-type"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#4A90D9]"
              >
                <option>Yangın</option>
                <option>Su Hasarı / Boru Patlaması</option>
                <option>Deprem</option>
                <option>Hırsızlık</option>
                <option>Vandalizm</option>
                <option>Şiddetli Hava Koşulları</option>
                <option>Kaza / Yaralanma</option>
                <option>Diğer</option>
              </select>
            </div>
            <button
              type="button"
              className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> Başvuruyu Gönder
            </button>
            <p className="text-xs text-gray-400 text-center">
              Başvuru sigorta şirketine iletilecek ve eksper ataması
              yapılacaktır.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
