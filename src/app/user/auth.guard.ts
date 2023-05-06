import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private afAuth: AngularFireAuth, private snack: SnackService) {}


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      
      const user = await this.afAuth.currentUser
      console.log(user);
      
      const isLoggedIn = !!user

      if (!isLoggedIn) {
        this.snack.authError()
      }

      return isLoggedIn

  }
  
}
