const mongoose        = require('mongoose')
const LogMutantsModel = require('../models/MagnetoModel')

class PersistLogHelper {

  /**
  * save Log Magneto
  */
  async saveLogMagneto(strRequest, isMutant) {
    return new LogMutantsModel({
      request:strRequest,
      isMutant: isMutant,
      creationDate: Date.now()
    }).save()
  }

  /**
  * find Log Magneto
  */
  async findLogMagneto() {
    return await LogMutantsModel.find({ });
  }
}

module.exports = PersistLogHelper;