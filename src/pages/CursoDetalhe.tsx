import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Sun,
  CalendarDays,
  Clock3,
  Menu,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import senaiLogo from "@/assets/senai-logo-header.png";
import heroBanner from "@/assets/hero/curso-detalhe-banner.jpg";
import contatoBg from "@/assets/hero/contato.jpg";
import { mockCourses } from "@/pages/Cursos";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileMenu from "@/components/MobileMenu";
import CountUpNumber from "@/components/CountUpNumber";

// Developer - Alexsander Barreto - FIBRA

/** Seções do accordion (Conteúdo programático, Requisitos, Perfil profissional). */
const accordionSections = [
  {
    title: "Conteúdo programático",
    body: "Módulos práticos sobre normas de segurança, operação de equipamentos, controle de qualidade e inovação aplicada ao dia a dia industrial.",
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
  { value: 25, label: "Anos de experiência" },
  { value: 6500, label: "Turmas formadas" },
  { value: 100, label: "Especialistas em sala" },
  { value: 6561, label: "Alunos em evolução" },
];

const CadastroInteresseDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className="w-full rounded-[6px] bg-[#f39200] px-4 py-3 text-[14px] font-bold text-white shadow-md transition-all hover:bg-[#d97c00] hover:shadow-lg active:scale-[0.98]"
      >
        Cadastro de interesse
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-0 shadow-2xl rounded-xl">
      <div className="bg-white px-8 py-8 md:px-10 md:py-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[26px] font-extrabold text-[#2a3b4c] tracking-tight">
            Cadastro de interesse
          </DialogTitle>
          <DialogDescription className="text-[15px] text-[#5a6a7c] mt-2.5 leading-relaxed">
            Preencha o cadastro de interesse e seja avisado quando forem abertas novas turmas.
          </DialogDescription>
        </DialogHeader>
        
        <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); alert('Cadastro enviado para o gestor!'); }}>
          <div className="grid gap-2">
            <Label htmlFor="nome" className="text-[12px] font-black text-[#005cac] uppercase tracking-wider">NOME*</Label>
            <Input id="nome" required className="bg-[#f2f6fa] border-2 border-transparent h-12 text-[15px] text-[#2a3b4c] rounded-lg transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#005cac] focus-visible:bg-white hover:bg-[#eaf0f5]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grid gap-2">
              <Label htmlFor="tel1" className="text-[12px] font-black text-[#005cac] uppercase tracking-wider">TELEFONE (opção 1)*</Label>
              <Input id="tel1" required placeholder="(XX) - _____-____" className="bg-[#f2f6fa] border-2 border-transparent h-12 text-[15px] text-[#2a3b4c] rounded-lg transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#005cac] focus-visible:bg-white hover:bg-[#eaf0f5] placeholder:text-[#9aa7b5]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tel2" className="text-[12px] font-black text-[#005cac] uppercase tracking-wider">TELEFONE (opção 2)</Label>
              <Input id="tel2" placeholder="(XX) - _____-____" className="bg-[#f2f6fa] border-2 border-transparent h-12 text-[15px] text-[#2a3b4c] rounded-lg transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#005cac] focus-visible:bg-white hover:bg-[#eaf0f5] placeholder:text-[#9aa7b5]" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-[12px] font-black text-[#005cac] uppercase tracking-wider">E-MAIL*</Label>
            <Input id="email" type="email" required className="bg-[#f2f6fa] border-2 border-transparent h-12 text-[15px] text-[#2a3b4c] rounded-lg transition-all duration-200 focus-visible:ring-0 focus-visible:border-[#005cac] focus-visible:bg-white hover:bg-[#eaf0f5]" />
          </div>

          <div className="grid gap-3 mt-2">
            <Label className="text-[12px] font-black text-[#005cac] uppercase tracking-wider">TURNO*</Label>
            <RadioGroup defaultValue="matutino" className="flex flex-wrap gap-5 md:gap-8">
              <div className="flex items-center space-x-2.5">
                <RadioGroupItem value="matutino" id="r1" className="w-5 h-5 border-2 text-[#005cac] border-[#005cac] focus:ring-[#005cac]" />
                <Label htmlFor="r1" className="font-medium text-[15px] text-[#4a5a6c] cursor-pointer">Matutino</Label>
              </div>
              <div className="flex items-center space-x-2.5">
                <RadioGroupItem value="vespertino" id="r2" className="w-5 h-5 border-2 text-[#005cac] border-[#005cac] focus:ring-[#005cac]" />
                <Label htmlFor="r2" className="font-medium text-[15px] text-[#4a5a6c] cursor-pointer">Vespertino</Label>
              </div>
              <div className="flex items-center space-x-2.5">
                <RadioGroupItem value="noturno" id="r3" className="w-5 h-5 border-2 text-[#005cac] border-[#005cac] focus:ring-[#005cac]" />
                <Label htmlFor="r3" className="font-medium text-[15px] text-[#4a5a6c] cursor-pointer">Noturno</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-4">
            <Button type="submit" className="w-full bg-[#f39200] hover:bg-[#d97c00] text-white font-extrabold text-[16px] h-14 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
              Enviar
            </Button>
            <p className="text-[12px] text-[#8a9aa8] font-medium mt-4">* Campos obrigatórios</p>
          </div>
        </form>
      </div>
    </DialogContent>
  </Dialog>
);

