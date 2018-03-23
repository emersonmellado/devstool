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
    getStoredConfiguration: () => {
        return conf.get('project.config');
    },
    registerNewConfiguration: async () => {

        const answers = await inquirer.askProjectDetails();

        const data = {
            path: answers.path,
            sln: answers.sln,
            buidltool: (answers.visibility === 'private')
        };

        const status = new Spinner('Creating remote repository...');
        status.start();

        try {
            conf.set('project.config', data);
            return data;
        } catch (err) {
            throw err;
        } finally {
            status.stop();
        }
    }
}