import { Promo } from "./promo.enum";
import { SaleTransaction } from "./sale-transaction";

export class PromoCode {
    promoCodeId: number;
    startDate: Date;
    endDate: Date;
    discountCode: string;
    discountRate: number;
    promoType: Promo;

    saleTransaction: SaleTransaction[];


    constructor(
        promoCodeId: number,
        startDate: Date,
        endDate: Date,
        discountCode: string,
        discountRate: number,
        promoType: Promo,
        saleTransaction: SaleTransaction[]
    ) {
        this.promoCodeId = promoCodeId
        this.startDate = startDate
        this.endDate = endDate
        this.discountCode = discountCode
        this.discountRate = discountRate
        this.promoType = promoType
        this.saleTransaction = saleTransaction
    }


}