const CursoDetalhe = () => {
  const { area, id } = useParams<{ area?: string; id?: string }>();
  const macroArea = area ? decodeURIComponent(area) : "Segurança";
  const course = mockCourses.find((c) => String(c.id) === id) ?? mockCourses[0];

  /** Controla qual seção do accordion está aberta. */
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const section = statsRef.current;
    if (!section || statsStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [statsStarted]);

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
              loading="lazy"
            />
          </Link>
          <nav
            className="hidden items-center gap-8 lg:gap-10 md:flex"
            aria-label="Navegação principal"
          >
            <Link to="/#areas" className="nav-link-senai">
              Áreas Tecnológicas
            </Link>
            <Link to="/#cursos" className="nav-link-senai">
              Cursos
            </Link>
            <Link to="/aprendizagem" className="nav-link-senai">
              Aprendizagem Industrial
            </Link>
            <Link to="/#senaipro" className="nav-link-senai">
              Senai PRO
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

          <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
        </div>
      </header>

      {/* Hero do curso — fundo rosa institucional com card de inscrição lateral */}
      <section
        aria-label={`Banner ${course.title}`}
        className="relative w-full overflow-hidden hero-panel"
      >
        <div className="section-container relative grid gap-8 py-10 md:grid-cols-[1fr_320px] md:py-16 lg:gap-12">
          <div className="min-w-0 text-foreground">
            {/* Macro-Área */}
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-primary sm:text-[12px]">
              {macroArea}
            </p>
            
            {/* Título Principal (removido uppercase para leitura mais premium/institucional) */}
            <h1 className="mb-4 break-words text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] lg:text-[2.8rem]">
              {course.title}
            </h1>
            
            {/* Modalidade e Nível com Badges Institucionais */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-primary">
                {course.modality}
              </span>
              <span className="inline-flex items-center rounded-md border border-border bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {course.level}
              </span>
            </div>
            
            {/* Grade de Informações Organizadas em "Cards" sutis */}
            <ul className="grid gap-3 text-[13.5px] text-foreground/90 sm:grid-cols-2">
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <Calendar className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">Início: {course.startDate} <span className="text-muted-foreground mx-1">|</span> Término: 12/01/2027</span>
              </li>
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <Sun className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">{course.shift} e Matutino</span>
              </li>
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <Clock className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">{course.hours} de aula</span>
              </li>
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <CalendarDays className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">Aulas de segunda a sexta</span>
              </li>
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <MapPin className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">{course.locations.join(" | ")}</span>
              </li>
              <li className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors hover:bg-white">
                <Clock3 className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="font-medium">08:00 - 17:00</span>
              </li>
            </ul>
          </div>

          {/* Card de turmas abertas / interesse flutuante */}
          <aside className="w-full self-start rounded-[16px] bg-background p-6 shadow-[0_10px_24px_hsl(var(--soft-shadow))] md:mt-2">
            {course.status === "TURMAS ABERTAS" || course.availability === "Vagas abertas" ? (
              <>
                <h3 className="mb-4 text-[1.1rem] font-black text-[#429E50]">
                  Turmas abertas
                </h3>
                <div className="mb-5 flex flex-col gap-2.5">
                  {course.locations.map((loc, idx) => (
                    <button
                      key={`${loc}-${idx}`}
                      className="w-full rounded-[6px] bg-[#c32328] px-4 py-3 text-center text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {loc} - {course.shift}
                    </button>
                  ))}
                </div>
                <hr className="mb-4 border-border" />
                <p className="mb-5 text-[13px] leading-relaxed text-foreground/80">
                  Não encontrou a turma na escola ou no horário que gostaria? Preencha o cadastro de interesse e seja avisado quando forem abertas novas turmas.
                </p>
                <CadastroInteresseDialog />
              </>
            ) : (
              <>
                <p className="mb-5 text-[13px] leading-relaxed text-foreground/80">
                  Não há vagas abertas no momento. Preencha o cadastro de interesse e seja avisado quando forem abertas novas turmas.
                </p>
                <hr className="mb-4 border-border" />
                <CadastroInteresseDialog />
              </>
            )}
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
            Este curso foi criado para formar profissionais capazes de atuar em
            ambientes industriais, com metodologias práticas, estudos de caso
            reais e suporte de professores especialistas.
          </p>

          <h3 className="mb-3 text-base font-extrabold text-foreground">
            Oportunidades de trabalho
          </h3>
          <p className="mb-8 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Ao concluir, você estará preparado para atuar em equipes técnicas,
            gerenciar processos produtivos e contribuir com melhorias reais em
            empresas do setor.
          </p>

          <div className="space-y-2">
            {[
              {
                title: "Conteúdo programático",
                body: ('description' in course ? String(course.description) : "Módulos práticos sobre normas de segurança, operação de equipamentos, controle de qualidade e inovação aplicada ao dia a dia industrial."),
              },
              {
                title: "Requisitos",
                body: ('requirements' in course ? String(course.requirements) : "Idade mínima de 16 anos, ensino fundamental completo e disponibilidade no turno escolhido."),
              },
              {
                title: "Perfil profissional",
                body: "Profissional capacitado para atuar no setor, seguindo as melhores práticas e normas técnicas de mercado.",
              },
            ].map((s, i) => {
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
      <section
        ref={statsRef}
        className="bg-primary text-primary-foreground"
      >
        <div className="section-container grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <p className="text-2xl font-extrabold md:text-3xl">
                <CountUpNumber
                  active={statsStarted}
                  end={s.value}
                  suffix="+"
                />
              </p>
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
            Para se inscrever, escolha o curso, preencha seus dados no
            formulário e aguarde o contato da equipe FIBRA para confirmar sua
            matrícula e orientá-lo sobre os próximos passos.
          </p>
        </div>
      </section>

      {/* Entre em contato */}
      <section
        aria-label="Entre em contato"
        className="contact-parallax relative w-full"
        style={{ backgroundImage: `url(${contatoBg})` }}
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
                Nossa equipe está pronta para orientar sua matrícula, esclarecer
                dúvidas sobre horários e ajudar você a preparar a documentação
                necessária.
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
