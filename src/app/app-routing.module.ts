import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

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
      path: 'dashboard',
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
