const mongoose = require('mongoose');

/**
* Log Mutants
*/
const LogMutants = new mongoose.Schema({
  request: {
    type: String,
    required: true,
  },
  isMutant: {
    type: Boolean,
    required: true,
  },
  creationDate: {
    type : Date,
    default: Date.now
  }
});

const LogMutantsModel = mongoose.model("LogMutants", LogMutants);
module.exports = LogMutantsModel;