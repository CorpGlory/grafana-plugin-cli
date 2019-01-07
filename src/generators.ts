import { fs } from 'src/utils';

import * as ejs from 'ejs';
import * as _ from 'lodash';

import * as path from 'path';


type FunctionValue<V, T> = V | ((context: GenerationContext<T>) => FunctionValue<V, T>);


function resolveFunctionValue<V, T>(fv: FunctionValue<V, T>, context: GenerationContext<T>) {
  while(_.isFunction(fv)) {
    fv = fv(context);
  }
  return fv;
}

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

export class TemplateGenerator<T> implements IGenerator<T> {

  constructor(private _template: string, private _targetName: FunctionValue<string, T>) {
  }

  public async generate(context: GenerationContext<T>) {
    let targetName = resolveFunctionValue(this._targetName, context);
    let targetPath = path.join(context.workingDirectory, targetName);
    let result = ejs.render(this._template, context);
    await fs.writeFile(targetPath, result);
  }
}

export class FolderGenerator<T> implements IGenerator<T> {

  constructor(
    private _folderName: FunctionValue<string, T>, 
    private _innerGenerators: (IGenerator<T> | FunctionValue<IGenerator<T>, T>)[]
  ) {

  }

  public async generate(context: GenerationContext<T>) {
    let folderName = resolveFunctionValue(this._folderName, context);

    let innterContext = _.clone(context);
    innterContext.workingDirectory = path.join(context.workingDirectory, folderName);

    await fs.mkdir(innterContext.workingDirectory);
    await Promise.all(
      this._innerGenerators.map(g => resolveFunctionValue(g, context).generate(innterContext))
    );
    
  }
}
