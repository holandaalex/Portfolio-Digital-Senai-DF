import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import senaiLogoFooter from "@/assets/areas/senai_branco.png";

// Developer - Alexsander Barreto - FIBRA

const socials = [
  {
    Icon: Facebook,
    href: "https://www.facebook.com/sistemafibra",
    label: "Facebook",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/sistemafibra",
    label: "Instagram",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/sistema-fibra",
    label: "LinkedIn",
  },
  {
    Icon: Youtube,
    href: "https://www.youtube.com/@SistemaFibra",
    label: "YouTube",
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="section-container py-12">
      {/* Seção principal com logo e navegação */}
      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo e descrição */}
        <div className="lg:col-span-1">
          <img
            src={senaiLogoFooter}
            alt="Logo SENAI"
            className="senai-logo bg-primary-foreground/95 rounded px-2 py-1 mb-4"
            loading="lazy"
          />
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            Centro de excelência em educação profissional e tecnológica, formando profissionais qualificados para o mercado de trabalho.
          </p>
        </div>

        {/* Navegação rápida */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-primary-foreground mb-4">Navegação</h3>
          <nav className="flex flex-col gap-2">
            <a href="#areas" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Áreas Tecnológicas
            </a>
            <a href="#cursos" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Cursos
            </a>
            <a href="#contato" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Contato
            </a>
            <Link to="/politica-de-privacidade" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Política de Privacidade
            </Link>
          </nav>
        </div>

        {/* Informações de contato */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-primary-foreground mb-4">Contato</h3>
          <div className="space-y-2 text-sm text-primary-foreground/80">
            <p>📍 Brasília - DF</p>
            <p>📞 (61) 3321-0000</p>
            <p>✉️ contato@senai.br</p>
          </div>
        </div>

        {/* Redes sociais */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-primary-foreground mb-4">Redes Sociais</h3>
          <nav aria-label="Redes sociais" className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-all hover:bg-primary-foreground/25 hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-primary-foreground/60">
          Copyright ©2026 — SENAI/FIBRA. Todos os direitos reservados.
        </p>
        <p className="text-xs text-primary-foreground/40">
          Desenvolvido com ❤️ para a formação profissional brasileira
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
