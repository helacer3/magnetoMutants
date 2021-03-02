const MutantHelper     = require("./helpers/mutantHelper");
const PersistlogHelper = require("./helpers/persistlogHelper");

module.exports = function() {
	
	/**
	* is Mutant
	* rest al cual se accede por método POST, para determinar si la data enviada hace referencia a un humano o un mutante
    * @author Snayder Acero <helacer3@yahoo.es>
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
				plogHelper.saveLogMagneto(JSON.stringify(objRequest), objValidation.isMutant)
					.then(() => {})
					.catch((error) => {
						console.log("error isMutant Log: ", error); 
					});
			}).catch((error) => {
				console.log("error isMutant: ", error);
		  	});
	  	// default Return
	  	return objResponse;
	}

	/**
	* list Stats
	* permite obtener la cantidad de mutantes y humanos encontrados en el histórico de validaciones 
	* y el porcentaje de resultados exitosos (Es Mutante)
    * @author Snayder Acero <helacer3@yahoo.es>
	*/
	async function listStats() {
		// default Object
		let objResponse = { "count_mutant_dna":0, "count_human_dna":0, "ratio":0 }
		// instance Persist Log Helper
		let hlpMutant   = new PersistlogHelper();
		// find Magneto Log
		await hlpMutant.findLogMagneto()
			.then((logResponse) => {
				console.log("logResponse: ", logResponse);
				// count Mutants
				let cntMutants = logResponse[0].count_mutant_dna;
				// count Humans
				let cntHumans  = logResponse[0].count_human_dna;
				// set Object Response
				objResponse.count_mutant_dna = cntMutants,
				objResponse.count_human_dna  = cntHumans,
				objResponse.ratio = parseInt(((cntMutants * 100) / (cntMutants + cntHumans)));
			})
			.catch((error) => {
				// console.log("error listStats: ", error);
			});
		// default Return
		return objResponse;
	}

	return {
		isMutant, listStats
	}
}

