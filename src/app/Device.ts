export class Device{
    serial:number;
    description:string;
    type:number;
    state: boolean;

    constructor(serial:number, description:string, type:number, state:boolean){
        this.serial=serial;
        this.description=description;
        this.type=type;
        this.state=state;
    }
}