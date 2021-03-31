import { OTUser } from "./ot-user";

export class CreditCard {

    creditCardId: number;
    type: String;
    cardName: String;
    cardNumber: String;
    expiryDate: String;
    isRemoved: boolean;

    user: OTUser;

    constructor(
        creditCardId: number,
        type: String,
        cardName: String,
        cardNumber: String,
        expiryDate: String,
        isRemoved: boolean,
        user: OTUser ) {
            this.creditCardId = creditCardId;
            this.type = type;
            this.cardName = cardName;
            this.cardNumber = cardNumber;
            this.expiryDate = expiryDate;
            this.isRemoved = isRemoved;
            this.user = user;
        }
}
