import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() public isAdmin:boolean;
  @Input() public isCompany:boolean;
  @Input() public isCustomer:boolean;

  constructor() { }

  ngOnInit(): void {

  }

  public logout():void {
    sessionStorage.clear();
  }
}
