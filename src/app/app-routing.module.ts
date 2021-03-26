import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarComponent} from './components/car/car.component';
import {CarDetailComponent} from "./components/car/car-detail/car-detail.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CartSummaryComponent} from "./components/cart-summary/cart-summary.component";


const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/details/:id",component:CarDetailComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"cartsummary",component:CartSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
