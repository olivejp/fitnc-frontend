import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "../service/auth-service";

@Injectable({
  providedIn: 'root',
})
export class IsLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/']);
        }
        return isLogged;
      })
    );
  }
}
