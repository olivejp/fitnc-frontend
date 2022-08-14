import {AbstractControl, FormArray, FormGroup, Validators} from "@angular/forms";
import {LazyLoadEvent} from "primeng/api";


export class Utils {

  public static capitalize(chaine: string): string {
    if (!chaine || chaine?.trim() === '') {
      return '';
    }
    chaine = chaine.toLowerCase();

    if (chaine.length === 1) {
      return chaine.toUpperCase();
    }
    return chaine.replace(/^[^\s]+/g, (firstWord) =>
      firstWord.replace(/(^|[\s-])\S/g, (firstLetter) =>
        firstLetter.toUpperCase()
      )
    );
  }

  public static getObjectField(object: unknown, key: string): unknown {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return object && key ? object[key] : object;
  }

  public static setObjectField(
    object: unknown,
    key: string,
    value: unknown
  ): void {
    if (object && key) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      object[key] = value;
    }
  }

  public static clearFormAndChildrensValidators(
    form: FormGroup,
    updateValidy = true
  ) {
    form.clearValidators();
    if (updateValidy) {
      form.updateValueAndValidity({onlySelf: true, emitEvent: false});
    }
    for (const field of Object.keys(form.controls)) {
      console.debug(field + ' clearing validators');
      form.get(field)?.clearValidators();
      if (updateValidy) {
        form
          .get(field)
          ?.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }
      if ((form.get(field) as FormGroup)?.controls) {
        console.debug(
          'clearing validators of childrens: ',
          (form.get(field) as FormGroup)?.controls
        );
        this.clearFormAndChildrensValidators(
          form.get(field) as FormGroup,
          updateValidy
        );
      }
    }
  }

  public static markAllControlsAsDirtyOrTouched(
    form: FormGroup | AbstractControl,
    markAsTouched = false,
    recursive = true
  ) {
    if (form instanceof FormGroup) {
      for (const field of Object.keys(form.controls)) {
        const subFormOrValue = form.get(field);
        subFormOrValue?.markAsDirty();
        if (markAsTouched) {
          subFormOrValue?.markAsTouched();
        }
        if (subFormOrValue instanceof FormGroup) {
          this.markAllControlsAsDirtyOrTouched(
            subFormOrValue,
            markAsTouched,
            recursive
          );
        }
      }
    }
  }

  public static updateValueAndValidityFormAndChildrens(
    form: FormGroup,
    onlySelf = true,
    emitEvent = false
  ) {
    form.updateValueAndValidity({onlySelf: onlySelf, emitEvent: emitEvent});
    console.debug('form update and value updated');
    for (const field of Object.keys(form.controls)) {
      form
        .get(field)
        ?.updateValueAndValidity({onlySelf: onlySelf, emitEvent: emitEvent});
      console.debug(field + ' update and value updated');
      if ((form.get(field) as FormGroup)?.controls) {
        this.updateValueAndValidityFormAndChildrens(
          form.get(field) as FormGroup,
          onlySelf,
          emitEvent
        );
      }
    }
  }

  public static isFieldMandatory(
    form: FormGroup,
    fieldName: string | string[]
  ): boolean {
    if (Array.isArray(fieldName)) {
      let f: FormGroup | undefined;
      for (const field of fieldName) {
        f = f ? (f.get(field) as FormGroup) : (form.get(field) as FormGroup);
      }
      return f ? !f.disabled && f.hasValidator(Validators.required) : false;
    } else {
      return (
        !form.controls[fieldName].disabled &&
        form.controls[fieldName]?.hasValidator(Validators.required)
      );
    }
  }

  public static removeRequiredValidatorIsPresent(control: AbstractControl) {
    if (control.hasValidator(Validators.required)) {
      control.removeValidators(Validators.required);
    }
  }

  public static addRequiredValidatorIsNotPresent(control: AbstractControl) {
    if (!control.hasValidator(Validators.required)) {
      control.addValidators(Validators.required);
    }
  }

  public static getFormControlName(control: FormGroup): string | null {
    const parent: FormGroup | FormArray | null = control.parent;
    let controlName = null;

    if (!parent || !parent?.controls) {
      return controlName;
    }
    Object.keys(parent?.controls).forEach((key: string) => {
      if (parent.get(key) === control) {
        controlName = key;
        return;
      }
    });
    return controlName;
  }

  public static getOrder($event: LazyLoadEvent | undefined): string[] {
    let sortFields: string[] = [];
    if ($event?.sortField) {
      sortFields = $event.sortField.split(',');
      sortFields = sortFields.map((sortField: string) => {
        const fields = sortField.split('|');
        if (fields.length === 2) {
          return `${fields[0]},${fields[1]}`;
        } else {
          return `${sortField},${$event.sortOrder === 1 ? 'desc' : 'asc'}`;
        }
      });
    }
    return sortFields;
  }

  public static getActualPage(
    $event: LazyLoadEvent | undefined,
    defaultPageSize: number
  ): number {
    return $event?.first != undefined
      ? $event?.first / ($event?.rows ?? defaultPageSize)
      : 0;
  }

  public static getPageSize(
    $event: LazyLoadEvent | undefined,
    defaultPageSize: number
  ): number {
    return $event?.rows ?? defaultPageSize;
  }
}
