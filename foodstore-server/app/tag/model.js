const mongoose = require('mongoose')
const {model, Schema} = mongoose

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang Tag minimal 3 karakter'],
        maxlength: [20, 'Panjang tag maksimal 20 karakter'],
        required: [true, 'Nama Tag harus diisi']
    }
})
module.exports = model('Tag', tagSchema)