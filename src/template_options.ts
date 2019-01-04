export enum PluginType { Datasource, Panel }
export enum Framework { Angular, React }
export enum Language { JavaScript, TypeScript }
export enum Style { CSS, SASS }


export class TemplateOptions {
  public id: string;
  public pluginName: string;
  public pluginType: PluginType;
  public framework: string;
  public language: string;
  public style?: string;
}