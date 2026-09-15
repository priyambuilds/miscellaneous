import express from "express";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: ""
});

const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const response = await pool.query(`INSERT INTO users (username, email, password) VLAUES ($1, $2, $3) RETURNING id;`, [username, email, password])
    res.json({
        message: "Signup done",
        id: response.rows[0].id
    });
    
})
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const response = await pool.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`)

    const userExists = response.rows[0];

    if (!userExists) {
        res.status(403).json({
            message: "Incorrect creds"
        })
    } else {
        res.json({
            token: "soijoqwdwsqnodudiodnqiiqdofdqwindq"
        })
    }
})

app.listen(3000);