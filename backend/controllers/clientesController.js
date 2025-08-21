const pool = require("../models/db");

exports.getAll = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  res.json(rows);
};

exports.getOne = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
};

exports.create = async (req, res) => {
  const data = req.body;
  await pool.query("INSERT INTO clientes SET ?", data);
  res.json({ success: true });
};

exports.update = async (req, res) => {
  const data = req.body;
  await pool.query("UPDATE clientes SET ? WHERE id=?", [data, req.params.id]);
  res.json({ success: true });
};

exports.remove = async (req, res) => {
  await pool.query("DELETE FROM clientes WHERE id=?", [req.params.id]);
  res.json({ success: true });
};
