'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let appointmentSetSchema = new Schema({
    id: { type: String, default: '', index: true, unique: true },
    title: { type: String, default: '', trim: true },
    date: { type: String, default: '', trim: true },
    doctorId: { type: String, default: '', trim: true },
    doctorName: { type: String, default: '', trim: true },
    patientName: { type: String, default: '', trim: true }
})

let appointmentSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    appointments: [appointmentSetSchema]
})


mongoose.model('Appointment', appointmentSchema);