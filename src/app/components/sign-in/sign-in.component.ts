import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLogged => {
      if (isLogged) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  signIn() {
    if (this.form.valid) {
      this.isLoading = true;
      const email = this.form.controls['email'].value;
      const password = this.form.controls['password'].value;
      this.authService.signIn(email, password)
        .then(__assign => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        })
        .catch((reason: FirebaseError) => {
          this.isLoading = false;
          switch (reason.code) {
            case 'auth/wrong-password':
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur authentification',
                detail: 'Mauvais mot de passe.'
              });
              break;
            case 'auth/too-many-requests':
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur authentification',
                detail: 'Trop de requête.'
              });
              break;
          }
        });
    }
  }


  signInWithGoogle(): Promise<unknown> {
    return this.authService.googleAuth();
  }

  createAccount(): Promise<boolean> {
    return this.router.navigate(['/create-account']);
  }
}
