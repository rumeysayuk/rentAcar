import { Component, OnInit } from '@angular/core';
import {Car} from '../../models/car';
import {CarService} from '../../services/car.service';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car [] = [];
  baseUrl=environment.baseUrl;
  dataLoaded = true;
  filterText='';

  constructor(private carService: CarService,private activatedRoute:ActivatedRoute ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId'])
        this.getCarBrandAndColor(params['brandId'], params['colorId']);
      else if (params['brandId']) this.getByBrandId(params['brandId']);
      else if (params['colorId']) this.getByColorId(params['colorId']);
      else this.getCars();
    })
  }


   getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    });
    this.dataLoaded = true;
  }
  getByBrandId(brandId:number) {
    this.carService.getByBrandId(brandId).subscribe(response => {this.cars = response.data});
    this.dataLoaded = true;
  }

  getByColorId(colorId:number) {
    this.carService.getByColorId(colorId).subscribe(response => {this.cars = response.data});
    this.dataLoaded = true;
  }
  getCarBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarBrandAndColor(brandId,colorId).subscribe(response=>{this.cars=response.data})
    this.dataLoaded=true;
  }
}
