import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Color} from "../../models/color";
import {ColorService} from "../../services/color.service";

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  color:Color;
  colorAddForm:FormGroup;
  constructor(private toastrService:ToastrService,
              private colorService:ColorService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {


    this.createColorAddForm();
    this.addColor();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  addColor(){
    let colorModel=Object.assign({},this.colorAddForm.value);
    this.colorService.addColor(colorModel).subscribe(response=> {
      this.toastrService.success("Renk eklendi");
      this.router.navigate(['colors']).then(() => setTimeout(function() {
        window.location.reload();
      }, 800));
    });
  }
}
