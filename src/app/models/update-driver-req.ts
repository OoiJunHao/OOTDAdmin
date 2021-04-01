import { Driver } from "./driver";

export class UpdateDriverReq {
    username: string | undefined;
    password: string | undefined;
    driver: Driver | undefined;

    constructor(username?: string, password?: string, driver?: Driver) {
        this.username = username;
        this.password = password;
        this.driver = driver;
    }
}
