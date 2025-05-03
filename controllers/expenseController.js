import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addExpense = async (req, res) => {
  const { description, amount } = req.body;
  if (!description || !amount) {
    return res.status(400).json({ message: "Description and amount are required." });
  }

  try {
    const newExpense = new Expense({ description, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
