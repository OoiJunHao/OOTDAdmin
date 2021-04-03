import { PromoCode } from "./promo-code";

export class CreatePromoReq {
    username: string | undefined;
    password: string | undefined;
    promoCodeEntity: PromoCode | undefined;

    constructor(username?: string, password?: string, promoCodeEntity?: PromoCode) {
        this.username = username;
        this.password = password;
        this.promoCodeEntity = promoCodeEntity;
    }
}

