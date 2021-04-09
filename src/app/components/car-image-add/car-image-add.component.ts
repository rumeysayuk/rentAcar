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
  fileName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private carImageService: CarImageService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.carId = parseInt(params['carId']);
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

  checkFileExtension() {
    var idxDot = this.fileName.lastIndexOf('.') + 1;
    var extFile = this.fileName.substr(idxDot, this.fileName.length).toLowerCase();
    return extFile == 'jpg' || extFile == 'png' || extFile == 'jpeg';
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    if (this.checkFileExtension()) {
      this.imageAddForm.patchValue({file: file});
      this.imageAddForm.get('file').updateValueAndValidity();
    } else {
      this.toastrService.error('Sadece Jpg/Jpeg/Png Yüklenebilir.');
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    }
  }

  addImage() {
    if (this.imageAddForm.valid && this.checkFileExtension()) {
      var formData: any = new FormData();
      formData.append('carId', this.imageAddForm.get('carId').value);
      formData.append('file', this.imageAddForm.get('file').value);
      this.carImageService.addImage(formData).subscribe(response => {
        this.toastrService.success(response.message);
      });
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik.');
    }
  }
}
