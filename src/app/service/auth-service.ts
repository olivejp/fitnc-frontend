import {Injectable} from '@angular/core';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {map, Observable} from "rxjs";
import {SessionStorageService} from "ngx-webstorage";
import {tokenName} from "../app.module";
import firebase from "firebase/compat";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private sessionStorage: SessionStorageService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        sessionStorage.store('user', JSON.stringify(this.userData));
      } else {
        sessionStorage.clear('user');
        sessionStorage.clear(tokenName);
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => this.setUserData(result.user));
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => this.sendVerificationMail()
        .then(_ => this.setUserData(result.user)));
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(): Promise<void> {
    return this.afAuth.currentUser
      .then((u: firebase.User | null) => {
        if (u) {
          return u.sendEmailVerification();
        } else {
          return;
        }
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.user.pipe(map(user => !!user));
  }

  // Sign in with Google
  googleAuth(): Promise<void | firebase.User> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: any): Promise<void | firebase.User> {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => this.setUserData(result.user))
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: firebase.User | null): Promise<firebase.User> {
    if (!user) {
      return Promise.reject('Aucun utilisateur a enregistré.');
    }
    this.sessionStorage.store('user', JSON.stringify(user));
    return user.getIdToken(true).then((idToken: any) => {
      this.sessionStorage.store(tokenName, idToken);
      return user;
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.sessionStorage.clear('user');
      this.sessionStorage.clear(tokenName);
      this.router.navigate(['sign-in']);
    });
  }

  getUserData(): firebase.User {
    return JSON.parse(this.sessionStorage.retrieve('user'));
  }
}
