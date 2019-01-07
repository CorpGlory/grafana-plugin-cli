import partials from './partials';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('src', [
  partials,
  new TemplateGenerator(require('./plugin.json.ejs'), 'plugin.json'),
  context => {
    if(context.options.pluginType === PluginType.Panel) {
      return [
        new TemplateGenerator(require('./module.js.panel.ejs'), 'module.js')
      ]
    } else {
      return [
        new TemplateGenerator(require('./module.js.datasource.ejs'), 'module.js'),
        new TemplateGenerator(require('./query_ctrl.js.ejs'), 'query_ctrl.js')
      ]
    }
  }
]);