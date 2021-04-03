import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Brand} from "../../models/brand";
import {ActivatedRoute, Router} from "@angular/router";
import {BrandService} from "../../services/brand.service";

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
   brand:Brand;
   brandAddForm:FormGroup;
  constructor(private toastrService:ToastrService,
              private brandService:BrandService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();

  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName: ['', Validators.required]
    });
  }
  addBrand(){
    let brandModel=Object.assign({},this.brandAddForm.value);
    this.brandService.addBrand(brandModel).subscribe(response=> {
      this.toastrService.success("Marka eklendi");
      this.router.navigate(['/'])
        .then(() => setTimeout(function() {
        window.location.reload();
      }, 800));
    });
  }

}
