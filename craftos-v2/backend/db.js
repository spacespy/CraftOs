import Database from "better-sqlite3";
const DB_PATH = process.env.CRAFTOS_DB || "/opt/craftos/craftos.db";
const db = new Database(DB_PATH);
db.exec(`
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT, email TEXT, tel TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);
export default db;
