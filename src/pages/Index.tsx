// PAGINA: INICIO (HOME PAGE)
// Conteudo: Hero + Carrossel de Areas + Busca com Autocomplete + Grid de Areas + Formulario Contato
// Conceitos React: useState (carrossel), useEffect (scroll automatico), useMemo (busca filtrada)

import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  HardHat,
  Menu,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import senaiLogo from "@/assets/senai-logo.png";
import senaiLogoHeader from "@/assets/senai-logo-header.png";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileMenu from "@/components/MobileMenu";
// Banner completo da seção "Produção Alimentícia" — substitui o layout dividido (faixa rosa + foto)
import heroFoodBanner from "@/assets/areas/SLIDERS_ProduçãoIndustrial.jpg";
import heroSecurityBanner from "@/assets/areas/SLIDERS_Segurança.jpg";
import heroEnergyBanner from "@/assets/areas/SLIDERS_SistemasEnergia.jpg";
import heroWorkers from "@/assets/hero/trabalhadores.png";
import contactHero from "@/assets/hero/contato.jpg";
import areaEletronica from "@/assets/areas/eletronica.jpg";
import areaEnergia from "@/assets/areas/sistemas-energia.jpg";
import areaManutencao from "@/assets/areas/manutencao.jpg";
import areaMetalmecanica from "@/assets/areas/metalmecanica.jpg";
import areaGerencial from "@/assets/areas/gerencial.jpg";
import areaFinanceira from "@/assets/areas/operacoes-financeiras.jpg";
import areaDev from "@/assets/areas/desenvolvimento-sistemas.jpg";
import areaInfra from "@/assets/areas/infraestrutura-ti.jpg";
import areaConstrucao from "@/assets/areas/construcao-obras.jpg";
import areaAlimentos from "@/assets/areas/producao-alimenticia.jpg";
import areaDesign from "@/assets/areas/design.jpg";
import areaManufatura from "@/assets/areas/manufatura.jpg";
import areaSeguranca from "@/assets/areas/seguranca.jpg";
import areaTextil from "@/assets/areas/textil-vestuario.jpg";

// Developer - Alexsander Barreto - FIBRA

const stages = [
  { title: "Profissionalizante", hours: "1200h", icon: BriefcaseBusiness },
  { title: "Técnico", hours: "1200h", icon: BadgeCheck },
  { title: "Superior", hours: "1200h", icon: GraduationCap },
  { title: "Certificação", hours: "1200h", icon: BookOpen },
];

const stats = [
  { value: "25+", label: "Anos formando talentos", icon: Users },
  { value: "6.500+", label: "Turmas concluídas", icon: GraduationCap },
  { value: "100+", label: "Instrutores especialistas", icon: HardHat },
  { value: "6.561+", label: "Alunos preparados", icon: ShieldCheck },
];

const areas = [
  {
    group: "Controle e Processos Industriais",
    title: "Eletrônica e Automação",
    image: areaEletronica,
    description:
      "Formação para atuar com circuitos, sensores, comandos elétricos, automação industrial e integração de sistemas inteligentes.",
  },
  {
    group: "Controle e Processos Industriais",
    title: "Sistemas de Energia",
    image: areaEnergia,
    description:
      "Cursos voltados à geração, distribuição, eficiência energética e tecnologias aplicadas a sistemas elétricos e renováveis.",
  },
  {
    group: "Controle e Processos Industriais",
    title: "Manutenção e Operação",
    image: areaManutencao,
    description:
      "Capacitação para operação segura, inspeção, diagnóstico e manutenção de equipamentos industriais em rotina produtiva.",
  },
  {
    group: "Controle e Processos Industriais",
    title: "Metalmecânica",
    image: areaMetalmecanica,
    description:
      "Aprenda processos de soldagem, usinagem, fabricação mecânica e leitura técnica para transformar metal em solução industrial.",
  },
  {
    group: "Gestão e Negócios",
    title: "Gerencial",
    image: areaGerencial,
    description:
      "Desenvolva visão de liderança, planejamento, produtividade e gestão de equipes para ambientes industriais e administrativos.",
  },
  {
    group: "Gestão de Negócios",
    title: "Operações Financeiras",
    image: areaFinanceira,
    description:
      "Cursos para dominar rotinas financeiras, controles, indicadores, custos e tomada de decisão com foco em resultados.",
  },
  {
    group: "Informação e Comunicação",
    title: "Desenvolvimento de Sistemas",
    image: areaDev,
    description:
      "Aprenda a criar aplicações, sites e soluções digitais com lógica, programação, banco de dados e práticas de projeto.",
  },
  {
    group: "Informação e Comunicação",
    title: "Infraestrutura de Informação e Comunicação",
    image: areaInfra,
    description:
      "Formação para atuar com redes, servidores, nuvem, suporte técnico e ambientes conectados de alta disponibilidade.",
  },
  {
    group: "Infraestrutura",
    title: "Construção de Obras",
    image: areaConstrucao,
    description:
      "Capacitação para canteiros, planejamento, execução, segurança e técnicas aplicadas à construção civil.",
  },
  {
    group: "Produção Alimentícia",
    title: "Produção Alimentícia",
    image: areaAlimentos,
    description:
      "Cursos para processos de fabricação, boas práticas, qualidade, higiene e inovação na indústria de alimentos.",
  },
  {
    group: "Produção Cultural e Design",
    title: "Design",
    image: areaDesign,
    description:
      "Explore criação visual, desenvolvimento de produto, prototipagem, comunicação e soluções com olhar criativo.",
  },
  {
    group: "Produção Industrial",
    title: "Manufatura",
    image: areaManufatura,
    description:
      "Formação voltada a processos produtivos, máquinas, produtividade, controle de qualidade e operação industrial.",
  },
  {
    group: "Segurança",
    title: "Segurança",
    image: areaSeguranca,
    description:
      "Aprenda práticas de prevenção, análise de riscos, normas, proteção coletiva e cultura de segurança no trabalho.",
  },
  {
    group: "Produção Industrial",
    title: "Têxtil e Vestuário",
    image: areaTextil,
    description:
      "Cursos para modelagem, confecção, processos têxteis, acabamento e produção de peças com padrão profissional.",
  },
];

