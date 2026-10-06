const ftp = require("basic-ftp");
async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "br898.hostgator.com.br",
            user: "luanaf74",
            password: "Q2l9w5n8@@",
            secure: false
        });
        console.log("Connected to FTP!");
        await client.cd("prototipo.alexholanda.com.br");
        console.log("Current dir:", await client.pwd());
    } catch (err) {
        console.log(err);
    }
    client.close();
}
deploy();
