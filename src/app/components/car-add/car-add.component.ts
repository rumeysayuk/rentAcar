import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CarService} from '../../services/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CarOperations} from '../../models/carOperations';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';
import {Color} from '../../models/color';
import {ColorService} from '../../services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  car: CarOperations;
  carAddForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  lastAddedCarId: number;

  constructor(private toastrService: ToastrService,
              private carService: CarService,
              private brandService: BrandService,
              private colorService: ColorService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCar() {
    let carModel = Object.assign({}, this.carAddForm.value);
    this.carService.addCar(carModel).subscribe(response => {
      this.toastrService.success('Araç eklendi');
      this.carService.getLastCar().subscribe(response => {
        this.lastAddedCarId = response.data[response.data.length - 1].carId;
        this.router.navigate(['/car/imageadd/', this.lastAddedCarId]);
      });
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }
}
