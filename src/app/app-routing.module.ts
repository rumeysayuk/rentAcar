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
import {BrandUpdateComponent} from "./components/brand-update/brand-update.component";
import {BrandsListComponent} from './components/brands-list/brands-list.component';
import {CarImageAddComponent} from './components/car-image-add/car-image-add.component';
import {ColorUpdateComponent} from "./components/color-update/color-update.component";
import {ColorsListComponent} from "./components/colors-list/colors-list.component";
import {CarUpdateComponent} from "./components/car-update/car-update.component";
import {CarsListComponent} from "./components/cars-list/cars-list.component";
import {LoginGuard} from "./guards/login.guard";
import {FindeksComponent} from "./components/findeks/findeks.component";


const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"car/imageadd/:carId",component:CarImageAddComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CarDetailComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"cartsummary",component:CartSummaryComponent},
  {path:"payment/:myrental",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"brandadd",component:BrandAddComponent},
  {path:"caradd",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"coloradd",component:ColorAddComponent},
  {path:"brandupdate/:id",component:BrandUpdateComponent},
  {path:"colorupdate/:id",component:ColorUpdateComponent},
  {path:"carupdate/:id",component:CarUpdateComponent},
  {path:"brands/list",component:BrandsListComponent},
  {path:"cars/list",component:CarsListComponent,canActivate:[LoginGuard]},
  {path:"colors/list",component:ColorsListComponent},
  {path:"findeks",component:FindeksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
