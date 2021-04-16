import { SaleTransaction } from "./sale-transaction";

export class Driver {
    driverId: number;
    firstname: string;
    lastName: string;
    age: number;
    username: string;
    password: string;
    salt: string;
    wallet: number;
    active: boolean;

    saleTransaction: SaleTransaction[];


    constructor(
        driverId: number,
        firstname: string,
        lastName: string,
        age: number,
        username: string,
        password: string,
        salt: string,
        wallet: number,
        active: boolean,
        saleTransaction: SaleTransaction[]
    ) {
        this.driverId = driverId
        this.firstname = firstname
        this.lastName = lastName
        this.age = age
        this.username = username
        this.password = password
        this.salt = salt
        this.wallet = wallet
        this.active = active
        this.saleTransaction = saleTransaction
    }

}
