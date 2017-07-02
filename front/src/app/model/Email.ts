export class Email {
    id : number;
    
    name : string;
    
    firstname : string;
    
    domain : string;
    
    constructor(
        id: number,
        name: string,
        firstname: string,
        domain: string
    ) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.domain = domain    
    }

}
