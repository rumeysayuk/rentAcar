import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Car} from '../models/car';
import {environment} from "../../environments/environment";
import {CarDetails} from "../models/carDetails";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/details";
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByBrandId(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/detailsbybrand?id="+brandId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByColorId(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/detailsbycolor?id="+colorId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl + "cars/detailsbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
