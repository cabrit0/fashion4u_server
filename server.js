require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
//const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/posts", require("./routes/postRoutes"));
app.use("/api/v1/comments", require("./routes/commentRoutes"));
app.use("/api/v1/follow", require("./routes/followRoutes"));
app.use("/api/v1/likes", require("./routes/likeRoutes"));
app.use("/api/v1/brands", require("./routes/brandRoutes"));
app.use("/api/v1/store", require("./routes/storeRoutes"));
app.use("/api/v1/clothing", require("./routes/clothingRoutes"));
app.use("/api/v1/allPosts_", require("./routes/allPostsRoutes"));

app.use("/", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 - Not Found" });
  } else {
    res.type("txt").send("404 - Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running at ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.name}`,
    "mongoErrLog.log"
  );
  console.log(err);
});
