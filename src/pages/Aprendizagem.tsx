import {
  ArrowLeft,
  FileText,
  Menu,
  CloudDownload,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import senaiLogo from "@/assets/senai-logo-header.png";
import contatoBg from "@/assets/hero/contato.jpg";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import BackToTop from "@/components/BackToTop";
import MobileMenu from "@/components/MobileMenu";

// Vistas possíveis da página
type ViewState = "main" | "jovem" | "empresa";

const Aprendizagem = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<ViewState>("main");

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <main className="site-shell">
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
            <Link
              to="/aprendizagem"
              className="nav-link-senai text-primary"
              onClick={() => setView("main")}
            >
              Aprendizagem Industrial
            </Link>
            <Link to="/senaipro" className="nav-link-senai">
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

      {/* RENDERIZAÇÃO CONDICIONAL DAS VIEWS */}
      {view === "main" && <MainView setView={setView} />}
      {view === "jovem" && <JovemView setView={setView} />}
      {view === "empresa" && <EmpresaView setView={setView} />}

      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Aprendizagem;

// ==========================================
// VIEW 1: MAIN (Geral)
// ==========================================
function MainView({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <section className="section-container py-12">
      <h1 className="mb-6 text-3xl font-black uppercase text-primary md:text-4xl">
        Aprendizagem Industrial
      </h1>
      <div className="mb-10 text-[14px] leading-relaxed text-muted-foreground space-y-4">
        <p>
          Aprendizagem profissional, segundo conceito legal, é a formação
          técnico-profissional compatível com o desenvolvimento físico, moral,
          psicológico e social dos jovens, caracterizada por atividades teóricas e
          práticas, organizadas em tarefas de complexidade progressiva,
          desenvolvidas no ambiente de trabalho. É a articulação entre formação e
          trabalho. Lei Federal nº 10.097/2000, regulamentada pelo Decreto nº
          5.598/2005.
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-[8px] border border-border bg-card shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800"
            alt="Jovem Aprendiz"
            className="h-[240px] w-full object-cover"
          />
          <button
            onClick={() => setView("jovem")}
            className="w-full bg-primary py-4 text-center text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          >
            Para Jovem Aprendiz
          </button>
        </div>
        <div className="overflow-hidden rounded-[8px] border border-border bg-card shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
            alt="Empresas"
            className="h-[240px] w-full object-cover"
          />
          <button
            onClick={() => setView("empresa")}
            className="w-full bg-primary py-4 text-center text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          >
            Para Empresas
          </button>
        </div>
      </div>

      <div className="mb-12 text-[14px] leading-relaxed text-muted-foreground space-y-4">
        <p>
          Esta Lei determina que as empresas contratem, no mínimo, 5% e, no
          máximo, 15% de jovens aprendizes em relação ao número de funcionários,
          cujas funções demandem formação profissional. É, no entanto, facultativa
          a contratação de aprendizes pelas micro e pequenas empresas, inclusive
          as que fazem parte do Sistema Integrado de Pagamento de Impostos e
          Contribuições, denominado "Simples".
        </p>
        <p>
          O jovem aprendiz deverá ter entre 14 e 24 anos para ser contratado por
          prazo determinado, não superior a 3 (três) anos. Extensão da idade
          máxima do aprendiz até 29 anos de idade nos casos em que o programa de
          aprendizagem profissional envolver atividades vedadas a menores de 21
          anos de idade. No caso das pessoas com deficiência, não haverá limite
          máximo de idade para contratação.
        </p>
        <p className="font-bold text-foreground">
          Conheça os cursos oferecidos na modalidade Aprendizagem!
        </p>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-black text-primary">Documentação</h2>
        <div className="grid gap-4">
          {[
            { title: "Decreto 11479 de 6 de abril de 2023", url: "/docs/Decreto_11479_de_6_de_abril_de_2023.pdf" },
            { title: "ECA - Lei nº 8.069 13 de julho de 1990", url: "/docs/ECA_Lei_8069_13_de_julho_de_1990.pdf" },
            { title: "INSTRUÇÃO NORMATIVA Nº 2, DE 8 DE NOVEMBRO DE 2021", url: "/docs/INSTRUCAO_NORMATIVA_No_2_DE_8_DE_NOVEMBRO_DE_2021.pdf" },
            { title: "Decreto Nº 11.061, de 4 de maio de 2022", url: "/docs/Decreto_11061_de_4_de_maio_de_2022.pdf" },
            { title: "Manual da Aprendizagem", url: "/docs/Manual_da_Aprendizagem.pdf" },
            { title: "PORTARIA/MTP Nº 671, DE 8 DE NOVEMBRO DE 2021", url: "/docs/Portaria_MTP_671_Aprendizagem.pdf" },
            { title: "Portaria MPT nº 1.019/2022", url: "/docs/Portaria_MPT_1019_2022.pdf" },
            { title: "CONAP 2022", url: "/docs/CONAP_2022.pdf" },
            { title: "Nota Técnica SEI nº 4184/2022/ME", url: "/docs/Nota_Tecnica_SEI_4184_2022_ME.pdf" },
          ].map((doc, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-[6px] border border-border bg-background shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-border bg-secondary/20 px-4 py-3">
                <FileText className="h-[18px] w-[18px] text-[#0066b3]" />
                <span className="text-[15px] font-semibold text-[#0066b3]">
                  {doc.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                <a href={doc.url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-[4px] border border-border bg-background px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm transition-colors hover:bg-secondary/50">
                  <CloudDownload className="h-4 w-4" /> Download
                </a>
                <a href={`https://docs.google.com/viewer?url=https://prototipo.alexholanda.com.br${doc.url}&embedded=true`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-[4px] border border-border bg-background px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm transition-colors hover:bg-secondary/50">
                  <Eye className="h-4 w-4" /> Visualizar
                </a>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="rounded-[4px] bg-[#0066b3] px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-opacity hover:opacity-90">
                  Detalhes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// VIEW 2: PARA JOVEM APRENDIZ
// ==========================================
function JovemView({ setView }: { setView: (v: ViewState) => void }) {
  const cards = [
    {
      title: "Idade",
      text: "Extensão da idade máxima do aprendiz até 29 anos de idade nos casos em que o programa de aprendizagem profissional envolver atividades vedadas a menores de 21 anos de idade.",
    },
    {
      title: "Salário",
      text: "A remuneração do aprendiz é calculada com base no salário mínimo da carreira.",
    },
    {
      title: "Escolaridade",
      text: "É preciso cursar a partir do 9º ano do Ensino Fundamental ou já ter concluído o Ensino Médio. Para pessoas com deficiência, é necessário fazer uma análise individual.",
    },
    {
      title: "Duração",
      text: "O tempo máximo de contrato vai de 2 para 3 anos (ou até 4 anos, para jovens de 14 e 15 anos) - alinhada a PL 6469.",
    },
    {
      title: "Jornada de trabalho",
      text: "A carga horária de trabalho pode ser de 4h, 6h ou 8h, a depender da escolaridade do estudante.",
    },
    {
      title: "Direitos e benefícios",
      text: "Os jovens aprendizes têm os mesmos direitos trabalhistas e previdenciários dos demais empregados: férias, 13º salário, vale-transporte e FGTS.",
    },
  ];

  return (
    <section className="section-container py-12">
      <button
        onClick={() => setView("main")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>
      <h1 className="mb-6 text-3xl font-black uppercase text-primary md:text-4xl">
        Para Jovem Aprendiz
      </h1>

      <div className="mb-10 overflow-hidden rounded-[8px]">
        <img
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=1200"
          alt="Jovem Aprendiz"
          className="h-[300px] w-full object-cover md:h-[400px]"
        />
      </div>

      <div className="mb-12 space-y-4 text-[14px] leading-relaxed text-muted-foreground">
        <h3 className="text-xl font-bold text-foreground">
          Seja jovem aprendiz no Senai-DF
        </h3>
        <p>
          O Jovem Aprendiz é um programa gratuito voltado para a preparação e
          inserção de jovens no mercado de trabalho. Quem é aprendiz no Senai faz
          cursos enquanto trabalha em uma das nossas empresas parceiras.
        </p>
        <p>
          Venha fazer parte de um programa que associa a formação técnica e
          profissional com atividades práticas desenvolvidas dentro das empresas.
        </p>
        <p className="font-bold text-foreground">
          Esta é a sua chance. Participe!
        </p>
      </div>

      <h3 className="mb-8 text-center text-xl font-black text-primary">
        Formação de profissionais para indústria
      </h3>

      <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-[12px] bg-secondary/50 p-6 text-center shadow-sm"
          >
            <h4 className="mb-3 text-base font-extrabold text-foreground">
              {card.title}
            </h4>
            <p className="text-[13px] leading-6 text-muted-foreground">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="mb-3 text-lg font-bold text-primary">
          A aprendizagem transforma o jovem. O jovem transforma tudo.
        </p>
        <p className="text-base font-bold text-primary hover:underline cursor-pointer">
          Dúvidas? Entre em Contato com Nosso Interlocutor
        </p>
      </div>
    </section>
  );
}

// ==========================================
// VIEW 3: EMPRESAS
// ==========================================
function EmpresaView({ setView }: { setView: (v: ViewState) => void }) {
  return (
    <section className="section-container py-12">
      <button
        onClick={() => setView("main")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>
      <h1 className="mb-6 text-3xl font-black uppercase text-primary md:text-4xl">
        Jovem Aprendiz Empresas
      </h1>

      <div className="mb-10 overflow-hidden rounded-[8px]">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
          alt="Empresas"
          className="h-[300px] w-full object-cover md:h-[400px]"
        />
      </div>

      <div className="mb-12 space-y-4 text-[14px] leading-relaxed text-muted-foreground">
        <h3 className="text-xl font-bold text-foreground">
          Contribua com a formação de Jovens Aprendizes
        </h3>
        <p>
          Baseados na Lei 10.097/2000, os programas de aprendizagem profissional
          possibilitam, por meio de um contrato de trabalho especial com vínculo
          empregatício e prazo determinado, a inserção de jovens no mercado de
          trabalho, onde a aprendizagem prática e a teórica acontecem de forma
          simultânea.
        </p>
        <p>
          A condição de aprendiz ocorre no ato da contratação do jovem pela empresa
          simultaneamente com a matrícula em curso de aprendizagem do Senai. Esse
          contrato tem prazo máximo de três anos.
        </p>
      </div>

      <h3 className="mb-8 text-center text-xl font-black text-primary">
        Vantagens na contratação de um Jovem Aprendiz
      </h3>
      <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Formação profissional alinhada às demandas dos diferentes segmentos industriais e mais profissionais especializados para essas demandas.",
          "Possibilidade para o jovem contratado realizar prática profissional na empresa.",
          "Possibilidade da empresa contribuir na formação profissional do jovem contratado, uma vez que esse jovem atuará na empresa, na condição de aprendiz.",
          "Redução para 2% de FGTS (alíquota 75% inferior à contribuição normal).",
          "Empresas registradas no Simples, que optarem por participar do programa de aprendizagem, não possuem acréscimo na contribuição previdenciária.",
          "Dispensa de Aviso Prévio remunerado e isenção de multa rescisória.",
        ].map((text, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-[12px] bg-secondary/50 p-6 text-center shadow-sm"
          >
            <p className="text-[13px] leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-8 text-center text-xl font-black text-primary">
        Como Implementar o Programa?
      </h3>
      <div className="mb-16 grid gap-5 sm:grid-cols-3">
        {[
          {
            title: "Passo 1",
            text: "Entre em contato com o consultor e conheça as opções disponíveis para sua empresa.",
          },
          {
            title: "Passo 2",
            text: "Sua empresa pode contratar jovens indicados pelo Senai ou recomendar nomes para participação no processo.",
          },
          {
            title: "Passo 3",
            text: "Os jovens aprovados no processo seletivo são matriculados e já podem começar os cursos no Senai.",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-[12px] bg-secondary/50 p-6 text-center shadow-sm"
          >
            <h4 className="mb-3 text-base font-extrabold text-foreground">
              {step.title}
            </h4>
            <p className="text-[13px] leading-6 text-muted-foreground">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[16px] bg-secondary/40 p-8 sm:p-12">
        <h3 className="mb-10 text-center text-2xl font-black text-primary">
          Conheça as possibilidades que o Senai-DF <br className="hidden sm:block" />
          dispõe para sua empresa
        </h3>
        
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200"
          alt="Trabalhadores na indústria"
          className="mb-10 h-[280px] w-full rounded-[8px] object-cover shadow-sm"
        />

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h4 className="mb-4 text-[15px] font-extrabold text-foreground">
              SENAI Taguatinga
            </h4>
            <ul className="list-inside list-disc space-y-2 text-[13px] text-muted-foreground marker:text-primary">
              <li>Almoxarife de Obras 800h</li>
              <li>Assistente Administrativo 800h</li>
              <li>Assistente de Controle de Qualidade 800h</li>
              <li>Eletricista de Instalações 1320h</li>
              <li>Operador de Computador 1000h</li>
              <li>Técnico em Administração 1040h</li>
              <li>Técnico em Eletrotécnica 1560h</li>
              <li>Técnico em Redes de Computadores 1300h</li>
              <li>Tecnologia da Informação 1848h</li>
            </ul>

            <h4 className="mb-4 mt-8 text-[15px] font-extrabold text-foreground">
              SENAI Sobradinho
            </h4>
            <ul className="list-inside list-disc space-y-2 text-[13px] text-muted-foreground marker:text-primary">
              <li>Assistente Administrativo 800h</li>
              <li>Tecnologia da Informação 1848h</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[15px] font-extrabold text-foreground">
              SENAI GAMA
            </h4>
            <ul className="list-inside list-disc space-y-2 text-[13px] text-muted-foreground marker:text-primary">
              <li>Assistente Administrativo 800h</li>
              <li>Assistente de Controle de Qualidade 800h</li>
              <li>Assistente de Produção 1320h</li>
              <li>Eletricista de Instalações 1320h</li>
              <li>Mecânico de Manutenção 1200h</li>
              <li>Operador de Computador 1000h</li>
              <li>Técnico em Administração 1040h</li>
              <li>Técnico em Eletromecânica 1872h</li>
              <li>Técnico em Eletrotécnica 1560h</li>
              <li>Tecnologia da Informação 1848h</li>
            </ul>

            <h4 className="mb-4 mt-8 text-[15px] font-extrabold text-foreground">
              SENAI SIG
            </h4>
            <ul className="list-inside list-disc space-y-2 text-[13px] text-muted-foreground marker:text-primary">
              <li>Assistente Administrativo 800h</li>
              <li>Operador de Computador 1000h</li>
              <li>Técnico em Administração 1040h</li>
              <li>Tecnologia da Informação 1848h</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/aprendizagem/interesse" className="inline-flex h-12 w-full max-w-[280px] items-center justify-center rounded-[6px] bg-[#004e9a] px-6 text-[15px] font-bold text-white transition-opacity hover:opacity-90">
            Tenho interesse!
          </Link>
        </div>
      </div>
    </section>
  );
}
