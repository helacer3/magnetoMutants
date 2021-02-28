const MutantHelper     = require("./helpers/mutantHelper");
const PersistlogHelper = require("./helpers/persistlogHelper");

module.exports = function() {
	
	/**
	* is Mutant
	*/
	async function isMutant(objRequest) {
		// set Default Object Response
		let objResponse = {'isMutant': false, 'result': 'Error en la validación' };
		// instance Mutant Helper
		let hlpMutant   = new MutantHelper();
		// instance Persist Log Helper
		let plogHelper  = new PersistlogHelper();
		// verify Is Mutant
		await hlpMutant.verifyIsMutant(objRequest)
			.then((objValidation) => {
				objResponse = objValidation;
				// save Magneto Log
				plogHelper.saveLogMagneto(Json.stringify(objRequest), objValidation.isMutant)
					.then(() => {})
					.catch((error) => {
						console.log("error isMutant Log: ", error); 
					});
			}).catch((error) => {
				// console.log("error isMutant: ", error);
		  	});
	  	// default Return
	  	return objResponse;
	}

	/**
	* list Stats
	*/
	async function listStats() {
		// default Object
		let objResponse = { "count_mutant_dna":0, "count_human_dna":0, "ratio":0 }
		// instance Persist Log Helper
		let hlpMutant   = new PersistlogHelper();
		// find Magneto Log
		await hlpMutant.findLogMagneto()
			.then((findResponse) => {
				objResponse.count_mutant_dna = 1;
				objResponse.count_human_dna  = 1;
				objResponse.ratio = 0;
			})
			.catch((error) => {
				console.log("error listStats: ", error);
			});
		// default Return
		return objResponse;
	}

	return {
		isMutant, listStats
	}
}

