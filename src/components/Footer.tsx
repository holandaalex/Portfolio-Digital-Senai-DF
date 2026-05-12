import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import senaiLogoFooter from "@/assets/senai-logo-footer.png";

// Developer - Alexsander Barreto - FIBRA

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
];

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="section-container flex flex-col items-center text-center gap-8 py-12">
      <img
        src={senaiLogoFooter}
        alt="Logo SENAI"
        className="senai-logo bg-primary-foreground/95 rounded px-2 py-1"
        loading="lazy"
      />

      <div className="max-w-[760px] text-sm text-primary-foreground/80 leading-7">
        <p>
          Centro de excelência em educação profissional e tecnológica, formando profissionais qualificados para o mercado de trabalho.
        </p>
      </div>

      <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col items-center gap-4">
          <div className="space-y-2">
            <p className="font-semibold text-primary-foreground">Endereço</p>
            <p>SIA Trecho 3, Lote 225 Ed. Sede FIBRA</p>
            <p>Brasília - DF - CEP: 71200-030</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-primary-foreground">SAC Sistema Fibra</p>
            <p>(61) 4042 6565</p>
            <p>Horário de Atendimento:</p>
            <p>De Segunda a Sexta-feira / das 8h às 18:30h</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-4 gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-primary-foreground/25 hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm text-primary-foreground/80">
            <p className="font-semibold text-primary-foreground">Links de redes sociais</p>
            <a className="block hover:underline" href="https://www.facebook.com/fibradf?ref=tn_tnmn" target="_blank" rel="noopener noreferrer">
              facebook.com/fibradf?ref=tn_tnmn
            </a>
            <a className="block hover:underline" href="https://www.instagram.com/fibra_df/" target="_blank" rel="noopener noreferrer">
              instagram.com/fibra_df
            </a>
            <a className="block hover:underline" href="https://www.youtube.com/channel/UChcNrZWnl5MH6RX84ORcreQ" target="_blank" rel="noopener noreferrer">
              youtube.com/channel/UChcNrZWnl5MH6RX84ORcreQ
            </a>
            <a className="block hover:underline" href="https://www.linkedin.com/company/sistemafibra/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              linkedin.com/company/sistemafibra/posts/?feedView=all
            </a>
            <a className="block hover:underline" href="https://www.flickr.com/photos/132833613@N03/" target="_blank" rel="noopener noreferrer">
              flickr.com/photos/132833613@N03
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 pt-6 text-sm text-primary-foreground/60">
        <p>Copyright ©2026 — SENAI/FIBRA. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
