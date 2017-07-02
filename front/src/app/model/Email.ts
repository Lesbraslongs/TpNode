/**
 * Created by Children on 29/06/2017.
 */
export class Email {
    /**
     * The technical identifier of the email informations.
     */
    _id : number;
        
    /**
     * The name of the email information.
     */
    _name : string;

    /**
     * The firstname of the email information.
     */
    _firstname : string;
    
    /**
     * The domain of the email information.
     */
    _domain : string;

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get firstname(): string {
        return this._firstname;
    }

    get domain(): string {
        return this._domain;
    }
    
    set id(value: number) {
        this._id = value;
    }
    
    set name(value: string) {
        this._name = value;
    }
    
    set firstname(value: string) {
        this._firstname = value;
    }
    
    set domain(value: string) {
        this._domain = value;
    }
}
