import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth-service";
import {UtilisateurService} from "../service/utilisateur-service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLogged = false;

  constructor(private authService: AuthService,
              private sessionService: SessionStorageService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLogged => this.isLogged = isLogged);
  }

  signIn() {
    this.authService.googleAuth()
      .then(value => {
        if (value) {

        }
      })
      .catch(reason => console.error(reason));
  }

  signOut() {
    this.authService.signOut()
      .then(_ => console.log('SIgn out'))
      .catch(reason => console.error(reason));
  }

  test() {
    const user = this.sessionService.retrieve('user');
    this.utilisateurService.findByUid(user.uid)
      .subscribe(value1 => console.log(value1));
  }
}
