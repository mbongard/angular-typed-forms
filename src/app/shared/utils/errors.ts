/**
 * This object defines a specific error message for each possible validation error.
 *
 * To have differing error messages for example for 'required', you have two options:
 *   1. Write a custom validator that mimics the 'required' validator from angular and give it a
 *      different & unique name, i.e. 'loginEmailRequired'
 *   2. Use the 'customErrors' input on the ControlErrorComponent to overwrite the 'required' error
 *      message for a specific input
 */
export const MY_FORM_ERRORS = {
  required: 'This field is required.',
  passwordsDoNotMatch: 'The passwords do not match.',
  invalidEmailFormat: 'Please enter a valid email address.',
  emailAlreadyExists: 'This email address is already registered.'
}
