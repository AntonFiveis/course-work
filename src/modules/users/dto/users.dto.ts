export class UsersDto{
  email:string;
  firstName:string;
  lastName:string;
  patronymic: string;
  phone: string;
  password:string;
}
export class UsersUpdates{
  firstName?:string;
  lastName?:string;
  patronymic?: string;
  phone?: string;
  password?:string;
}