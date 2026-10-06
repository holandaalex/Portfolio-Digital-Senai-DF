const ftp = require("basic-ftp");
async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "162.241.2.24",
            user: "luanaf74",
            password: "Q2l9w5n8@@",
            secure: false
        });
        console.log("Connected to FTP!");
        await client.cd("prototipo.alexholanda.com.br");
        console.log("Starting upload...");
        await client.ensureDir("");
        await client.uploadFromDir("public/build", "public/build"); // Wait, Laravel builds to public/build! No, this is a Laravel app, but the whole app needs to be uploaded?
        console.log("Deploy finished!");
    } catch (err) {
        console.log(err);
    }
    client.close();
}
deploy();
