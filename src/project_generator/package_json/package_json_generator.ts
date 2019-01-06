
import { IGenerator } from '../igenerator'

export class PackageJsonGenerator implements IGenerator {
  public generate(): Promise<void> {
    return Promise.resolve();
  }
}