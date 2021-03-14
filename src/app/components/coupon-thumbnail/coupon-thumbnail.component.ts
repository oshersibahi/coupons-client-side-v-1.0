import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-coupon-thumbnail',
  templateUrl: './coupon-thumbnail.component.html',
  styleUrls: ['./coupon-thumbnail.component.css']
})
export class CouponThumbnailComponent implements OnInit {

  @Input() public coupon:Coupon;

  constructor() { }

  ngOnInit(): void { }

}
