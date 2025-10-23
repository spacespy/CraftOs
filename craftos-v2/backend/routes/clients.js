import express from "express";
import db from "../db.js";
const router = express.Router();
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM clients ORDER BY id DESC").all();
  res.json(rows);
});
router.post("/", (req, res) => {
  const { nom, email, tel } = req.body || {};
  db.prepare("INSERT INTO clients (nom,email,tel) VALUES (?,?,?)").run(nom || "", email || "", tel || "");
  res.json({ ok: true });
});
export default router;
