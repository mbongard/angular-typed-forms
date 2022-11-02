import {AsyncValidatorFn, FormControl, ValidatorFn} from "@angular/forms";

export const stringField = (
  validators?: ValidatorFn | ValidatorFn[],
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
  initialValue?: string
): FormControl<string> =>
  new FormControl<string>(initialValue || '', {
    nonNullable: true,
    validators,
    asyncValidators });
