#!/bin/bash

# ==============================================================================
# SCRIPT RÁPIDO DE DEPLOY - SENAI DF (PROTÓTIPO)
# ==============================================================================

echo "🚀 Iniciando o Deploy Automático..."

# 1. Compilar o Frontend (React/Vite)
echo "📦 Compilando assets do Frontend (npm run build)..."
npm run build

# Verifica se o build funcionou
if [ $? -ne 0 ]; then
    echo "❌ Erro durante o build do frontend. Cancelando o deploy."
    exit 1
fi

# 2. Criar o arquivo de extração remoto (PHP)
echo "⚙️ Criando script de extração remoto..."
cat << 'EOF' > unzip.php
<?php
$zip = new ZipArchive;
// Tenta abrir o arquivo deploy.zip no mesmo diretório
$res = $zip->open('deploy.zip');
if ($res === TRUE) {
  // Extrai para o diretório atual (raiz do FTP)
  $zip->extractTo('./');
  $zip->close();
  echo "✅ Extração concluída com sucesso no servidor!";
} else {
  echo "❌ Erro ao extrair o arquivo ZIP no servidor.";
}
// Limpeza: apaga o ZIP e este script para segurança
@unlink('deploy.zip');
@unlink('unzip.php');
?>
EOF

# 3. Compactar os arquivos necessários
# Incluímos 'public/build' (CSS/JS/Imagens), 'app' (Controladores PHP), 'routes' e 'resources/views'
echo "🗜️ Compactando arquivos para envio..."
zip -r deploy.zip public/build app routes resources/views

# 4. Enviar os arquivos via FTP usando LFTP
echo "🌐 Conectando ao servidor FTP e enviando os arquivos..."
lftp -c "
set ssl:verify-certificate no
set ftp:ssl-allow no
open -u luanaf74,Q2l9w5n8@@ 162.241.2.24
cd prototipo.alexholanda.com.br
put deploy.zip
put unzip.php
bye
"

# 5. Acionar o script PHP remotamente para descompactar os arquivos no servidor
echo "⚡ Descompactando arquivos no HostGator..."
curl -s https://prototipo.alexholanda.com.br/unzip.php
echo ""

# 6. Limpeza Local
echo "🧹 Limpando arquivos temporários locais..."
rm deploy.zip unzip.php

echo "🎉 Deploy finalizado com sucesso! Acesse https://prototipo.alexholanda.com.br"
