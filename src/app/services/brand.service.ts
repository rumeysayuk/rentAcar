import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Brand} from '../models/brand';
import {environment} from "../../environments/environment";
import {Color} from "../models/color";
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.apiUrl+'brands/';

  constructor(private httpClient: HttpClient) {
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return  this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
