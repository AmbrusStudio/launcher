import { ValidationRule } from 'react-hook-form'

export function getEmailValidationPattern(): ValidationRule<RegExp> {
  return {
    value:
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    message: 'Email must be a valid email address.',
  }
}

export function getUsernameValidationPattern(): ValidationRule<RegExp> {
  return {
    value: /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/,
    message: 'Username must contain only alphanumeric and _ or - characters.',
  }
}

export function getPasswordValidationPattern(): ValidationRule<RegExp> {
  return {
    value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    message: 'Password must contain at least 1 letter and 1 number.',
  }
}

export function getMinLengthValidationRule(name: string, length: number): ValidationRule<number> {
  return {
    value: length,
    message: `${name} must have at least ${length} characters.`,
  }
}

export function getMaxLengthValidationRule(name: string, length: number): ValidationRule<number> {
  return {
    value: length,
    message: `${name} cannot be longer than ${length} characters.`,
  }
}