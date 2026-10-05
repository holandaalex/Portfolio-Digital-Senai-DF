# Portfólio SENAI DF

Aplicação web Híbrida (SPA) para portfólio de cursos SENAI, desenvolvida com **Laravel 11** no back-end e **React 18 / TypeScript / Tailwind CSS** no front-end.

## 🚀 Quick Start (Ambiente Local)

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js & npm

### Passo a Passo

```bash
# 1. Instalar dependências do back-end (PHP/Laravel)
composer install

# 2. Instalar dependências do front-end (Node/React)
npm install

# 3. Configurar ambiente
cp .env.example .env
php artisan key:generate

# 4. Iniciar os servidores
# Em um terminal, inicie o motor do Laravel:
php artisan serve
# (A API rodará em http://localhost:8000)

# Em outro terminal, inicie o Vite para hot-reload do React:
npm run dev
# (Acesse o site pela URL gerada pelo Vite)
```

---

## 🛠️ Tecnologias Utilizadas

### Back-end (Laravel)
| Tecnologia | Versão | Uso |
| --- | --- | --- |
| **Laravel** | 11.x | Framework PHP MVC / API Interna |
| **Blade** | - | Motor de templates base (`app.blade.php`) |
| **Mail** | - | Disparo nativo de e-mails via SMTP/Sendmail |

### Front-end (React SPA)
| Tecnologia | Versão | Uso |
| --- | --- | --- |
| **React** | 18.3 | Biblioteca de UI principal |
| **TypeScript** | 5.x | Tipagem estática de dados |
| **Vite** | 5.4 | Bundler otimizado e HMR (laravel-vite-plugin) |
| **React Router**| 6.30 | Roteamento Client-side (SPA) |
| **Tailwind CSS**| 3.4 | Utility-first CSS |
| **shadcn/ui** | - | Componentes acessíveis (Radix UI) |
| **React Query** | 5.x | Data fetching assíncrono |

---

## 🏗️ Arquitetura Híbrida (SPA + API)

O projeto foi modernizado para uma arquitetura full-stack independente. O front-end atua como uma SPA (Single Page Application) servida por uma única view do Laravel.

1. **Entrada:** Todas as rotas de navegação (`/*`) são direcionadas pelo roteador do Laravel para a view `app.blade.php`.
2. **Renderização:** A view injeta o código via Vite (`@vite('resources/js/main.tsx')`). A partir daí, o React Router assume a navegação fluida sem recarregar a página.
3. **Formulários e API:** O React envia dados via requisições `fetch` assíncronas para as rotas da API interna do Laravel (ex: `/api/formularios/contato`).
4. **Disparo de E-mails:** O Controller do Laravel processa as requisições com segurança, renderiza as views de e-mail customizadas da pasta `resources/views/mail/` e executa o envio direto para `contato@alexholanda.com.br`, sem depender de APIs de terceiros.

---

## 🔐 Segurança e Conformidade

- **Middleware Anti-Spam:** Proteção de `throttle` configurada nas rotas de API para evitar abusos de envio (bloqueio por IP em caso de flood).
- **Respostas JSON:** API configurada para retornar mensagens de validação (HTTP 422) corretamente formatadas, interceptadas perfeitamente pelo React.
- **LGPD (Lei 13.709/2018):** Banner de consentimento de cookies, política de privacidade nativa e ausência de rastreadores de terceiros intrusivos.
- **Acessibilidade:** Conformidade com WCAG 2.1 AA, alto contraste, e suporte completo à navegação por teclado.

---

## 🚢 Deploy (Produção)

O projeto está estruturado de forma "enxuta" para hospedagens compartilhadas (como Hostgator/cPanel):

1. Execute o build do front-end localmente: `npm run build`
2. Empacote as pastas vitais (`app/`, `bootstrap/`, `config/`, `public/`, `resources/views/`, `routes/`, `storage/`, `vendor/` e `.env`). *Nota: Ignore `node_modules` e código-fonte React.*
3. Transfira para o servidor de produção (SFTP/SSH).
4. Crie um `.htaccess` na raiz do domínio para:
   - Forçar a versão do **PHP 8.4** (`AddHandler application/x-httpd-ea-php84 .php .php8 .phtml`)
   - Redirecionar todo o tráfego HTTP para a pasta protegida `/public`.
5. No `.env` de produção, assegure as configurações críticas:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   MAIL_MAILER=sendmail
   ```

---

## 📞 Contato

- **Email Oficial:** contato@alexholanda.com.br

**Desenvolvido por Alexsander Barreto - FIBRA/SENAI-DF**
*(Última atualização: Transição para motor autônomo PHP/Laravel)*
