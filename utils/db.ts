import Dexie, { Table } from "dexie";

export interface AccessToken {
  token: string;
}

export class SubClassedAccessToken extends Dexie {
  accessToken!: Table<AccessToken>;
  constructor() {
    super("accessToken");
    this.version(1).stores({
      friends: "token",
    });
  }
}

export const db = new SubClassedAccessToken();
