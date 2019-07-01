export class GetUserData {
  constructor(
       public id: number,
       public userName: string,
       public password: string,
       public firstName: string,
       public lastName: string,
       public middleName: string,
       public displayName: string,
       public country: string,
       public county: string,
       public phoneNumber: string,
       public roles: string,
       public idNumber: number,
       public emailAddress: string,
       public poBoxAddress: string,
       public joinDate: Date
  ) {}
}
