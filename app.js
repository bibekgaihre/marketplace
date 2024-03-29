var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");

var bodyParser = require("body-parser");
var app = express();

const config = require("config");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(config.get("db_url"), { useNewUrlParser: true });

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const port = process.env.PORT;
  app.listen(port, () => console.log(`listening on port ${port}`));

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
