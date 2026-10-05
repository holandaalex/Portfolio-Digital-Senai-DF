/**
 * COMPONENTE RAIZ DA APLICAÇÃO
 * ============================
 * Este componente configura os "providers" globais que envolvem toda a aplicação.
 * Os providers fornecem funcionalidades em toda a árvore de componentes.
 *
 * Estrutura de Providers (de fora para dentro):
 * 1. QueryClientProvider - Gerencia dados assíncronos (React Query)
 * 2. BrowserRouter - Habilita roteamento client-side (SPA)
 * 3. Routes - Define as rotas da aplicação
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cursos from "./pages/Cursos.tsx";
import CursoDetalhe from "./pages/CursoDetalhe.tsx";

import Aprendizagem from "./pages/Aprendizagem.tsx";
import JovemAprendizForm from "./pages/JovemAprendizForm.tsx";
import SenaiPro from "./pages/SenaiPro.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import WhatsAppButton from "./components/WhatsAppButton.tsx";

// Cria uma instância do cliente React Query para gerenciar cache de dados
const queryClient = new QueryClient();

/**
 * Configuração de Rotas:
 * - /                              → Página inicial com hero e busca
 * - /cursos                        → Lista todos os cursos disponíveis
 * - /cursos/:area                  → Filtra cursos por área (ex: /cursos/Alimentos)
 * - /cursos/:area/:id              → Detalhe de um curso específico
 * - /senaipro                      → Página do programa SENAI PRO
 * - *                              → Qualquer outra rota não encontrada (página 404)
 * Nota: As rotas mais específicas devem estar ANTES das genéricas!
 */
const App = () => (
  <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos/:area/:id" element={<CursoDetalhe />} />
          <Route path="/cursos/:area" element={<Cursos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/aprendizagem" element={<Aprendizagem />} />
          <Route path="/aprendizagem/interesse" element={<JovemAprendizForm />} />
          <Route path="/senaipro" element={<SenaiPro />} />

          {/* Rota coringa - deve estar sempre por último! */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Banner de consentimento de cookies - conformidade LGPD */}
        <CookieConsent />
        {/* Botão flutuante global de WhatsApp */}
        <WhatsAppButton />
      </BrowserRouter>

  </QueryClientProvider>
);

export default App;
