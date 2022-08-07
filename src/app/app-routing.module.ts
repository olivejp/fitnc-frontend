import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";

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
