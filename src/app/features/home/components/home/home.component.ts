import {ChangeDetectorRef, Component} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder, ValidationErrors,
  Validators
} from "@angular/forms";
import {PasswordFormGroup} from "../../../../shared/components/new-password/new-password.component";
import {Router} from "@angular/router";
import {stringField} from "../../../../shared/utils/validation";
import {createAsyncValidator, passwordGroupValidator} from "../../../../shared/utils/validators";
import {getValidationError} from "../../../../shared/utils/errors-handling";
import {Observable} from "rxjs";
import {EmailValidationResponse, FakeAuthService} from "../../../../fake-api/fake-api";
import {QueryParamService} from "../../../../shared/services/query-param.service";

type Tab = 'login' | 'register';
const TAB_PARAM_KEY = 'tab';

interface LoginFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface SignUpFormGroup {
  name: FormControl<string>;
  email: FormControl<string>;
  passwordGroup: FormGroup<PasswordFormGroup>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FakeAuthService]
})
export class HomeComponent {
  selectedTab: Tab = 'login';
  loginForm?: FormGroup<LoginFormGroup>;
  signUpForm?: FormGroup<SignUpFormGroup>;
  loginError?: string;
  signUpError?: string;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: FakeAuthService,
    private queryParamService: QueryParamService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    if (queryParamService.getQueryParam(TAB_PARAM_KEY, 'string') === 'register') {
      this.updateTab('register');
    } else {
      this.updateTab('login');
    }
  }

  updateTab(tab: Tab): void {
    if (tab === 'login') {
      this.loginError = undefined;
      this.loginForm = this.initializeLoginForm();
    } else {
      this.signUpError = undefined;
      this.signUpForm = this.initializeSignUpForm();
    }
    this.selectedTab = tab;
    this.queryParamService.updateQueryParam(TAB_PARAM_KEY, tab);
    this.cdr.markForCheck();
  }

  initializeLoginForm(): FormGroup<LoginFormGroup> {
    return this.fb.group({
      email: stringField(Validators.required),
      password: stringField(Validators.required)
    });
  }

  initializeSignUpForm(): FormGroup<SignUpFormGroup> {
    return this.fb.group<SignUpFormGroup>({
      name: stringField(Validators.required),
      email: stringField(Validators.required, this.emailAddressValidator()),
      passwordGroup: this.fb.group<PasswordFormGroup>({
        password: stringField(Validators.required),
        confirmPassword: stringField(Validators.required),
      }, {
        validators: [passwordGroupValidator('password', 'confirmPassword')]
      })
    });
  }

  login() {
    // do login
  }

  signUp() {
    // do signup
  }

  emailAddressValidator(): AsyncValidatorFn {
    const responseMapper = (res: EmailValidationResponse) => {
      if (!res.isValid) {
        return getValidationError(e => e.invalidEmailFormat);
      }
      if (res.exists) {
        return getValidationError(e => e.emailAlreadyExists);
      }
      return null;
    };

    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      createAsyncValidator(
        control,
        this.authService.validateNewEmailAddress(control.value),
        responseMapper
      )
  }
}
