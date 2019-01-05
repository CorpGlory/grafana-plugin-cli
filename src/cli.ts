import * as TemplateOptions from './template_options';
import * as _ from 'lodash';

import * as inquirer from 'inquirer';


function separate() {
  console.log('-----------------------------');
}


const QUESTIONS_DB = {
  pluginName: {
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
  pluginType: {
    type: 'list',
    message: 'Plugin type:',
    choices: [
      { name: 'Panel', value: TemplateOptions.PluginType.Panel },
      { name: 'Datasource', value: TemplateOptions.PluginType.Datasource }
    ]
  },
  framework: {
    type: 'list',
    message: 'UI Framework:',
    choices: [
      { name: 'AngularJS', value: TemplateOptions.Framework.Angular },
      { name: 'React', value: TemplateOptions.Framework.React }
    ]
  },
  language: {
    type: 'list',
    message: 'Language:',
    choices: [
      { name: 'JavaScript', value: TemplateOptions.Language.JavaScript },
      { name: 'TypeScript', value: TemplateOptions.Language.TypeScript }
    ]
  },
  style: {
    type: 'list',
    message: 'Styles type:',
    choices: [
      { name: '(no styles)', value: null },
      { name: 'CSS', value: TemplateOptions.Style.CSS },
      { name: 'SASS', value: TemplateOptions.Style.SASS }
    ]
  }

}

function getFromDBAndSetByName(id): inquirer.Question {
  let obj = _.clone(QUESTIONS_DB[id]);
  obj.name = id;
  return obj;
}



var myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}
function* questionsGen(): IterableIterator<inquirer.Question> {
  
  var g = getFromDBAndSetByName;
  
  yield g('pluginName');
  yield g('pluginType');
}

export async function collectUserInput(): Promise<TemplateOptions.TemplateOptions> {

  let userInput: TemplateOptions.TemplateOptions = {
    id: '',
    pluginName: '',
    pluginType: TemplateOptions.PluginType.Datasource,
    framework: '',
    language: '',
    style: null
  }

  let quetsionsGen = questionsGen();

  console.log(quetsionsGen.next());
  console.log(quetsionsGen.next());
  console.log(quetsionsGen.next());
  

  return userInput;
}


