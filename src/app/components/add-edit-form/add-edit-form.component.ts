import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import { AdministratorService } from 'src/app/services/administrators.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit {
  
  public form:FormGroup;
  public isAddMode:boolean;
  public isCompany:boolean;
  public loading:boolean;
  private token:string;
  
  constructor(
    private administratorService:AdministratorService,
    private formBuilder:FormBuilder,
    private exceptionHandler:ExceptionHandlerService
    ) { }
    
    ngOnInit(): void {
      this.token = sessionStorage.getItem('token');
      this.isAddMode=true;
      this.isCompany=true;
      
      this.form = this.formBuilder.group({
      id:['',Validators.required],
      companyName:['',Validators.required],
      firstName:['',[Validators.required, Validators.pattern('^[A-Z].*$')]],
      lastName:['',[Validators.required, Validators.pattern('^[A-Z].*$')]],
      email:['',[Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }

  get id() {return this.form.get('id')}
  get companyName() {return this.form.get('companyName')}
  get firstName() {return this.form.get('firstName')}
  get lastName() {return this.form.get('lastName')}
  get email() {return this.form.get('email')}
  get password() {return this.form.get('password')}

  public addCompany():void {
    const company:Company = new Company(
      this.form.controls.companyName.value, 
      this.form.controls.email.value,
      this.form.controls.password.value
    );

    this.loading = true;
    this.administratorService.addCompany(this.token, company).subscribe(
      (response:Response)=>{
          this.loading = false;
          alert(company.name + ' added: ' + response);
    }, (httpErrorResponse:HttpErrorResponse)=>{
          this.loading = false;
          this.exceptionHandler.alertMessage(httpErrorResponse);
    });
  }

  public updateCompany(): void { 
    const company:Company = new Company(
      this.form.controls.companyName.value, 
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.id.value
    );
      
    this.loading = true;
    this.administratorService.updateCompany(this.token, company).subscribe(
      (response:string)=>{
          this.loading = false;
          alert(company + ' updated ' + response);
    }, (httpErrorResponse:HttpErrorResponse)=>{
          this.loading = false;
          this.exceptionHandler.alertMessage(httpErrorResponse);
    });
  }

  public addCustomer(): void { 
    const customer:Customer = new Customer(
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.password.value
    );
      
    this.loading = true;
    this.administratorService.addCustomer(this.token, customer).subscribe(
      (response:Response)=>{
          this.loading = false;
          alert(customer + ' added ' + response);
    }, (httpErrorResponse:HttpErrorResponse)=>{
          this.loading = false;
          this.exceptionHandler.alertMessage(httpErrorResponse);
    });
  }

  public updateCustomer(): void { 
    const customer:Customer = new Customer(
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.id.value
    );
      
    this.loading = true;
    this.administratorService.updateCustomer(this.token, customer).subscribe(
      (response:string)=>{
          this.loading = false;
          alert(customer + ' updated ' + response);
    }, (httpErrorResponse:HttpErrorResponse)=>{
          this.loading = false;
          this.exceptionHandler.alertMessage(httpErrorResponse);
    });
  }

}
