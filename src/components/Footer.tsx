import {
  Clock,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import senaiLogoFooter from "@/assets/senai-logo-footer.png";

// Developer - Alexsander Barreto - FIBRA

const quickLinks = [
  { label: "Áreas tecnológicas", href: "/#areas" },
  { label: "Cursos", href: "/#cursos" },
  { label: "Contato", href: "/#contato" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

const socials = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/fibradf?ref=tn_tnmn",
    label: "Facebook",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/fibra_df/",
    label: "Instagram",
  },
  {
    Icon: Youtube,
    href: "https://www.youtube.com/channel/UChcNrZWnl5MH6RX84ORcreQ",
    label: "YouTube",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/sistemafibra/posts/?feedView=all",
    label: "LinkedIn",
  },
  {
    Icon: Globe,
    href: "https://www.flickr.com/photos/132833613@N03/",
    label: "Flickr",
  },
];

const Footer = () => (
  <footer className="border-t border-primary-foreground/10 bg-primary text-primary-foreground">
    <div className="section-container py-10 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-12">
        <section aria-label="Resumo institucional" className="space-y-5">
          <img
            src={senaiLogoFooter}
            alt="Logo SENAI"
            className="h-auto w-[170px] rounded-[4px] bg-primary-foreground/95 px-2 py-1"
            loading="lazy"
          />

          <p className="max-w-[520px] text-sm leading-7 text-primary-foreground/82">
            Educação profissional e tecnológica para conectar pessoas,
            indústria e futuro do trabalho no Distrito Federal.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-sm border border-primary-foreground/18 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground/82">
              SENAI DF
            </span>
            <span className="rounded-sm border border-primary-foreground/18 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground/82">
              Sistema FIBRA
            </span>
          </div>
        </section>

        <nav aria-label="Links do rodapé" className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em]">
            Navegação
          </h2>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-sm text-primary-foreground/78 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Atendimento" className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em]">
            Atendimento
          </h2>

          <address className="space-y-3 text-sm not-italic text-primary-foreground/78">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground" />
              <span>
                SIA Trecho 3, Lote 225, Ed. Sede FIBRA
                <br />
                Brasília - DF - CEP: 71200-030
              </span>
            </p>

            <p className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground" />
              <a
                href="tel:+556140426565"
                className="font-semibold text-primary-foreground transition-opacity hover:opacity-80"
              >
                (61) 4042 6565
              </a>
            </p>

            <p className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground" />
              <span>Segunda a sexta, das 8h às 18h30</span>
            </p>
          </address>
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-primary-foreground/18 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-primary-foreground/60">
          Copyright ©2026 — SENAI/FIBRA. Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/58">
            Redes
          </span>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary-foreground/18 bg-primary-foreground/8 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
