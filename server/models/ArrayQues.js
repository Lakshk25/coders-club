const mongoose = require('mongoose');

const arraySchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    // if 0 unsolved 1 solved 2 revisit
    status: {
        type: Number,
        default : 0
    },
    userCode: {
        language: {
            type: String,
        },
        code: {
            type: String,
        }
    },
    notes: {
    type: String,
}
});

module.exports = mongoose.model('arrayQuestion', arraySchema)