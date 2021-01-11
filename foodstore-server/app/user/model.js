const mongoose = require('mongoose')
const {model, Schema} = mongoose
const bcrypt = require('bcrypt')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const HASH_ROUND = 10

let userSchema = Schema({
    full_name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        maxlength: [255, 'Panjang nama maksimal 255 karakter'],
        minlength: [3, 'Panjang nama minimal 3 karakter']
    },
    customer_id: {
        type: Number
    },
    email: {
        type: String,
        maxlength: [255, 'Panjang email maksimal 255 karakter'],
        required: [true, 'Email harus diisi']
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        maxlength: [255, 'Panjang password maksimal 255 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: [String]
}, {timestamps: true})

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return EMAIL_RE.test(value)
}, attr => `${attr.value} harus menggunakan email yang valid!`)

userSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('User').count({email: value})
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

userSchema.pre('Save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
})

userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'})

module.exports = model('User', userSchema)