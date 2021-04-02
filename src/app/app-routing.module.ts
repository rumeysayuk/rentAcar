import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarComponent} from './components/car/car.component';
import {CarDetailComponent} from "./components/car/car-detail/car-detail.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CartSummaryComponent} from "./components/cart-summary/cart-summary.component";
import {PaymentComponent} from './components/payment/payment.component';
import {CarAddComponent} from "./components/car-add/car-add.component";
import {BrandAddComponent} from "./components/brand-add/brand-add.component";
import {ColorAddComponent} from "./components/color-add/color-add.component";
import {BrandComponent} from "./components/brand/brand.component";
import {ColorComponent} from "./components/color/color.component";


const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/details/:id",component:CarDetailComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"cartsummary",component:CartSummaryComponent},
  {path:"payment/:myrental",component:PaymentComponent},
  {path:"brandadd",component:BrandAddComponent},
  {path:"caradd",component:CarAddComponent},
  {path:"coloradd",component:ColorAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
