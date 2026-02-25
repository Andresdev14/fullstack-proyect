import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server running correctly 🚀" });
});

// GET all cars
app.get("/cars", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cars");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching cars",
      error: err.message,
    });
  }
});

// POST new car
app.post("/cars", async (req, res) => {
  const { name, year, brand, horsepower } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO cars (name, year, brand, horsepower) VALUES (?, ?, ?, ?)",
      [name, year, brand, horsepower]
    );

    res.status(201).json({
      message: "Car added successfully ✅",
      id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error inserting car",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🎇");
});