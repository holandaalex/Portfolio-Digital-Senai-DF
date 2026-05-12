import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import senaiLogoFooter from "@/assets/areas/footer_senai_branco.png";

// Developer - Alexsander Barreto - FIBRA

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/sistemafibra", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/sistemafibra", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/sistema-fibra", label: "LinkedIn" },
  { Icon: Youtube, href: "https://www.youtube.com/@SistemaFibra", label: "YouTube" },
];

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="section-container flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
      <img src={senaiLogoFooter} alt="Logo SENAI" className="senai-logo bg-primary-foreground/95 rounded px-2 py-1" loading="lazy" />

      <nav aria-label="Redes sociais" className="flex items-center gap-4">
        {socials.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/25"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-1 text-[12px] text-primary-foreground/80 md:items-end">
        <Link to="/politica-de-privacidade" className="hover:underline">
          Política de Privacidade
        </Link>
        <span>Copyright ©2026 — SENAI/FIBRA</span>
      </div>
    </div>
  </footer>
);

export default Footer;