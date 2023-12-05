#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import degit from 'degit';
import { exec } from 'child_process';

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <name>")
    .demandCommand(1)
    .argv;

const projectName = argv._[0];
const basePath = "radixdlt/create-radix-dapp/templates"

// Template options
const templates = [
    { name: "Vanilla JS", value: "/vanilla_js" },
    { name: "React", value: "/react" },
    // Add more templates here
];

// Ask the user to select a template
inquirer.prompt([
    {
        type: 'list',
        name: 'template',
        message: 'Which template would you like to use?',
        choices: templates,
    }
]).then(answers => {
    // Use degit to clone the selected template
    const emitter = degit(`${basePath}${answers.template}`, {
        cache: true,
        force: true,
        verbose: true,
    });
    emitter.on('info', info => {
        console.log(info.message);
    });
    emitter.clone(projectName).then(() => {
        console.log('Template created successfully.');
        console.log('Installing dependencies...');

        exec(`cd ${projectName}/client && npm install`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing dependencies: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`Error installing dependencies: ${stderr}`);
                return;
            }

            console.log('Dependencies installed successfully.');
            console.log(`To start the app, run: cd ${projectName}/client && npm run dev`);
        });
    }).catch(err => {
        console.error('Failed to clone template:', err);
    });
});