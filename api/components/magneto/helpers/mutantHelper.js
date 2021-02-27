// sample Request: { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

class MutantHelper {
	// default Vars
	secQuantity  = 0;
	mtxLength    = 0;
	adnBase      = ['A','T','C','G'];

	/**
	* verify Is Mutant
	*/
	verifyIsMutant(objRequest) {
		// default Var
		let booValidate = false;
		// validate Request Json
		let arrItems    = this.validateRequestJson(objRequest);
		// matrix Length
		this.mtxLength  = arrItems.length;
		// is Valid
		if (this.mtxLength > 0) {
			// validate Horizontal Items
			this.validateHorizontalItems(arrItems);
			// secuence Quantity
			if (this.secQuantity < 3) {
				// validate Vertical Items
				this.validateVerticalItems(arrItems);
			} 
			// secuence Quantity
			if (this.secQuantity < 3) {
				// validate Diagonal Items
				this.validateDiagonalItems(arrItems);
			}
		}
		// default Respose
		return booValidate;
	}

	/**
	* validate Request Json
	*/
	validateRequestJson(objRequest) {
		// default Var
		let arrItems = [];
		// validate Exist DNA
		if ("dna" in objRequest) {
			let cntItems = objRequest.dna.length;
			// validate Items
			if (cntItems > 0) {
				// iterate Element
				objRequest.dna.forEach(itemString => {
					let arrItem = itemString.split("");
					// validate Item Length 
					if (arrItem.length == cntItems) {
						arrItems.push(arrItem);
					}
				});
			}
		}
		// default Return
		return arrItems;
	}

	/**
	* validate Horizontal Items
	*/
	validateHorizontalItems(arrItems) {
		// falta validacion para que aga la valdiacion hasta - 3 o ahsta que encuentr una secuencia 
		// default Vars
		let prvItem   = "";
		let qtyRepeat = 0; 
		// iterate Rows
		arrItems.forEach(itemRow => {
			// iterate Cols
			itemRow.forEach(itemCol => {
				// compare With Preview Item
				if (prvItem == itemCol) {
					qtyRepeat++;
				}
				// validate Repeat
				if (qtyRepeat == 4) {
					// validate ADN Base
					if (this.adnBase.includes(itemCol)) {
						// increment Secuence
						this.secQuantity++;
						// actual Secuences Quantity
						if (this.secQuantity == 3) {
							return true;
						}
					}
					// reset Quantity Repeat
					qtyRepeat = 0;
				}
				// set Preview Item
				prvItem = itemCol;
			});
			// reset Quantity Repeat
			qtyRepeat = 0;
		});
		// this.mtxLength 
	}

	/**
	* validate Vertical Items
	*/
	validateVerticalItems(arrItems) {
	}

	/**
	* validate Diagonal Items
	*/
	validateDiagonalItems(arrItems) {

	}
}

module.exports = MutantHelper;