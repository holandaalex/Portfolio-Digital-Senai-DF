/**
 * BOTÃO VOLTAR AO TOPO
 * ===================
 * Componente que renderiza um botão flutuante que aparece quando o usuário
 * faz scroll para baixo na página. Clicando, anima o scroll de volta ao topo.
 *
 * Funcionalidades:
 * - Aparece apenas quando scrollY > 320px (evita "poluição visual")
 * - Usa passive event listener para melhor performance
 * - Smooth scroll animation para melhor UX
 * - Acessível: aria-label, focus-visible styles
 *
 * Performance: O ouvinte é adicionado apenas uma vez (useEffect com [])
 */

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Developer - Alexsander Barreto - FIBRA

const BackToTop = () => {
  // Estado para controlar visibilidade do botão
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Função que calcula se o botão deve aparecer
    const onScroll = () => setVisible(window.scrollY > 320);

    // Executa uma vez na montagem para estado inicial correto
    onScroll();

    // Adiciona listener: { passive: true } evita que o navegador espere respostas
    // do event (melhora performance em 60fps)
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup: remove listener quando componente desmonta (evita memory leaks)
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Array vazio = executa apenas uma vez

  // Não renderiza nada se o scroll for menor que 320px
  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Voltar para o topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
