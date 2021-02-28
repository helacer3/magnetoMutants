const mongoose        = require('mongoose')
const LogMutantsModel = require('../models/MagnetoModel')

class PersistLogHelper {

  /**
  * save Log Magneto
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
  */
  async findLogMagneto() {
    try {
      //return await LogMutantsModel.find({ });
      let logGroup = await LogMutantsModel.aggregate([
        {
          //$match: { "isMutant": isMutant }
        },
        {
          $group: {
            _id: ['count_mutant_dna', 'count_human_dna'],
            //'count_mutant_dna':{$sum: {$cond: [{ $eq:["$isMutant", true] }, 1, 0]}},
            //'count_human_dna': {$sum: {$cond: [{ $eq:["$isMutant", false] }, 1, 0]}}
            'count_mutant_dna':{ $sum: { $cond: ["$isMutant", 1, 0] }},
            'count_human_dna':{ $sum: { $cond: ["$isMutant", 0, 1] }}
          }
        }, function(err, stats) {
            console.log("error: ", err);
            logGroup = stats;
        }
      ]);
      console.log("Resultado del loggroup: ", logGroup);
      // return logGroup
      return logGroup;
    } catch (error) {
      console.log("Error find Log Magneto: ", error);
    }
    // default return
    return null;
  }
}

module.exports = PersistLogHelper;