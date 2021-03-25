import {Component, OnInit} from '@angular/core';
import {Filters} from '../../models/filters';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  setRoute() {
    if (Filters['brandId'] && Filters['colorId']) {
      this.router.navigate([
        `cars/brand/${Filters.brandId}/color/${Filters.colorId}`,
      ]);
    } else if (Filters['brandId']) {
      this.router.navigate([`cars/brand/${Filters.brandId}`]);
    } else if (Filters['colorId']) {
      this.router.navigate([`cars/color/${Filters.colorId}`]);
    } else {
      this.router.navigate([`/`]);
    }
  }

  clearRoute() {
    this.router.navigate(['cars/']);
  }

}
