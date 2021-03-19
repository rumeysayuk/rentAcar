import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Car} from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44365/api/';

  constructor(private httpClient: HttpClient) {
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/getdetails";
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getbybrandıd(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/getbybrandıd?brandId="+brandId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getbycolorıd(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath= this.apiUrl + "cars/getbycolorıd?colorId="+colorId;
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
