/**
 * PONTO DE ENTRADA DA APLICAÇÃO
 * =============================
 * Este é o arquivo principal que inicializa a aplicação React.
 *
 * O que acontece aqui:
 * 1. Importa a função createRoot do React 18 (nova API de renderização)
 * 2. Importa o componente App (raiz da aplicação)
 * 3. Importa os estilos globais (CSS/Tailwind)
 * 4. Renderiza o App dentro do elemento com id="root" do HTML
 *
 * Nota: O "!" após document.getElementById é a asserção de tipo TypeScript
 * que diz ao compilador: "tenho certeza que este elemento existe"
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Renderiza o App na div#root definida em index.html
createRoot(document.getElementById("root")!).render(<App />);
