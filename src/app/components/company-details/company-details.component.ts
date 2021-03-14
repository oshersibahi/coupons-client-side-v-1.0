import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Coupon } from 'src/app/models/coupon.model';
import { AdministratorService } from 'src/app/services/administrators.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent implements OnInit {
  private token: string;
  private id: number;
  public company: Company;

  constructor(
    private activatedRoute: ActivatedRoute,
    private administratorService: AdministratorService,
    private exceptionHandler:ExceptionHandlerService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.token = sessionStorage.getItem('token');

    this.getOneCompany();
    this.getOneCompanyCoupons();

  }

  private getOneCompany(): void {
    this.administratorService.getOneCompany(this.token, this.id).subscribe(
      (company: Company) => {
        this.company = company;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    );
  }

  private getOneCompanyCoupons(): void {
    this.administratorService.getOneCompanyCoupons(this.token, this.id).subscribe(
        (coupons: Coupon[]) => {
          this.company.coupons = coupons;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.exceptionHandler.alertMessage(httpErrorResponse);
        }
      );
  }
}
