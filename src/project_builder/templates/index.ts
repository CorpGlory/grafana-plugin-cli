import * as package_json from './package.json.ejs';
import * as gitignore from './.gitignore.ejs'
import * as readme from './README.md.ejs'

import * as build from './build'
import * as src from './src'


export {
  package_json, gitignore, readme,
  build, src
};