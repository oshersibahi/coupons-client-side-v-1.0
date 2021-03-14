import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  constructor(private httpClient:HttpClient) { }

  public login(user:User): Observable<string>{
    const httpParams = new HttpParams({
      fromObject:{
        email:user.email,
        password:user.password,
        clientType:user.clientType
      }
    });
    return this.httpClient.get('http://localhost:8080/login', {params:httpParams, responseType:'text'});
  }

  public logout(token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
      return this.httpClient.delete('http://localhost:8080/api/logout', httpOptions);
  }
  
}
