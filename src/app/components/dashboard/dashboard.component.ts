import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] = [];
  username: any;
  showMenu = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    this.username = userData.displayName ?? userData.email;

    this.items = [{
      label: 'Disconnect', icon: 'pi pi-times', command: () => {
        this.authService.signOut()
          .then(_ => this.router.navigate(['/sign-in']));
      }
    }];
  }

  showMenuTrigger() {
    this.showMenu = !this.showMenu;
  }
}
