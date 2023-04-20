const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const nodemailer = require('nodemailer');
const Twitter = require('twitter');

/* Models */
const UserModel = mongoose.model('User')
const EventModel = mongoose.model('Event')
const AppointmentModel = mongoose.model('Appointment')
const QuestionModel = mongoose.model('Question');


/* Get all user Details */
let getAllUser = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

/* Get all normal user Details */
let getAllNormalUser = (req, res) => {
    UserModel.find({ 'admin': 0 })
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllNormalUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find Normal User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Normal User Found', 'User Controller: getAllNormalUser')
                let apiResponse = response.generate(true, 'No Normal User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Normal User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

/* Get all Doctor Details */
let getAllDoctors = (req, res) => {
    UserModel.find({ 'isDoctor': true })
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllDoctors', 10)
                let apiResponse = response.generate(true, 'Failed To Find Doctor Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Normal User Found', 'User Controller: getAllDoctors')
                let apiResponse = response.generate(true, 'No Doctor Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Doctor Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users

/* Get single user details */
let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let getSingleUserEmailId = (req, res) => {
    UserModel.findOne({ 'userId': req.query.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUserEmailId', 10)
                let apiResponse = response.generate(true, 'Failed To Find SingleUserEmailId Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUserEmailId')
                let apiResponse = response.generate(true, 'No SingleUserEmailId Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User EmailDetails Found', 200, result)
                res.send(apiResponse.data)
            }
        })
}// end get single user

let getSingleUserEvent = (req, res) => {
    console.log(req.query.userId)
    EventModel.find({ 'userId': req.query.userId })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUserEvent', 10)
                let apiResponse = response.generate(true, 'Failed To Find UserEvent Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No UserEvent Found', 'User Controller:getSingleUserEvent')
                let apiResponse = response.generate(true, 'No UserEvent Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'UserEvent Details Found', 200, result)
                res.send(apiResponse.data[0])
            }
        })
}// end get single user

let getSingleUserAppointment = (req, res) => {
    console.log(req.query.userId)
    AppointmentModel.find({ 'userId': req.query.userId })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUserAppointment', 10)
                let apiResponse = response.generate(true, 'Failed To Find UserAppointment Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No UserAppointment Found', 'User Controller:getSingleUserAppointment')
                let apiResponse = response.generate(true, 'No UserAppointment Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'UserAppointment Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single user

let getSingleQuestion = (req, res) => {
    console.log(req.query.userId)
    QuestionModel.find({ 'userId': req.query.userId })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleQuestion', 10)
                let apiResponse = response.generate(true, 'Failed To Find SingleQuestion Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No SingleQuestion Found', 'User Controller:getSingleQuestion')
                let apiResponse = response.generate(true, 'No SingleQuestion Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'SingleQuestion Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single question

let getAllAppointments = (req, res) => {
    AppointmentModel.find({})
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllAppointments', 10)
                let apiResponse = response.generate(true, 'Failed To Find AllAppointments Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No UserAppointment Found', 'User Controller:getAllAppointments')
                let apiResponse = response.generate(true, 'No UserAppointment Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'AllUserAppointment Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all user appointments

let getAllQuestions = (req, res) => {
    QuestionModel.find({})
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllQuestions', 10)
                let apiResponse = response.generate(true, 'Failed To Find AllQuestions Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Questions Found', 'User Controller:getAllQuestions')
                let apiResponse = response.generate(true, 'No Questions Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'AllQuestions Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all questions

let getSingleEventFromUser = (req, res) => {
    console.log(req.query.id)
    EventModel.find({ 'userEvents.id': req.query.id })
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleEventFromUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find SingleEvent Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No SingleEvent Found', 'User Controller:getSingleEventFromUser')
                let apiResponse = response.generate(true, 'No SingleEvent Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'SingleEvent Details Found', 200, result)
                let s = apiResponse.data[0].userEvents;
                s.forEach(function (item) {
                    console.log(item)
                    if (item.id == req.query.id) {
                        res.send(item)
                    }
                })
            }
        })
}// end get single user

let deleteUser = (req, res) => {

    UserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let deleteSingleEvent = (req, res) => {

    EventModel.update({ 'userEvents.id': req.params.id }, { $pull: { "userEvents": { "id": req.params.id } } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteSingleEvent', 10)
            let apiResponse = response.generate(true, 'Failed To delete SingleEvent', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleEvent Found', 'User Controller: deleteSingleEvent')
            let apiResponse = response.generate(true, 'No SingleEvent Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the SingleEvent successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let deleteSingleAppointment = (req, res) => {

    AppointmentModel.update({ 'appointments.id': req.params.id }, { $pull: { "appointments": { "id": req.params.id } } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteSingleAppointment', 10)
            let apiResponse = response.generate(true, 'Failed To delete Single Appointment', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleAppointment Found', 'User Controller: deleteSingleAppointment')
            let apiResponse = response.generate(true, 'No Appointment Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the Single Appointment successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let deleteSingleQuestion = (req, res) => {

    QuestionModel.update({ 'questions.id': req.params.id }, { $pull: { "questions": { "id": req.params.id } } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteSingleQuestion', 10)
            let apiResponse = response.generate(true, 'Failed To delete Single Question', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleQuestion Found', 'User Controller: deleteSingleQuestion')
            let apiResponse = response.generate(true, 'No Question Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the Single Question successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let editUser = (req, res) => {
    console.log(req.params.userId);
    let options = req.body;
    UserModel.updateOne({ 'userId': req.params.userId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user

let editSingleEvent = (req, res) => {

    let options = req.body;
    EventModel.update({ 'userEvents.id': req.params.id }, { $set: { "userEvents.$.title": options.title, "userEvents.$.date": options.date, "userEvents.$.place": options.place, "userEvents.$.purpose": options.purpose } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editSingleEvent', 10)
            let apiResponse = response.generate(true, 'Failed To edit SingleEvent details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleEvent Found', 'User Controller: editSingleEvent')
            let apiResponse = response.generate(true, 'No SingleEvent Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'SingleEvent details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user

let editSingleAppointment = (req, res) => {

    let options = req.body;
    AppointmentModel.update({ 'appointments.id': req.params.id }, { $set: { "appointments.$.title": options.title, "appointments.$.date": options.date, "appointments.$.doctorId": options.doctorId, "appointments.$.doctorName": options.doctorName, "appointments.$.patientName": options.patientName } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editSingleAppointment', 10)
            let apiResponse = response.generate(true, 'Failed To edit SIngleAppointment details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleAppointment Found', 'User Controller: editSingleAppointment')
            let apiResponse = response.generate(true, 'No SingleAppointment Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'SingleAppointment details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user

let editSingleQuestion = (req, res) => {

    let options = req.body;
    QuestionModel.update({ 'questions.id': req.params.id }, { $set: { "questions.$.title": options.title, "questions.$.date": options.date, "questions.$.answer": options.answer, "questions.$.answeredById": options.answeredById, "questions.$.answeredByName": options.answeredByName, "questions.$.askedByName": options.askedByName } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editSingleQuestion', 10)
            let apiResponse = response.generate(true, 'Failed To edit SingleQuestion details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No SingleQuestion Found', 'User Controller: editSingleQuestion')
            let apiResponse = response.generate(true, 'No SingleQuestion Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'SingleQuestion details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user

let appointmentCreateFunction = (req, res) => {

    let newAppointmentSet;

    let createAppointment = () => {
        return new Promise((resolve, reject) => {
            AppointmentModel.findOne({ userId: req.body.userId })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createAppointment', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Appointment', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        newAppointmentSet = new AppointmentModel();
                        newAppointmentSet.userId = req.body.userId;
                        var s = req.body.appointments;
                        var myObject = eval('(' + s + ')');
                        myObject.forEach(function (item) {
                            console.log(item)
                            item.id = shortid.generate();
                            newAppointmentSet.appointments.push(item);
                        })

                        newAppointmentSet.save((err, newAppointmentSet) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createAppointment', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Appointment', 500, null)
                                reject(apiResponse)
                            } else {
                                let newAppointmentObj = newAppointmentSet.toObject();
                                resolve(newAppointmentObj)
                            }
                        })
                    } else {
                        logger.error('Appointment Cannot Be Created. Appointment Already Present', 'userController: createAppointment', 4)
                        let apiResponse = response.generate(true, 'AppointmentSet Already Present With this UserId', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create appointment function



    createAppointment(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Appointment Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end Appointment create function

let questionCreateFunction = (req, res) => {

    let newQuestionSet;

    let createQuestion = () => {
        return new Promise((resolve, reject) => {
            QuestionModel.findOne({ userId: req.body.userId })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createQuestion', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Question', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        newQuestionSet = new QuestionModel();
                        newQuestionSet.userId = req.body.userId;
                        var s = req.body.questions;
                        var myObject = eval('(' + s + ')');
                        myObject.forEach(function (item) {
                            console.log(item)
                            item.id = shortid.generate();
                            newQuestionSet.questions.push(item);
                        })

                        newQuestionSet.save((err, newQuestionSet) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createQuestion', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Question', 500, null)
                                reject(apiResponse)
                            } else {
                                let newQuestionObj = newQuestionSet.toObject();
                                resolve(newQuestionObj)
                            }
                        })
                    } else {
                        logger.error('Question Cannot Be Created. QuestionSet Already Present', 'userController: createQuestion', 4)
                        let apiResponse = response.generate(true, 'QuestionSet Already Present With this UserId', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create question function



    createQuestion(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Question Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end Question create function

let eventFunction = (req, res) => {

    let newEventSet;

    let createEvent = () => {
        return new Promise((resolve, reject) => {
            EventModel.findOne({ userId: req.body.userId })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createEvent', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Event', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        newEventSet = new EventModel();
                        newEventSet.userId = req.body.userId;
                        var s = req.body.userEvents;
                        var myObject = eval('(' + s + ')');
                        myObject.forEach(function (item) {
                            console.log(item)
                            item.id = shortid.generate();
                            newEventSet.userEvents.push(item);
                        })

                        newEventSet.save((err, newEventSet) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createEvent', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Event', 500, null)
                                reject(apiResponse)
                            } else {
                                let newEventObj = newEventSet.toObject();
                                resolve(newEventObj)
                            }
                        })
                    } else {
                        logger.error('Event Cannot Be Created.EventSet Already Present', 'userController: createEvent', 4)
                        let apiResponse = response.generate(true, 'EventSet Already Present With this UserId', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function



    createEvent(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Event Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user Event create function

let eventAddFunction = (req, res) => {

    //let newEventSet;
    var id = shortid.generate();
    var title = req.body.title;
    var date = req.body.date;
    var place = req.body.place;
    var purpose = req.body.purpose;

    var obj = {}
    obj['id'] = id;
    obj['title'] = title;
    obj['date'] = date;
    obj['place'] = place;
    obj['purpose'] = purpose;
    console.log(req.body);
    console.log(obj);

    EventModel.update({ 'userId': req.body.userId }, { $push: { userEvents: obj } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: eventAddFunction', 10)
            let apiResponse = response.generate(true, 'Failed To add Event', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: eventAddFunction')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Event Details added', 200, result)
            res.send(apiResponse)
        }
    });


}// end user Event create function

let appointmentAddFunction = (req, res) => {

    //let newEventSet;
    var id = shortid.generate();
    var title = req.body.title;
    var date = req.body.date;
    var doctorId = req.body.doctorId;
    var doctorName = req.body.doctorName;
    var patientName = req.body.patientName;

    var obj = {}
    obj['id'] = id;
    obj['title'] = title;
    obj['date'] = date;
    obj['doctorId'] = doctorId;
    obj['doctorName'] = doctorName;
    obj['patientName'] = patientName;
    console.log(req.body);
    console.log(obj);

    AppointmentModel.update({ 'userId': req.body.userId }, { $push: { appointments: obj } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: appointmentAddFunction', 10)
            let apiResponse = response.generate(true, 'Failed To add Appointment', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No AppointmentSet Found', 'User Controller: appointmentAddFunction')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Appointment Details added', 200, result)
            res.send(apiResponse)
        }
    });


}// end user Event create function

let questionAddFunction = (req, res) => {

    //let newEventSet;
    var id = shortid.generate();
    var title = req.body.title;
    var date = req.body.date;
    var answer = req.body.answer;
    var answeredById = req.body.answeredById;
    var answeredByName = req.body.answeredByName;
    var askedByName = req.body.askedByName;

    var obj = {}
    obj['id'] = id;
    obj['title'] = title;
    obj['date'] = date;
    obj['answer'] = answer;
    obj['answeredById'] = answeredById;
    obj['answeredByName'] = answeredByName;
    obj['askedByName'] = askedByName;
    console.log(req.body);
    console.log(obj);

    QuestionModel.update({ 'userId': req.body.userId }, { $push: { questions: obj } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: questionAddFunction', 10)
            let apiResponse = response.generate(true, 'Failed To add Question', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No QuestionSet Found', 'User Controller: questionAddFunction')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Question Details added', 200, result)
            res.send(apiResponse)
        }
    });


}// end user Event create function

// start user signup function 

let signUpFunction = (req, res) => {

    let newUser;

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let name1 = req.body.firstName;
                        let name2 = req.body.lastName;
                        if (name1.endsWith("admin") || name2.endsWith("admin")) {
                            newUser = new UserModel({
                                userId: shortid.generate(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName || '',
                                email: req.body.email.toLowerCase(),
                                mobileNumber: req.body.mobileNumber,
                                password: passwordLib.hashpassword(req.body.password),
                                createdOn: time.now(),
                                isDoctor: req.body.isDoctor,
                                isPremium: req.body.isPremium
                            })
                        }
                        else {
                            newUser = new UserModel({
                                userId: shortid.generate(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName || '',
                                email: req.body.email.toLowerCase(),
                                countryCode: req.body.countryCode,
                                mobileNumber: req.body.mobileNumber,
                                password: passwordLib.hashpassword(req.body.password),
                                createdOn: time.now(),
                                isDoctor: req.body.isDoctor,
                                isPremium: req.body.isPremium
                            })
                        }
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails,
                                expiryTime: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

let mailFunction = (req, res) => {

    let transporter = nodemailer.createTransport({

        service: "hotmail",
        secure: false,
        // port: 25,
        auth: {
            user: "medibuddy2023@outlook.com",
            pass: "Medibuddy#1"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {

        from: '"Medibuddy" <medibuddy2023@outlook.com>',
        to: req.query.email,
        subject: req.body.subject,
        html: req.body.text
    };

    transporter.sendMail(HelperOptions, (error, info) => {

        if (error) {
            return console.log(error);
        }
        else {
            console.log("Message was sent!");
            console.log(info);
            res.send(info);
        }
    });
}

// end of the login function 


/**
 * function to logout user.
 * auth params: userId.
 */
let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
} // end of the logout function.

const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let getTrends = async (req, res) => {
    const id = req.query.woeid;
    const trends = await client.get('trends/place.json', { id });
    let apiResponse = response.generate(false, 'Trends fetched successfully', 200, trends);
    res.send(apiResponse);
}

module.exports = {

    signUpFunction: signUpFunction,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getSingleUser: getSingleUser,
    loginFunction: loginFunction,
    logout: logout,
    eventFunction: eventFunction,
    appointmentCreateFunction: appointmentCreateFunction,
    getSingleUserEvent: getSingleUserEvent,
    getSingleUserAppointment: getSingleUserAppointment,
    getAllNormalUser: getAllNormalUser,
    getAllDoctors: getAllDoctors,
    eventAddFunction: eventAddFunction,
    getSingleEventFromUser: getSingleEventFromUser,
    editSingleEvent: editSingleEvent,
    deleteSingleEvent: deleteSingleEvent,
    getSingleUserEmailId: getSingleUserEmailId,
    mailFunction: mailFunction,
    appointmentAddFunction: appointmentAddFunction,
    deleteSingleAppointment: deleteSingleAppointment,
    editSingleAppointment: editSingleAppointment,
    getAllAppointments: getAllAppointments,
    questionCreateFunction: questionCreateFunction,
    questionAddFunction: questionAddFunction,
    getAllQuestions: getAllQuestions,
    getSingleQuestion: getSingleQuestion,
    deleteSingleQuestion: deleteSingleQuestion,
    editSingleQuestion: editSingleQuestion,
    getTrends: getTrends

}// end exports