import * as fs_ from 'fs';

export namespace fs {
  export function mkdir(
      path: fs_.PathLike, 
      options?: number | string | fs_.MakeDirectoryOptions
    ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs_.mkdir(path, options, (err) => {
        if(!err) resolve();
        else reject(err);
      })
    });
    
  }

  export function writeFile(path: fs_.PathLike | number, data: any, options: fs_.WriteFileOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      fs_.writeFile(path, data, options, (err) => {
        if(!err) resolve();
        else reject(err);
      })
    });
  }


}