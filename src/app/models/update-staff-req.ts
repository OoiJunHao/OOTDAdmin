import { Staff } from "./staff";

export class UpdateStaffReq {
    username: string | undefined;
    password: string | undefined;
    staff: Staff | undefined;


    constructor(username?: string, password?: string, staff?: Staff) {
        this.username = username
        this.password = password
        this.staff = staff
    }

}
