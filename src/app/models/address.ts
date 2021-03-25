import { OTUser } from "./ot-user";

export class Address {
    address: string;
    postalCode: string;

    user: OTUser;


    constructor(address: string, postalCode: string, user: OTUser) {
        this.address = address
        this.postalCode = postalCode
        this.user = user
    }

}
