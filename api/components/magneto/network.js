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
	// validate Is Mutant
	controller.isMutant(req.body)
		.then((rspPromise) => {
			if (rspPromise.isMutant) {
				response.success(req, res, rspPromise, 200);
			} else {
				response.success(req, res, rspPromise, 403);				
			} 
		})
		.catch((err) => {
			// console.log("err: ", err);
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