const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funcSchema = new Schema({
    nome: {
        type: String,
        required:true
    },
    sexo: {
        type: String,
        required:true
    },
    datanasc: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },    
    senha: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Func = mongoose.model('Func', blogSchema);
module.exports = Func;