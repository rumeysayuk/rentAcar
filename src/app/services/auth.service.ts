import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LoginModel} from '../models/loginModel';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../models/tokenModel';
import {SingleResponseModel} from '../models/singleResponseModel';
import {RegisterModel} from '../models/registerModel';
import {Users} from '../models/users';
import {ResponseModel} from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + 'auth/';

  constructor(private httpClient: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'login', loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'register', registerModel);
  }

  update(user: Users, password: string) {
    console.log(user, password);
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', {
      user: user,
      password: password
    });
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }

  }
}
