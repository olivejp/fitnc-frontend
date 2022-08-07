import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    ButtonModule,
    CardModule,
  ],
  exports: [
    ButtonModule,
    CardModule,
  ]
})
export class PrimengModule {
}
