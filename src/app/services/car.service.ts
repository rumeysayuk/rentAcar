import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Car} from '../models/car';
import {environment} from "../../environments/environment";
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl+"cars/";

  constructor(private httpClient: HttpClient) {
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "details";
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByBrandId(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "detailsbybrand?id="+brandId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByColorId(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "detailsbycolor?id="+colorId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl + "detailsbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarBrandAndColor(brandId:number,colorId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'CarsByBrandAndColor?brandId=' + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl + "add";
    return  this.httpClient.post<ResponseModel>(newPath,car);
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl + "delete";
    return  this.httpClient.post<ResponseModel>(newPath,car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl + "update";
    return  this.httpClient.post<ResponseModel>(newPath,car);
  }

}
