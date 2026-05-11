/**
 * HOOK: useIsMobile
 * =================
 * Hook customizado que detecta se o viewport é mobile (<768px).
 * Atualiza em tempo real conforme o usuário redimensiona a janela.
 *
 * Caso de Uso:
 * const isMobile = useIsMobile();
 * return <div>{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>;
 *
 * Nota: Usa matchMedia API para melhor performance que resize events
 */

import * as React from "react";

// Breakpoint padrão Tailwind para mobile (md: 768px)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // undefined = ainda não sabe (evita hydration mismatch em SSR)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    // matchMedia: API moderna e eficiente para media queries em JS
    // Menos custosa que resize events!
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Callback executado sempre que o tamanho da tela muda
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Adiciona listener para mudanças de tamanho de tela
    mql.addEventListener("change", onChange);

    // Define o estado inicial corretamente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup: remove listener ao desmontar
    return () => mql.removeEventListener("change", onChange);
  }, []); // Array vazio = executa apenas uma vez

  // Converte undefined/null/false em booleano (!! = double negation)
  return !!isMobile;
}
