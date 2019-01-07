
import { collectUserInput } from './cli';
import { TemplateOptions } from './template_options';
import { ProjectBuilder } from './project_builder';


function separate() {
  console.log('-----------------------------');
}

export async function runCLI() {
  separate();
  console.log('Welcome to Grafana-plugin-cli');

  var options: TemplateOptions = await collectUserInput();

  console.log(options);

  var generator = new ProjectBuilder(options);
  await generator.generate();

  separate();
  console.log(`Your plugin ${options.id} is ready.`);
}

runCLI();
