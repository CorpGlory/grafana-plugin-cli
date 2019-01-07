import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('partials', [
  context => {
    if(context.options.pluginType === PluginType.Panel) {
      return new TemplateGenerator(require('./template.html.panel.ejs'), 'template.html')
    } else {
      return [
        new TemplateGenerator(require('./config.html.ejs'), 'config.html'),
        new TemplateGenerator(require('./query.editor.html.ejs'), 'query.editor.html'),
        new TemplateGenerator(require('./query.options.html.ejs'), 'query.options.html')
      ]
    }
  }
]);