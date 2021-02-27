// sample Request: { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

module.exports = function() {
	// vars
	var secQuantity  = 0;
	var adnBase      = ['A','T','C','G'];

	/**
	* verify Is Mutant
	*/
	function verifyIsMutant(jsnRequest) {
		// default Var
		let booValidate = false;
		// validate Request Json
		let isValid = validateRequestJson(jsnRequest);
		// is Valid
		if (isValid) {
			// validate Horizontal Items
			validateHorizontalItems(lstItems);
			// secuence Quantity
			if (secQuantity < 3) {
				// validate Vertical Items
				validateVerticalItems(lstItems);
			} 
			// secuence Quantity
			if (secQuantity < 3) {
				// validate Diagonal Items
				validateDiagonalItems(lstItems);
			}
		}
		// default Respose
		return Validate
	}

	/**
	* validate Horizontal Items
	*/
	function validateHorizontalItems(lstItems) {

	}

	/**
	* validate Vertical Items
	*/
	function validateVerticalItems(lstItems) {

	}

	/**
	* validate Diagonal Items
	*/
	function validateDiagonalItems(lstItems) {

	}

	/**
	* validate Request Json
	*/
	function validateRequestJson(jsnRequest) {

	}

	return {
		verifyIsMutant
	}
}