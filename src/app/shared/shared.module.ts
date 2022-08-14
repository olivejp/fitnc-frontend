import {NgModule} from "@angular/core";
import {DeveoApiModule} from "./generated";

@NgModule({
  imports: [
    DeveoApiModule
  ],
  exports: [
    DeveoApiModule
  ]
})
export class SharedModule {
}
