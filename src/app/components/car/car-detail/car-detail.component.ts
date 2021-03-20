import { Component, OnInit } from '@angular/core';
import {CarImage} from "../../../models/car-image";
import {CarService} from "../../../services/car.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  images: CarImage;
  dataLoaded = true;
  constructor(private carImageService:,private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
  }

}
