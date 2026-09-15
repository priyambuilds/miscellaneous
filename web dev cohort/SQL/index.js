import * as express from "express";
import { Pool } from "pg";
import * as bcrypt from "bcrypt";
import * as z from "zod";

const pool = new Pool({
    connectionString: ""
});

const app = express();
app.use(express.json())

const SignupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.email()

})

app.post("/signup", async (req, res) => {
    const { data, success, error } = SignupSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Incorrect inputs", error: JSON.parse(error)
        })
        return
    }
    const { username, email, password } = data;
    // Q how do you store passwords in a db?
    // You generate a salt for every user to prevent rainbow table attacks
    // You use a computationaly expensive algo like bcrypt to prevent brute force attacks
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await pool.query(`INSERT INTO users (username, email, password) VLAUES ($1, $2, $3) RETURNING id;`, [username, email, hashedPassword])
    res.json({
        message: "Signup done",
        id: response.rows[0].id
    });
    
})
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const response = await pool.query(`SELECT * FROM users WHERE email='${email}'`)
    const userExists = response.rows[0];
    
    if (!userExists) {
        res.status(403).json({
            message: "Incorrect creds"
        })
    } else {
        const correctPassword = bcrypt.compare(password, userExists.password)
        if (correctPassword) {
            res.json({
                token: "soijoqwdwsqnodudiodnqiiqdofdqwindq"
            })
        } else {
                res.status(403).json({
                message: "Incorrect creds"
            })
        }
    }
})

app.listen(3000);