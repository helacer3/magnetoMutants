var express = require("express");
bodyParser  = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});