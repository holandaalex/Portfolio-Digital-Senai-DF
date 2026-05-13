import {
  BookOpen,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import senaiLogo from "@/assets/senai-logo-header.png";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const navItems = [
  { label: "Áreas tecnológicas", href: "/#areas", Icon: BookOpen },
  { label: "Cursos", href: "/#cursos", Icon: GraduationCap },
  { label: "Contato", href: "/#contato", Icon: Phone },
  { label: "Privacidade", href: "/politica-de-privacidade", Icon: ShieldCheck },
];

const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="left"
      className="w-[min(88vw,360px)] overflow-y-auto border-r-primary/15 bg-background p-0"
    >
      <div className="flex min-h-full flex-col">
        <div className="border-b border-border bg-secondary/35 px-5 pb-5 pt-6">
          <img
            src={senaiLogo}
            alt="Logo SENAI"
            className="mb-5 h-auto w-[148px]"
            loading="lazy"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            Portal de cursos
          </p>
          <h2 className="mt-2 text-xl font-black leading-tight text-foreground">
            Formação profissional para a indústria
          </h2>
        </div>

        <nav aria-label="Menu mobile" className="grid gap-2 px-4 py-5">
          {navItems.map(({ label, href, Icon }) => (
            <SheetClose asChild key={href}>
              <Link
                to={href}
                className="group flex min-h-14 items-center gap-3 rounded-[8px] border border-transparent px-3 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/15 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto border-t border-border bg-primary px-5 py-5 text-primary-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            Atendimento SENAI/FIBRA
          </p>
          <a
            href="tel:+556140426565"
            className="mt-3 flex items-center gap-3 rounded-[8px] bg-primary-foreground px-3 py-3 text-sm font-black text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            (61) 4042 6565
          </a>
          <div className="mt-4 grid gap-2 text-[12px] leading-5 text-primary-foreground/80">
            <p className="flex gap-2">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Segunda a sexta, das 8h às 18h30
            </p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              SIA Trecho 3, Lote 225 - Brasília/DF
            </p>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export default MobileMenu;
