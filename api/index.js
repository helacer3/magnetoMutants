const express    = require("express");
const bodyParser = require("body-parser");
const config     = require("../config.js");
const mongoose   = require('mongoose');
const magneto    = require("./components/magneto/network");

const app = express();

try {
	let urlConnect = 'mongodb+srv://'+config.api.mongo.user+':'+config.api.mongo.password+'@clustermagneto.pqha5.mongodb.net/'+config.api.mongo.dbname+'?retryWrites=true&w=majority';
	// realizo conexión a Mongo DB haciendo uso de la librería mongoose
	mongoose.connect(urlConnect, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		socketTimeoutMS: 65000,
	});
} catch(error) {
	// problemas con la conexión
	console.log("Error Conexión MongoDB: ", error);
}

app.use(bodyParser.json());

// Router
app.use('/api', magneto);

app.listen(config.api.port,() => {
	console.log('API escuchando en el puerto ', config.api.port);
});
