import  Express  from "express";
import JsonWebToken from "jsonwebtoken";

const app = Express();
app.use(Express.json());

app.post("/signup", async (require, res) => {
    
});
app.post("/signin", async (require, res) => {

});
app.post("/shows", async (require, res) => {

});
app.post("/bookings", async (require, res) => {

});
app.get("/shows", async (require, res) => {

});
app.get("/shows/:showsId", async (require, res) => {

});
app.get("/shows/:bookings", async (require, res) => {

});

app.listen(3000)