import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'passwordFormat', async: false })
export class PasswordFormatValidator implements ValidatorConstraintInterface {
  validate(password: any, args: ValidationArguments) {
    const passwordRegex = /^[a-zA-Z0-9-_@$#!]*$/;
    return typeof password === 'string' && passwordRegex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password can contain only base letters, digits and special characters like: - _ @ $ # !';
  }
}