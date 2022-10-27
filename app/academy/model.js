const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const HASH_ROUND = 10;

let academySchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus diisi']
    },
    name: {
        type: String,
        require: [true, 'Name harus diisi'],
        maxlength: [225, "panjang nama harus di antara 3-225 karakter"],
        minlength: [3, "panjang nama harus di antara 3-225 karakter"]
    },
    password: {
        type: String,
        require: [true, 'Password harus diisi'],
        maxlength: [225, "panjang password maksimal 225 karakter"]
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomer telepon harus diisi'],
        maxlength: [13, "panjang nomor harus di antara 9-13 angka"],
        minlength: [9, "panjang nomor harus di antara 9-13 angka"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
},
    { timestamps: true }
);

academySchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Academy').countDocuments({email: value})
        return !count;
    } catch (error) {
        throw error
    }
}, attr => `${attr.value} sudah terdaftar`)

academySchema.pre('save', function (next) {
    this.password = bycrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Academy', academySchema);