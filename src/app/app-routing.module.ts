import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCouponFormComponent } from './components/add-coupon-form/add-coupon-form.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { Page404Component } from './components/page404/page404.component';
import { RootComponent } from './components/root/root.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminAuthenticationService } from './authentications/admin-authentication.service';
import { ClientAuthenticationService } from './authentications/client-authentication.service';
import { CompanyAuthenticationService } from './authentications/company-authentication.service';
import { CustomerAuthenticationService } from './authentications/customer-authentication.service';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  {path:"couponsystem", component:RootComponent, children:[
    {path:"welcome", component:LandingPageComponent},
    {path:"admin", component:LayoutComponent, canActivate:[ClientAuthenticationService] , canActivateChild:[AdminAuthenticationService] , children:[
      {path:"dashboard", component:AdminDashboardComponent},
      {path:"company-details/:id", component:CompanyDetailsComponent},
      {path:"customer-details/:id", component:CustomerDetailsComponent},
      {path:"add-edit", component:AddEditFormComponent }
    ]},
    {path:"company", component:LayoutComponent, canActivate:[ClientAuthenticationService] , canActivateChild:[CompanyAuthenticationService] , children:[
      {path:"profile", component:CompanyProfileComponent},
      {path:"add-coupon", component:AddCouponFormComponent}
    ]},
    {path:"customer", component:LayoutComponent, canActivate:[ClientAuthenticationService] , canActivateChild:[CustomerAuthenticationService] , children:[
      {path:"shop", component:ShopComponent},
      {path:"profile", component:CustomerDetailsComponent}
    ]},
    {path:"page404NotFound", component:Page404Component},
    {path:"unauthorized", component:UnauthorizedPageComponent}
  ]},
  {path:"", redirectTo:"couponsystem/welcome", pathMatch:"full"},
  {path:"**", redirectTo:"couponsystem/page404NotFound", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
