import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  constructor(private router:Router) { }

  public alertMessage(httpErrorResponse:HttpErrorResponse){
    if(this.router.url !== "/couponsystem/welcome"){
      if(httpErrorResponse.status === 401){
        let message:string;
        if(httpErrorResponse.error.message === undefined){
          const error:Error = JSON.parse(httpErrorResponse.error) as Error;
          message = error.message;
        } else {
          message = httpErrorResponse.error.message;
        }
        alert(message + ', please login again');
        this.router.navigate(['']);
      } else {
        alert(httpErrorResponse.error);
      }
    }
  }
}
