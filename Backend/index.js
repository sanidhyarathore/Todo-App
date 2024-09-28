const express = require("express");
const { createtodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
    const createpayload = req.body;
    const parsedpayload = createtodo.safeParse(createpayload);
    if (!parsedpayload.success) {
        res.status(411).json({
            msg: "You sent wrong inputs",
        });
        return;
    };
    await todo.create({
        title: createpayload.title,
        description: createpayload.description,
        completed: false
    });
    res.json({
        msg: "TODO created"
    });
});

app.get("/todo", async (req, res) => {
    const todos = await todo.find();
    res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const updatepayload = req.body;
    const parsedpayload = updateTodo.safeParse(updatepayload);
    if (!parsedpayload.success) {
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    }
    //put in database
    await todo.updateOne({
        _id: updatepayload.id
    }, {
        completed: true
    })
    res.json({
        msg: "TODO marked as completed"
    })
})

app.listen(3001);