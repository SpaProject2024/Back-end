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
const db = require("./config/db");
db.connect();

//Route init - Example
// const route = require("./routes");
// route(app);

app.listen(port, () =>
  console.log(`Express app listening at http://localhost:${port}`)
);
