import * as TemplateOptions from './template_options';

import * as inquirer from 'inquirer';


function separate() {
  console.log('-----------------------------');
}


const QUESTIONS_DB = [
  {
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
  },
  {
    name: 'pluginType',
    type: 'list',
    message: 'Plugin type:',
    choices: [
      { name: 'Panel', value: TemplateOptions.PluginType.Panel },
      { name: 'Datasource', value: TemplateOptions.PluginType.Datasource }
    ]
  },
  {
    name: 'framework',
    type: 'list',
    message: 'UI Framework:',
    choices: [
      { name: 'AngularJS', value: TemplateOptions.Framework.Angular },
      { name: 'React', value: TemplateOptions.Framework.React }
    ]
  },
  {
    name: 'language',
    type: 'list',
    message: 'Language:',
    choices: [
      { name: 'JavaScript', value: TemplateOptions.Language.JavaScript },
      { name: 'TypeScript', value: TemplateOptions.Language.TypeScript }
    ]
  },
  {
    name: 'style',
    type: 'list',
    message: 'Styles type:',
    choices: [
      { name: '(no styles)', value: null },
      { name: 'CSS', value: TemplateOptions.Style.CSS },
      { name: 'SASS', value: TemplateOptions.Style.SASS }
    ]
  }

]


export async function collectUserInput(): Promise<TemplateOptions.TemplateOptions> {

  let userInput: TemplateOptions.TemplateOptions = {
    id: '',
    pluginName: '',
    pluginType: TemplateOptions.PluginType.Datasource,
    framework: '',
    language: '',
    style: ''
  }

  userInput = await inquirer.prompt<TemplateOptions.TemplateOptions>(QUESTIONS_DB);

  return userInput;
}


