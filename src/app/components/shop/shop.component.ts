import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  private token:string; 
  public coupons:Coupon[];

  constructor(private customersService:CustomersService, private exceptionHandler:ExceptionHandlerService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.getAllCoupons();

  }

  private getAllCoupons(): void {
    this.customersService.getAllCoupons(this.token).subscribe(
      (coupons:Coupon[]) => {
        this.coupons = coupons;
      }, (httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      });
  }

  public purchaseCoupon(id:number): void {
    this.customersService.purchaseCoupon(this.token, id).subscribe(
      (response:Response)=>{
        alert(response);
      }, (httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      });
  }
}
