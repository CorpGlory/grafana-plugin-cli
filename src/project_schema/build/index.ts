import { FolderGenerator, TemplateGenerator, resolveFunctionValue } from 'src/generators';
import { srcExt, Style, TemplateOptions } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>('build', [
  new TemplateGenerator(require('./webpack.base.conf.js.ejs'),
    'webpack.base.conf.js',
    ctx => {
      ctx['extension'] = resolveFunctionValue(srcExt('{ext}'), ctx);
      ctx['useStyles'] = ctx.options.style !== Style.None;
    }
  ),
  new TemplateGenerator(require('./webpack.dev.conf.js.ejs'), 'webpack.dev.conf.js'),
  new TemplateGenerator(require('./webpack.prod.conf.js.ejs'), 'webpack.prod.conf.js'),
]);
