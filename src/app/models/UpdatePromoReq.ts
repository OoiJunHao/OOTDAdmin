import { PromoCode } from "./promo-code";

export class UpdatePromoReq {
    username: string | undefined;
    password: string | undefined;
    promoEntity: PromoCode | undefined;

    constructor(username?: string, password?: string, codeEntity?: PromoCode) {
        this.username = username;
        this.password = password;
        this.promoEntity = codeEntity;
    }
}