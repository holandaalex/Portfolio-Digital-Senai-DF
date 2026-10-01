import Client from 'ssh2-sftp-client';
const sftp = new Client();

async function check() {
  try {
    await sftp.connect({
      host: 'br898.hostgator.com.br',
      port: 2222,
      username: 'luanaf74',
      password: 'Q2l9w5n8@@',
      readyTimeout: 10000,
    });
    console.log("Root:");
    console.log((await sftp.list('/')).map(i => i.name).join(', '));
    console.log("Public HTML:");
    console.log((await sftp.list('/public_html')).map(i => i.name).join(', '));
  } catch (err) {
    console.log(err.message);
  } finally {
    sftp.end();
  }
}
check();
