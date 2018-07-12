export class User {

    private _id: number;
    private _login: string;
    private _password: string;
    private _admin: boolean;
    constructor(

    ) {}

    // region getter and setters
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get admin(): boolean {
        return this._admin;
    }

    set admin(value: boolean) {
        this._admin = value;
    }

// endregion
}
