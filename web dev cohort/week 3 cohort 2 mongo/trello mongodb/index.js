const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleWare } = require("./middleware");
const { organizationModel } = require("./models");

let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

const USERS = [];

const ORGANIZATIONS = [];

const BOARDS = [];

const ISSUES = [];

const app = express();
app.use(express.json());

// SIGNUP & SIGNIN
app.get("./signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({
        username: username,
    });

    if (userExists) {
        res.status(411).json({
            message: "User with this username already userExists"
        })
        return;
    }
    const newUser = await userModel.create({
        username,
        password
    })

    res.json({
        id: newUser._id,
        message: "user added successfully"
    })
})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await userModel.findOne({
        username,
        password
    })
    if (!userExists) {
        res.status(401).json({
            message: "Incorrect credentials"
        })
        return
    }
    const token = jwt.sign({
        userId: userExists.id
    }, "ultrasupersecretpassword123")

    res.json({
        token
    })
})

// POST 
app.post("/organization", authMiddleWare, async(req, res) => {
    const userId = req.userId;
    const newOrg = await organizationModel.create({
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })
    res.json({
        message: "Org created",
        id: newOrg._id
    })
})

app.post("/add-member-to-organization", authMiddleWare, async(req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.memberUsername

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not the admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
        username: memberUsername
    })

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }

    // await organization.updateOne({
    //     _id: organizationId
    // }, {
    //     "$push": {
    //         "members": memberUser._id
    //     }
    // })
    organization.members.push(memberUser._id)
    await organization.save()

    res.json({
        message: "New member added!"
    })
})

app.post("/board", (req, res) => {

})
app.post("/issue", (req, res) => {

})

// GET ENDPOINTS
app.get("/organization", authMiddleWare, async (req, res) => {
    const userId = req.userId;
    const organizationId = req.query.organizationId;

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not the admin of this org"
        })
        return
    }
    const members = await userModel.findMany({
        c  
    })

    res.json({
        organization: {
            title: organization.title,
            description: organization.description,
            members: members.map(m => ({
                username: m,
                id: m._id
            }))
       }
    })
})

app.get("/boards", (req, res) => {

})
app.get("/issues", (req, res) => {

})
app.get("/members", (req, res) => {

})

// UPDATE
app.get("/issues", (req, res) => {
    if (userId) {
        req.userId = userId
    }
})

// DELETE
app.delete("/members", async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.memberUsername

    const organization = await organizationModel.findOne({
        _id: organizationId
    })

    if (!organization || organization.admin.toString() !== userId) {
        res.status(411).json({
            message: "Either this org doesnt exist or you are not the admin of this org"
        })
        return
    }

    const memberUser = await userModel.findOne({
        username: memberUsername
    })

    if (!memberUser) {
        res.status(411).json({
            message: "No user with this username exists in our db"
        })
        return
    }

    // await organizationModel.updateOne({
    //     _id: organizationId
    // }, {
    //     "$pullAll": {
    //         members: memberUser._id
    //     }
    // })
    organization.members = organization.members.filter(x => x.toString() !== memberUser._id.toString());
    await organization.save();

    res.json({
        message: "member deleted!"
    })
})
app.listen(3000);