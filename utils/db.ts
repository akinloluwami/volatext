import Dexie, { Table } from "dexie";

class DB extends Dexie {
  tokens: Table<{ id?: number; accessToken: string }, number>;
  constructor() {
    super("volaText");
    this.version(1).stores({
      tokens: "++id,accessToken",
    });
    this.tokens = this.table("tokens");
  }
}
const db = new DB();

export default db;
