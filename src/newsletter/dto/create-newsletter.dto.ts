import { IsNotEmpty } from 'class-validator';

export class CreateNewsletterDto {
  @IsNotEmpty()
  private _title: string;
  @IsNotEmpty()
  private _description: string;
  @IsNotEmpty()
  private _link: string;

  constructor(title: string, description: string, link: string) {
    this.title = title;
    this.description = description;
    this.link = link;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get link(): string {
    return this._link;
  }
  public set link(value: string) {
    this._link = value;
  }
}
