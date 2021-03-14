import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/enums/category.enum';
import { ClientType } from 'src/app/enums/client-type.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { Customer } from 'src/app/models/customer.model';
import { AdministratorService } from 'src/app/services/administrators.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  
  private token:string;
  private clientType:ClientType;
  private customerPathId:number;
  public customer: Customer;
  public isAdmin:boolean;
  public isSorted:boolean;
  public categories = Category;
  public categoryFormControl = new FormControl('',Validators.required);
  public maxPriceFormControl = new FormControl('',Validators.required);

  constructor(
    private activatedRoute: ActivatedRoute,
    private administratorService: AdministratorService,
    private customerService: CustomersService,
    private exceptionHandler:ExceptionHandlerService
  ) {}

  ngOnInit(): void {
    
    this.customerPathId = this.activatedRoute.snapshot.params.id;
    this.token = sessionStorage.getItem('token');
    this.clientType = sessionStorage.getItem('clientType') as ClientType;
    
    if(this.clientType == ClientType.ADMINISTRATOR){
      this.isAdmin = true;
      this.getOneCustomer();
      this.getOneCustomerCoupons();
    } else if(this.clientType == ClientType.CUSTOMER){
      this.getCustomerDetails();
      this.getCustomerCoupons();
    }
  }

  private getOneCustomer(): void {
    this.administratorService.getOneCustomer(this.token, this.customerPathId).subscribe(
        (customer: Customer) => {
          this.customer = customer;
        },
        (httpErrorResponse:HttpErrorResponse) => {
          this.exceptionHandler.alertMessage(httpErrorResponse);
        }
    );
  }

  private getOneCustomerCoupons(): void {
    this.administratorService.getOneCustomerCoupons(this.token, this.customerPathId).subscribe(
      (coupons:Coupon[]) => {
        this.customer.coupons = coupons;
      },
      (httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }

  private getCustomerDetails(): void {
    this.customerService.getCustomerCompanyDetails(this.token).subscribe(
      (customer:Customer) => {
        this.customer = customer;
      },(httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }

  public getCustomerCoupons(): void {
    this.customerService.getCustomerCoupons(this.token).subscribe(
      (coupons:Coupon[]) => {
        this.customer.coupons = coupons;
      },(httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }

  public getCustomerCouponsByCategory(): void {   
    this.customerService.getCustomerCouponsByCategtory(this.token, this.categoryFormControl.value).subscribe(
      (coupons:Coupon[]) => {
        this.isSorted = true;
        this.customer.coupons = coupons;
      },(httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }

  public getCustomerCouponsByMaxPrice(): void {
    this.customerService.getCustomerCouponsByMaxPrice(this.token, this.maxPriceFormControl.value).subscribe(
      (coupons:Coupon[]) => {
        this.isSorted = true;
        this.customer.coupons = coupons;
      },(httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }


}
