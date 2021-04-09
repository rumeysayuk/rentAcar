import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {
  findeksForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.createFİndeksForm();

  }

  createFİndeksForm() {
    this.findeksForm = this.formBuilder.group({
      tcNo: ["", Validators.required],
      birthyear: ["", Validators.required]
    })
  }

  findeksCalculate() {
    let findeksModel = Object.assign({}, this.findeksForm.value);
    this.carService.getFindeksPoint(findeksModel).subscribe(response => {
      this.toastrService.success("Findeks Hesaplandı");
      this.router.navigate(['/'])
        .then(() => setTimeout(function () {
          window.location.reload();
        }, 800));
    });

  }
}
