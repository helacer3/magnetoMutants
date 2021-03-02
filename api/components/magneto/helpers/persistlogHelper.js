const mongoose        = require('mongoose')
const LogMutantsModel = require('../models/MagnetoModel')

class PersistLogHelper {

  /**
  * save Log Magneto
  * permite ingresar al documento de mongo el registro correspondiente a la validación Mutant realizada
  */
  async saveLogMagneto(strRequest, isMutant) {
    try {
      return new LogMutantsModel({
        request:strRequest,
        isMutant: isMutant,
        creationDate: Date.now()
      }).save();
    } catch (error) {
      console.log("Error saveLogMagneto: ", error);
    } 
    // default Return
    return null;
  }

  /**
  * find Log Magneto
  * permite calcular la cantidad de registros cuya validación arrojo si es mutante o no, 
  * query realizado haciendo uso de un aggregate de MongoDB
  * @author Snayder Acero <helacer3@yahoo.es>
  */
  async findLogMagneto() {
    // default Var
    let logMutants = null;
    try {
      // aggregate
      logMutants = await LogMutantsModel.aggregate([
        {
          "$group": {
            "_id": "$id",
            "count_mutant_dna": { "$sum": { "$cond": [ { "$eq": ["$isMutant", true] }, 1, 0] } },
            "count_human_dna": { "$sum": { "$cond": [ { "$eq": ["$isMutant", false] }, 1, 0] } }
          }
      }]);
      //.exec(function(err, stats) {});
    } catch (error) {
      console.log("Error find Log Magneto: ", error);
    }
    // default Return
    return logMutants;
  }
}

module.exports = PersistLogHelper;