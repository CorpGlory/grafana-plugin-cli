import build from './build';
import src from './src';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>(context => context.options.id, [
  new TemplateGenerator(require('./package.json.ejs'), 'package.json'),
  new TemplateGenerator(require('./.gitignore.ejs'), '.gitignore'),
  new TemplateGenerator(require('./README.md.ejs'), 'README.md'),
  build, src
]);