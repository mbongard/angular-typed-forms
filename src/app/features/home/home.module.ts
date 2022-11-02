import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {TabViewModule} from "primeng/tabview";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeRoutingModule} from "./home-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    TabViewModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
