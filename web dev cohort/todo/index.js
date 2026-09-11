const express = require("express");
const {authMiddleware} = require("./middleware")
const app = express();
const jwt = require("jsonwebtoken");
const { todoModel, userModel } = require("./models");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username: username,
        password: password
    })
    if (existingUser) {
        res.status(403).json({
            message: "User with this username already exists"
        })
        return
    }
    const newUser = await userModel.create({
        username,
        password
    })
    res.json({
        id: newUser._id
    })
})
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username && u.password === password);
    if (!userExists) {
        res.status(403).json({
            message: "Incorrect Creds"
        })
    }

    const token = jwt.sign({
        userId: userExists.id
    }, "secret123123")

    res.json({
        token
    })

})
app.post("/todo", authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    TODOS.push({
        id: CURRENT_TODO_ID++,
        title,
        description,
        userId
    })
    res.json({
        message: "Created todo"
    })
})
app.delete("/todo/:todoId", authMiddleware, (req, res) => {
    const userId = req.userId;
    const todoId = req.params.todoId;

    TODOS = TODOS.filter(t => t.userId === userId && t.id === todoId);
})
app.get("/todos", authMiddleware, (req, res) => {
    const userId = req.userId;
    const userTodos = TODOS.filter(t => t.userId === userId);
    res.json({
        todos: userTodos
    })
})

app.listen(3000);