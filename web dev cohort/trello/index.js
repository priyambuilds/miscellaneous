const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const SECRET = "attlassionsupersecret1234password";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";

let USER_ID = 3;
let ORG_ID = 3;
let BOARD_ID = 2;
let ISSUE_ID = 3;

let USERS = [
  {
    id: 1,
    username: "priyam",
    password: "12345",
  },
  {
    id: 2,
    username: "raman",
    password: "12345",
  },
];
let ORGANIZATIONS = [
  {
    id: 1,
    title: "100xschool",
    description: "Place to learn to code",
    admin: 1,
    members: [2],
  },
  {
    id: 2,
    title: "100xdevs",
    description: "Place to learn to code",
    admin: 1,
    members: [2],
  },
];

let BOARDS = [
  {
    id: 1,
    title: "100xSchool website (frontend)",
    orgId: 1,
  },
];
let ISSUES = [
  {
    id: 1,
    title: "add dark mode",
    dboardId: 1,
    state: IN_PROGRESS,
  },
  {
    id: 2,
    title: "add something",
    dboardId: 1,
    state: DONE,
  },
];

const app = express();
app.use(express.json());

// CREATE ENDPOINTS
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = USERS.find((u) => u.username === username);
  if (userExists) {
    res.status(411).json({
      message: "User with this username already exists",
    });
    return;
  }

  USERS.push({
    username: username,
    password: password,
    id: USER_ID++,
  });

  res.json({
    message: "Your have signed up successfully",
  });
});
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = USERS.find((u) => u.username === username);
  if (!userExists || userExists.password !== password) {
    res.status(403).json({
      message: "Incorrect Creds",
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: userExists.id,
    },
    SECRET,
  );

  res.json({
    token,
  });
});

// AUTHENTICATED ENDPOINT - MIDDLEWARE
app.post("/organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  ORGANIZATIONS.push({
    id: ORG_ID++,
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [],
  });
  res.json({
    message: "Org created successfully",
    id: ORG_ID - 1,
  });
});
app.post("/add-member-to-org", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUsername = req.body.memberUsername;

  const organization = ORGANIZATIONS.find((org) => org.id === organizationId);

  if (!organization || organization.admin !== userId) {
    res.status(411).json({
      message: "Either this org doesnt exist or you are not the admin",
    });
    return;
  }

  let memberUser = USERS.find((u) => u.username === memberUsername);

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists",
    });
    return;
  }

  organization.members.push(memberUser.id);
  res.json({
    message: "Member added successfully",
  });
});
app.post("/board", (req, res) => {});
app.post("/issue", (req, res) => {});

// READ ENDPOINTS
app.get("/boards", (req, res) => {});
app.get("/issues", (req, res) => {});
app.get("/members", (req, res) => {});
app.get("/organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organizationId = parseInt(req.query.organizationId);
  const organization = ORGANIZATIONS.find((org) => org.id === organizationId);

  if (!organization || organization.admin !== userId) {
    res.status(411).json({
      message: "Either this org doesnt exist or you are not the admin",
    });
    return;
  }
  res.json({
    organization: {
      ...organization,
      members: organization.members.map((memberId) => {
        const user = USERS.find((user) => user.id === memberId);
        return {
          id: user.id,
          username: user.username,
        };
      }),
    },
  });
});

// UPDATE
app.put("/issues", (req, res) => {});

// DELETE
app.delete("/members", authMiddleware, (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.organizationId;
  const memberUsername = req.body.memberUsername;

  const organization = ORGANIZATIONS.find((org) => org.id === organizationId);

  if (!organization || organization.admin !== userId) {
    res.status(411).json({
      message: "Either this org doesnt exist or you are not the admin",
    });
    return;
  }

  let memberUser = USERS.find((u) => u.username === memberUsername);

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists",
    });
    return;
  }

  organization.members = organization.members.filter(
    (memberId) => memberId !== memberUser.id,
  );
  res.json({
    message: "Member removed successfully",
  });
});

app.listen(3000);
