export enum PluginType { Datasource = 1, Panel }
export enum Framework { Angular = 1, React }
export enum Language { JavaScript = 1, TypeScript }
export enum Style { CSS = 1, SASS }


export function getDefaultId(options: any): string {
  var prefix = '';
  switch(options.pluginType) {
    case PluginType.Datasource:
      prefix = 'datasource';
      break;
    case PluginType.Panel:
      prefix = 'panel';
    default:
      throw new Error('Unknown type');
  }
  var s1 = options.pluginName + '-' + prefix;
  return s1.toLowerCase();
}

export class TemplateOptions {
  public id: string;
  public pluginName: string;
  public pluginType: PluginType;
  public framework: string;
  public language: string;
  public style?: string;
  
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
    this.style = options.style ? options.style : null;
  }

}
