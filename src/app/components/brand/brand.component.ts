import { Component, OnInit } from '@angular/core';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';
import {Filters} from "../../models/filters";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand | undefined;
  allBrand?:Brand;
  filterText="";

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(){
    if(this.currentBrand !=undefined){
      Filters.brandId=this.currentBrand.brandId.toString();
    }
    else{
      Filters.brandId='';
    }
  }

  allBrandSelect():boolean{
   return this.currentBrand===undefined?true :false;
  }
}
