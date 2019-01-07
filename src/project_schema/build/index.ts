import { FolderGenerator, TemplateGenerator } from 'src/generators';


export default new FolderGenerator('build', [
  new TemplateGenerator(require('./webpack.base.conf.js.ejs'), 'webpack.base.conf.js'),
  new TemplateGenerator(require('./webpack.dev.conf.js.ejs'), 'webpack.dev.conf.js'),
  new TemplateGenerator(require('./webpack.prod.conf.js.ejs'), 'webpack.prod.conf.js'),
]);