import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {Brand} from '../../models/brand';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
  currentBrand: Brand;
  brands: Brand[] = [];

  constructor(private brandService: BrandService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getBrands();
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.currentBrand).subscribe(response => {
      this.toastrService.info(response.message);
      this.reloadWindowLocation();
    }, error => {
      if (error.error.StatusCode == '500') {
        this.toastrService.error('Bu Marka Başka Araçlar Tarafından Kullanılıyor.', 'Silinemez!');
        this.reloadWindowLocation();
      }
    });
  }

  reloadWindowLocation() {
    setTimeout(function() {
      window.location.reload();
    }, 1600);
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

}
