import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, Style } from 'src/template_options';

export default new FolderGenerator<TemplateOptions>('css', [
  context => {
    if(context.options.style === Style.CSS) {
      return [
        new TemplateGenerator(require('./panel.base.css.ejs'), 'panel.base.css'),
        new TemplateGenerator(require('./panel.light.css.ejs'), 'panel.light.css'),
        new TemplateGenerator(require('./panel.dark.css.ejs'), 'panel.dark.css')
      ];
    } else {
      return [];
    }
  }
]);
