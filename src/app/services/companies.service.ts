import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../enums/category.enum';
import { Company } from '../models/company.model';
import { Coupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private httpClient:HttpClient) { }
  
  public addCoupon(token:string, coupon:Coupon): Observable<any>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);
    
    return this.httpClient.post('http://localhost:8080/api/company/addCoupon', coupon, {headers: theHeaders, responseType:'text'});
  }
  
  public deleteCoupon(token:string, id:number): Observable<any>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.delete('http://localhost:8080/api/company/deleteCoupon/' + id, {headers: theHeaders, responseType:'text'});
  }
  
  public updateCoupon(token:string, coupon:Coupon): Observable<any>{
      
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.put('http://localhost:8080/api/company/updateCoupon', coupon, {headers: theHeaders, responseType:'text'});
  }

  public getCompanyCoupons(token:string): Observable<Coupon[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/getCompanyCoupons', httpOptions);
  }

  public getCompanyCouponsByCategtory(token:string, category:Category): Observable<Coupon[]>{
   
    let theParams = new HttpParams();
    theParams = theParams.set('category', category);

    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/getCompanyCouponsByCategory', {headers:theHeaders, params:theParams});
  }

  public getCompanyCouponsByMaxPrice(token:string, maxPrice:number): Observable<Coupon[]>{
   
    let theParams = new HttpParams();
    theParams = theParams.set('maxPrice', maxPrice.toString());

    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);
   
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/getCompanyCouponsByMaxPrice', {headers:theHeaders, params:theParams});
  }

  public getCompanyDetails(token:string): Observable<Company>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Company>('http://localhost:8080/api/company/getCompanyDetails', httpOptions);
  }
}
