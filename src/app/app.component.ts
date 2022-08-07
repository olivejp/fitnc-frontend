import {Component} from '@angular/core';
import {AuthService} from "./service/auth-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitnc-frontend';

  constructor(private authService: AuthService) {
  }

  signIn() {
    this.authService.googleAuth()
      .then(value => console.log('Cool'))
      .catch(reason => console.error(reason));
  }
}
