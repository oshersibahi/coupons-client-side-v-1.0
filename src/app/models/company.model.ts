import { Coupon } from "./coupon.model";

export class Company {

    constructor(
        public name?:string, 
        public email?:string, 
        public password?:string, 
        public id?:number,
        public coupons?:Coupon[]
        ){}
    
    toString(): string {
        return 'company[name: ' + this.name + ', email: ' + this.email + ', password: ' + this.password + ']';
    }
}
