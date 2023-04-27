import { Directive } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor() { }

}
