const express    = require("express");
const bodyParser = require("body-parser");
const config     = require("../config.js");
const mongoose   = require('mongoose');
const magneto    = require("./components/magneto/network");

const app = express();

try {
	mongoose.connect('mongodb+srv://'+config.api.mongo.user+':'+config.api.mongo.password+'@clustermagneto.pqha5.mongodb.net/'+config.api.mongo.dbname+'?retryWrites=true&w=majority', {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	});
} catch(error) {
	console.log("Error Conexión MongoDB: ", error);
}

app.use(bodyParser.json());

// Router
app.use('/api', magneto);

app.listen(config.api.port,() => {
	console.log('API escuchando en el puerto ', config.api.port);
});
