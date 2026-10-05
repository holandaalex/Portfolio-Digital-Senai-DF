<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#005cac" />

    <!-- Primary Meta Tags -->
    <title>Portfólio SENAI DF | Cursos Técnicos e Qualificação Profissional</title>
    <meta name="title" content="SENAI DF | Cursos Técnicos e Profissionalizantes" />
    <meta name="description" content="Conectando pessoas e indústrias no Distrito Federal. Conheça nossos cursos de Qualificação, Técnicos, Aprendizagem Industrial e prepare-se para o futuro tecnológico." />
    <meta name="keywords" content="SENAI, FIBRA, cursos técnicos, qualificação profissional, indústria, DF, Brasília, Taguatinga, Gama, Sobradinho, educação tecnológica" />
    <meta name="author" content="Alexsander Barreto - FIBRA" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:title" content="SENAI DF | Educação e Indústria" />
    <meta property="og:description" content="Transforme o seu futuro na indústria. Conheça a grade de cursos SENAI DF." />
    <meta property="og:image" content="{{ asset('og-image-senai.jpg') }}" />

    <!-- PWA -->
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Schema Markup Institucional (Para SGE, Google AI e Chatbots) -->
    <script type="application/ld+json">
      {
        "@@context": "https://schema.org",
        "@@type": "EducationalOrganization",
        "name": "SENAI Distrito Federal",
        "alternateName": "SENAI DF",
        "url": "https://senaidf.com.br",
        "logo": "https://senaidf.com.br/logo.png",
        "description": "Instituição referência em educação profissional e inovação tecnológica para a indústria do DF.",
        "address": {
          "@@type": "PostalAddress",
          "streetAddress": "SIA Trecho 3, Lote 225, Ed. Sede FIBRA",
          "addressLocality": "Brasília",
          "addressRegion": "DF",
          "postalCode": "71200-030",
          "addressCountry": "BR"
        },
        "contactPoint": {
          "@@type": "ContactPoint",
          "telephone": "0800-123-6565",
          "contactType": "Customer Service"
        }
      }
    </script>

    @vite('resources/js/main.tsx')
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
