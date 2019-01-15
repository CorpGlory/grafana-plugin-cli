import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, Style } from 'src/template_options';

export default new FolderGenerator<TemplateOptions>('css', [
  context => {
    if(context.options.style === Style.CSS) {
      let pluginType = context.options.pluginType;
      return [
        new TemplateGenerator(require(`./${pluginType}.base.css.ejs`), `${pluginType}.base.css`),
        new TemplateGenerator(require(`./${pluginType}.light.css.ejs`), `${pluginType}.light.css`),
        new TemplateGenerator(require(`./${pluginType}.dark.css.ejs`), `${pluginType}.dark.css`)
      ];
    } else {
      return [];
    }
  }
]);
