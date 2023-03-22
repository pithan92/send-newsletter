import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { validateBirthDay } from '../../Util';
import { errorMessage } from '../../error-message';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class CreateClientDto {
  @IsNotEmpty()
  private _name: string;
  @IsEmail()
  private _email: string;
  @IsOptional()
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
    if (!date && value)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errorMessage.clientDto.birthDay,
        },
        HttpStatus.BAD_REQUEST,
      );
    this._birthDay = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
}
