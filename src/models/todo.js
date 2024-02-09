const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const todoModel = mongoose.model("ToDo", todoSchema);

module.exports = todoModel;
