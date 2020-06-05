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
    private formBuilder: FormBuilder
  ) {
  }

  doGoogleLogin() {
    this.user = this.authService.doGoogleLogin();
    this.isLogin = false;
  }

  ngOnInit(): void {
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
    console.log(petData)
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
