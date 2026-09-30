import * as ftp from "basic-ftp";
import * as fs from "fs";

async function run() {
    const client = new ftp.Client();
    try {
        await client.access({
            host: "br898.hostgator.com.br",
            user: "luanaf74",
            password: "Q2l9w5n8@@",
            secure: false
        });
        
        let targetDir = "prototipo.alexholanda.com.br";
        const list = await client.list();
        const names = list.map(i => i.name);
        
        if (names.includes("public_html")) {
            await client.cd("public_html");
            const publicList = await client.list();
            const publicNames = publicList.map(i => i.name);
            
            if (publicNames.includes("prototipo")) {
                targetDir = "prototipo";
            } else if (publicNames.includes("prototipo.alexholanda.com.br")) {
                targetDir = "prototipo.alexholanda.com.br";
            } else {
                targetDir = "prototipo.alexholanda.com.br";
            }
            // Retorna pra raiz se não for na public_html pra tentar de novo, mas provável que a gente só vá pro target
            await client.cd("/");
        }
        
        // Verifica se tá na raiz o domínio (comum na Hostgator)
        if (names.includes("prototipo.alexholanda.com.br")) {
             targetDir = "prototipo.alexholanda.com.br";
        } else if (names.includes("public_html")) {
             targetDir = "public_html/" + targetDir;
        }

        console.log("Limpando e subindo arquivos para o diretorio remoto: " + targetDir);
        await client.ensureDir(targetDir);
        await client.clearWorkingDir();
        await client.uploadFromDir("dist");
        console.log("Upload concluido com sucesso!");
    }
    catch(err) {
        console.log("ERRO FTP:", err);
    }
    client.close();
}
run();
