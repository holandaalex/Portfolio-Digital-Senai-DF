import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  type?: "website" | "Course";
  courseData?: Record<string, unknown>;
}

/**
 * COMPONENTE SEO EXPERT
 * =====================
 * Este componente cuida dinamicamente do ranqueamento da SPA no Google.
 * Além de alterar o Título e a Descrição dinamicamente por página,
 * ele é capaz de criar "Rich Snippets" (Schema.org / JSON-LD) estruturados
 * que farão as IAs e Buscadores como o Google exibirem Cards Educacionais reais
 * ao invés de apenas links textuais.
 */
export const SEO = ({ title, description, type = "website", courseData }: SEOProps) => {
  useEffect(() => {
    // 1. Atualização do Título na Aba do Navegador
    document.title = `${title} | SENAI DF`;

    // 2. Atualização das Meta Tags vitais
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Schema Markup Dinâmico: A "Língua" das Inteligências Artificiais!
    // Quando estamos na página de um Curso (CourseDetalhe), informamos as IAs sobre ele.
    if (type === "Course" && courseData) {
      const scriptId = "seo-jsonld";
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      // Remove o antigo se ele existir de outra rota
      if (script) {
        document.head.removeChild(script);
      }
      
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      
      // Organizando a "Entidade Curso" para o cérebro das IAs
      const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": courseData.title,
        "description": courseData.description || description,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "SENAI Distrito Federal",
          "sameAs": "https://senaidf.com.br"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": courseData.modality === "A Distância" ? "Online" : "Onsite",
          // Ex: converte "1200h" para o padrão ISO que as IAs requerem.
          "courseWorkload": "PT" + (courseData.hours ? courseData.hours.toUpperCase() : "100H")
        }
      };
      
      script.text = JSON.stringify(courseSchema);
      document.head.appendChild(script);
      
      return () => {
        if (script) document.head.removeChild(script);
      };
    }
  }, [title, description, type, courseData]);

  return null;
};
