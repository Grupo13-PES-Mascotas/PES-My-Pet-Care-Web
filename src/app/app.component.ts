import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../interfaces/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {PetApiService} from "../services/api-services/pet-api.service";
import {UserApiService} from "../services/api-services/user-api.service";
import * as firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {TokenManagerService} from "../services/token-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Pet Care';
  user: User;
  isLogin: boolean = true;
  selectedNavigation: number = 0;
  selectedCustomOptionNavigation: number = 0;
  arePetsObtained: boolean = false;
  registerPetForm;
  navigationOptions = [
    'My Pets', 'Pet\'s Community', 'My Walks', 'Near Establishments', 'Calendar', 'Achievements', 'Settings'
  ];
  navigationCustomOptions = [
    ['Register new pet'], [], [], [], [], [], []
  ]
  registerPetControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private tokenManagerService: TokenManagerService,
    private userApiService: UserApiService,
    private petApiService: PetApiService,
  ) {
  }

  doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.signInWithPopup(provider).then(res => {
      this.tokenManagerService.token = res.user.refreshToken;
      this.userApiService.getUserOld(res.user.uid).subscribe(user => {
        this.user = user;
        console.log(this.user);
        this.petApiService.getAllPetsOld(res.user.displayName).subscribe(pets => {
          this.user.pets = pets;
          this.isLogin = false;
          this.arePetsObtained = true;
        });
      });
    });
  }

  ngOnInit(): void {
    // this.userApiService.getUserOld('Enric Hernando');
    // this.user = this.userApiService.getUserData();
    // this.petApiService.getAllPetsOld(this.user.username).subscribe(pets => this.user.pets = pets);
    /*this.user = {
      uid: '1234', username: 'Raimon', email: 'raimon@gmail.com',
      pets: [
        {
          owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'
        },
        {
          owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'
        },
        {
          owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'
        },
        {
          owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'
        }
      ]
    };*/

    this.registerPetForm = this.formBuilder.group({
      name: '',
      gender: '',
      breed: '',
      birth: '',
      pathologies: ''
    });

  }

  getDate(dateTime: string): string {
    let index = dateTime.indexOf('T');
    let date = dateTime.substring(0, index);
    let dateParts = date.split('-');

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
  }

  selectNavigationOption(actual: number): void {
    this.selectedNavigation = actual;
    this.selectedCustomOptionNavigation = 0;
  }

  selectCustomNavigationOption(actual: number): void {
    this.selectedCustomOptionNavigation = actual + 1;
  }

  createPet(petData) {
    petData.birth = this.parseDate(petData.birth);
    console.log(petData);
  }

  parseDate(birth: any): string {
    let dateParts = birth.toString().split(' ');
    let day = dateParts[2];
    let month = AppComponent.getMonth(dateParts[1]);
    let year = dateParts[3];

    return year + '-' + month + '-' + day + 'T00:00:00';
  }

  getPets() {
    console.log("Getting pets from user " + (this.user === undefined ? "undefined" : this.user.username));
  }

  private static getMonth(month: string): string {
    switch (month) {
      case 'Jan':
        return "01";
      case 'Feb':
        return "02";
      case 'Mar':
        return "03";
      case 'Apr':
        return "04";
      case 'May':
        return "05";
      case 'Jun':
        return "06";
      case 'Jul':
        return "07";
      case 'Aug':
        return "08";
      case 'Sep':
        return "09";
      case 'Oct':
        return "10";
      case 'Nov':
        return "11";
    }

    return "12";
  }
}
