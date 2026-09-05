// const express = require("express");

// const app = express();

// app.get("/health-checkup", function (req, res) {
//   const username = req.headers.username;
//   const password = req.headers.password;
//   const kidneyId = req.headers.kidneyId;

//   if (!(username === "priyam" && password === "pass")) {
//     res.status((400).json({ msg: "Somethings wrong with your input" }));
//     return;
//   }

//   if (kidneyId == 1 || kidneyId == 2) {
//     res.status(400).json({
//       msg: "Your input is wrong",
//     });
//       return
//   }
//     res.json({
//         msg: "Your kidney is fine"
//     })
// });

// Notes app

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const notes = [{userName: "priyam", note: "go to gym"}];
const users = [
  {
    username: "priyam",
    password: "123123",
  },
];

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (!userExists) {
    res.status(403).json({
      message: "Incorrect Creds",
    });
    return;
  }

  const token = jwt.sign(
    {
      username: username,
    },
    "priyam123",
  );
  res.json({ token: token });
});

app.post("/notes", function (req, res) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send({
      message: "You are not logged index",
    });
    return;
  }
  const decoded = jwt.verify(token, "priyam123");
  const username = decoded.username;
  if (!username) {
    res.status(403).send({
      message: "Malformed token",
    });
    return;
  }
  const note = req.body.note;
  notes.push(note, username);

  res.json({
    message: "Done",
  });
});

app.get("/notes", function (req, res) {
    const token = req.headers.token;
  if (!token) {
    res.status(403).send({
      message: "You are not logged index",
    });
    return;
  }
  
  const decoded = jwt.verify(token, "priyam123");
  const username = decoded.username;

  if (!username) {
    res.status(403).send({
      message: "Malformed token",
    });
    return;
  }

  const userNotes = notes.filter(note => note.username ===username)
  res.json({
    notes: userNotes
  });
});

app.get("/", function (req, res) {
  res.sendFile(
    "/Users/priyamdey/Documents/miscellaneous/web dev cohort/middlewares/index.html",
  );
});
app.listen(3000);
