import { Component, OnInit } from '@angular/core';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand={brandId:0,brandName:''};

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand : Brand){
    this.currentBrand=brand;
  }
  getCurrentBrandClass(brand: Brand){
     if(brand==this.currentBrand){
       return "list-group-item active";
     }
     else{
          return "list-group-item ";
     }

  }
}
