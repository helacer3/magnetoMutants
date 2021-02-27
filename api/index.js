const express    = require("express");
const bodyParser = require("body-parser");
const config     = require("../config.js");

const app = express();

app.use(bodyParser.json());

// Router
app.use('/api');

app.listen(config.api.port,() => {
	console.log('API escuchando en el puerto ', config.api.port);
});
