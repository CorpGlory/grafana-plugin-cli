import { FolderGenerator, TemplateGenerator } from 'src/generators';

import * as plugin_json from './plugin.json.ejs';


export default new FolderGenerator('src', [
  new TemplateGenerator(plugin_json, 'plugin.json'),
]);