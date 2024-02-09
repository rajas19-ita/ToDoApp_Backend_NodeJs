const express = require("express");
const todoModel = require("../models/todo");

const todo = express.Router();

todo.get("/", async (req, res) => {
    try {
        const todos = await todoModel.find({});

        res.status(200).send(todos);
    } catch (e) {
        res.status(500).send({ error: "Internal server error." });
    }
});

todo.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res
                .status(400)
                .send({ error: "ToDo name and description are required." });
        }

        const todo = new todoModel({ name, description });
        await todo.save();

        res.status(201).send(todo);
    } catch (e) {
        res.status(500).send({ error: "Internal server error." });
    }
});

todo.patch("/:id/complete", async (req, res) => {
    try {
        const todo = await todoModel.findByIdAndUpdate(req.params.id, {
            complete: true,
        });

        if (!todo) return res.status(404).send({ error: "ToDo not found." });

        res.status(200).send("ToDo marked as complete.");
    } catch (e) {
        res.status(500).send({ error: "Internal server error." });
    }
});

todo.delete("/:id", async (req, res) => {
    try {
        const todo = await todoModel.findByIdAndDelete(req.params.id);

        if (!todo) return res.status(404).send({ error: "ToDo not found." });

        res.status(204).send("ToDo deleted successfully.");
    } catch (e) {
        res.status(500).send({ error: "Internal server error." });
    }
});

module.exports = todo;
