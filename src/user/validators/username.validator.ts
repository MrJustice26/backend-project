import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'usernameFormat', async: false })
export class UsernameFormatValidator implements ValidatorConstraintInterface {
  validate(username: any, args: ValidationArguments) {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    return typeof username === 'string' && usernameRegex.test(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username can contain only letters and digits';
  }
}