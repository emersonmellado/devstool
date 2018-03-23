const inquirer    = require('inquirer');
const files    = require('./files');

module.exports = {

  askGithubCredentials: () => {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Enter your project path:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project path.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askRegeneratedToken: () => {
    const questions = [
      {
        name: 'token',
        type: 'input',
        message: 'Enter your new regenerated token:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your new regenerated token:.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askProjectDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter your project path:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter the project path.';
          }
        }
      },
      {
        type: 'input',
        name: 'sln',
        default: argv._[1] || null,
        message: 'Enter the sln file name:',
        validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter the sln file name.';
            }
          }
      },
      {
        type: 'list',
        name: 'buildtool',
        message: 'Ms build 14 or 15:',
        choices: [ '14', '15' ],
        default: '15'
      }
    ];
    return inquirer.prompt(questions);
  },

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you wish to ignore:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ];
    return inquirer.prompt(questions);
  }

};
