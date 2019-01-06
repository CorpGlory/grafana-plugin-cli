import { GenerationContext } from './generation_context';


export interface IGenerator {
  /**
   * generate anything in context
   */
  generate(context: GenerationContext): Promise<void>;
}