/**
 * PAGINA: CURSOS COM FILTROS AVANCADOS
 * ====================================
 * Esta pagina exibe uma listagem de cursos com sistema de filtros avancado.
 *
 * Funcionalidades Principais:
 * 1. FILTROS MULTIDIMENSIONAIS (6 dimensoes):
 *    - Nivel (Cursos Livres, Tecnicos, etc.)
 *    - Local (Sobradinho, Gama, Taguatinga)
 *    - Disponibilidade (Vagas abertas, Todos)
 *    - Modalidade (Presencial, A Distancia)
 *    - Tipo (Gratuito, Pago)
 *    - Turno (Manha, Tarde, Noite, Integral)
 *
 * 2. BUSCA EM TEMPO REAL:
 *    - Autocomplete de cursos por nome
 *    - Sem lag (otimizado com useMemo)
 *
 * 3. PARAMETRIZACAO DE URL:
 *    - /cursos → lista todos
 *    - /cursos/Producao%20Alimenticia → filtra por area
 *    - Permite compartilhamento de URLs com filtros pre-selecionados
 *
 * Conceitos React Utilizados:
 * - useState: gerencia busca e selecao de filtros
 * - useParams: le area da URL
 * - useMemo: otimiza filtragem (so recalcula se searchTerm ou selected mudam)
 * - Array.filter(): logica de filtragem
 * - Record<K, V>: type para mapa de strings
 */

import { ArrowRight, Clock, MapPin, Menu, Search, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
} from "@/components/ui/sheet";
import senaiLogo from "@/assets/senai-logo.png";
import heroBanner from "@/assets/hero/cursos-alimenticia-banner.jpg";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Developer - Alexsander Barreto - FIBRA

/** Chaves dos filtros — mapeiam para os campos do curso. */
type FilterKey =
  | "level"
  | "locations"
  | "availability"
  | "modality"
  | "type"
  | "shift";

const filterGroups: { key: FilterKey; title: string; options: string[] }[] = [
  {
    key: "level",
    title: "Nível",
    options: [
      "Cursos Livres",
      "Cursos Técnicos",
      "Aprendiz SENAI",
      "Graduação",
      "Pós-graduação",
      "Superior Extensão",
    ],
  },
  {
    key: "locations",
    title: "Local",
    options: ["Sobradinho", "Gama", "Taguatinga"],
  },
  {
    key: "availability",
    title: "Disponibilidade",
    options: ["Vagas abertas", "Todos"],
  },
  {
    key: "modality",
    title: "Modalidade",
    options: ["Presencial", "A Distância"],
  },
  { key: "type", title: "Tipo", options: ["Gratuito", "Pago"] },
  {
    key: "shift",
    title: "Turno",
    options: ["Manhã", "Tarde", "Noite", "Integral"],
  },
];

