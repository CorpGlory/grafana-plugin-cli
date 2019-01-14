import partials from './partials';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, PluginType, srcExt, tsCode, tsType } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('src', [
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
            ctx['showStyles'] = ctx.options.style !== null;
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
            ctx['tsCode'] = tsCode(ctx);
          }
        ),
        new TemplateGenerator(
          require('./query_ctrl.xs.ejs'),
          srcExt('query_ctrl.{ext}'),
          (ctx) => {
            ctx['tsType'] = tsType(ctx);
            ctx['tsCode'] = tsCode(ctx);
          }
        )
      ]
    }
  }
]);
