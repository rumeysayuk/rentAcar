import { Component, OnInit } from '@angular/core';
import {Car} from '../../models/car';
import {CarService} from '../../services/car.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car [] = [];
  dataLoaded = true;

  constructor(private carService: CarService,private activatedRoute:ActivatedRoute ) { }
  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     if(params["brandId"]){
       this.getbybrandıd(params["brandId"])
     }
     else if(params["colorId"]){
       this.getbycolorıd(params["colorId"])
     }
     else {
       this.getCars();
     }
   })
  }


   getCars() {
    this.carService.getCars().subscribe(response => {this.cars = response.data});
    this.dataLoaded = true;
  }
  getbybrandıd(brandId:number) {
    this.carService.getbybrandıd(brandId).subscribe(response => {this.cars = response.data});
    this.dataLoaded = true;
  }

  getbycolorıd(colorId:number) {
    this.carService.getbycolorıd(colorId).subscribe(response => {this.cars = response.data});
    this.dataLoaded = true;
  }
}
