import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {MultiSelectModule} from "primeng/multiselect";
import {SelectButtonModule} from "primeng/selectbutton";
import {SplitButtonModule} from "primeng/splitbutton";
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {DividerModule} from 'primeng/divider';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from "primeng/api";


@NgModule({
  imports: [
    ButtonModule,
    CardModule,
    SidebarModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectButtonModule,
    SplitButtonModule,
    DropdownModule,
    CalendarModule,
    ProgressSpinnerModule,
    PasswordModule,
    TieredMenuModule,
    DividerModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    SidebarModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectButtonModule,
    SplitButtonModule,
    DropdownModule,
    CalendarModule,
    ProgressSpinnerModule,
    PasswordModule,
    TieredMenuModule,
    DividerModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimengModule {
}
