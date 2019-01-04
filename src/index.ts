
import { collectUserInput } from './cli';
import { TemplateOptions } from './template_options';

function separate() {
  console.log('-----------------------------');
}

export async function runCLI() {
  separate();
  console.log('Welcome to Grafana-plugin-cli');

  var userOptions: TemplateOptions = await collectUserInput();

  console.log(userOptions);

  separate();
  console.log('Your plugin is being assembled!')
}

runCLI();
