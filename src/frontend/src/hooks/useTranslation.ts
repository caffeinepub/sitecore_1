import { useAuth } from "../context/AuthContext";
import { getTranslation } from "../i18n";

export function useTranslation() {
  const { language } = useAuth();
  const t = getTranslation(language);
  return { t, language };
}
