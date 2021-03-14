import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/enums/category.enum';
import { Company } from 'src/app/models/company.model';
import { Coupon } from 'src/app/models/coupon.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  private token:string;
  public isSorted:boolean;
  public company:Company;
  public coupons:Coupon[];
  public categories = Category;
  public sortByFormControl = new FormControl('',Validators.required);
  public maxPriceFormControl = new FormControl('',Validators.required);

  constructor(private companyService:CompaniesService, private exceptionHandler:ExceptionHandlerService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.getCompanyDetails();
    this.getAllCoupons();
  }

  public isOutOfStock(coupon:Coupon): object {
    if(coupon.amount < 1){
      return {
        'background-color': '#32ff7e'
      };
    }
  }

  public deleteCoupon(id:number): void {
    this.companyService.deleteCoupon(this.token, id).subscribe(
      (response:string) => {
        alert(response);
        this.getAllCoupons();
      },
      (httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }

  public getCompanyDetails(): void {
    this.companyService.getCompanyDetails(this.token).subscribe(
      (company:Company)=>{
        this.company = company;
      },
      (httpErrorResponse:HttpErrorResponse)=>{
        this.exceptionHandler.alertMessage(httpErrorResponse);
      });
  }

  public getAllCoupons(): void {
    this.companyService.getCompanyCoupons(this.token).subscribe(
      (coupons:Coupon[])=>{
        this.coupons = coupons;
      }, 
      (httpErrorResponse:HttpErrorResponse)=>{
        this.exceptionHandler.alertMessage(httpErrorResponse);
      });
  }

  public getCompanyCouponsByCategtory(): void {
    this.companyService.getCompanyCouponsByCategtory(this.token, this.sortByFormControl.value).subscribe(
      (coupons:Coupon[])=>{
        this.isSorted = true;
        this.coupons = coupons;
      },
      (httpErrorResponse:HttpErrorResponse)=>{
        this.exceptionHandler.alertMessage(httpErrorResponse);
      })
    }
    
  public getCompanyCouponsByMaxPrice(): void {
    this.companyService.getCompanyCouponsByMaxPrice(this.token, this.maxPriceFormControl.value).subscribe(
      (coupons:Coupon[])=>{
        this.isSorted = true;
        this.coupons = coupons;
    },
    (httpErrorResponse:HttpErrorResponse)=>{
      this.exceptionHandler.alertMessage(httpErrorResponse);
    })
  }
  
}
