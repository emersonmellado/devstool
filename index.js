#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const vso = require('./lib/vso');
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

const getToken = async () => {
  // Fetch token from config store
  let token = vso.getStoredToken();
  if (token) {
    return token;
  }
  // return "No token found";
  // No token found, use credentials to access github account
  // await github.setGithubCredentials();

  // // Check if access token for ginit was registered
  // const accessToken = await github.hasAccessToken();
  // if(accessToken) {
  //   console.log(chalk.yellow('An existing access token has been found!'));
  //   // ask user to regenerate a new token
  //   token = await github.regenerateNewToken(accessToken.id);
  //   return token;
  // }

  // // No access token found, register one now
  token = await vso.registerNewToken();
  return token;
}


const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    const token = await getToken();
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
