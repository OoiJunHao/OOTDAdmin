import { AccessRightEnum } from "./access-right-enum.enum";

export class Staff {
    staffId: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    password: string | undefined;
    salt: string | undefined;
    accessRightEnum: AccessRightEnum | undefined;

    constructor(staffId?: number, firstName?: string, lastName?: string, username?: string, password?: string, salt?: string, accessRightEnum?: AccessRightEnum) {
        this.accessRightEnum = accessRightEnum;
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.salt = salt;
    }



}
