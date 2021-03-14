import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RootComponent } from './components/root/root.component';
import { Page404Component } from './components/page404/page404.component';
import { CouponThumbnailComponent } from './components/coupon-thumbnail/coupon-thumbnail.component';
import { ShopComponent } from './components/shop/shop.component';
import { AddCouponFormComponent } from './components/add-coupon-form/add-coupon-form.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    FooterComponent,
    NavBarComponent,
    HeaderComponent,
    AddEditFormComponent,
    AdminDashboardComponent,
    CompanyDetailsComponent,
    CustomerDetailsComponent,
    LandingPageComponent,
    RootComponent,
    Page404Component,
    CouponThumbnailComponent,
    ShopComponent,
    AddCouponFormComponent,
    CompanyProfileComponent,
    UnauthorizedPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
