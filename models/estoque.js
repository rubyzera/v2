const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstoqueSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Estoque = mongoose.model('Estoque', EstoqueSchema);
module.exports = Estoque;