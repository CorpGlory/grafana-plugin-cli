
import { collectUserInput } from './cli';
import { TemplateOptions } from './template_options';
import { ProjectBuilder } from './project_builder';


function separate() {
  console.log('-----------------------------');
}

export async function runCLI() {
  separate();
  console.log('Welcome to Grafana-plugin-cli');

  var optoins: TemplateOptions = await collectUserInput();

  console.log(optoins);

  var generator = new ProjectBuilder(optoins);
  await generator.generate();

  separate();
  console.log('Your plugin is being assembled!')
}

runCLI();
