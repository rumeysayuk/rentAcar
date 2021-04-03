import { Component, OnInit } from '@angular/core';
import {Brand} from "../../models/brand";
import {BrandService} from "../../services/brand.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brand:Brand;
  brandUpdateForm:FormGroup;
  newBrand:string;
  constructor(private brandService:BrandService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.newBrand);
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandName: ['', Validators.required]
    });
  }
updateBrand(){
  let brandModel=Object.assign({},this.brandUpdateForm.value);
this.brandService.updateBrand(brandModel).subscribe(response=>{
  this.toastrService.success("Marka güncellendi");
});
}

}
