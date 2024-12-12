export class User {
    userId?: number;
    nameUser!: string;
    password!: string;
    email!: string;
    active?: boolean;
    rolId?: number;
    dateCreate?: Date;
    dateModificate?: Date;
    userCreate?: number;
    userModificate?: number;
    attempts?: number;
    recoveredToken?: string;
    blocked?: boolean;
    dateLastAttempts?: Date;
  }
  