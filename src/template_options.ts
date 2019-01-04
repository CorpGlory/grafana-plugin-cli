export enum PluginType { Datasource = 1, Panel }
export enum Framework { Angular = 1, React }
export enum Language { JavaScript = 1, TypeScript }
export enum Style { CSS = 1, SASS }


export class TemplateOptions {
  public id: string;
  public pluginName: string;
  public pluginType: PluginType;
  public framework: string;
  public language: string;
  public style?: string;
}
