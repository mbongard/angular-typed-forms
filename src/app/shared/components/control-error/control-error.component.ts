import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {
  filter,
  forkJoin,
  fromEvent,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap
} from "rxjs";
import {MY_FORM_ERRORS} from "../../utils/errors";

interface CustomErrorMessages {
  [name: string]: string
}

@Component({
  selector: 'app-control-error[control]',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements AfterViewInit, OnDestroy {
  @Input() customErrors?: CustomErrorMessages;

  @Input() set control(newControl: AbstractControl) {
    this._control = newControl;
    this.initialize()
  }

  @ViewChild('errorsRef') errorsRef?: ElementRef<HTMLDivElement>;

  _control!: AbstractControl;

  errors: string[] = [];

  unsub = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initialize();
  }

  initialize(): void {
    this.unsub.unsubscribe();
    this.unsub = new Subscription();
    this.errors = [];

    // Wait for all child inputs & textareas to have blurred at least once
    let observeBlur: Observable<Event>[] = [];
    if (this.errorsRef?.nativeElement) {
      this.errorsRef.nativeElement.querySelectorAll('input, textarea').forEach(
        el => observeBlur.push(fromEvent(el, 'blur').pipe(take(1)))
      )
    }

    // Once all children have blurred once, start showing the error messages and subscribe to status changes
    this.unsub.add(
      forkJoin(observeBlur)
      .pipe(
        tap(() => this.updateErrors()),
        switchMap(() =>
          this._control.statusChanges
          .pipe(filter(status => status === 'VALID' || status === 'INVALID'))
        )
      ).subscribe(() => this.updateErrors())
    )
  }

  ngOnDestroy() {
    this.unsub.unsubscribe()
  }

  /**
   * Updates the visible errors
   */
  updateErrors(): void {
    const updatedErrors: string[] = [];
    if (this._control.errors) {
      // Loop over all errors on the abstract control
      Object.keys(this._control.errors).forEach(formError => {

        // Check if the caller has provided a custom error message for this validation error
        let customError: string | undefined;
        if (this.customErrors) {
          Object.entries(this.customErrors).forEach(entries => {
            const [validatorName, errorMessage] = entries;
            if (this._control.errors?.[validatorName]) {
              customError = errorMessage;
            }
          })
        }

        if (customError) {
          updatedErrors.push(customError);
        } else {
          // The caller has not provided a custom error message, so we use the one defined in MY_FORM_ERRORS
          updatedErrors.push(MY_FORM_ERRORS[formError as keyof typeof MY_FORM_ERRORS]);
        }
      })
    }
    this.errors = updatedErrors;
    this.cdr.markForCheck();
  }
}
