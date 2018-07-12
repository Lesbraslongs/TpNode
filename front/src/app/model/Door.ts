import { User } from './User';
export class Door {

  private _id: number;
  private _name: string;
  private _description: string;
  private _address: boolean;
  private _startDate: Date;
  private _endDate: Date;
  private _username: String;
  constructor(

  ) {}

  // region getter and setters
  get id(): number {
      return this._id;
  }

  set id(value: number) {
      this._id = value;
  }

  get name(): string {
      return this._name;
  }

  set name(value: string) {
      this._name = value;
  }

  get description(): string {
      return this._description;
  }

  set description(value: string) {
      this._description = value;
  }

  get address(): boolean {
      return this._address;
  }

  set address(value: boolean) {
      this._address = value;
  }

  get startDate(): Date {
    return this._startDate;
}

set startDate(value: Date) {
    this._startDate = value;
}

get endDate(): Date {
  return this._endDate;
}

set endDate(value: Date) {
  this._endDate = value;
}

get username(): String {
  return this._username;
}

set username(value: String) {
  this._username = value;
}

// endregion
}
