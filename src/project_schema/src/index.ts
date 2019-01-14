import partials from './partials';
import css from './css';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
<<<<<<< HEAD
import { TemplateOptions, PluginType, srcExt, tsCode, tsType, Language } from 'src/template_options';
=======
import { TemplateOptions, PluginType, srcExt, Language, Style } from 'src/template_options';
>>>>>>> 3eb16d1fb1daa2fdd5cb3ca914561776feccb7d0


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
            ctx['tsType'] = tsType(ctx);
            ctx['tsCode'] = tsCode(ctx);
          }
        )
      ]
    } else {
      return [
        new TemplateGenerator(
          require('./module.xs.datasource.ejs'),
          srcExt('module.{ext}'),
          (ctx) => {
            ctx['tsCode'] = tsCode(ctx);
          }
        ),
        new TemplateGenerator(
          require('./datasource.xs.ejs'),
          srcExt('datasource.{ext}'),
          (ctx) => {
            ctx['tsType'] = tsType(ctx);
            ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
          }
        ),
        new TemplateGenerator(
          require('./query_ctrl.xs.ejs'),
          srcExt('query_ctrl.{ext}'),
          (ctx) => {
            ctx['tsType'] = tsType(ctx);
            ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
          }
        )
      ]
    }
  }
]);
