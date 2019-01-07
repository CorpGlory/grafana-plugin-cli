
import projectScheme from './project_schema';

import { GenerationContext } from './generators';
import { TemplateOptions } from 'src/template_options'


export class ProjectBuilder {

  private _context: GenerationContext<TemplateOptions>;

  constructor(options: TemplateOptions) {
    this._context = new GenerationContext(options);
    this._context.workingDirectory = process.cwd();
  }

  public async generate() {
    await projectScheme.generate(this._context);
  }
}