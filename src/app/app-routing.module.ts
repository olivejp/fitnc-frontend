import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {CreateAccountComponent} from "./components/create-account/create-account.component";
import {IsLoginGuard} from "./guards/is-login.guard";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'sign-in',
      pathMatch: 'full',
    },
    {
      path: 'sign-in',
      component: SignInComponent
    },
    {
      path: 'sign-up',
      component: SignUpComponent
    },
    {
      path: 'create-account',
      component: CreateAccountComponent
    },
    {
      path: 'dashboard',
      canActivate: [IsLoginGuard],
      component: DashboardComponent
    },
  ],
},
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
