import build from './build';
import src from './src';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions, Language, Style } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>(context => context.options.id, [
  new TemplateGenerator(
    require('./package.json.ejs'),
    'package.json',
    ctx => {
      ctx['isTypeScript'] = ctx.options.language === Language.TypeScript;
    }
  ),
  new TemplateGenerator(require('./.gitignore.ejs'), '.gitignore'),
  new TemplateGenerator(require('./README.md.ejs'), 'README.md'),
  context => {
    if(context.options.language === Language.TypeScript) {
      return new TemplateGenerator(require('./tsconfig.json.ejs'), 'tsconfig.json');
    }
    return [];
  },
  build, src
]);
