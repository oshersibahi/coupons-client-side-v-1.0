import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientType } from 'src/app/enums/client-type.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  private clientType:string;
  public isAdmin:boolean;
  public isCompany:boolean;
  public isCustomer:boolean;

  constructor(private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("CouponSystem");
    this.clientType = sessionStorage.getItem('clientType');
    this.isClientType();
  }

  private isClientType():void {
    if(this.clientType == ClientType.ADMINISTRATOR){
      this.isAdmin = true;
    } else if(this.clientType == ClientType.COMPANY){
      this.isCompany = true;
    } else if(this.clientType == ClientType.CUSTOMER){
      this.isCustomer = true;
    }
  }
}
