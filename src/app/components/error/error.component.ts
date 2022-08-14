import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {delay, Subscription} from "rxjs";
import {Utils} from 'src/app/service/utils.service';
import DictFields from 'src/app/components/error/error-formcontrol-fields.json';


interface IError {
  control: AbstractControl | string;
  error: string;
  value: any;
}

class KeyControl {
  constructor(public key: string, public control: AbstractControl | null) {
  }
}


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {
  private subscription?: Subscription;
  private _control?: FormGroup | AbstractControl | null;
  private componentName: string | undefined;

  public errors: IError[] = [];

  @Input('shouldBeTouched') shouldBeTouched = false;
  @Input('fields') fields: string[] | undefined;
  @Input('excludedFields') excludedFields: string[] | undefined;

  @Input('component')
  set setComponentName(component: ElementRef | undefined) {
    if (component) {
      this.componentName = component.nativeElement.tagName.toLowerCase();
    }
  }

  @Input()
  set control(control: AbstractControl | FormGroup | undefined | null) {
    this._control = control;
    if (this._control) {
      this.subscription?.unsubscribe();
      this.subscription = this._control.statusChanges.pipe(delay(0)).subscribe({
        next: () => {
          this.errors = [];
          if (this._control) {
            this.getAllErrorsFromControls(this._control, null, this.errors);
          }
          // console.debug('Form errors: ', this.errors);
        },
      });
    }
  }

  get control(): FormGroup | AbstractControl | undefined | null {
    return this._control;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private collectErrorFromControl(
    control: AbstractControl,
    key: string,
    errors: IError[]
  ) {
    if (control && control.errors) {
      Object.keys(control.errors).forEach((keyError) => {
        if (key === '') {
          key = Utils.getFormControlName(control as FormGroup) ?? '';
        }
        if (this.isKeyErrorShouldBeShown(key)) {
          errors.push({
            control: this.componentName
              ? Utils.getObjectField(DictFields, this.componentName)
                ? (Utils.getObjectField(
                Utils.getObjectField(DictFields, this.componentName),
                key
              ) as string) ?? key
                : key
              : key,
            error: keyError,
            value: control.getError(keyError),
          });
        }
      });
    }
  }

  private isKeyErrorShouldBeShown(keyError: string): boolean {
    const keyErrorPath = keyError.split('.');
    return (
      (!this.fields && !this.excludedFields) ||
      (this.fields &&
        this.fields.length > 0 &&
        this.isFieldsContainsKeyErrorPath(this.fields, keyErrorPath)) ||
      (!this.fields &&
        this.excludedFields !== undefined &&
        !this.isFieldsContainsKeyErrorPath(this.excludedFields, keyErrorPath))
    );
  }

  private isFieldsContainsKeyErrorPath(
    fields: string[],
    keyErrorPath: string[]
  ): boolean {
    return fields.some((field) =>
      this.isFieldContainKeyErrorPath(field, keyErrorPath)
    );
  }

  private isFieldContainKeyErrorPath(
    field: string,
    keyErrorPath: string[]
  ): boolean {
    const fieldPath = field.split('.');
    if (fieldPath.length <= 0 && keyErrorPath.length <= 0) {
      return true;
    }
    let i = 0;
    let isContain = true;
    for (const fieldValue of fieldPath) {
      if (fieldValue === keyErrorPath[i]) {
        i++;
        if (
          (i < fieldPath.length && i >= keyErrorPath.length) ||
          (i >= fieldPath.length && i < keyErrorPath.length)
        ) {
          isContain = false;
          break;
        }
        if (i >= fieldPath.length && i >= keyErrorPath.length) {
          isContain = true;
          break;
        }
      } else if (fieldValue === '*') {
        isContain = true;
        break;
      } else {
        isContain = false;
        break;
      }
    }
    return isContain;
  }

  private getAllErrorsFromControls(
    control: AbstractControl,
    key: string | null,
    errors: IError[]
  ) {
    if (control instanceof FormGroup) {
      // Collect errors from the FormGroup itself.
      this.collectErrorFromControl(control, '', errors);

      // Collect errors from the FormGroup children.
      Object.keys(control.controls)
        .map((key) => new KeyControl(key, control.get(key)))
        .filter((keyControl) => !!keyControl.control)
        .filter((keyControl) => keyControl.control?.invalid)
        .filter((keyControl) => keyControl.control?.dirty)
        .filter((keyControl) =>
          this.shouldBeTouched ? keyControl.control?.touched : true
        )
        .forEach((keyControl) => {
          const property: string = key
            ? `${key}.${keyControl.key}`
            : keyControl.key;
          if (keyControl.control instanceof FormGroup) {
            this.getAllErrorsFromControls(
              keyControl.control as FormGroup,
              property,
              errors
            );
          } else {
            this.collectErrorFromControl(
              keyControl.control as FormGroup,
              property,
              errors
            );
          }
        });
    } else if (control instanceof FormControl) {
      this.collectErrorFromControl(control, '', errors);
    }
  }
}
