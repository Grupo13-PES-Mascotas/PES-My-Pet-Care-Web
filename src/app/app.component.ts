import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {PetApiService} from '../services/api-services/pet-api.service';
import {UserApiService} from '../services/api-services/user-api.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {TokenManagerService} from '../services/token-manager.service';
import {Pet} from '../interfaces/pet';
import {MatDialog} from '@angular/material/dialog';
import {DialogPetComponent} from './dialog/dialog.component';

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
  img: string = '';
  navigationOptions = [
    'My Pets', 'Pet\'s Community', 'My Walks', 'Near Establishments', 'Calendar', 'Achievements', 'Settings'
  ];
  navigationCustomOptions = [
    ['Register new pet'], [], [], [], [], [], []
  ];
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
    public dialog: MatDialog,
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
        this.petApiService.getAllPetsOld(res.user.displayName).subscribe(pets => {
          this.user.pets = pets;
          this.isLogin = false;
          this.arePetsObtained = true;
          for (const pet of pets ) {
            this.petApiService.getPetImage(res.user.displayName, pet.name).subscribe(img => {
              pet.image = img;
            });
          };
        });
      });
    });
  }

  doLogOut() {
    this.afAuth.signOut().then(() => {
      this.user = null;
      this.isLogin = true;
      this.arePetsObtained = false;
    });
  }

  info(pet: Pet) {
    pet.owner = this.user.username;
    const dialog = this.dialog.open(DialogPetComponent, {
      data: pet
    });
    dialog.afterClosed().subscribe(() => {
      this.petApiService.getAllPetsOld(this.user.username).subscribe(pets => {
        this.user.pets = pets;
        this.isLogin = false;
        this.arePetsObtained = true;
      });
    });
  }

  ngOnInit(): void {
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
    petData.user = this.user;
    this.petApiService.createPetOld(this.user.username, petData.name, petData).subscribe(() =>
      this.petApiService.getAllPetsOld(this.user.username).subscribe(pets => {
        this.user.pets = pets;
        this.selectNavigationOption(0);
        this.registerPetForm.reset();
      })
    );
  }

  parseDate(birth: any): string {
    let dateParts = birth.toString().split(' ');
    let day = dateParts[2];
    let month = AppComponent.getMonth(dateParts[1]);
    let year = dateParts[3];

    return year + '-' + month + '-' + day + 'T00:00:00';
  }

  getPets() {
    console.log('Getting pets from user ' + (this.user === undefined ? 'undefined' : this.user.username));
  }

  private static getMonth(month: string): string {
    switch (month) {
      case 'Jan':
        return '01';
      case 'Feb':
        return '02';
      case 'Mar':
        return '03';
      case 'Apr':
        return '04';
      case 'May':
        return '05';
      case 'Jun':
        return '06';
      case 'Jul':
        return '07';
      case 'Aug':
        return '08';
      case 'Sep':
        return '09';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
    }

    return '12';
  }
}
