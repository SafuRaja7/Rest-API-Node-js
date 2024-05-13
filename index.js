const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/products_routes.js");
const dbConfig = require("./config/db_config.js");
const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/error_handling.js");
const unless = require("express-unless");
const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

auth.authenticationToken.unless = unless;
app.use(
  auth.authenticationToken.unless({
    path: [
      { url: "/users/login", methods: [POST] },
      { url: "/users/register", methods: [POST] },
    ],
  })
);
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/users", require("./routes/users.routes.js"));
app.use(errors.errorHandler);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// mongoose
//   .connect(
//     "mongodb+srv://safuraja7:dracaryss77AA@backenddb.r9sqzzw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });
