import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services/car.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {BrandService} from "../../services/brand.service";
import {ColorService} from "../../services/color.service";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carId:number;
  brands:Brand[]=[];
  carUpdateForm:FormGroup;
  constructor(private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.brands)
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = parseInt(params['id']);
      }
    });
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
      brandName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      carId: [this.carId],
    });
  }

  updateCar() {
    let carModel = Object.assign({}, this.carUpdateForm.value);
    this.carService.updateCar(carModel).subscribe(response => {
      this.toastrService.success('Araç bilgileri güncellendi');
    });
  }

  getColors(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
}
