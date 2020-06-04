import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../interfaces/user";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Pet Care';
  user: User;
  isLogin: boolean = false;
  selectedNavigation: number = 0;
  selectedCustomOptionNavigation: number = 0;
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

   constructor(private router: Router, public authService: AuthService, private formBuilder: FormBuilder) {
  }

  doGoogleLogin(){
    this.user = this.authService.doGoogleLogin();
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.user = {
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
    };

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
    console.log(petData);
  }
}
