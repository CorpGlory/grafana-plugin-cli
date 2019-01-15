import * as TemplateOptions from './template_options';
import * as _ from 'lodash';
import * as path from 'path';

import * as inquirer from 'inquirer';
import { fs } from './utils';


const QUESTIONS_DB = {
  pluginName: {
    type: 'input',
    message: 'Plugin name:',
    validate: function (value) {
      if (value.length > 0) {
        return true;
      } else {
        return 'Please provide at least 1 character as a name.';
      }
    }
  },
  id: {
    type: 'input',
    message: 'Plugin Id:'
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
      // React is not supported yet
      // { name: 'React', value: TemplateOptions.Framework.React }
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
      { name: '(no styles)', value: TemplateOptions.Style.None },
      { name: 'CSS', value: TemplateOptions.Style.CSS },
      // SASS is not supported yet
      // { name: 'SASS', value: TemplateOptions.Style.SASS }
    ]
  },
  overWriteDir: {
    type: 'list',
    message: 'Directory already exists. Overwrite?',
    choices: [
      { name: 'Yes', value: TemplateOptions.overWriteDir.true},
      { name: 'No', value: TemplateOptions.overWriteDir.false },
    ]
  }

}

function getFromDBAndSetByName(id): inquirer.Question {
  let obj = _.clone(QUESTIONS_DB[id]);
  obj.name = id;
  return obj;
}

function* questionsGen(options: any): IterableIterator<inquirer.Question> {
  var g = getFromDBAndSetByName;
  yield g('pluginName');
  yield g('pluginType');
  let questionId = g('id');
  questionId.default = TemplateOptions.getDefaultId(options);
  yield questionId;
  yield g('language');
  if(options.pluginType === TemplateOptions.PluginType.Datasource) {
    options.framework = TemplateOptions.Framework.Angular;
  } else {
    yield g('framework');
  }
  let dirPath = path.resolve(process.cwd(), options.id)
  if(fs.exists(dirPath)) {
    yield g('overWriteDir');
  }
  yield g('style');
}

export async function collectUserInput(): Promise<TemplateOptions.TemplateOptions> {

  var options = {}
  let quetsionsGen = questionsGen(options);

  while(true) {
    var item = quetsionsGen.next();
    if(item.done) {
      break;
    }
    let question = item.value;
    var answer = await inquirer.prompt(question);
    options[question.name] = answer[question.name];
  }

  return new TemplateOptions.TemplateOptions(options);
}
