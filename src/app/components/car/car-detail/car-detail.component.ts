import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarImageService} from "../../../services/car-image.service";
import {CarImage} from "../../../models/car-image";
import {Car} from "../../../models/car";
import {environment} from "../../../../environments/environment";
import {CarService} from "../../../services/car.service";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  baseUrl=environment.baseUrl;
  cars:Car[]=[];
  carImages: CarImage[] = [];

  dataLoaded = true;
  constructor(private carImageService : CarImageService,
              private carService:CarService,
              private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     if(params['id']){
       this.getDetailsById(params['id'])
     }
   })
  }
  getDetailsById(carId:number) {
    this.carService.getCarDetailById(carId).subscribe(response => {
      this.cars = response.data
      console.log(response.data)
    });

    this.dataLoaded = true;
  }
}
