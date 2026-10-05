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
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cursos from "./pages/Cursos.tsx";
import CursoDetalhe from "./pages/CursoDetalhe.tsx";

import Aprendizagem from "./pages/Aprendizagem.tsx";
import JovemAprendizForm from "./pages/JovemAprendizForm.tsx";
import SenaiPro from "./pages/SenaiPro.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import WhatsAppButton from "./components/WhatsAppButton.tsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminFormularios from "./pages/admin/AdminFormularios.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/cursos/:area/:id" element={<CursoDetalhe />} />
          <Route path="/cursos/:area" element={<Cursos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/aprendizagem" element={<Aprendizagem />} />
          <Route path="/aprendizagem/interesse" element={<JovemAprendizForm />} />
          <Route path="/senaipro" element={<SenaiPro />} />

          {/* Rotas Administrativas */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<AdminDashboard />} />
            <Route path="formularios" element={<AdminFormularios />} />
            <Route path="cursos" element={<div className="p-8">Módulo de Cursos em construção</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <WhatsAppButton />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
