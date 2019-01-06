import { IGenerator } from './igenerator';
import { GenerationContext } from './generation_context';
import { PackageJsonGenerator } from './package_json/package_json_generator';

import { TemplateOptions } from '../template_options'

import { fs } from '../utils';
import * as path from 'path';



export class ProjectGenerator {

  private _context: GenerationContext;
  private _generators: IGenerator[];

  constructor(options: TemplateOptions) {
    this._generators = [];
    this._generators.push(new PackageJsonGenerator());
    this._context = new GenerationContext(options);
  }

  public async generate() {
    this._initContext();

    await fs.mkdir(this._context.workingDirectory);

    for(let i = 0; i < this._generators.length; i++) {
      let gen = this._generators[i];
      await gen.generate(this._context);
    }
  }

  private _initContext() {
    this._context.workingDirectory = path.join(process.cwd(), this._context.options.id);
  }
}