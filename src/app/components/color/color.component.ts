import { Component, OnInit } from '@angular/core';
import {Color} from '../../models/color';
import {ColorService} from '../../services/color.service';
import {Filters} from "../../models/filters";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color | undefined;
  allColor?:Color;
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

  setCurrentColor(){
    if(this.currentColor !=undefined){
      Filters.colorId=this.currentColor.colorId.toString();
    }
    else{
      Filters.colorId='';
    }
  }

  allColorSelect():boolean{
    return this.currentColor===undefined?true :false;
  }
}
