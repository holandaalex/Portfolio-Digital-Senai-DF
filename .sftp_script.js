import Client from 'ssh2-sftp-client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sftp = new Client();

const config = {
  host: 'br898.hostgator.com.br',
  port: 2222,
  username: 'luanaf74',
  password: 'Q2l9w5n8@@',
  // Algumas vezes a Hostgator precisa de algs específicos ou host keys desativadas:
  readyTimeout: 10000,
};

async function deploy() {
  try {
    console.log('Conectando via SFTP no servidor br898.hostgator.com.br...');
    await sftp.connect(config);
    
    // Tentar descobrir o caminho absoluto correto
    let targetDir = '/home4/luanaf74/prototipo.alexholanda.com.br'; 
    
    try {
      const publicList = await sftp.list('/home4/luanaf74/public_html');
      const publicNames = publicList.map(f => f.name);
      if (publicNames.includes('prototipo.alexholanda.com.br')) {
           targetDir = '/home4/luanaf74/public_html/prototipo.alexholanda.com.br';
      } else if (publicNames.includes('prototipo')) {
           targetDir = '/home4/luanaf74/public_html/prototipo';
      }
    } catch(e) {
      // Ignorar, tentar o home direto
    }
    
    console.log('Caminho alvo configurado. Fazendo upload da pasta dist/ para: ' + targetDir);
    
    const localPath = path.join(__dirname, 'dist');
    
    // O uploadDir vai subir todos os arquivos e subpastas recursivamente
    await sftp.uploadDir(localPath, targetDir);
    
    console.log('Upload via SFTP CLI concluído com sucesso!');
  } catch (err) {
    console.error('Erro no Deploy:', err.message);
  } finally {
    sftp.end();
  }
}

deploy();
