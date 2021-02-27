const MutantHelper = require("./helpers/mutantHelper");

module.exports = function() {
	
	/**
	* is Mutant
	*/
	function isMutant(objRequest) {
		let objResponse = {'isMutant': false, 'result': 'no Es Mutante' };
		// instance Mutant Helper
		let hlpMutant   = new MutantHelper();
		// verify Is Mutant
		if (hlpMutant.verifyIsMutant(objRequest)) {
			objResponse.isMutant = true;
			objResponse.result = 'es Mutante';
		}
		// default Return
		return objResponse;
	}

	/**
	* list Stats
	*/
	function listStats() {
		let objResponse = { "count_mutant_dna":40, "count_human_dna":100, "ratio":0.4 }
		// instance Mutant Helper
		let hlpMutant   = new MutantHelper();
		
		objResponse.count_mutant_dna = 1;
		objResponse.count_human_dna  = 1;
		objResponse.ratio = 0;
		// default Return
		return objResponse;
	}

	return {
		isMutant, listStats
	}
}

