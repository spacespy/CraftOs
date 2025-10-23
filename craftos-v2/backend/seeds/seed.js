import db from "../db.js";
const count = db.prepare("SELECT COUNT(*) AS c FROM clients").get().c;
if (count === 0) {
  const stmt = db.prepare("INSERT INTO clients (nom,email,tel) VALUES (?,?,?)");
  stmt.run("Atelier Bel-Tan", "contact@bel-tan.example", "06 11 22 33 44");
  stmt.run("Artisa’Yann", "yann@artisa.example", "06 55 44 33 22");
  console.log("🌿 Données démo clients injectées.");
} else {
  console.log("ℹ️ Données clients déjà présentes, aucune action.");
}
process.exit(0);
