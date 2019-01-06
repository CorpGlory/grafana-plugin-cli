import { IGenerator } from './igenerator';
import { GenerationContext } from './generation_context';

import { fs } from '../utils';
import * as path from 'path';


import * as ejs from 'ejs';


export class TemplateGenerator implements IGenerator {

  constructor(private template: string, private targetPath) {
  }

  public async generate(context: GenerationContext) {
    let result = ejs.render(this.template, context);
    let targetPath = path.join(context.workingDirectory, this.targetPath);
    await fs.writeFile(targetPath, result);
  }
}
