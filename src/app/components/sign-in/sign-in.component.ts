import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {UtilisateurService} from "../../service/utilisateur-service";
import {SessionStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionStorageService,
              private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLogged => {
      if (isLogged) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  signIn() {
    this.authService.googleAuth();
  }

  signUp() {
    this.authService.signOut()
      .then(_ => console.log('SIgn out'))
      .catch(reason => console.error(reason));
  }

  test() {
    const user = JSON.parse(this.sessionService.retrieve('user'));
    this.utilisateurService.findByUid(user.uid)
      .subscribe(value1 => console.log(value1));
  }
}
