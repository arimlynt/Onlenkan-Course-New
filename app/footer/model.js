const mongoose = require('mongoose');

let footerSchema = mongoose.Schema({
    sosmed: {
        linkedin: {
            type: String,
            required: [true, 'linkedin harus diisi']
        },
        instagram: {
            type: String,
            required: [true, 'instagram harus diisi']
        },
        tiktok: {
            type: String,
            required: [true, 'tiktok harus diisi']
        },
        youtube: {
            type: String,
            required: [true, 'youtube harus diisi']
        },
        facebook: {
            type: String,
            required: [true, 'facebook harus diisi']
        },
    },
    kontak : {
        alamat: {
            type: String,
            required: [true, 'alamat harus diisi']
        },
        email: {
            type: String,
            required: [true, 'email harus diisi']
        },
        phoneNumber: {
            type: Number,
            required: [true, 'phone number harus diisi']
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Footer', footerSchema);