const Index = () => {
  /**
   * Estado do carrossel do banner principal (Hero).
   * Avança automaticamente a cada 3 segundos entre 3 slides.
   * Por enquanto utiliza a mesma imagem nos três slots, conforme solicitado.
   */
  const heroSlides = [heroFoodBanner, heroSecurityBanner, heroEnergyBanner];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  /**
   * Estado do filtro de busca de cursos/áreas tecnológicas.
   * Filtra dinamicamente (autocomplete) conforme o usuário digita,
   * comparando apenas o título do curso/área (case-insensitive).
   */
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filteredAreas = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return areas;
    return areas.filter((area) => area.title.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <main className="site-shell">
      <header className="border-b border-transparent bg-background">
        <div className="section-container flex h-[72px] items-center justify-between gap-4 md:h-[88px]">
          <img
            src={senaiLogoHeader}
            alt="Logo SENAI"
            className="senai-logo"
          />

          <nav
            className="hidden items-center gap-8 lg:gap-10 md:flex"
            aria-label="Navegação principal"
          >
            <a href="#areas" className="nav-link-senai">
              Áreas
            </a>
            <a href="#cursos" className="nav-link-senai">
              Cursos
            </a>
            <a href="#contato" className="nav-link-senai">
              Contatos
            </a>
          </nav>

          <Button
            variant="outline"
            size="icon"
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-[6px] border-foreground/60 bg-background md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>

          <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
        </div>
      </header>

      {/*
       * Hero principal — banner único de "Produção Alimentícia"
       * A imagem agora ocupa toda a área do card (full-bleed), preservando proporção
       * e responsividade em todos os breakpoints conforme identidade do PDF institucional.
       */}
      {/* Hero principal — carrossel automático com 3 slides (3s cada). */}
      <section
        aria-label="Banner principal — Novos Cursos"
        className="relative w-full overflow-hidden"
      >
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Banner Novos Cursos — slide ${index + 1}`}
              className="block h-auto w-full shrink-0 object-cover object-center"
              width={1640}
              height={560}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        {/* Indicadores (bullets) do carrossel */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      <section
        id="cursos"
        className="section-container grid gap-8 py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-10 md:py-14"
      >
        <div className="max-w-[430px] flex flex-col items-start">
          <div className="mb-5">
            <img
              src={senaiLogo}
              alt="Logo SENAI"
              className="senai-logo-content"
              loading="lazy"
            />
          </div>
          <p className="w-full text-left text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Conheça a SENAI DF, um polo de formação técnica que une laboratórios
            modernos, professores com experiência de mercado e projetos voltados
            para o futuro do trabalho.
          </p>
        </div>

        {/* Imagem institucional dos profissionais — PNG com bordas transparentes para integrar ao fundo da seção */}
        <div>
          <img
            src={heroWorkers}
            alt="Profissionais da indústria representando o desenvolvimento de carreira"
            className="mx-auto block h-auto w-full max-w-[420px] object-contain md:max-w-[480px] lg:max-w-[520px]"
            width={573}
            height={406}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-container pb-12">
        <h2 className="mb-8 text-center text-[20px] font-extrabold uppercase tracking-tight text-foreground sm:text-[22px] md:mb-10 md:text-[24px]">
          Cursos para todas as etapas da sua carreira
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {stages.map(({ title, hours, icon: Icon }) => (
            <Card key={title} className="course-stage-card">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-[0_6px_16px_hsl(var(--soft-shadow))]">
                  <Icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="text-sm font-extrabold">{title}</h3>
                <p className="text-[11px] leading-5 text-muted-foreground">
                  Conteúdos práticos e atualizados, pensados para quem busca
                  desenvolvimento profissional e inserção rápida no mercado de
                  trabalho.
                </p>
              </div>
              <div className="w-full border-t border-border pt-3 text-center text-lg font-extrabold text-muted-foreground">
                {hours}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="brand-strip">
        <div className="section-container grid grid-cols-2 gap-y-2 md:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="stat-item">
              <Icon className="h-7 w-7 text-primary-foreground" />
              <strong className="text-[1.6rem] font-black leading-none text-primary-foreground sm:text-[2rem]">
                {value}
              </strong>
              <span className="text-[11px] font-semibold text-primary-foreground/90 sm:text-[12px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="areas" className="areas-surface py-12 md:py-14">
        <div className="section-container">
          <div className="mx-auto mb-8 max-w-[680px] text-center">
            <h2 className="mb-3 text-[26px] font-black uppercase text-primary sm:text-[28px] md:text-[32px]">
              Áreas Tecnológicas
            </h2>
            <p className="text-sm font-bold">
              Para listar os cursos, clique em uma das áreas tecnológicas do seu
              interesse.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Caso queira ir direto para um curso, utilize o campo de busca
              abaixo.
            </p>
            {/* Campo de busca com autocomplete em tempo real (filtra cards de áreas/cursos) */}
            <div className="mx-auto mt-4 flex max-w-[340px] items-center rounded-full border border-border bg-background px-4">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do curso"
                aria-label="Buscar curso"
                className="h-9 border-0 bg-transparent px-0 text-xs focus-visible:ring-0"
              />
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAreas.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground">
                Nenhum curso encontrado para “{searchTerm}”.
              </p>
            )}
            {filteredAreas.map((area) => (
              <Card key={area.title} className="area-card">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="h-full w-full object-cover"
                    width={1280}
                    height={720}
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    {area.group}
                  </p>
                  <h3 className="mb-2 text-base font-extrabold">
                    {area.title}
                  </h3>
                  <p className="text-[12px] leading-5 text-muted-foreground">
                    {area.description}
                  </p>
                  <Link
                    to={`/cursos/${encodeURIComponent(area.title)}`}
                    className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-destructive"
                  >
                    Ver lista de cursos <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-12 text-center md:py-14">
        <h2 className="mb-4 text-[26px] font-black uppercase text-primary sm:text-[28px] md:text-[32px]">
          Como me inscrever?
        </h2>
        <p className="mx-auto max-w-[860px] text-[13px] leading-6 text-muted-foreground sm:text-sm">
          Inscreva-se em etapas simples: escolha o curso, preencha seus dados e
          aguarde o contato da nossa equipe. Em pouco tempo você estará a um
          passo de começar sua formação.
        </p>
      </section>

      <section id="contato" className="relative overflow-hidden">
        <img
          src={contactHero}
          alt="Profissionais industriais em ambiente corporativo"
          className="absolute inset-0 h-full w-full object-cover"
          width={1280}
          height={800}
          loading="lazy"
        />
        <div className="contact-overlay absolute inset-0" />
        <div className="section-container relative grid gap-8 py-12 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-10 md:py-16">
          <div className="max-w-[430px] text-primary-foreground">
            <p className="mb-2 text-sm uppercase">Precisa de ajuda?</p>
            <h2 className="mb-4 text-[2.25rem] font-black uppercase leading-none sm:text-[2.6rem] md:mb-5 md:text-[3rem]">
              Entre em contato
            </h2>
            <p className="mb-6 text-[13px] leading-6 text-primary-foreground/88">
              Nossa equipe está pronta para esclarecer dúvidas sobre turmas,
              valores e documentação. Fale com a FIBRA e avance na sua formação
              profissional.
            </p>
            <p className="text-[12px] leading-5 text-primary-foreground/80">
              Preencha o formulário e nossa equipe entrará em contato para
              orientar sua inscrição.
            </p>
          </div>

          <form className="rounded-[20px] bg-foreground/30 p-5 backdrop-blur-[2px] sm:rounded-[26px] sm:p-6 md:p-8">
            <div className="grid gap-4">
              <Input placeholder="Nome" className="form-field-senai" />
              <Input
                type="email"
                placeholder="E-mail"
                className="form-field-senai"
              />
              <Input
                type="tel"
                placeholder="Telefone"
                className="form-field-senai"
              />
              <Textarea placeholder="Mensagem" className="textarea-senai" />
              <button type="submit" className="btn-senai-accent">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
