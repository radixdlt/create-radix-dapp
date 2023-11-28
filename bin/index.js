#! /usr/bin/env node
const { exec } = require('child_process');
let cmd = `npx degit radixdlt/create-radix-dapp/templates/vanilla_js ${process.argv[2]}`;
console.log("Building your dapp...");
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    if (stdout) {
        console.log(`stdout: "${stdout}`);
    }
    console.log("Dapp built!");
    console.log("You can now run the commands below to start your new dApp:")
    console.info(`cd ${process.argv[2]}/client`)
    console.info("npm install")
    console.info("npm run dev")
    console.info("to run the dev server")
});