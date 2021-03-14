import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import { AdministratorService } from 'src/app/services/administrators.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public companies:Company[];
  public customers:Customer[];
  private token:string;

  constructor(
    private administratorService:AdministratorService,
    private exceptionHandler:ExceptionHandlerService
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.getAllCompanies();
    this.getAllCustomers();
    
  }
    
  public getAllCompanies(){
    this.administratorService.getAllCompanies(this.token).subscribe(
      (companies:Company[]) => {
        this.companies = companies;
      },(httpErrorResponse:HttpErrorResponse) => {
        this.exceptionHandler.alertMessage(httpErrorResponse);
      });
  }
  
  public getAllCustomers(){
    this.administratorService.getAllCustomers(this.token).subscribe((customers:Customer[]) => {
      this.customers = customers;
    }, (httpErrorResponse:HttpErrorResponse) => {
      this.exceptionHandler.alertMessage(httpErrorResponse);
    });
  }

  public deleteCompany(id:number){
    this.administratorService.deleteCompany(this.token, id).subscribe(
      (response:Response)=>{
        alert(response);
        this.getAllCompanies();
      }, 
      (httpErrorResponse:HttpErrorResponse)=>{
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    );
  }

  public deleteCustomer(id:number){
    this.administratorService.deleteCustomer(this.token, id).subscribe(
      (response:Response)=>{
        alert(response);
        this.getAllCustomers();
      },
      (httpErrorResponse:HttpErrorResponse)=>{
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }
}
