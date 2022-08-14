import {Component} from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurGen_} from "../../shared/generated";
import {FitnessValidator} from "../../shared/fitness-validator";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

export type SignUpMethod = 'GOOGLE' | 'EMAIL';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  form: FormGroup;
  fields = UtilisateurGen_.fields();
  signUpMethod?: SignUpMethod;
  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      passwordCheck: [null, Validators.required],
    }, {validators: FitnessValidator.passwordAndPasswordCheck()});
  }

  createAccount(): void {
    this.isLoading = true;
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const email = formValue.email;
      const password = formValue.password;

      this.authService.signUp(email, password)
        .then(_ => {
          this.isLoading =  false;
          this.router.navigate(['/dashboard']);
        })
        .catch(reason => {
          this.isLoading = false;
          switch (reason.code) {
            case 'auth/email-already-in-use':
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur authentification',
                detail: 'Cet email est déjà utilisé.'
              });
              break;
            case 'auth/weak-password':
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur authentification',
                detail: 'Le mot de passe est trop faible.'
              });
              break;
            default:
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur authentification',
                detail: 'Impossible de créer ce compte.'
              });
          }
        });
    }
  }
}
