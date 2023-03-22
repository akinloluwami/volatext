import Dexie, { Table } from "dexie";

class DB extends Dexie {
  tokens: Table<{ id?: number; accessToken: string; code: string }, number>;
  constructor() {
    super("volaText");
    this.version(1).stores({
      tokens: "++id,accessToken,code",
    });
    this.tokens = this.table("tokens");
  }
}
const db = new DB();

export default db;
