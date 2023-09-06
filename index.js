#!/usr/bin/env node

import chalk from "chalk";
const { program } = require('commander');
const { execSync,exec } = require('child_process');
const fs = require('fs');
const { existsSync } = fs;
const path = require('path');
const inquirer = require('inquirer');
// const createFileDict = require('./folderToFilesystmTree');
const axios = require('axios');
const { authPrompt } = require('./prompts');

program
    .allowUnknownOption()
    .action(async() => {
        // Get all raw arguments
        const args = process.argv.slice(2);
        const currentFolderName = path.basename(process.cwd());

        if (args.includes('--deploy')) {
            if (isNextApp(process.cwd())) {
                // Deploy logic here
                if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
                    // This is just an example function; replace with your actual deploy logic
                     buildNextApp()
                    console.log("build done");
                    deployFunction(currentFolderName);
                } else {
                    console.error('Cannot deploy. Make sure you are inside a valid project folder.');
                }
            } else {
                console.error("This doesn't appear to be a Next.js application.Make sure you are inside a valid Next.js project directory.");
            }
        } else {
            const folderArg = args.find(arg => arg.startsWith('--'));
            if (folderArg) {
                const folderName = folderArg.slice(2);  // Remove the "--" prefix

                if (!fs.existsSync(folderName)) {
                    console.log(chalk.blue((`Creating ${folderName} folder and installing Next.js app...`)));
                    execSync(`mkdir ${folderName} && cd ${folderName} && npx create-next-app .`, { stdio: 'inherit' });
                } else {
                    console.error(`The folder ${folderName} already exists!`);
                }
            } else {
                console.error('Please provide a valid option.');
            }
        }
    });

program.parse(process.argv);

async function deployFunction(folderName) {
    try {
        const { email, password, componentName, description } = await inquirer.prompt(authPrompt);
        // const authAnswer = await inquirer.prompt(authPrompt);
        // Use answers.componentName and answers.description where needed
        const data = {
            email,
            password,
        };
        const userResponse = await axios.post('http://127.0.0.1:5001/xcipher-7716d/asia-south1/miuraccli/validateuser', data)
        if (userResponse.data.status === "success") {
            const data = {
                buildTemplate:"buildTemplate",
                componentName:"buildTemplate",
                configLists:"buildTemplate",
                deps:"buildTemplate",
                description:"buildTemplate",
                files:"buildTemplate",
                status:"buildTemplate",
            }
            const addComponentResponse = await axios.post('http://127.0.0.1:5001/xcipher-7716d/asia-south1/miuraccli/addcomponent', data)
            if (addComponentResponse.data.status === "success") {
                console.log("done", userResponse.data.uid);
            }

        }
        return
        // Your deploy logic goes here. 
        // For demonstration purposes, we just log the folder name.
        // console.log(`Deploying project from folder: ${folderName}`);
        // const data = await createFileDict(__dirname)
    } catch (error) {
        // console.log({ error: error });
    }
}

function isNextApp(directory) {
    const packageJsonPath = path.join(directory, 'package.json');

    if (existsSync(packageJsonPath)) {
        const packageJson = require(packageJsonPath);
        return packageJson.dependencies && packageJson.dependencies.next;
    }
    return false;
};

function buildNextApp() {
   exec('npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log("kjdakvbj");
    });
}