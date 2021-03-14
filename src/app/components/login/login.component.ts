import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/enums/client-type.enum';
import { User } from 'src/app/models/user.model';
import { LoginManagerService } from 'src/app/services/login-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User();
  public clientTypes = ClientType;
  public form:FormGroup;
  public errorMessage:string;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private loginManagerService:LoginManagerService
  ) { }
  
  ngOnInit(): void { 
    this.form = this.formBuilder.group({
      clientType:['',Validators.required],
      email:['',[ Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      password:['', Validators.required]
    })
  }

  get clientType() {return this.form.get('clientType')};
  get email() {return this.form.get('email')};
  get password() {return this.form.get('password')};

  public login(){
    this.user.clientType = this.clientType.value;
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    let obs = this.loginManagerService.login(this.user);
    obs.subscribe(
      (token:string) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('clientType', this.user.clientType);
        if(this.user.clientType == ClientType.ADMINISTRATOR){
          this.router.navigate(['couponsystem/admin/dashboard']);
        } else if(this.user.clientType == ClientType.COMPANY){
          this.router.navigate(['couponsystem/company/profile']);
        } else if(this.user.clientType == ClientType.CUSTOMER){
          this.router.navigate(['couponsystem/customer/shop']);
        }
      }, 
      (response:HttpErrorResponse) => {
        if(response.error instanceof ProgressEvent){
          alert('Internal server error; server is off')
        }else{
          alert(response.error);
        }
      }
    )
  }

}
