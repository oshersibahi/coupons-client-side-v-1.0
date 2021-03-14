import { Company } from "./company.model";

export class Coupon {

    constructor(
        public title:string, 
        public category:string, 
        public description:string,
        public startDate:Date,
        public endDate:Date,
        public amount:number,
        public price:number,
        public image:string,
        public id?:number, 
        public company?:Company
    ){}

    toString(): string {
        return "Coupon [id=" + this.id + ", company= " + this.company.name + " , category=" + this.category + ", title=" + this.title + ", description=" + this.description
        + ", startDate=" + this.startDate + ", endDate=" + this.endDate + ", amount=" + this.amount + ", price=" + this.price
        + ", image=" + this.image + "]";
     }
}
