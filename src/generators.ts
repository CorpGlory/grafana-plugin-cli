import * as TemplateOptions from './template_options';

import { fs } from 'src/utils';

import * as ejs from 'ejs';
import * as _ from 'lodash';

import * as path from 'path';


export type FunctionValue<V, T> = ((context: GenerationContext<T>) => FunctionValue<V, T>) | V
export type FunctionArray<V, T> = FunctionValue<FunctionValue<V[] | V, T>[], T>
export type ContextModifier<T> = (context: GenerationContext<T>) => void


function resolveFunctionValue<V, T>(fv: FunctionValue<V, T>, context: GenerationContext<T>): V {
  while(_.isFunction(fv)) {
    fv = fv(context);
  }
  return fv;
}

function resolveFunctionArray<V, T>(array: FunctionArray<V, T>, context: GenerationContext<T>): V[] {
  let arr = resolveFunctionValue(array, context);
  return _.flatMap(arr, e => resolveFunctionValue(e, context));
}

function resolveContextModifier<T>(context: GenerationContext<T>, map?: ContextModifier<T>): GenerationContext<T> {
  if(map === undefined) {
    return context;
  }
  let newContext = _.clone(context);
  map(newContext);
  return newContext;
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

  constructor(
    private _template: string,
    private _targetName: FunctionValue<string, T>,
    private _contextMap?: ContextModifier<T>
  ) {
  }

  public async generate(context: GenerationContext<T>) {
    let targetName = resolveFunctionValue(this._targetName, context);
    let targetPath = path.join(context.workingDirectory, targetName);
    let innterContext = resolveContextModifier(context, this._contextMap);
    let result = ejs.render(this._template, innterContext);
    await fs.writeFile(targetPath, result);
  }
}

export class FolderGenerator<T> implements IGenerator<T> {

  constructor(
    private _folderName: FunctionValue<string, T>, 
    private _innerGenerators: FunctionArray<IGenerator<T>, T>,
    private _contextMap?: ContextModifier<T>
  ) {

  }

  public async generate(context: GenerationContext<T>) {
    let folderName = resolveFunctionValue(this._folderName, context);

    let innterContext: any = _.clone(context);
    innterContext.workingDirectory = path.join(context.workingDirectory, folderName);
    innterContext = resolveContextModifier(innterContext, this._contextMap);
    let innerGenerators = resolveFunctionArray(this._innerGenerators, context);

    if (innterContext.options.overWriteDir === TemplateOptions.overWriteDir.true) {
      await fs.rmdir(innterContext.workingDirectory);
      await fs.mkdir(innterContext.workingDirectory);
      await Promise.all(innerGenerators.map(g => g.generate(innterContext)));
    } else if (innterContext.options.overWriteDir === TemplateOptions.overWriteDir.false) {
      console.log('Aborting');
      process.exit(0)
    } else {
      await fs.mkdir(innterContext.workingDirectory);
      await Promise.all(innerGenerators.map(g => g.generate(innterContext)));
    }

  }
}
