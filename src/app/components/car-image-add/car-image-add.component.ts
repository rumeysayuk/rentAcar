import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarImageService} from '../../services/car-image.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {
  carId: number;
  imageAddForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private carImageService: CarImageService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carId = parseInt(params['id']);
      }
    });
    this.createImageAddform();
  }

  createImageAddform() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.carId],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageAddForm.patchValue({file: file});
    this.imageAddForm.get('file').updateValueAndValidity();
  }

  addImage() {
    if (this.imageAddForm.valid) {
      var formData: any = new FormData();
      formData.append('carId', this.imageAddForm.get('carId').value);
      formData.append('file', this.imageAddForm.get('file').value);
      console.log(formData)
      console.log(this.carId)
      this.carImageService.addImage(formData).subscribe(response => {
        this.toastrService.success(response.message);
      });
    }
  }
}










