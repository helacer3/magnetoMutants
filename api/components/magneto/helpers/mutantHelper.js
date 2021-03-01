class MutantHelper {
	// default Vars
	secQuantity   = 0;
	qtyMutant     = 2;
	adnBase       = ['A','T','C','G'];
	mtxValidation = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]];

	/**
	* verify Is Mutant
	* valida formato Request y en caso de ser correcto lo analiza para validar si es o no un mutante
    * sample Request: { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }
    * @author Snayder Acero <helacer3@yahoo.es>
	*/
	async verifyIsMutant(objRequest) {
		// set Default Object Response
		let objResponse = {'isMutant': false, 'result': 'Error verificando si es mutante' };
		// validate Request Json
		await this.validateRequestJson(objRequest)
		.then(arrItems => {
			// console.log("la validacion devuelve: ", arrItems);
			// matrix Length
			this.mtxLength  = arrItems.length;
			// is Valid
			if (arrItems.length > 0) {
				// validate Item Sequence
				this.validateItemSequence(arrItems)
					.then(() => {
						if (this.secQuantity >= 2) {
							objResponse.isMutant = true;
							objResponse.result   = "Si es Mutante";
						} else {
							objResponse.result   = "No es Mutante";
						}
					});
			} else {
				objResponse.result = "El formato de la solicitud es incorrecto. No podemos validar si es mutante";
			}
		}).catch((error) => {
		    // console.log('Error en Promesa verifyIsMutant: ', error);
	  	});
	  	// default Return
	  	return objResponse;
	}

	/**
	* validate Request Json
    * permite validar que el request tenga el formato correcto y sea una matriz de N x N
    * @author Snayder Acero <helacer3@yahoo.es>
	*/
	async validateRequestJson(objRequest) {
		// default Var
		let arrItems = [];
		let booError = false;
		// validate Exist DNA
		if ("dna" in objRequest) {
			let cntItems = objRequest.dna.length;
			// validate Items
			if (cntItems > 0) {
				// iterate Element
				objRequest.dna.some(itemString => {
					let arrItem = itemString.split("");
					// validate Item Length 
					if (arrItem.length == cntItems) {
						arrItems.push(arrItem);
					} else {
						arrItems = [];
						booError = true;
						return true;
					}
				});
			}
		}
		// default Return
		return (booError) ? [] : arrItems;
	}

	/**
	* validate Horizontal Items
    * Permite iterar las columnas de cada fila de la matriz
    * @author Snayder Acero <helacer3@yahoo.es>
	*/
	async validateItemSequence(arrItems) {
		// set me
		let me = this;
		// iterate Rows
		arrItems.forEach(function callback(itemRow, indexRow) {
			// iterate Cols
			itemRow.forEach(function callback(itemCol, indexCol) {
				// is On ADN Base
				if (me.adnBase.indexOf(itemCol)) {
					// sequences Verify Actual Item
					if (me.sequencesVerifyActualItem(arrItems, itemCol, indexRow, indexCol)) {
						// validate Actual Sequence Quntity
						if (me.secQuantity >= me.qtyMutant) {
							return true;
						}
					}
				}
			});
		});
		// default return
		return false;
	}

	/**
	* sequences Verify Actual Item
    * Por cada celda de la matriz realiza la validación de las 8 combinaciones posibles en las que esta puede dar positivo para mutante
    * Se realiza de esta manera para minimizar el numero de iteraciones requeridas para su validación y para grarantizar que se validen todas las opciones posibles
    * @author Snayder Acero <helacer3@yahoo.es>
	*/
	sequencesVerifyActualItem(arrItems, actItem, indexX, indexY) {
		this.mtxValidation.forEach(valValidate => {
			// validate if is Mutant
			if (this.secQuantity < this.qtyMutant) {
				// validate Array Keys (Positions) Exist
				if (
					this.validateExistItemPosition(arrItems, (indexX + (valValidate[0] * 1)), (indexY + (valValidate[1]) *1)) &&
					this.validateExistItemPosition(arrItems, (indexX + (valValidate[0] * 2)), (indexY + (valValidate[1]) *2)) &&
					this.validateExistItemPosition(arrItems, (indexX + (valValidate[0] * 3)), (indexY + (valValidate[1]) *3)) &&
					this.validateExistItemPosition(arrItems, (indexX + (valValidate[0] * 4)), (indexY + (valValidate[1]) *4))
				) {
					// console.log("Ingresa a validar: ", arrItems[indexX + (valValidate[0] * 1)][indexY + (valValidate[1] * 1)]);
					// compare Iqual Items
					if (
						(arrItems[indexX + (valValidate[0] * 1)][indexY + (valValidate[1] * 1)] ===
						arrItems[indexX + (valValidate[0] * 2)][indexY + (valValidate[1] * 2)])
						&& 
						(arrItems[indexX + (valValidate[0] * 2)][indexY + (valValidate[1] * 2)] ===
						arrItems[indexX + (valValidate[0] * 3)][indexY + (valValidate[1] * 3)])
						&& 
						(arrItems[indexX + (valValidate[0] * 3)][indexY + (valValidate[1] * 3)] ===
						arrItems[indexX + (valValidate[0] * 4)][indexY + (valValidate[1] * 4)]) 
					) {
						this.secQuantity++;
						// console.log("\n \n ingresa a incrementar el quantity, quedando en: ", this.secQuantity);
					} 
				}
			}
		});
		// default Return
		return true;
	}

	/**
	* validate Exist Item Position
	*/
	validateExistItemPosition(actArray, indexX, indexY) {
		// default Var
		let booValidate = false;
		// validate Index 
		if (actArray[indexX] !== undefined && actArray[indexX][indexY]  !== undefined) {
			booValidate = true;
		}
		// default Return
		return booValidate;
	}
}

module.exports = MutantHelper;