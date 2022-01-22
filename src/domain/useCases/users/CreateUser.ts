export interface CreateUser {
  create(params: CreateUser.Params): Promise<boolean>;
}

export namespace CreateUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}
