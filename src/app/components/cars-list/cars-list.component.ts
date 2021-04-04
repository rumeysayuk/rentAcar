import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/car.service";
import {ToastrService} from "ngx-toastr";
import {Car} from "../../models/car";


@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  currentCar:Car;
  cars:Car[]=[];
  constructor(private carService:CarService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
 this.getCars();
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
    console.log("degvdegv "+this.currentCar)

  }

  deleteCar() {
    this.carService.deleteCar(this.currentCar).subscribe(response => {
      this.toastrService.info(response.message);
      this.reloadWindowLocation();
    }, error => {
      if (error.error.StatusCode == '500') {
        this.toastrService.error('Bu Araç Silinemez.', 'Silinemez!');
        this.reloadWindowLocation();
      }
    });
  }

  reloadWindowLocation() {
    setTimeout(function() {
      window.location.reload();
    }, 1600);
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      console.log(this.cars)
    });
  }
}
