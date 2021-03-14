import { Coupon } from "./coupon.model";

export class Customer {

    constructor(
        public firstName:string, 
        public lastName:string, 
        public email:string, 
        public password:string,
        public id?:number,
        public coupons?:Coupon[]
    ){}

    toString(): string {
        return 'customer[firstName: ' + this.firstName + ', lastName: ' + this.lastName + ', email: ' + this.email + ', password: ' + this.password + ']';
    }
}
