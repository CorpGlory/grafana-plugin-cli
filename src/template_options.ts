import { GenerationContext } from 'src/generators';

export enum PluginType { Datasource = 'datasource', Panel = 'panel' }
export enum Framework { Angular = 'angular', React = 'react' }
export enum Language { JavaScript = 'javascript', TypeScript = 'typescript' }
export enum Style { CSS = 'css', SASS = 'sass', None = 'none' }


export function getDefaultId(options: any): string {
  var suffix = '';
  switch(options.pluginType) {
    case PluginType.Datasource:
      suffix = 'datasource';
      break;
    case PluginType.Panel:
      suffix = 'panel';
      break;
    default:
      throw new Error('Unknown plugin type: ' + options.pluginType);
  }
  var s1 = options.pluginName + '-' + suffix;
  return s1.toLowerCase();
}

function languageToExtension(language: Language) {
  switch(language) {
    case Language.JavaScript:
      return 'js';
    case Language.TypeScript:
      return 'ts';
    default:
      throw new Error('Unknown language: ' + language);
  }
}

export function srcExt(name: string) {
  if(name.indexOf('{ext}') === -1) {
    throw new Error('Template file name should contain "{ext}"');
  }
  return (context: GenerationContext<TemplateOptions>) => 
    name.replace('{ext}', languageToExtension(context.options.language))
}

export namespace ts {
  function tsCode(context: GenerationContext<TemplateOptions>) {
    return (code) => context.options.language === Language.TypeScript ? code : '';
  }

  function tsType(context: GenerationContext<TemplateOptions>) {
    return (type) => context.options.language === Language.TypeScript ? `: ${type}` : '';
  }

  function isTypeScript(context: GenerationContext<TemplateOptions>) {
    return context.options.language === Language.TypeScript;
  }

  export function bind(context: GenerationContext<TemplateOptions>) {
    context['tsCode'] = tsCode(context);
    context['tsType'] = tsType(context);
    context['isTypeScript'] = isTypeScript(context);
    return context;
  }
}

export class TemplateOptions {
  public id: string;
  public pluginName: string;
  public pluginType: PluginType;
  public framework: Framework;
  public language: Language;
  public style?: Style;
  public overWriteDir: boolean;
  
  constructor(options: any) {
    this.id = options.id;
    if(this.id === undefined) {
      throw new Error('Missing id value');
    }
    this.pluginName = options.pluginName;
    if(this.pluginName === undefined) {
      throw new Error('Missing plugin name value');
    }
    this.pluginType = options.pluginType;
    if(this.pluginType === undefined) {
      throw new Error('Missing plugin type value');
    }
    this.framework = options.framework;
    if(this.framework === undefined) {
      throw new Error('Missing framework value');
    }
    this.language = options.language;
    if(this.language === undefined) {
      throw new Error('Missing language value');
    }
    this.style = options.style;
    if(this.style === undefined) {
      throw new Error('Missing style value');
    }
    this.overWriteDir = options.overWriteDir;
  }

}
