import {Component, OnInit} from '@angular/core';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandId: number;
  brandUpdateForm: FormGroup;

  constructor(private brandService: BrandService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.brandId = parseInt(params['id']);
      }
    });
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      brandId: [this.brandId],
    });
  }

  updateBrand() {
    let brandModel = Object.assign({}, this.brandUpdateForm.value);
    this.brandService.updateBrand(brandModel).subscribe(response => {
      this.toastrService.success('Marka güncellendi');
    });
  }

}
