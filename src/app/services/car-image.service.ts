import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {Car} from "../models/car";
import {CarImage} from "../models/car-image";

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = 'https://localhost:44365/api/';
  constructor(private httpClient :HttpClient) { }

  getCarImages(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath= this.apiUrl + "carImages/getimagesbyid?carId="+carId;
    return  this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
