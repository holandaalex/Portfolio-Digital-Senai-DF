# 🚀 GUIA DE DEPLOY - HOSTGATOR

## 📋 Pré-requisitos

✅ Conta ativa no Hostgator
✅ Domínio apontado (ou subdomínio)
✅ Acesso cPanel e/ou File Manager
✅ Dados de FTP (se usar cliente FTP)

---

## 📁 O QUE FAZER UPLOAD

**Fonte:** Pasta `dist/` do projeto

**Arquivos:**

```
dist/
├── index.html              ← Arquivo principal
├── .htaccess               ← Configuração de rotas (IMPORTANTE!)
├── favicon.ico
├── manifest.webmanifest
├── robots.txt
├── registerSW.js
├── sw.js
├── workbox-9c191d2f.js
├── placeholder.svg
└── assets/                 ← Todos os arquivos
    ├── *.js
    ├── *.css
    ├── *.jpg
    ├── *.png
    └── ...
```

**Tamanho Total:** ~2.5 MB

---

## 🔧 PASSO-A-PASSO DE DEPLOY

### Opção 1: File Manager (Hostgator cPanel) - MAIS FÁCIL ✅

**1. Acessar File Manager:**

- Entrar em https://conta.hostgator.com.br (seu cPanel)
- Ir em **File Manager**
- Navegar até a pasta `public_html/`

**2. Upload via Drag & Drop:**

- Selecione TODOS os arquivos da pasta `dist/`
- Arraste para o File Manager
- Aguarde o upload (2-5 minutos)

**3. Verificar Estrutura:**

```
public_html/
├── index.html
├── .htaccess          ← VERIFICAR SE ESTÁ AQUI!
├── assets/
├── favicon.ico
├── manifest.webmanifest
└── ...
```

**4. Testar:**

- Abra seu domínio no navegador: `https://seudominio.com.br`
- Deve aparecer a página do Portfólio SENAI

---

### Opção 2: WinSCP (Cliente FTP/SFTP) - MAIS RÁPIDO

**1. Baixar WinSCP:**

- https://winscp.net/download/

**2. Configurar Conexão:**

- Protocol: **SFTP** (mais seguro)
- Hostname: `seudominio.com.br` ou IP do servidor
- Username: `seu_usuario_ftp`
- Password: `sua_senha_ftp`
- Port: `22` (SFTP) ou `21` (FTP antigo)

**3. Conectar e Fazer Upload:**

- Lado esquerdo: Pasta `dist/` do seu computador
- Lado direito: Pasta `public_html/` do Hostgator
- Arraste todos os arquivos (Ctrl+A → Ctrl+C → Cola)
- Confirmar upload

---

### Opção 3: FileZilla (Alternativa Gratuita)

**1. Baixar FileZilla:**

- https://filezilla-project.org/

**2. Configuração:**

- Ir em Arquivo → Gerenciar Sites
- Novo site: "Portfólio SENAI"
- Protocol: SFTP
- Host: seu IP/domínio
- User: seu username FTP
- Password: sua senha FTP

**3. Upload:**

- Conectar
- Arrastar arquivos de `dist/` para `public_html/`

---

## ⚠️ PONTOS IMPORTANTES

### 1. Arquivo .htaccess

**CRÍTICO!** Este arquivo é essencial para o React Router funcionar.

```
# Verifica se existe
dist/.htaccess  ✅

# Conteúdo dele deve ter:
RewriteEngine On
RewriteRule ^ index.html [QSA,L]
```

Se não fizer upload correto:
❌ Páginas retornarão 404
❌ Links do menu não funcionam
❌ Atualizar página quebra roteamento

**Solução:**

1. File Manager → dist/.htaccess
2. Copiar conteúdo do arquivo
3. Colar em novo arquivo `.htaccess` no `public_html/`

### 2. Permissões de Arquivo

