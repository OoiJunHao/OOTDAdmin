import { Address } from "./address";
import { Delivery } from "./delivery.enum";
import { Driver } from "./driver";
import { OTUser } from "./ot-user";
import { PromoCode } from "./promo-code";

export class SaleTransaction {
    saleTransactionId: number;
    totalLineItem: number;
    totalQuantity: number;
    totalAmount: number;
    transactionDate: Date;
    deliveryDateTime: Date;
    voidRefund: boolean;
    deliveryStatus: Delivery;

    promo: PromoCode;
    driver: Driver;
    user: OTUser;
    address: Address;




    constructor(
        saleTransactionId: number,
        totalLineItem: number,
        totalQuantity: number,
        totalAmount: number,
        transactionDate: Date,
        deliveryDateTime: Date,
        voidRefund: boolean,
        deliveryStatus: Delivery,
        promo: PromoCode,
        driver: Driver,
        user: OTUser,
        address: Address
    ) {
        this.saleTransactionId = saleTransactionId
        this.totalLineItem = totalLineItem
        this.totalQuantity = totalQuantity
        this.totalAmount = totalAmount
        this.transactionDate = transactionDate
        this.deliveryDateTime = deliveryDateTime
        this.voidRefund = voidRefund
        this.deliveryStatus = deliveryStatus
        this.promo = promo
        this.driver = driver
        this.user = user
        this.address = address
    }


}
