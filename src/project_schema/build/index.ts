import { FolderGenerator, TemplateGenerator } from 'src/generators';

import * as webpack_base from './webpack.base.conf.js.ejs';
import * as webpack_dev from './webpack.dev.conf.js.ejs';
import * as webpack_prod from './webpack.prod.conf.js.ejs';


export default new FolderGenerator('build', [
  new TemplateGenerator(webpack_base, 'webpack.base.conf.js'),
  new TemplateGenerator(webpack_dev, 'webpack.dev.conf.js'),
  new TemplateGenerator(webpack_prod, 'webpack.prod.conf.js'),
]);