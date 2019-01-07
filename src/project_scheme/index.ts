import build from './build';
import src from './src';

import * as package_json from './package.json.ejs';
import * as gitignore from './.gitignore.ejs';
import * as readme from './README.md.ejs';

import { FolderGenerator, TemplateGenerator } from 'src/generators';
import { TemplateOptions } from 'src/template_options';


export default new FolderGenerator<TemplateOptions>(context => context.options.id, [
  new TemplateGenerator(package_json, 'package.json'),
  new TemplateGenerator(gitignore, '.gitignore'),
  new TemplateGenerator(readme, 'README.md'),
  build, src
]);