import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {TokenManagerService} from "../services/token-manager.service";
import {PetApiService} from "../services/api-services/pet-api.service";
import {UserApiService} from "../services/api-services/user-api.service";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: User;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private tokenManagerService: TokenManagerService,
    private userApiService: UserApiService,
    private petApiService: PetApiService,
  ) { }

  doGoogleLogin(): User{
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.signInWithPopup(provider).then(res => {
      this.tokenManagerService.token = res.user.refreshToken;
      this.userApiService.getUserOld(res.user.uid).subscribe(user => {
        this.user = user;
        console.log(this.user);
        this.petApiService.getAllPetsOld('Enric Hernando').subscribe(pets => this.user.pets = pets);
      });
    });
    return this.user;
  }

}
