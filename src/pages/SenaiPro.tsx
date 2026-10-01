import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import senaiLogo from "@/assets/senai-logo-header.png";
import senaiProBanner from "@/assets/senai-pro-banner.png";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileMenu from "@/components/MobileMenu";

const SenaiPro = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <Link to="/cursos" className="nav-link-senai">
              Cursos
            </Link>
            <Link to="/aprendizagem" className="nav-link-senai">
              Aprendizagem Industrial
            </Link>
            <Link to="/senaipro" className="nav-link-senai text-primary">
              Senai PRO
            </Link>
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
          </Button>

          <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} />
        </div>
      </header>

      <section className="section-container py-12">
        <div className="max-w-4xl">
          <h1 className="mb-6 text-3xl font-black uppercase text-primary md:text-4xl">
            SENAI PRO
          </h1>
          <p className="mb-10 text-[15px] leading-relaxed text-muted-foreground">
            Cursos alinhados às demandas específicas das empresas, ministrados em horários e com condições especiais para quem já está no mercado.
          </p>

          <div className="mb-12 overflow-hidden rounded-[12px] shadow-sm">
            <img
              src={senaiProBanner}
              alt="Senai PRO"
              className="w-full object-cover"
            />
          </div>

          <h2 className="mb-6 text-2xl font-black text-[#003470]">
            O próximo passo na sua profissão
          </h2>
          
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              A indústria evolui todos os dias. Novas tecnologias e novos desafios exigem profissionais que vão além. Com o Senai Pro, você eleva sua técnica profissional com conhecimento especializado.
            </p>
            <p>
              A oportunidade ideal para desenvolver novas habilidades e se destacar profissionalmente.
            </p>
            <p>
              Entre em contato com um dos nossos consultores e conheça os cursos disponíveis nos setores automotivo e de refrigeração.
            </p>
          </div>
        </div>
      </section>

      {/* Entre em contato */}
      <section
        id="contato"
        aria-label="Entre em contato"
        className="contact-parallax relative w-full"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=100&w=1920')" }}
      >
        <div className="contact-overlay absolute inset-0" />
        <div className="section-container relative grid gap-10 py-16 md:grid-cols-2">
          <div className="text-white">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em]">
              Precisa de ajuda?
            </p>
            <h2 className="mb-4 text-3xl font-extrabold uppercase md:text-4xl">
              Entre em contato
            </h2>
            <p className="mb-4 text-[13px] leading-6 opacity-90">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis.
            </p>
            <p className="text-[13px] leading-6 opacity-90">
              Preencha o formulário e nossa equipe entrará em contato.
            </p>
          </div>
          <form className="form-premium-senai" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Nome Completo" className="form-field-senai" />
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
            <Textarea placeholder="Como podemos ajudar?" className="textarea-senai" />
            <button type="submit" className="btn-senai-accent w-full mt-2">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </main>
  );
};

export default SenaiPro;
