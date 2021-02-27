const express    = require("express");
const response   = require("../../../network/response");
const controller = require("./index");
const router     = express.Router();

router.get('/stats', listStats);
router.post('/mutant', isMutant);

/**
* is Mutant
* @author Snayder Acero <helacer3@yahoo.es>
*/
function isMutant(req, res) {
	controller.isMutant()
		.then((lista) => {
			response.success(req, res, lista, 200);
		})
		.catch((err) => {
			response.error(req, res, err.message, 500);
		});
}

/**
* list Stats
* @author Snayder Acero <helacer3@yahoo.es>
*/
function listStats(req, res) {
	controller.listStats()
		.then((list) => {
			response.success(req, res, list, 200);
		})
		.catch((err) => {
			response.error(req, res, err.message, 500);
		});
}

module.exports = router;