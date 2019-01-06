
import { IGenerator } from '../igenerator';
import { fs } from '../../utils';


export class PackageJsonGenerator implements IGenerator {
  public async generate() {
    await fs.readFile()
    return Promise.resolve();
  }
}