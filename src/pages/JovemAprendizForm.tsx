import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileMenu from "@/components/MobileMenu";
import { CheckCircle2, ChevronRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero/jovem-aprendiz-form.jpg";
import senaiLogo from "@/assets/senai-logo-header.png";

const JovemAprendizForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll automático para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="site-shell relative min-h-screen">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-24 pb-16 md:pt-32 md:pb-20 text-white">
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003470] via-[#003470]/80 to-transparent" />
        
        <div className="section-container relative z-10">
          <div className="flex items-center gap-2 text-sm font-medium text-white/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/aprendizagem" className="hover:text-white transition-colors">Aprendizagem Industrial</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Interesse</span>
          </div>
          
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-sm max-w-3xl">
            Programa <span className="text-[#00b5e2]">Jovem Aprendiz</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl font-light leading-relaxed border-l-4 border-[#00b5e2] pl-4">
            Contribua com a formação de jovens aprendizes. A contratação é obrigatória para empresas de médio e grande porte e opcional para micro e pequenas empresas.
            <br/><br/>
            Ao aderir ao programa, a sua organização contribui para a educação de profissionais e desenvolve trabalhadores alinhados com os valores e a cultura da sua indústria.
          </p>
        </div>
      </section>

      {/* Main Content & Form */}
      <section className="py-16 md:py-24 bg-[#f4f7fa]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Info */}
            <div className="lg:col-span-6 space-y-10">
              {/* Passos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#e5e5e5] p-6 text-center rounded-sm">
                  <h4 className="font-bold text-black mb-4">Passo 1</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Entre em contato com o consultor e conheça as opções disponíveis para sua empresa
                  </p>
                </div>
                <div className="bg-[#e5e5e5] p-6 text-center rounded-sm">
                  <h4 className="font-bold text-black mb-4">Passo 2</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Sua empresa pode contratar jovens indicados pelo Senai ou recomendar nomes para participação no processo.
                  </p>
                </div>
                <div className="bg-[#e5e5e5] p-6 text-center rounded-sm">
                  <h4 className="font-bold text-black mb-4">Passo 3</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Os jovens aprovados no processo seletivo são matriculados e já podem começar os cursos no Senai
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
                <h3 className="text-[22px] font-bold text-[#006bb3] text-center mb-8">
                  Responsabilidades
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {/* EMPRESA */}
                  <div>
                    <h4 className="font-bold text-black mb-3">EMPRESA</h4>
                    <ul className="text-sm text-gray-800 space-y-2 list-disc list-inside">
                      <li>Realizar processo seletivo</li>
                      <li>Contratar o jovem aprendiz</li>
                      <li>Garantir os direitos trabalhistas e previdenciários</li>
                      <li>Realizar o preenchimento da avaliação da fase empresa durante o Programa</li>
                    </ul>
                  </div>

                  {/* APRENDIZ */}
                  <div>
                    <h4 className="font-bold text-black mb-3 uppercase">Aprendiz</h4>
                    <ul className="text-sm text-gray-800 space-y-2 list-disc list-inside">
                      <li>Ser assíduo e pontual no Programa de Aprendizagem</li>
                      <li>Executar com zelo e diligência as atividades necessárias ao desenvolvimento das competências profissionais requeridas pela qualificação</li>
                      <li>Respeitar e acatar as normas da escola e empresa.</li>
                    </ul>
                  </div>

                  {/* SENAI */}
                  <div>
                    <h4 className="font-bold text-black mb-3">SENAI</h4>
                    <ul className="text-sm text-gray-800 space-y-2 list-disc list-inside">
                      <li>Formação Profissional</li>
                      <li>Enviar programação da turma e calendário escolar</li>
                      <li>Matricular os jovens selecionados pela empresa</li>
                      <li>Informar à empresa a frequência do jovem no curso e seu desempenho (mensalmente)</li>
                      <li>Acompanhar os alunos/SOE</li>
                      <li>Certificar a qualificação profissional do aprendiz em conformidade com o CONAP</li>
                    </ul>
                  </div>

                  {/* RESPONSÁVEL */}
                  <div>
                    <h4 className="font-bold text-black mb-3 uppercase">Responsável pelo Aprendiz (menor 18 anos)</h4>
                    <ul className="text-sm text-gray-800 space-y-2 list-disc list-inside">
                      <li>Assinar o Contrato de Aprendizagem</li>
                      <li>Acompanhar o desempenho do aprendiz durante a realização da aprendizagem e das demandas.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-[#003470] uppercase mb-2">Solicitação de Vagas</h2>
                  <p className="text-gray-500">Preencha os dados abaixo para iniciar o processo de contratação de jovens aprendizes.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Razão Social da Empresa *</label>
                      <Input placeholder="Nome da empresa" className="h-12 bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">CNPJ *</label>
                      <Input placeholder="00.000.000/0000-00" className="h-12 bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Nome do Contato *</label>
                      <Input placeholder="Seu nome" className="h-12 bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Cargo *</label>
                      <Input placeholder="Seu cargo na empresa" className="h-12 bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">E-mail Corporativo *</label>
                      <Input type="email" placeholder="email@empresa.com.br" className="h-12 bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Telefone / WhatsApp *</label>
                      <Input type="tel" placeholder="(00) 00000-0000" className="h-12 bg-gray-50" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="text-lg font-bold text-[#003470] mb-4">Interesse no Programa</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Unidade SENAI de Preferência *</label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Selecione uma unidade</option>
                          <option value="taguatinga">SENAI Taguatinga</option>
                          <option value="gama">SENAI Gama</option>
                          <option value="sobradinho">SENAI Sobradinho</option>
                          <option value="sig">SENAI SIG</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Número de Vagas *</label>
                        <Input type="number" min="1" placeholder="Ex: 5" className="h-12 bg-gray-50" />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700">Cursos de Interesse (opcional)</label>
                      <Input placeholder="Ex: Assistente Administrativo, TI, etc." className="h-12 bg-gray-50" />
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700">Mensagem ou Observação (opcional)</label>
                      <Textarea placeholder="Tem alguma dúvida específica ou preferência de horários?" className="min-h-[100px] bg-gray-50" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#c32328] hover:bg-[#a11b20] text-white font-extrabold uppercase tracking-wider py-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 mt-4">
                    Enviar Solicitação
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Ao enviar, você concorda com nossos termos de uso e política de privacidade. Nossa equipe entrará em contato em breve.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </main>
  );
};

export default JovemAprendizForm;
