import * as inquirer from 'inquirer';

let userInput = {
  pluginName: '',
  pluginType: '',
  framework: '',
  language: '',
  style: ''
}

async function collectUserInput() {
  let response;

  let askPluginName = {
    name: 'pluginName',
    type: 'input',
    message: 'Enter your plugin name:',
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Please provide at least 1 character as a name.';
      }
    }
  }
  console.log('-----------------------------');
  response = await inquirer.prompt(askPluginName);
  userInput.pluginName = response.pluginName;

  let askPluginType = {
    name: 'pluginType',
    type: 'list',
    message: 'Choose plugin type',
    choices: [
      'Panel',
      'Metric panel',
      'Datasource'
    ]
  }
  console.log('-----------------------------');
  response = await inquirer.prompt(askPluginType);
  if (response.pluginType === 'Metric panel') {
    response.pluginType = 'MetricPanel'
  }
  userInput.pluginType = response.pluginType;

  let askFramework = {
    name: 'framework',
    type: 'list',
    message: 'Choose framework',
    choices: [
      'angular',
      'react'
    ]
  }
  console.log('-----------------------------');
  response = await inquirer.prompt(askFramework);
  userInput.framework = response.framework;

  let askLanguage = {
    name: 'language',
    type: 'list',
    message: 'Choose language',
    choices: [
      'Typescript',
      'Javascript'
    ]
  }
  console.log('-----------------------------');
  response = await inquirer.prompt(askLanguage);
  userInput.language = response.language;

  let askStyle = {
    name: 'style',
    type: 'list',
    message: 'CSS or SASS',
    choices: [
      'CSS',
      'SASS'
    ]
  }
  console.log('-----------------------------');
  response = await inquirer.prompt(askStyle);
  userInput.style = response.style;
}

export async function runCLI() {
  console.log('-----------------------------');
  console.log('Welcome to Grafana-plugin-cli');

  await collectUserInput();

  console.log('For debugging - below is collected user input')
  console.log(userInput)
}

runCLI();
