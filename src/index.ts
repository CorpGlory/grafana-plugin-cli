
import { collectUserInput } from './cli';
import { TemplateOptions } from './template_options';
import { ProjectGenerator } from './project_generator/project_generator';


function separate() {
  console.log('-----------------------------');
}

export async function runCLI() {
  separate();
  console.log('Welcome to Grafana-plugin-cli');

  var optoins: TemplateOptions = await collectUserInput();

  console.log(optoins);

  var generator = new ProjectGenerator(optoins);
  await generator.generate();

  separate();
  console.log('Your plugin is being assembled!')
}

runCLI();
