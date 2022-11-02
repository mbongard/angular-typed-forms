import {Observable, of, switchMap, timer} from "rxjs";
import {HttpEvent} from "@angular/common/http";

export interface EmailValidationResponse {
  isValid: boolean;
  exists: boolean;
}

export class FakeAuthService {
  public validateNewEmailAddress(emailAddress: string): Observable<EmailValidationResponse> {
    const emailRegex = /(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})/;
    const response = {
      isValid: emailRegex.test(emailAddress),
      exists: false
    };

    return timer(100).pipe(switchMap(() => of(response)));
  }
}
