import partials from './partials';
import css from './css';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType, srcExt, ts, Style } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('src', [
  partials,
  context => {
    if (context.options.style !== Style.None) {
      return css;
    } else {
      return [];
    }
  },
  new TemplateGenerator(require('./plugin.json.ejs'), 'plugin.json'),
  context => {
    if(context.options.pluginType === PluginType.Panel) {
      return [
        new TemplateGenerator(
          require('./module.xs.panel.ejs'),
          srcExt('module.{ext}'),
          ctx => {
            ctx['useStyles'] = ctx.options.style !== Style.None;
            ts.bind(ctx);
          }
        )
      ]
    } else {
      return [
        new TemplateGenerator(
          require('./module.xs.datasource.ejs'),
          srcExt('module.{ext}'),
          ctx => {
            ts.bind(ctx);
          }
        ),
        new TemplateGenerator(
          require('./datasource.xs.ejs'),
          srcExt('datasource.{ext}'),
          ctx => {
            ts.bind(ctx);
          }
        ),
        new TemplateGenerator(
          require('./query_ctrl.xs.ejs'),
          srcExt('query_ctrl.{ext}'),
          ctx => {
            ctx['useStyles'] = ctx.options.style !== Style.None;
            ts.bind(ctx);
          }
        )
      ]
    }
  }
]);
