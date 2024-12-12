export class UserRequest {
    userId!: number;
    nameUser!: string;
    password!: string;
    email!: string;
    active!: boolean;
    rolId?: number;
    dateCreate!: Date;
    dateModificate?: Date;
    userCreate?: number;
    userModificate?: number;
    attempts!: number;
    blocked!: boolean;
    dateLastAttempts?: Date;
  }
  