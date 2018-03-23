const Configstore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');
const vso = require('vso-client');

const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

module.exports = {
    getStoredToken: () => {
        return conf.get('questions.answers');
    },
    registerNewToken: async () => {

        const answers = await inquirer.askRepoDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private')
        };

        const status = new Spinner('Creating remote repository...');
        status.start();

        try {
            conf.set('questions.answers', data);
            //const response = await github.repos.create(data);
            return data;
        } catch (err) {
            throw err;
        } finally {
            status.stop();
        }
    },
    test: () => {
        var client = vso.createClient('url', 'collection', 'your-username', 'your-p@ssw0rd');

        client.getProjects(function (err, projects) {
            if (err) {
                console.log(err);
            } else {
                console.log(projects);
            }
        });
    }
}