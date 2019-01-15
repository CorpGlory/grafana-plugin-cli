import partials from './partials';
import css from './css';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType, srcExt, ts, Style, Language } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('src', [
  css,
  partials,
  new TemplateGenerator(
    require('./plugin.json.ejs'), 
    'plugin.json',
    ctx => { 
      if(ctx.options.pluginType === PluginType.Panel) {
        ctx['pluginType'] = 'panel';
      } else if(ctx.options.pluginType === PluginType.Datasource) {
        ctx['pluginType'] = 'datasource';
      }
    }
  ),
  context => {
    if(context.options.pluginType === PluginType.Panel) {
      return [
        new TemplateGenerator(
          require('./module.xs.panel.ejs'),
          srcExt('module.{ext}'),
          (ctx) => {
            ctx['useStyles'] = ctx.options.style !== Style.None;
            ctx['tsType'] = ts.type(ctx);
            ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
          }
        )
      ]
    } else {
      return [
        new TemplateGenerator(
          require('./module.xs.datasource.ejs'),
          srcExt('module.{ext}'),
          (ctx) => {
            ctx['tsCode'] = ts.code(ctx);
          }
        ),
        new TemplateGenerator(
          require('./datasource.xs.ejs'),
          srcExt('datasource.{ext}'),
          (ctx) => {
            ctx['tsType'] = ts.type(ctx);
            ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
          }
        ),
        new TemplateGenerator(
          require('./query_ctrl.xs.ejs'),
          srcExt('query_ctrl.{ext}'),
          (ctx) => {
            ctx['tsType'] = ts.type(ctx);
            ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
          }
        )
      ]
    }
  }
]);
