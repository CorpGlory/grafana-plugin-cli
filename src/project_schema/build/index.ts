import { FolderGenerator, TemplateGenerator, GenerationContext } from 'src/generators';
import { srcExt, TemplateOptions } from 'src/template_options';


export default new FolderGenerator('build', [
  new TemplateGenerator(
    require('./webpack.base.conf.js.ejs'),
    'webpack.base.conf.js',
    (ctx: GenerationContext<TemplateOptions>) => { ctx['extension'] = srcExt('{ext}')(ctx) }
  ),
  new TemplateGenerator(require('./webpack.dev.conf.js.ejs'), 'webpack.dev.conf.js'),
  new TemplateGenerator(require('./webpack.prod.conf.js.ejs'), 'webpack.prod.conf.js'),
]);
