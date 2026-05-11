/**
 * UTILITÁRIO: cn (Class Name)
 * ===========================
 * Função auxiliar para mesclar classes CSS de forma inteligente.
 * Combina clsx (para lógica condicional) + twMerge (para resolver conflitos Tailwind).
 *
 * Exemplos de Uso:
 * cn("px-2", "px-4")                    → "px-4" (twMerge resolve conflito)
 * cn("bg-red", isActive && "bg-blue")   → "bg-blue" (clsx remove falsos)
 * cn("p-4 bg-blue", { "text-white": true }) → "p-4 bg-blue text-white"
 *
 * Por que usar?
 * - Evita conflitos com Tailwind CSS
 * - Suporta lógica condicional
 * - Melhora legibilidade do código
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Exporta função para uso em toda a aplicação
export function cn(...inputs: ClassValue[]) {
  // twMerge: resolve conflitos de classes Tailwind
  // clsx: processa valores condicionais e arrays
  return twMerge(clsx(inputs));
}
