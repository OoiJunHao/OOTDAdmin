import { Staff } from "./staff";

export class CreateStaffReq {
    username: string;
    password: string;
    staff: Staff;


    constructor(username: string, password: string, staff: Staff) {
        this.username = username
        this.password = password
        this.staff = staff
    }

}
