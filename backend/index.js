import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 5001;

// Подключение к БД
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Проверка подключения
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
    return;
  }
  console.log(
    `Успешное подключение к базе данных MySQL на порту ${process.env.DB_PORT}`
  );
});

// Middleware для обработки JSON
app.use(bodyParser.json());

// Разрешить запросы с фронтенда
app.use(cors());

// Роут для получения записей
app.get("/api/transactions", (req, res) => {
  const query = `SELECT * FROM transactions`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Ошибка при получении записей:", err.message);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
    res.status(200).json(results);
  });
});

// Роут для добавления записи
app.post("/api/transactions", (req, res) => {
  const { dateTime, author, sum, category, comment } = req.body;

  const query = `
      INSERT INTO transactions (dateTime, author, sum, category, comment)
      VALUES (?, ?, ?, ?, ?)
    `;

  const values = [dateTime, author, sum, category, comment];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Ошибка при добавлении транзакции:", err.message);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
    res
      .status(201)
      .json({ message: "Транзакция добавлена", id: result.insertId });
  });
});

// Роут для удаления записи
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM transactions WHERE id = ?";

  const value = [id];

  db.query(query, value, (err, result) => {
    if (err) {
      console.error("Ошибка при удалении транзакции:", err.message);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Транзакция не найдена" });
    }
    res.status(200).json({ message: "Транзакция успешно удалена" });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Backend запущен по адресу http://localhost:${PORT}`);
});
