import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient:HttpClient) { }

  public getAllCoupons(token:string): Observable<Coupon[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/getAllCoupons', httpOptions);
  }
  
  public getCustomerCoupons(token:string): Observable<Coupon[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/getCustomerCoupons', httpOptions);
  }
  public getCustomerCouponsByCategtory(token:string, category:string): Observable<Coupon[]>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    let theParams = new HttpParams();
    theParams = theParams.set('category', category);
    
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/getCustomerCouponsByCategory', {headers:theHeaders, params:theParams});
  }

  public getCustomerCouponsByMaxPrice(token:string, maxPrice:number): Observable<Coupon[]>{
   
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    let theParams = new HttpParams();
    theParams = theParams.set('maxPrice', maxPrice.toString());

    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/getCustomerCouponsByMaxPrice', {headers:theHeaders, params:theParams});
  }

  public getCustomerCompanyDetails(token:string): Observable<Customer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Customer>('http://localhost:8080/api/customer/getCustomerDetails', httpOptions);
  }

  public purchaseCoupon(token:string, id:number): Observable<any>{

    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    let theParams = new HttpParams();
    theParams = theParams.set('id', id.toString());

    return this.httpClient.put('http://localhost:8080/api/customer/purchaseCoupon', null,{headers:theHeaders, params:theParams, responseType:'text'});
  }

}
