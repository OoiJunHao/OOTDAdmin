export class ReportReq {
    start: Date | undefined;
    end: Date | undefined;
    


    constructor(start?: Date, end?: Date) {
        this.start = start;
        this.end = end;
    }
}
