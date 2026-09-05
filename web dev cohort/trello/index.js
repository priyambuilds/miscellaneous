const express = require("express");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("./authMiddleware")

let USER_ID = 0;
let ORG_ID = 0;
let BOARD_ID = 0;
let ISSUE_ID = 0;

let USERS = [{
    username: "priyam",
    password: "12345"
}, {
    username: "raman",
    password: "12345"
}];
let ORGANIZATIONS = [{
    id: 1,
    title: "100xschool",
    description: "Place to learn to code",
    admin: 1,
    members: [2]
}, {
    id: 2,
    title: "100xdevs",
    description: "Place to learn to code",
    admin: 1,
    members: [2]
}];
    
let BOARDS = [{
    id: 1,
    title: "100xSchool website (frontend)",
    orgId: 1
}];
let ISSUES = [{
    id: 1,
    title: "add dark mode",
    dboardId: 1,
    state: IN_PROGRESS
},{
    id: 2,
    title: "add something",
    dboardId: 1,
    state: DONE
}];

const app = express();

// CREATE ENDPOINTS
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password
    const userExists = USERS.find(u => u.username === username)
    if (userExists) {
        res.status(411).json({
            message: "User with this username already exists"
        })
        return;
    }

    USERS.push({
        username: username,
        password: password,
        id: USER_ID++
    })

    res.json({
        message: "Your have signed up successfully"
    });
})
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password
    const userExists = USERS.find(u => u.username === username)
    if (userExists) {
        res.status(403).json({
            message: "Incorrect Creds"
        })
        return;
    }
    const token = jwt.sign({
        userId: userExists.id
    }, "attlassionsupersecret1234password");

    res.json({
        token
    });

})

// AUTHENTICATED ENDPOINT - MIDDLEWARE
app.post("/organization", authMiddleware, (req, res) => {
    const userId = req.userId;
    ORGANIZATIONS.push({
        id: ORG_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })
    res.json({
        message: "Org created successfully",
        id: ORG_ID - 1
    })

})
app.post("/add-member-to-org", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId
    const memberUsername = req.body.organizationId 

    const organization = ORGANIZATIONS.find(org => org.id === organizationId)

    if (!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not the adming"
        })
        return 
    }
    organization.members.push()
})
app.post("/board", (req, res) => {

})
app.post("/issue", (req, res) => {

})

// READ ENDPOINTS
app.get("/boards", (req, res) => {
    
})
app.get("/issues", (req, res) => {

})
app.get("/members", (req, res) => {

})

// UPDATE
app.put("/issues", (req, res) => {

})

// DELETE
app.delete("/members", (req, res) => {

})

app.listen(3000);