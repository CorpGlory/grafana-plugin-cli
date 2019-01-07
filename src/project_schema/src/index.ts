import { FolderGenerator, TemplateGenerator } from 'src/generators';


export default new FolderGenerator('src', [
  new TemplateGenerator(require('./plugin.json.ejs'), 'plugin.json'),
]);