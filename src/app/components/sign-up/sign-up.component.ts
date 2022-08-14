import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurControllerServiceGen, UtilisateurGen_} from "../../shared/generated";
import {REGEX_PHONE_NC} from "../../shared/regex.constants";
import {ActivatedRoute} from "@angular/router";

export type SignUpMethod = 'GOOGLE' | 'EMAIL';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  fields = UtilisateurGen_.fields();
  signUpMethod?: SignUpMethod;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private utilisateurService: UtilisateurControllerServiceGen,
              private activeRoute: ActivatedRoute) {
    this.form = this.fb.group({
      [this.fields.id]: [null],
      [this.fields.version]: [null],
      [this.fields.nom]: [null, Validators.required],
      [this.fields.prenom]: [null, Validators.required],
      [this.fields.dateNaissance]: [null, Validators.required],
      [this.fields.email]: [null, [Validators.required, Validators.email]],
      [this.fields.telephone]: [null, [Validators.required, Validators.pattern(REGEX_PHONE_NC)]],
    });
  }

  ngOnInit(): void {
  }

  signUp(): void {
    console.log('SignUp');
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.utilisateurService.create(formValue).subscribe(value => {
        console.log('Created');
        debugger;
      })
    }
  }
}
