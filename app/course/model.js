const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdate = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdate);

let courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title harus diisi']
    },
    slug: {
        type: String,
        slug: "title"
    },
    category: {
        type: String,
        required: [true, 'Category harus diisi']
    },
    slogan: {
        type: String,
        required: [true, 'slogan harus diisi']
    },
    description: {
        type: String,
        required: [true, 'description harus diisi']
    },
    keypoint: {
        type: String,
        required: [true, 'keypoint harus diisi']
    },
    designedfor: {
        type: String,
        required: [true, 'designedfor harus diisi']
    },
    tools: {
        type: String,
        required: [true, 'tools harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'price harus diisi']
    },
    discount: {
        type: Number,
        required: [true, 'discount harus diisi']
    },
    status: {
        type: String,
        default: 'Published'
    },
    photo: { 
        type: String, 
    },
    partVideo: {
        title: {
            type: String,
            required: [true, 'Title harus diisi']
        },
        order: {
            type: Number,
            default: 0
        },
        video : {
            title: {
                type: String,
                required: [true, 'Title harus diisi']
            },
            link: {
                type: String,
                required: [true, 'Link harus diisi']
            },
            order: {
                type: Number,
                default: 0
            }
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);