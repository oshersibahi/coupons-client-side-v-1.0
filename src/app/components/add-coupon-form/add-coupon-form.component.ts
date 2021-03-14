import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/enums/category.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { ExceptionHandlerService } from 'src/app/services/exception-handler.service';


@Component({
  selector: 'app-add-coupon-form',
  templateUrl: './add-coupon-form.component.html',
  styleUrls: ['./add-coupon-form.component.css']
})
export class AddCouponFormComponent implements OnInit {

  private selectedImage:File;
  private token:string;
  public isAddMode:boolean;
  public maxDescriptionLength:number = 150;
  public minAmount:number = 1;
  public categories = Category;
  public form:FormGroup;
  public loading:boolean;

  constructor(
    private formBuilder:FormBuilder,
    private companyService:CompaniesService,
    private exceptionHandler:ExceptionHandlerService
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.isAddMode = true;
    this.form = this.formBuilder.group({
      id:['', Validators.required],
      title:['', [Validators.required, Validators.pattern('^[A-Z].*$')]],
      category:['', [Validators.required]],
      description:['', [Validators.maxLength(this.maxDescriptionLength)]],
      startDate:['', Validators.required],
      endDate:['', [Validators.required]],
      amount:['', [Validators.required, Validators.min(this.minAmount)]],
      price:['', [Validators.required, Validators.min(0)]],
      image:['', Validators.required]
    }) 
  }

  get id() {return this.form.get('id')}
  get title() {return this.form.get('title')}
  get category() {return this.form.get('category')}
  get description() {return this.form.get('description')}
  get startDate() {return this.form.get('startDate')}
  get endDate() {return this.form.get('endDate')}
  get amount() {return this.form.get('amount')}
  get price() {return this.form.get('price')}
  get image() {return this.form.get('image')}

  public onFileSelected(event): void{
    this.selectedImage = <File> event.target.filed[0];
  }

  private createCoupon():Coupon {
    return new Coupon(
      this.form.controls.title.value,
      this.form.controls.category.value,
      this.form.controls.description.value,
      this.form.controls.startDate.value,
      this.form.controls.endDate.value,
      this.form.controls.amount.value,
      this.form.controls.price.value,
      this.form.controls.image.value,
      this.form.controls.id.value
    );
  }

  public addCoupon(): void{
    this.loading = true;
    this.companyService.addCoupon(this.token, this.createCoupon()).subscribe((response:any)=>{
      console.dir(response);
      this.loading = false;
      alert(response);
    }, (httpErrorResponse:HttpErrorResponse)=>{
      this.loading = false;
      this.exceptionHandler.alertMessage(httpErrorResponse);
    });

  }

  public updateCoupon(): void{
    this.loading = true;
    this.companyService.updateCoupon(this.token, this.createCoupon()).subscribe(
      (response:Response) => {
        this.loading = false;
        alert(response);
      },
      (httpErrorResponse:HttpErrorResponse) => {
        this.loading = false;
        this.exceptionHandler.alertMessage(httpErrorResponse);
      }
    )
  }
}
