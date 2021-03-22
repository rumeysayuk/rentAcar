import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {CarImage} from "../models/car-image";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient :HttpClient) { }

  getCarImages(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath= this.apiUrl + "carImages/getimagesbyid?carId="+carId;
    return  this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }
}
