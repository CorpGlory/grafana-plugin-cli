import { TemplateConfig } from './template_config';

import * as inquirer from 'inquirer';

let userInput: TemplateConfig = {
  pluginName: '',
  pluginType: '',
  framework: '',
  language: '',
  style: ''
}

function separate() {
  console.log('-----------------------------');
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
  separate();
  response = await inquirer.prompt(askPluginName);
  userInput.pluginName = response.pluginName;

  let askPluginType = {
    name: 'pluginType',
    type: 'list',
    message: 'Plugin type:',
    choices: [
      'Panel',
      'Datasource'
    ]
  }
  separate();
  response = await inquirer.prompt(askPluginType);
  userInput.pluginType = response.pluginType;

  let askFramework = {
    name: 'framework',
    type: 'list',
    message: 'UI Framework:',
    choices: [
      'AngularJS',
      'React'
    ]
  }
  separate();
  response = await inquirer.prompt(askFramework);
  userInput.framework = response.framework;

  let askLanguage = {
    name: 'language',
    type: 'list',
    message: 'Language:',
    choices: [
      'Javascript',
      'Typescript'
    ]
  }
  separate();
  response = await inquirer.prompt(askLanguage);
  userInput.language = response.language;

  let askStyle = {
    name: 'style',
    type: 'list',
    message: 'Styles:',
    choices: [
      '(no styles)',
      'CSS',
      'SASS'
    ]
  }
  separate();
  response = await inquirer.prompt(askStyle);
  userInput.style = response.style;
}

export async function runCLI() {
  separate();
  console.log('Welcome to Grafana-plugin-cli');

  await collectUserInput();

  separate();
  console.log('Your plugin is being assembled!')
}
