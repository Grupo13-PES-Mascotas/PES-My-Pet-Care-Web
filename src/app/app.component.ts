import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../interfaces/user";

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
  navigationOptions = [
    'My Pets', 'Pet\'s Community', 'My Walks', 'Near Establishments', 'Calendar', 'Achievements', 'Settings'
  ];
  navigationCustomOptions = [
    ['Register new pet'], [], [], [], [], [], []
  ]

  constructor(private router: Router) {
  }

  selectNavigationOption(actual: number) {
    this.selectedNavigation = actual;
  }

  ngOnInit(): void {
    this.user = {
      uid: '1234', username: 'Raimon', email: 'raimon@gmail.com',
      pets: [
        {owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'},
        {owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'},
        {owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'},
        {owner: 'Raimon', name: 'Lucas', gender: 'Male', breed: 'Leche',
          birth: '2020-06-01T00:00:00', pathologies: 'none'}
      ]
    };
  }

  getDate(dateTime: string): string {
    let index = dateTime.indexOf('T');
    let date = dateTime.substring(0, index);
    let dateParts = date.split('-');

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
  }

  selectCustomNavigationOption(actual: number) {

  }
}
