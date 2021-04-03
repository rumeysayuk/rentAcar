import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {CarService} from "../../services/car.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CarOperations} from "../../models/carOperations";
import {Brand} from "../../models/brand";
import {BrandService} from "../../services/brand.service";
import {Color} from "../../models/color";
import {ColorService} from "../../services/color.service";
import {CarImageService} from "../../services/car-image.service";

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  car:CarOperations;
  carAddForm:FormGroup;
  brands: Brand[] = [];
  colors:Color[]=[];

  constructor(private toastrService:ToastrService,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
    this.brandService.getBrands();
    this.addCar();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice:['',Validators.required],
      description: ['', Validators.required],
      image:['',Validators.required]
    });
  }

  addCar(){
    let carModel=Object.assign({},this.carAddForm.value);
    this.carService.addCar(carModel).subscribe(response=> {
      this.toastrService.success("Araç eklendi");
      this.router.navigate(['/']).then(() => setTimeout(function() {
        window.location.reload();
      }, 800));
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  addImage(){
    let imageModel=Object.assign({},this.carAddForm.value.image);
    this.carImageService.addImage(imageModel);
  }
}
