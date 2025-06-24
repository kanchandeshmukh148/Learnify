const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['web', 'data', 'mobile', 'design'],
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    students: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number, // in hours
        required: true
    },
    sections: [{
        title: String,
        lectures: [{
            title: String,
            duration: Number // in minutes
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', courseSchema);