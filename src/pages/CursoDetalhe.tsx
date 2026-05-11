import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Sun,
  CalendarDays,
  Clock3,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
} from "@/components/ui/sheet";
import senaiLogo from "@/assets/senai-logo.png";
import heroBanner from "@/assets/hero/curso-detalhe-banner.jpg";
import contatoBg from "@/assets/hero/contato.jpg";
import { mockCourses } from "@/pages/Cursos";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Developer - Alexsander Barreto - FIBRA

/** Seções do accordion (Conteúdo programático, Requisitos, Perfil profissional). */
const accordionSections = [
  {
    title: "Conteúdo programático",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    title: "Requisitos",
    body: "Idade mínima de 16 anos, ensino fundamental completo e disponibilidade no turno escolhido.",
  },
  {
    title: "Perfil profissional",
    body: "Profissional capacitado para atuar em indústrias do setor, seguindo as melhores práticas e normas técnicas.",
  },
];

/** Estatísticas institucionais exibidas na faixa azul. */
const stats = [
  { value: "25+", label: "Year of experience" },
  { value: "6.500+", label: "Class Completed" },
  { value: "100+", label: "Experts Instructors" },
  { value: "6.561+", label: "Students Enrolled" },
];

const CursoDetalhe = () => {
  const { area, id } = useParams<{ area?: string; id?: string }>();
  const macroArea = area ? decodeURIComponent(area) : "Segurança";
  const course = mockCourses.find((c) => String(c.id) === id) ?? mockCourses[0];

  /** Controla qual seção do accordion está aberta. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      {/* Header igual ao das demais páginas */}
      <header className="border-b border-transparent bg-background">
        <div className="section-container flex h-[72px] items-center justify-between gap-4 md:h-[88px]">
          <Link to="/">
            <img
              src={senaiLogo}
              alt="Logo SENAI"
              className="senai-logo"
              width={128}
              height={48}
            />
          </Link>
          <nav
            className="hidden items-center gap-8 lg:gap-10 md:flex"
            aria-label="Navegação principal"
          >
            <Link to="/#areas" className="nav-link-senai">
              Áreas
            </Link>
            <Link to="/#cursos" className="nav-link-senai">
              Cursos
            </Link>
            <Link to="/#contato" className="nav-link-senai">
              Contatos
            </Link>
          </nav>
          <Button
            variant="outline"
            size="icon"
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-[6px] border-foreground/60 bg-background md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Menu Mobile - Drawer */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetOverlay />
            <SheetContent side="left" className="w-full sm:w-80">
              <div className="flex h-full flex-col gap-4 pt-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <img
                    src={senaiLogo}
                    alt="Logo SENAI"
                    width={100}
                    height={36}
                  />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link
                      to="/#areas"
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      Áreas
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/#cursos"
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      Cursos
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/#contato"
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      Contatos
                    </Link>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero do curso — fundo rosa institucional com card de inscrição lateral */}
      <section
        aria-label={`Banner ${course.title}`}
        className="relative w-full overflow-hidden hero-panel"
      >
        <div className="section-container relative grid gap-8 py-10 md:grid-cols-[1fr_320px] md:py-16 lg:gap-12">
          <div className="min-w-0 text-foreground">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/70 sm:text-[12px]">
              {macroArea}
            </p>
            <h1 className="mb-2 break-words text-2xl font-extrabold uppercase leading-tight sm:text-3xl md:text-[2.2rem] lg:text-[2.4rem]">
              {course.title}
            </h1>
            <p className="mb-6 text-sm italic text-foreground/80">
              <span className="font-semibold">{course.modality}</span>{" "}
              <span className="text-muted-foreground">|</span>{" "}
              <span className="font-semibold">{course.level}</span>
            </p>
            <ul className="grid gap-2 text-[13px] text-foreground/85 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Início: {course.startDate} | Término: 12/01/2027</span>
              </li>
              <li className="flex items-start gap-2">
                <Sun className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{course.shift} e Matutino</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{course.hours} de aula</span>
              </li>
              <li className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Aulas de segunda a sexta</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{course.locations.join(" | ")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>08:00 - 17:00</span>
              </li>
            </ul>
          </div>

          {/* Card de inscrição flutuante */}
          <aside className="w-full self-start rounded-[10px] bg-background p-5 shadow-[0_10px_24px_hsl(var(--soft-shadow))] md:mt-2">
            <p className="mb-2 text-sm font-extrabold text-green-600">
              {course.status}
            </p>
            <p className="mb-4 text-[12px] leading-5 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna.
            </p>
            <button type="button" className="btn-senai-accent w-full">
              Fazer pré-inscrição
            </button>
          </aside>
        </div>
      </section>

      {/* Descrição + Oportunidades + Accordion */}
      <section className="section-container py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-3 text-xl font-extrabold text-foreground">
            Descrição
          </h2>
          <p className="mb-8 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>

          <h3 className="mb-3 text-base font-extrabold text-foreground">
            Oportunidades de trabalho
          </h3>
          <p className="mb-8 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>

          <div className="space-y-2">
            {accordionSections.map((s, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={s.title}
                  className="overflow-hidden rounded-[6px] border-l-4 border-l-accent bg-secondary/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-bold text-foreground"
                    aria-expanded={open}
                  >
                    <span>{s.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <p className="px-4 pb-4 text-[13px] leading-6 text-muted-foreground">
                      {s.body}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Faixa de estatísticas */}
      <section className="bg-primary text-primary-foreground">
        <div className="section-container grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-2xl font-extrabold md:text-3xl">{s.value}</p>
              <p className="text-[12px] uppercase tracking-wide opacity-90">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Como me inscrever */}
      <section className="section-container py-12">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-4 text-2xl font-extrabold uppercase text-primary">
            Como me inscrever?
          </h2>
          <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      </section>

      {/* Entre em contato */}
      <section
        aria-label="Entre em contato"
        className="relative w-full"
        style={{
          backgroundImage: `url(${contatoBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="contact-overlay">
          <div className="section-container grid gap-10 py-16 md:grid-cols-2">
            <div className="text-primary-foreground">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em]">
                Precisa de ajuda?
              </p>
              <h2 className="mb-4 text-3xl font-extrabold uppercase md:text-4xl">
                Entre em contato
              </h2>
              <p className="mb-4 text-[13px] leading-6 opacity-90">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
              <p className="text-[13px] leading-6 opacity-90">
                Preencha o formulário ao lado e entraremos em contato.
              </p>
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Nome" className="form-field-senai" />
              <Input
                placeholder="E-mail"
                type="email"
                className="form-field-senai"
              />
              <Input placeholder="Telefone" className="form-field-senai" />
              <Input placeholder="Assunto" className="form-field-senai" />
              <Textarea placeholder="Mensagem" className="textarea-senai" />
              <button type="submit" className="btn-senai-accent w-full">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default CursoDetalhe;
