import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {CarImage} from "../models/car-image";
import {environment} from "../../environments/environment";
import {Car} from "../models/car";
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = environment.apiUrl+ "images/";
  constructor(private httpClient :HttpClient) { }

  getCarImages(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath= this.apiUrl + "carImages/getimagesbyid?carId="+carId;
    return  this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }


    addImage(car:Car):Observable<ResponseModel>{
      let newPath=this.apiUrl + "add";
      return  this.httpClient.post<ResponseModel>(newPath,car);
    }

}
