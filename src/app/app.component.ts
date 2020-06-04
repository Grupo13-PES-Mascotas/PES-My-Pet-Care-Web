import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Pet Care';
  text: string;
  isLogin: boolean = false;
  selectedNavigation: number = 0;
  navigationOptions = [
    'My Pets', 'Pet\'s Community', 'My Walks', 'Near Establishments', 'Calendar', 'Achievements', 'Settings'
  ];

  constructor(private router: Router) {
  }

  selectNavigationOption(actual: number) {
    this.selectedNavigation = actual;
  }

  ngOnInit(): void {

  }
}
