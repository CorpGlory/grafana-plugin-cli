import * as TemplateOptions from './template_options';

import * as inquirer from 'inquirer';


function separate() {
  console.log('-----------------------------');
}


export async function collectUserInput(): Promise<TemplateOptions.TemplateOptions> {

  let userInput: TemplateOptions.TemplateOptions = {
    id: '',
    pluginName: '',
    pluginType: TemplateOptions.PluginType.Datasource,
    framework: '',
    language: '',
    style: ''
  }

  let response;

  let askPluginName = {
    name: 'pluginName',
    type: 'input',
    message: 'Enter your plugin name:',
    validate: function (value) {
      if (value.length > 0) {
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
      { name: 'Panel', value: TemplateOptions.PluginType.Panel },
      { name: 'Datasource', value: TemplateOptions.PluginType.Datasource }
    ]
  }
  separate();
  response = await inquirer.prompt<TemplateOptions.PluginType>(askPluginType);
  userInput.pluginType = response.pluginType;

  let askFramework = {
    name: 'framework',
    type: 'list',
    message: 'UI Framework:',
    choices: [
      { name: 'AngularJS', value: TemplateOptions.Framework.Angular },
      { name: 'React', value: TemplateOptions.Framework.React }
    ]
  }
  separate();
  response = await inquirer.prompt<TemplateOptions.Framework>(askFramework);
  userInput.framework = response.framework;

  let askLanguage = {
    name: 'language',
    type: 'list',
    message: 'Language:',
    choices: [
      { name: 'JavaScript', value: TemplateOptions.Language.JavaScript },
      { name: 'TypeScript', value: TemplateOptions.Language.TypeScript }
    ]
  }
  separate();
  response = await inquirer.prompt<TemplateOptions.Language>(askLanguage);
  userInput.language = response.language;

  let askStyle = {
    name: 'style',
    type: 'list',
    message: 'Styles type:',
    choices: [
      { name: '(no styles)', value: null },
      { name: 'CSS', value: TemplateOptions.Style.CSS },
      { name: 'SASS', value: TemplateOptions.Style.SASS }
    ]
  }
  separate();
  response = await inquirer.prompt<TemplateOptions.Style | null>(askStyle);
  userInput.style = response.style;

  return userInput;
}


