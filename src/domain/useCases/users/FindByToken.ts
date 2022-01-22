export interface FindByToken {
  findByToken(token: string): Promise<FindByToken.Result>;
}
export namespace FindByToken {
  export type Result = {
    id: string;
  };
}
