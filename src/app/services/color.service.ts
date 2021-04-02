import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Color} from '../models/color';
import {environment} from "../../environments/environment";
import {ResponseModel} from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = environment.apiUrl+ 'colors/';

  constructor(private httpClient: HttpClient) {
  }

  getColors(): Observable<ListResponseModel<Color>> {
    return  this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "add";
    return  this.httpClient.post<ResponseModel>(newPath,color);
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "delete";
    return  this.httpClient.post<ResponseModel>(newPath,color);
  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "update";
    return  this.httpClient.post<ResponseModel>(newPath,color);
  }
}
