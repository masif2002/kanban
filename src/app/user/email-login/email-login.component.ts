import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  
  type: 'login' | 'signup' | 'reset' = 'signup';

  loading = false;

  serverMessage: string;

  hideRequired: boolean = true;
  
  constructor(public afAuth:AngularFireAuth, private fb: FormBuilder) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      email: [[''], [Validators.required, Validators.email]],
      passwoord: [[''], [ Validators.required, Validators.minLength(8)]],
      passwordConfirm: [[''], []]
    })
  }

  changeType(val: any) {
    this.type = val
    this.serverMessage = '';
  }

  get isLogin() {
    return this.type === 'login'
  }

  get isSignup() {
    return this.type === 'signup'
  }

  get isPasswordReset() {
    return this.type === 'reset'
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('passwoord')
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm')
  }

  get passwordDoesMatch() {
    if ( this.type != 'signup' ) {
      return true
    } else {
      return this.password?.value === this.passwordConfirm?.value
    }
  }

  async onSubmit () {
    this.loading = true

    const email = this.email?.value
    const password = this.password?.value

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password)

      } else if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password)

      } else if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email)
        this.serverMessage = 'Please check your email'
      }

      } catch (err: any) {
        const code = err.code

        switch (code) {

          case 'auth/email-already-in-use':
            this.serverMessage = 'The provided email is already in use by an existing user'
            break;

          case 'auth/user-not-found':
            this.serverMessage = 'User not Found'
            break;

          case 'auth/wrong-password':
            this.serverMessage = 'Invalid Credentials'
            break;

          default:
            this.serverMessage = err.message;
            break;
        }

      }
      
      this.loading = false
  } 

}
