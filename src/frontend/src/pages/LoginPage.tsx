import { AlertTriangle, Building2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import { useTranslation } from "../hooks/useTranslation";
import type { BackendActor } from "../types";

export default function LoginPage() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { setUser, setUserId } = useAuth();
  const { t } = useTranslation();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginCode, setLoginCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newCode, setNewCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const backend = actor as unknown as BackendActor;

  const handleLogin = async () => {
    if (!backend || !loginCode.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await backend.loginWithCode(
        loginCode.trim().toUpperCase(),
      );
      if ("ok" in result) {
        setUser(result.ok);
        setUserId(result.ok.id);
        navigate("/dashboard");
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!backend || !displayName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await backend.registerUser(displayName.trim());
      if ("ok" in result) {
        setNewCode(result.ok.loginCode);
        setRegistrationDone(true);
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinueAfterRegister = async () => {
    if (!backend) return;
    setLoading(true);
    try {
      const result = await backend.loginWithCode(newCode);
      if ("ok" in result) {
        setUser(result.ok);
        setUserId(result.ok.id);
        navigate("/dashboard");
      }
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="w-8 h-8 text-[#0B1B2E]" />
          <span className="text-2xl font-bold text-[#0B1B2E]">SITECORE</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#E5EAF2] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "bg-[#0B1B2E] text-white"
                  : "bg-[#F1F4F8] text-[#3A4654] hover:bg-[#E5EAF2]"
              }`}
            >
              {t.login}
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "register"
                  ? "bg-[#0B1B2E] text-white"
                  : "bg-[#F1F4F8] text-[#3A4654] hover:bg-[#E5EAF2]"
              }`}
            >
              {t.register}
            </button>
          </div>

          <div className="p-8">
            {tab === "login" ? (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-[#0E1116]">
                  {t.enterLoginCode}
                </h2>
                <div>
                  <p className="text-sm font-medium text-[#3A4654] block mb-2">
                    {t.loginCode}
                  </p>
                  <Input
                    value={loginCode}
                    onChange={(e) => setLoginCode(e.target.value.toUpperCase())}
                    placeholder={t.loginCodePlaceholder}
                    maxLength={16}
                    className="font-mono tracking-widest text-center text-lg h-12 border-[#D7DEE9]"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  onClick={handleLogin}
                  disabled={loading || !loginCode.trim()}
                  className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full h-12 font-semibold"
                >
                  {loading ? t.loading : t.login}
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {!registrationDone ? (
                  <>
                    <h2 className="text-xl font-bold text-[#0E1116]">
                      {t.enterName}
                    </h2>
                    <div>
                      <p className="text-sm font-medium text-[#3A4654] block mb-2">
                        {t.displayName}
                      </p>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={t.displayNamePlaceholder}
                        className="h-12 border-[#D7DEE9]"
                        onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      onClick={handleRegister}
                      disabled={loading || !displayName.trim()}
                      className="w-full bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full h-12 font-semibold"
                    >
                      {loading ? t.loading : t.createAccount}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-[#0E1116]">
                      {t.yourLoginCode}
                    </h2>
                    <div className="bg-[#F1F4F8] rounded-xl p-4 text-center">
                      <p className="font-mono text-2xl font-bold text-[#0B1B2E] tracking-widest mb-3">
                        {newCode}
                      </p>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-full border-[#D7DEE9]"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copied ? t.copied : t.copyCode}
                      </Button>
                    </div>
                    <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-700 text-sm">
                        {t.saveCodeWarning}
                      </p>
                    </div>
                    <Button
                      onClick={handleContinueAfterRegister}
                      disabled={loading}
                      className="w-full bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full h-12 font-semibold"
                    >
                      {loading ? t.loading : t.continue}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-[#4A90D9] hover:underline"
          >
            ← {t.back}
          </button>
        </p>
      </div>
    </div>
  );
}
