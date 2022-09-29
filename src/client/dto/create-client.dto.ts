import { validadeEmail, validateBirthDay } from '../../Util';
import { errorMessage } from '../../error-message';

export default class CreateClientDto {
  private _name: string;
  private _email: string;
  private _birthDay?: string;
  constructor(name: string, email: string, birthDay?: string) {
    this.name = name;
    this.email = email;
    if (birthDay) this.birthDay = birthDay;
  }
  public get birthDay(): string {
    return this._birthDay;
  }
  public set birthDay(value: string) {
    const date = validateBirthDay(value);
    if (!date && value) throw new Error(errorMessage.clientDto.birthDay);
    this._birthDay = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    if (!validadeEmail(value)) throw new Error(errorMessage.clientDto.email);
    this._email = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    if (value.length === 0) throw new Error(errorMessage.clientDto.name);
    this._name = value;
  }
}
