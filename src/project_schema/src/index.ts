import partials from './partials';
import css from './css';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType, srcExt, ts, Style, Language } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('src', [
  css,
  partials,
  new TemplateGenerator(require('./plugin.json.ejs'), 'plugin.json'),
  context => new TemplateGenerator(
    require(`./${context.options.pluginType}/module.xs.ejs`),
    srcExt('module.{ext}'),
    (ctx) => {
      ctx['useStyles'] = ctx.options.style !== Style.None;
      ts.bind(ctx);
    }
  ),
  context => {
    if(context.options.pluginType === PluginType.Datasource) {
      return [
        new TemplateGenerator(
          require('./datasource/datasource.xs.ejs'),
          srcExt('datasource.{ext}'),
          (ctx) => {
            ts.bind(ctx);
          }
        ),
        new TemplateGenerator(
          require('./datasource/query_ctrl.xs.ejs'),
          srcExt('query_ctrl.{ext}'),
          (ctx) => {
            ts.bind(ctx);
          }
        )
      ];
    } else {
      return [];
    }
  }
]);
