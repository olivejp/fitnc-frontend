import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  imports: [
    ButtonModule,
    CardModule,
    SidebarModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    SidebarModule
  ]
})
export class PrimengModule {
}
