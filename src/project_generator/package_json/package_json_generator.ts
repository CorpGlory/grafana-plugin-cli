import { IGenerator } from '../igenerator';
import { GenerationContext } from '../generation_context';

import { fs } from '../../utils';
import * as path from 'path';

import * as template from './package_json.ejs';

import * as ejs from 'ejs';


export class PackageJsonGenerator implements IGenerator {
  public async generate(context: GenerationContext) {
    let targetPath = path.join(context.workingDirectory, 'package.json');
    let result = ejs.render(template, context);
    await fs.writeFile(targetPath, result);
  }
}