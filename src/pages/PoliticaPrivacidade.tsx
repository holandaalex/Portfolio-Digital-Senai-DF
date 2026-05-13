import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import senaiLogo from "@/assets/senai-logo-header.png";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Developer - Alexsander Barreto - FIBRA
// Conteúdo adaptado da Política de Privacidade do Portal SENAI (Sistema FIBRA),
// alinhado à Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).
// Fonte: https://www.sistemafibra.org.br/senai/politica-de-privacidade-portal-senai

const sections = [
  {
    title: "1. Introdução",
    body: "O SENAI/FIBRA respeita a privacidade dos visitantes e usuários de seus portais e está comprometido com a proteção dos dados pessoais tratados em suas atividades, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).",
  },
  {
    title: "2. Quais dados coletamos",
    body: "Coletamos dados fornecidos voluntariamente pelo usuário (nome, e-mail, telefone, mensagem) por meio de formulários de contato e pré-inscrição, além de dados de navegação (endereço IP, tipo de navegador, páginas visitadas, data e hora de acesso) coletados automaticamente por meio de cookies e tecnologias semelhantes.",
  },
  {
    title: "3. Finalidade do tratamento",
    body: "Os dados pessoais são tratados para: (i) viabilizar o atendimento de solicitações de informação e pré-inscrições em cursos; (ii) divulgar conteúdos institucionais e oportunidades de capacitação; (iii) cumprir obrigações legais e regulatórias; (iv) melhorar a experiência de navegação e a segurança do portal.",
  },
  {
    title: "4. Base legal",
    body: "O tratamento ocorre com base no consentimento do titular, na execução de procedimentos preliminares a contratos, no cumprimento de obrigação legal e no legítimo interesse, sempre nos limites previstos pela LGPD.",
  },
  {
    title: "5. Compartilhamento de dados",
    body: "Os dados pessoais não são comercializados. Podem ser compartilhados com prestadores de serviços contratados (hospedagem, analytics, comunicação), com entidades do Sistema FIBRA e com autoridades públicas, quando exigido por lei ou ordem judicial.",
  },
  {
    title: "6. Cookies",
    body: "Utilizamos cookies essenciais (necessários ao funcionamento do site), de desempenho (estatísticas anônimas de uso) e de funcionalidade (preferências do usuário). Você pode aceitar ou rejeitar o uso de cookies por meio do banner exibido no rodapé e gerenciar as preferências diretamente no navegador.",
  },
  {
    title: "7. Armazenamento e segurança",
    body: "Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida. Os dados são armazenados pelo tempo necessário ao cumprimento das finalidades informadas ou de obrigação legal.",
  },
  {
    title: "8. Direitos do titular",
    body: "Nos termos da LGPD, o titular pode solicitar: confirmação da existência de tratamento; acesso, correção, anonimização, bloqueio ou eliminação dos dados; portabilidade; informação sobre compartilhamentos; e revogação do consentimento.",
  },
  {
    title: "9. Encarregado pelo Tratamento de Dados (DPO)",
    body: "Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato com o Encarregado de Dados do Sistema FIBRA pelo canal oficial disponibilizado no portal institucional.",
  },
  {
    title: "10. Atualizações desta política",
    body: "Esta Política de Privacidade pode ser atualizada a qualquer momento para refletir alterações legais, técnicas ou operacionais. Recomendamos a consulta periódica desta página.",
  },
];

const PoliticaPrivacidade = () => (
  <main className="site-shell">
    <header className="border-b border-border bg-background">
      <div className="section-container flex h-[72px] items-center justify-between">
        <Link to="/">
          <img
            src={senaiLogo}
            alt="Logo SENAI"
            className="senai-logo"
            loading="lazy"
          />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </div>
    </header>

    <section className="section-container py-10 md:py-14">
      <h1 className="mb-2 text-2xl font-black uppercase text-primary sm:text-3xl md:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD
        (Lei nº 13.709/2018).
      </p>

      <div className="space-y-6">
        {sections.map((s) => (
          <article key={s.title}>
            <h2 className="mb-2 text-base font-extrabold text-foreground sm:text-lg">
              {s.title}
            </h2>
            <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>

    <Footer />
    <BackToTop />
  </main>
);

export default PoliticaPrivacidade;
