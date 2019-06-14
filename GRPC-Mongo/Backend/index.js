const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { FRONTEND_URL, SERVER_PORT, RES_SUCCESS } = require("./constants/iconstants");
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: RES_SUCCESS
};

let app = express();

app.use("/static", express.static("./public"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.set("port", SERVER_PORT);
app.use("/", express.static(path.join(__dirname, "public", "data")));
app.use("/", routes);
app.set("port", SERVER_PORT);

let server = app.listen(app.get("port"), function() {
  let port = server.address().port;
  console.log('server started at port:',port)
});

module.exports = app;