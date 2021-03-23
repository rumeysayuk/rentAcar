import { Component, OnInit } from '@angular/core';
import {Color} from '../../models/color';
import {ColorService} from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  filterText='';


  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
