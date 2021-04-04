import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColorService} from "../../services/color.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorId:number;
  colorUpdateForm:FormGroup;
  constructor(private colorService:ColorService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.colorId = parseInt(params['id']);
      }
    });
    this.createColorUpdateForm();
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
      colorId: [this.colorId],
    });
  }

  updateColor() {
    let colorModel = Object.assign({}, this.colorUpdateForm.value);
    this.colorService.updateColor(colorModel).subscribe(response => {
      this.toastrService.success('Renk güncellendi');
    });
  }
}
