const express = require("express");

const app = express();
app.use(express.json())

app.use(function (req, res, next) {
    console.log("hi there");
    next()
})

app.get("/", function (req, res) {
    res.sendFile("/Users/priyamdey/Documents/miscellaneous/web dev cohort/week8/index.html")
})

app.post("/sum", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a + b;
    
    res.json({
        ans: sum
    })
})
app.post("/multiply", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a * b;
    
    res.json({
        ans: sum
    })
})
app.post("/sub", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a - b;
    
    res.json({
        ans: sum
    })
})
app.post("/div", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a / b;
    
    res.json({
        ans: sum
    })
})
app.post("/sub")
app.post("/mul")
app.get("/div")

app.listen(3000)