import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AuthService} from "./service/auth-service";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {UtilisateurService} from "./service/utilisateur-service";
import {SignInComponent} from './components/sign-in/sign-in.component';
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {LocalStorageService, NgxWebstorageModule, SessionStorageService} from "ngx-webstorage";
import {PrimengModule} from "./shared/primeng.module";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SharedModule} from "./shared/shared.module";
import {CreateAccountComponent} from "./components/create-account/create-account.component";
import { ErrorComponent } from './components/error/error.component';

export const prefix = 'fitnc';
export const tokenName = 'token';

/**
 * Get JWT token from localStorage, if not found, look into sessionStorage.
 */
export function jwtOptionsFactory(
  localstorage: LocalStorageService,
  sessionStorage: SessionStorageService
) {
  return {
    tokenGetter: () => {
      let token = localstorage.retrieve(tokenName);
      if (!token) {
        token = sessionStorage.retrieve(tokenName);
      }
      return token;
    },
    allowedDomains: [environment.backendServer],
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SignUpComponent,
    CreateAccountComponent,
    ErrorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    PrimengModule,
    SharedModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot({prefix: prefix, separator: '-'}),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService, SessionStorageService],
      },
    }),
  ],
  providers: [AuthService, UtilisateurService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
