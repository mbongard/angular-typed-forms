import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlErrorComponent} from "./components/control-error/control-error.component";
import {InputComponent} from "./components/input/input.component";
import {NewPasswordComponent} from "./components/new-password/new-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "./components/button/button.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
  declarations: [
    ControlErrorComponent,
    InputComponent,
    NewPasswordComponent,
    ButtonComponent
  ],
  exports: [
    ControlErrorComponent,
    InputComponent,
    ControlErrorComponent,
    InputComponent,
    ButtonComponent,
    InputComponent,
    ControlErrorComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TableModule,
    FormsModule,
    InputTextModule,
  ]
})
export class SharedModule { }
