import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import senaiLogo from "@/assets/senai-logo-header.png";
import senaiProBanner from "@/assets/senai-pro-banner.jpg";
import contatoBg from "@/assets/hero/contato.jpg";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
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

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f4f7fa] py-16 md:py-24">
        {/* Elementos decorativos sutis ao fundo */}
        <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-[100px]" />

        <div className="relative mx-auto max-w-[850px] px-6">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="mb-6 text-[36px] font-black uppercase tracking-tight text-[#003470] drop-shadow-sm md:text-[48px]">
              SENAI PRO
            </h1>
            <p className="mb-12 border-l-4 border-accent pl-5 text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
              Cursos alinhados às demandas específicas das empresas, ministrados em horários e com condições especiais para quem já está no mercado.
            </p>
          </div>

          <div className="group mb-16 w-full overflow-hidden rounded-[16px] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]">
            <img
              src={senaiProBanner}
              alt="Senai PRO - O próximo passo na sua profissão"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <h2 className="mb-6 text-[24px] font-black tracking-tight text-[#003470] md:text-[30px]">
              O próximo passo na sua profissão
            </h2>
            
            <div className="space-y-6 text-[16px] leading-relaxed text-[#4a5568] md:text-[18px]">
              <p>
                A indústria evolui todos os dias. Novas tecnologias e novos desafios exigem profissionais que vão além. Com o Senai Pro, você eleva sua técnica profissional com conhecimento especializado.
              </p>
              <p className="font-semibold text-[#003470]">
                A oportunidade ideal para desenvolver novas habilidades e se destacar profissionalmente.
              </p>
              <p>
                Entre em contato com um dos nossos consultores e conheça os cursos disponíveis nos setores automotivo e de refrigeração.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      
      <Footer />
      <BackToTop />
    </main>
  );
};

export default SenaiPro;
