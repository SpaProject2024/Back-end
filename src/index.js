const express = require("express");
const morgan = require("morgan");

// Khởi tạo ứng dụng Express
const app = express();
// Port
const port = 3000;
// Log
app.use(morgan("combined"));
// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Connect to DB
const db = require('./config/db');
db.connect();


// const articles = require("./resources/articles/articles");

// app.get('/', (req, res) => res.send('Hello World!'))

// GET article
// app.get("/articles", async (req, res) => {
//   try {
//     res.status(200).end("Will send all the articles to you!");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// POST a new article
// app.post("/articles", async (req, res) => {
//   try {
//     res
//       .status(201)
//       .end(
//         "Will add the article: " +
//           req.body.title +
//           " with details: " +
//           req.body.text +
//           " and " +
//           req.body.date
//       );
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// PUT a new article
// app.put("/articles", async (req, res) => {
//   try {
//     res.status(403).end("PUT operation not supported on /articles");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// DELETE all articles
// app.delete("/articles", async (req, res) => {
//   try {
//     res.status(200).end("Deleting all articles");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// GET a specific article
// app.get("/articles/:id", async (req, res) => {
//   try {
//     res
//       .status(200)
//       .end("Will send details of the article: " + req.params.id + " to you!");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// POST a specific article
// app.post("/articles/:id", async (req, res) => {
//   try {
//     res
//       .status(403)
//       .end("POST operation not supported on /articles/" + req.params.id);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// PUT a specific article
// app.put("/articles/:id", async (req, res) => {
//   try {
//     res.write("Updating the article: " + req.params.id + "\n");
//     res
//       .status(201)
//       .end(
//         "Will update the article: " +
//           req.body.title +
//           " with details: " +
//           req.body.text +
//           " and " +
//           req.body.date
//       );
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// DELETE a specific article
app.delete("/articles/:id", async (req, res) => {
  try {
    res.status(200).end("Deleting article: " + req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () =>
  console.log(`Express app listening at http://localhost:${port}`)
);
