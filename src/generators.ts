import { fs } from 'src/utils';

import * as ejs from 'ejs';
import * as _ from 'lodash';

import * as path from 'path';


export class GenerationContext<T> {
  public options: T;
  public workingDirectory: string;

  constructor(options: T) {
    this.options = options;
  }
}


export interface IGenerator<T> {
  /**
   * generate anything in context
   */
  generate(context: GenerationContext<T>): Promise<void>;
}


type FunctionString<T> = string | ((context: GenerationContext<T>) => string);


function resolveFunctionString<T>(str: FunctionString<T>, context: GenerationContext<T>) {
  return _.isString(str) ? str : str(context);
}


export class TemplateGenerator<T> implements IGenerator<T> {

  constructor(private template: string, private targetPath) {
  }

  public async generate(context: GenerationContext<T>) {
    let result = ejs.render(this.template, context);
    let targetPath = path.join(context.workingDirectory, this.targetPath);
    await fs.writeFile(targetPath, result);
  }
}

export class FolderGenerator<T> implements IGenerator<T> {

  constructor(
    private _folderName: FunctionString<T>, 
    private _innerGenerators: IGenerator<T>[]
  ) {

  }

  public async generate(context: GenerationContext<T>) {
    let folderName = resolveFunctionString(this._folderName, context);

    let innterContext = _.clone(context);
    innterContext.workingDirectory = path.join(context.workingDirectory, folderName);

    await fs.mkdir(innterContext.workingDirectory);
    await Promise.all(this._innerGenerators.map(g => g.generate(innterContext)));
    
  }
}
