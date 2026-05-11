# Fontes Neo Sans Pro

Esta pasta destina-se a conter os arquivos de fonte local para o projeto.

## Arquivos esperados

- `NeoSansPro-Regular.woff2`
- `NeoSansPro-Regular.woff`
- `NeoSansPro-Bold.woff2`
- `NeoSansPro-Bold.woff`

## Como obter Neo Sans Pro

### Fontes licenciadas

Neo Sans Pro é uma fonte comercial. As opções legais de aquisição incluem:

- **Adobe Fonts** (caso disponível no seu plano Adobe)
- **MyFonts / Monotype**
- **Fontspring**
- **FontShop**

### Exportando a partir de uma fonte licenciada

Se você possui a versão desktop (`.ttf` ou `.otf`), converta para webfonts:

1. Use uma ferramenta confiável como `fonttools`, `sfnt2woff`, `sfnt2woff-zopfli` ou um conversor online seguro.
2. Gere os arquivos `woff2` e `woff` para compatibilidade máxima.
3. Copie-os para `src/assets/fonts/`.

### Se você não tiver licença

Use uma alternativa gratuita semelhante, como `Inter` ou `Montserrat`, até obter a licença de Neo Sans Pro.

## Uso no projeto

A configuração do CSS em `src/index.css` já está pronta para carregar as fontes localmente quando os arquivos estiverem presentes.

### Exemplo de @font-face já configurado

```css
@font-face {
  font-family: "Neo Sans Pro";
  src:
    local("Neo Sans Pro"),
    local("NeoSansPro"),
    url("./assets/fonts/NeoSansPro-Regular.woff2") format("woff2"),
    url("./assets/fonts/NeoSansPro-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Neo Sans Pro";
  src:
    local("Neo Sans Pro Bold"),
    local("NeoSansPro-Bold"),
    url("./assets/fonts/NeoSansPro-Bold.woff2") format("woff2"),
    url("./assets/fonts/NeoSansPro-Bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Observação

Se os arquivos de fonte não estiverem disponíveis localmente, o site usará o fallback:

`Arial, Helvetica, sans-serif`.
