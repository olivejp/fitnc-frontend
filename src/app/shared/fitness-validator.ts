import {AbstractControl, FormGroup, ValidationErrors,} from '@angular/forms';

export class FitnessValidator {
  /**
   * Validator to apply on an AbstractControl to check that it matches the numBp regexp.
   *
   * @param control
   */
  public static numeroBp(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return {numBpPatternException: true};
    }
    return null;
  }

  public static passwordAndPasswordCheck(): ValidationErrors | null {
    return (group: FormGroup): ValidationErrors | null => {
      if (group.controls['password']?.dirty && group.controls['passwordCheck']?.dirty) {
        if (group.controls['password']?.value === group.controls['passwordCheck']?.value) {
          return null;
        } else {
          return {passwordsNonIdentical: true};
        }
      } else {
        return null;
      }
    };
  }
}