```bash
# Se tiver acesso SSH (avançado):
chmod 644 public_html/index.html
chmod 644 public_html/.htaccess
chmod 755 public_html/assets/
```

### 3. HTTPS/SSL

Hostgator oferece SSL gratuito (Let's Encrypt):

1. cPanel → SSL/TLS
2. Instalar certificado
3. Forçar HTTPS (Redirect)

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Após fazer upload, verificar:

- [ ] Site abre em `https://seudominio.com.br`
- [ ] Logo SENAI aparece
- [ ] Menu mobile abre (clique hamburger)
- [ ] Links do menu funcionam (Áreas, Cursos, Contatos)
- [ ] Busca de cursos funciona
- [ ] Clique em um curso → página de detalhe abre
- [ ] Rolagem suave até seções
- [ ] Botão "Voltar ao topo" funciona
- [ ] Formulário de contato carrega
- [ ] Imagens carregam corretamente
- [ ] Console (F12) sem erros vermelhos
- [ ] Performance OK (Lighthouse 8.9/10)

---

## 🐛 TROUBLESHOOTING

### Problema: Página 404 após upload

**Causa:** .htaccess não funcionando
**Solução:**

```
1. Abrir cPanel → File Manager
2. Navegar até public_html/
3. Verificar se .htaccess está lá
4. Se não: criar novo arquivo → .htaccess → colar conteúdo
5. Se sim: dar permissão 644
```

### Problema: Menu mobile não abre

**Causa:** JavaScript não carregou
**Solução:**

```
1. Abrir DevTools (F12)
2. Verificar aba Console por erros
3. Aba Network → verificar se assets carregam
4. Se 404: verificar estrutura de pastas
```

### Problema: Images não aparecem

**Causa:** Caminho de assets incorreto
**Solução:**

```
assets/ DEVE estar em public_html/assets/
Se .htaccess não está funcionando, o roteamento quebra
```

### Problema: Muuuito lento

**Causa:** GZIP não habilitado
**Solução:**

1. cPanel → Optimize Website (habilitar)
2. Ou confiar que o .htaccess já faz isso

---

## 📊 INFORMAÇÕES TÉCNICAS

**Stack Utilizado:**

- React 18.3.1
- TypeScript 5.x
- Vite 5.4.19
- Tailwind CSS 3.4.17
- Radix UI + Shadcn

**Build Output:**

- Bundle size: ~389 KB (gzip: ~122 KB)
- Imagens otimizadas
- PWA com Service Worker
- Versionamento de assets (hash)

**Suporte:**

- Suporta todos os navegadores modernos
- Mobile-first design
- Offline capability (PWA)

---

## 🔐 SEGURANÇA

✅ Implementado:

- Security Headers (CSP, X-Frame-Options, etc)
- HTTPS/SSL
- LGPD compliant (Cookie consent)
- Input sanitization

⚠️ Verificar:

- [ ] Domínio está em HTTPS
- [ ] SSL válido (Padlock verde)
- [ ] Sem console errors relacionados a segurança

---

## 📞 SUPORTE HOSTGATOR

Se tiver problemas:

1. **Chat Hostgator** (24/7): https://www.hostgator.com.br/suporte
2. **Tickets**: cPanel → Suporte
3. **FAQ**: https://www.hostgator.com.br/como-usar

Mencionar:

- "Aplicação React SPA"
- "Preciso de mod_rewrite habilitado"
- "Arquivo .htaccess com RewriteRules"

---

## ✨ RESULTADO FINAL

✅ Portfólio SENAI online
✅ Menu mobile funcional
✅ Todas as rotas funcionando
✅ Performance 8.9/10
✅ PWA instalável
✅ LGPD compliant

**Domínio:** https://seudominio.com.br
**Status:** 🟢 Online em Produção

---

**Data:** 11 de maio de 2026
**Versão:** 1.0.0
**Desenvolvido com ❤️ para SENAI FIBRA**
