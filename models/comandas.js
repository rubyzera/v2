const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComandaSchema = new Schema({
  numero: {
    type: Number,
    required: true,
  },
  itens: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Comanda = mongoose.model('comanda', ComandaSchema);
module.exports = Comanda;