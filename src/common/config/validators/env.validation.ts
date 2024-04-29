import { plainToInstance } from 'class-transformer';
import { VariablesDeEntorno } from '../entities/variables-de-entorno.entity';
import { validateSync } from 'class-validator';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(VariablesDeEntorno, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {});

  if (errors.length > 0) {
    let messageOfErrorsContraints = '';
    for (const error of errors) {
      if (error.constraints) {
        messageOfErrorsContraints +=
          error.property + ': ' + Object.values(error.constraints).join(', ') + '. ' + '\n';
      }
    }
    console.log();

    throw new Error(`Config validation error: \n\n${messageOfErrorsContraints}`);
  }

  return validatedConfig;
}
