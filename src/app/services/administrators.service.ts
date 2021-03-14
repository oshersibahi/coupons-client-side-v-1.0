import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Coupon } from '../models/coupon.model';
import { Customer } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class AdministratorService{

  constructor(private httpClient:HttpClient) { }

  public addCompany(token:string, company:Company): Observable<any> {

    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.post('http://localhost:8080/api/admin/addCompany', company, {headers: theHeaders, responseType:'text'});
  }

  public addCustomer(token:string, customer:Customer): Observable<any>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.post('http://localhost:8080/api/admin/addCustomer', customer, {headers: theHeaders, responseType:'text'});
  }

  public deleteCompany(token:string, id:number): Observable<any>{

    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.delete('http://localhost:8080/api/admin/deleteCompany/'+ id, {headers: theHeaders, responseType:'text'});
  }

  public deleteCustomer(token:string, id:number): Observable<any>{
 
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);
    
    return this.httpClient.delete('http://localhost:8080/api/admin/deleteCustomer/' + id, {headers: theHeaders, responseType:'text'});
  }

  public getAllCompanies(token:string): Observable<Company[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Company[]>('http://localhost:8080/api/admin/getAllCompanies', httpOptions);
  }

  public getAllCustomers(token:string): Observable<Customer[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Customer[]>('http://localhost:8080/api/admin/getAllCustomers', httpOptions);
  }

  public getOneCompany(token:string, id:number): Observable<Company>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Company>('http://localhost:8080/api/admin/getOneCompany/' + id, httpOptions);
  }

  public getOneCompanyCoupons(token:string, id:number): Observable<Company[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Company[]>('http://localhost:8080/api/admin/getOneCompanyCoupons/' + id, httpOptions);
  }
  
  public getOneCoupon(token:string, id:number): Observable<Coupon>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Coupon>('http://localhost:8080/api/admin/getOneCoupon/' + id, httpOptions);
  }

  public getOneCustomer(token:string, id:number): Observable<Customer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Customer>('http://localhost:8080/api/admin/getOneCustomer/' + id, httpOptions);
  }

  public getOneCustomerCoupons(token:string, id:number): Observable<Coupon[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'token':token
      })
    };
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/admin/getOneCustomerCoupons/' + id, httpOptions);
  }

  public updateCompany(token:string, company:Company): Observable<any>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.put('http://localhost:8080/api/admin/updateCompany', company,  {headers: theHeaders, responseType:'text'});
  }

  public updateCustomer(token:string, customer:Customer): Observable<any>{
    
    let theHeaders = new HttpHeaders();
    theHeaders = theHeaders.set('token', token);

    return this.httpClient.put('http://localhost:8080/api/admin/updateCustomer', customer,{headers: theHeaders, responseType:'text'});
  }
}
