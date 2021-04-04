import {Component, OnInit} from '@angular/core';
import {Color} from "../../models/color";
import {ColorService} from "../../services/color.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.css']
})
export class ColorsListComponent implements OnInit {
  currentColor: Color;
  colors: Color[] = [];

  constructor(private colorService: ColorService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getColors();
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  deleteColor(){
    this.colorService.deleteColor(this.currentColor).subscribe(response=>{
      this.toastrService.info(response.message);
      this.reloadWindowLocation();
    } ,error=>{
      if(error.error.statusCode == '500'){
        this.toastrService.error("Bu renk başka araçlar tarafından kullanılıyor!","Silinemez");
        this.reloadWindowLocation();
      }
    });
  }

  reloadWindowLocation() {
    setTimeout(function() {
      window.location.reload();
    }, 1600);
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
}
