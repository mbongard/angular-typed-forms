import {MY_FORM_ERRORS} from "./errors";
import {ValidationErrors} from "@angular/forms";

/**
 * A lambda used to get a ValidationError from MY_FORM_ERRORS, i.e.:
 * e => e.passwordsDoNotMatch
 */
export type PropertyFunction = (x: {
  [Property in keyof typeof MY_FORM_ERRORS]: () => string
}) => () => string

/**
 * Returns the ValidationError as defined in MY_FORM_ERRORS
 *
 * For example:
 * nameOfError(e => e.passwordsDoNotMatch) returns the ValidationError:
 *   { passwordsDoNotMatch: 'The passwords do not match.' }
 *
 * @param expression A lambda that takes MY_FORM_ERRORS as input and returns a specific property, i.e.: e => e.passwordsDoNotMatch
 */
export const getValidationError = (expression: PropertyFunction): ValidationErrors => {
  return [nameOfError(expression)].reduce((obj2, key) => {
    obj2[key as keyof ValidationErrors] = MY_FORM_ERRORS[key as keyof typeof MY_FORM_ERRORS];
    return obj2;
  }, {} as ValidationErrors);
}

/**
 * Get the key of MY_FORM_ERRORS, that is expressed through the PropertyFunction, as a string
 *
 * For example:
 * nameOfError(e => e.passwordsDoNotMatch) returns the string 'passwordsDoNotMatch'
 *
 * More or less copied from here: https://stackoverflow.com/a/66836940/10694638
 *
 * @param expression A lambda that takes MY_FORM_ERRORS as input and returns a specific property, i.e.: e => e.passwordsDoNotMatch
 */
const nameOfError = (expression: PropertyFunction): string => {
  const res: {
    [Property in keyof typeof MY_FORM_ERRORS]: () => string
  } = {} as { [Property in keyof typeof MY_FORM_ERRORS]: () => string };

  Object.keys(MY_FORM_ERRORS).map(k => res[k as keyof typeof MY_FORM_ERRORS] = () => k);
  return expression(res)();
}

