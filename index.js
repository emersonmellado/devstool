#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const cfg = require('./lib/config');
const files = require('./lib/files');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('DevStool', { horizontalLayout: 'full' })
  )
);

if (files.fileExists('.stool')) {
  console.log(chalk.red('Already in a task!'));
  process.exit();
}

//C:\Emerson\src\git\SchedulePro

const getConfig = async () => {
  let config = cfg.getStoredConfiguration();
  if (config) {
    return config;
  }
  config = await cfg.registerNewConfiguration();
  return config;
}


const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    const config = await getConfig();
    //await console.log("Token: ", token);
    // github.githubAuth(token);

    // // Create remote repository
    // const url = await repo.createRemoteRepo();

    // // Create .gitignore file
    // await repo.createGitignore();

    // // Setup local repository and push to remote
    // const done = await repo.setupRepo(url);
    // if(done) {
    //   console.log(chalk.green('All done!'));
    // }
  } catch (err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
          break;
        case 422:
          console.log(chalk.red('There already exists a remote repository with the same name'));
          break;
        default:
          console.log(err);
      }
    }
  }
}

run();
