'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let questionSetSchema = new Schema({
    id: { type: String, default: '', index: true, unique: true },
    title: { type: String, default: '', trim: true },
    date: { type: String, default: '', trim: true },
    answer: { type: String, default: '', trim: true },
    answeredById: { type: String, default: '', trim: true },
    answeredByName: { type: String, default: '', trim: true },
    askedByName: { type: String, default: '', trim: true }
})

let questionSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    questions: [questionSetSchema]
})


mongoose.model('Question', questionSchema);