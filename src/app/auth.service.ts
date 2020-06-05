import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {TokenManagerService} from "../services/token-manager.service";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private tokenManagerService: TokenManagerService,
  ) { }

  doGoogleLogin(): User{
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.signInWithPopup(provider).then(res => {
      this.user = {
        uid: res.user.uid,
        username: res.user.displayName,
        email: res.user.email,
      };

      this.tokenManagerService.token = res.user.refreshToken;
    });
    return this.user;
}

}
