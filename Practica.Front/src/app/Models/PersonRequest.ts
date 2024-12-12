import { User } from "./User";

export class PersonRequest {
    personaId?: number;
    userId?: number;
    address!: string;
    name?: string;
    lastName?: string;
    phone?: string;
    dateBirth?: Date;
    sexId?: number;
    nationality?: string;
    maritalStatus?: string;
    occupation?: string;
    identification!: string;
    dateCreate?: Date;
    dateModificate?: Date;
    userCreate?: number;
    userModificate?: number;
    user?: User;
  }
  