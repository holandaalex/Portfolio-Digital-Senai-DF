/**
 * COMPONENTE RAIZ DA APLICAÇÃO
 * ============================
 * Este componente configura os "providers" globais que envolvem toda a aplicação.
 * Os providers fornecem funcionalidades em toda a árvore de componentes.
 *
 * Estrutura de Providers (de fora para dentro):
 * 1. QueryClientProvider - Gerencia dados assíncronos (React Query)
 * 2. TooltipProvider - Habilita tooltips em toda a app
 * 3. Toasters - Notificações (toast messages)
 * 4. BrowserRouter - Habilita roteamento client-side
 * 5. Routes - Define as rotas da aplicação
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cursos from "./pages/Cursos.tsx";
import CursoDetalhe from "./pages/CursoDetalhe.tsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.tsx";
import CookieConsent from "./components/CookieConsent.tsx";

// Cria uma instância do cliente React Query para gerenciar cache de dados
const queryClient = new QueryClient();

/**
 * Configuração de Rotas:
 * - /                              → Página inicial com hero e busca
 * - /cursos                        → Lista todos os cursos disponíveis
 * - /cursos/:area                  → Filtra cursos por área (ex: /cursos/Alimentos)
 * - /cursos/:area/:id              → Detalhe de um curso específico
 * - /politica-de-privacidade       → Política LGPD
 * - *                              → Qualquer outra rota (página 404)
 *
 * Nota: As rotas mais específicas devem estar ANTES das genéricas!
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Renderiza notificações: Toaster (sistema) e Sonner (toasts customizados) */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos/:area/:id" element={<CursoDetalhe />} />
          <Route path="/cursos/:area" element={<Cursos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route
            path="/politica-de-privacidade"
            element={<PoliticaPrivacidade />}
          />
          {/* Rota coringa - deve estar sempre por último! */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Banner de consentimento de cookies - conformidade LGPD */}
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
