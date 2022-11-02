import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

export interface PasswordFormGroup {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-new-password[formGroup]',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordComponent {
  @Input() formGroup!: FormGroup<PasswordFormGroup>;
}