/** Lista mock de cursos com atributos para os filtros. */
export const mockCourses = [
  {
    id: 1,
    modality: "Presencial",
    level: "Cursos Técnicos",
    title: "Técnico em Administração",
    hours: "1200h",
    shift: "Vespertino",
    locations: ["Sobradinho", "Taguatinga", "Gama"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Gratuito",
    startDate: "12/12/2026",
  },
  {
    id: 2,
    modality: "Presencial",
    level: "Cursos Livres",
    title: "Confeitaria Artesanal",
    hours: "80h",
    shift: "Manhã",
    locations: ["Sobradinho"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Pago",
    startDate: "10/03/2026",
  },
  {
    id: 3,
    modality: "A Distância",
    level: "Pós-graduação",
    title: "Pós em Engenharia de Alimentos",
    hours: "360h",
    shift: "Integral",
    locations: ["Taguatinga"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Pago",
    startDate: "01/04/2026",
  },
  {
    id: 4,
    modality: "Presencial",
    level: "Aprendiz SENAI",
    title: "Aprendizagem Industrial em Panificação",
    hours: "800h",
    shift: "Tarde",
    locations: ["Gama", "Sobradinho"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Gratuito",
    startDate: "20/02/2026",
  },
  {
    id: 5,
    modality: "Presencial",
    level: "Cursos Técnicos",
    title: "Técnico em Alimentos",
    hours: "1500h",
    shift: "Noite",
    locations: ["Taguatinga"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Gratuito",
    startDate: "05/05/2026",
  },
  {
    id: 6,
    modality: "A Distância",
    level: "Cursos Livres",
    title: "Boas Práticas de Fabricação",
    hours: "40h",
    shift: "Integral",
    locations: ["Sobradinho", "Gama", "Taguatinga"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Gratuito",
    startDate: "15/03/2026",
  },
  {
    id: 7,
    modality: "Presencial",
    level: "Graduação",
    title: "Engenharia de Produção",
    hours: "4000h",
    shift: "Noite",
    locations: ["Taguatinga"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Pago",
    startDate: "01/08/2026",
  },
  {
    id: 8,
    modality: "Presencial",
    level: "Superior Extensão",
    title: "Extensão em Gestão da Qualidade",
    hours: "120h",
    shift: "Manhã",
    locations: ["Sobradinho"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Pago",
    startDate: "10/06/2026",
  },
  {
    id: 9,
    modality: "Presencial",
    level: "Cursos Livres",
    title: "Manipulação de Alimentos",
    hours: "20h",
    shift: "Tarde",
    locations: ["Gama"],
    status: "TURMAS ABERTAS",
    availability: "Vagas abertas",
    type: "Gratuito",
    startDate: "22/03/2026",
  },
];

const courseDescription =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam...";

const Cursos = () => {
  const { area } = useParams<{ area?: string }>();
  const macroArea = area ? decodeURIComponent(area) : "Produção Alimentícia";

  /** Busca por nome do curso (autocomplete em tempo real). */
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** Mapa de filtros selecionados por grupo. */
  const [selected, setSelected] = useState<Record<FilterKey, string[]>>({
    level: [],
    locations: [],
    availability: [],
    modality: [],
    type: [],
    shift: [],
  });

  const toggleFilter = (key: FilterKey, value: string) => {
    setSelected((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return mockCourses.filter((c) => {
      if (term && !c.title.toLowerCase().includes(term)) return false;
      for (const key of Object.keys(selected) as FilterKey[]) {
        const sel = selected[key];
        if (sel.length === 0) continue;
        if (key === "availability" && sel.includes("Todos")) continue;
        if (key === "locations") {
          if (!sel.some((s) => c.locations.includes(s))) return false;
        } else {
          const value = (c as unknown as Record<string, string>)[key];
          if (!sel.includes(value)) return false;
        }
      }
      return true;
    });
  }, [searchTerm, selected]);

  return (
    <main className="site-shell">
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

      {/* Hero da macro-área — banner full-bleed */}
      <section
        aria-label={`Banner ${macroArea}`}
        className="relative w-full overflow-hidden"
      >
        <img
          src={heroBanner}
          alt={`Banner ${macroArea}`}
          className="block h-auto w-full object-cover object-center"
          width={1640}
          height={560}
          loading="eager"
        />
      </section>

      {/* Descrição da macro-área */}
      <section className="section-container py-10 md:py-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
          <h2 className="mt-8 mb-3 text-left text-base font-extrabold text-foreground">
            Oportunidades de trabalho
          </h2>
          <p className="text-left text-[13px] leading-6 text-muted-foreground sm:text-sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      </section>

      {/* Bloco de filtros */}
      <section className="section-container pb-10">
        <div className="rounded-[10px] bg-secondary/60 p-5 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-foreground">
              Filtro
            </h3>
            <div className="flex max-w-[280px] items-center rounded-full border border-border bg-background px-4">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Localizar"
                aria-label="Localizar curso"
                className="h-9 border-0 bg-transparent px-0 text-xs focus-visible:ring-0"
              />
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filterGroups.map((group) => (
              <div
                key={group.key}
                className="rounded-[8px] bg-background p-4 shadow-sm"
              >
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
                  {group.title}
                </p>
                <ul className="space-y-1.5">
                  {group.options.map((opt) => {
                    const id = `${group.key}-${opt}`;
                    const checked = selected[group.key].includes(opt);
                    return (
                      <li
                        key={opt}
                        className="flex items-center gap-2 text-[12px] text-muted-foreground"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-border accent-primary"
                          checked={checked}
                          onChange={() => toggleFilter(group.key, opt)}
                        />
                        <label
                          htmlFor={id}
                          className="cursor-pointer select-none"
                        >
                          {opt}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de cursos */}
      <section className="section-container pb-16">
        {filteredCourses.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Nenhum curso encontrado para “{searchTerm}”.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col overflow-hidden p-0"
              >
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-right text-[11px] font-semibold text-destructive">
                    {course.modality}{" "}
                    <span className="text-muted-foreground">|</span>{" "}
                    {course.level}
                  </p>
                  <h3 className="mb-2 text-[1.05rem] font-extrabold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-[12px] leading-5 text-muted-foreground">
                    {courseDescription}
                  </p>
                  <ul className="mb-4 space-y-1.5 text-[12px] text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" /> {course.hours}
                    </li>
                    <li className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" /> {course.shift}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />{" "}
                      {course.locations.join(" | ")}
                    </li>
                  </ul>
                  <p className="mb-4 text-[11px] font-bold">
                    <span className="text-green-600">{course.status}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      | Início em {course.startDate}
                    </span>
                  </p>
                  <button type="submit" className="btn-senai-accent w-full">
                    Pré inscrição
                  </button>
                </div>
                <div className="border-t border-border bg-secondary/40 px-5 py-3 text-right">
                  <Link
                    to={`/cursos/${encodeURIComponent(macroArea)}/${course.id}`}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-foreground underline-offset-2 hover:underline"
                  >
                    Ver curso <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Cursos;
