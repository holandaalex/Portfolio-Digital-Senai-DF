import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Developer - Alexsander Barreto - FIBRA
// Banner de consentimento de cookies — conformidade com a LGPD (Lei nº 13.709/2018).
// Persiste a escolha do usuário em localStorage para evitar reapresentação a cada visita.

const STORAGE_KEY = "senai-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora ambientes sem storage (modo privado/SSR) */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 shadow-xl sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-5 text-muted-foreground sm:text-[13px]">
          Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site. Ao
          continuar navegando, você concorda com nossa{" "}
          <Link to="/politica-de-privacidade" className="font-semibold text-primary underline">
            Política de Privacidade
          </Link>
          , em conformidade com a LGPD.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => persist("rejected")}>
            Rejeitar
          </Button>
          <Button size="sm" onClick={() => persist("accepted")}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;