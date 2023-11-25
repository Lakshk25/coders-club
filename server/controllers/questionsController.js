const ArrayQues = require("../models/ArrayQues");
const LinkedListQues = require("../models/LinkedListQues");

const { success, failure } = require("../utils/responseWrapper");

const createQuestion = async (req, res) => {
    try {
        const { question, type } = req.body;
        if (!question) {
            return res.send(failure(400, "Question is required"));
        }
        const owner = req._id;

        let questionData;

        switch (type.toLowerCase()) {
            case 'arrayques':
                questionData = await ArrayQues.create({ owner, question });
                break;
            case 'llques':
                questionData = await LinkedListQues.create({ owner, question });
                break;
            default:
                return res.send(failure(400, "Invalid question type"));
        }

        return res.send(success(201, questionData));
    } catch (error) {
        return res.send(failure(500, error));
    }
}

const questionUpdate = async (ques, status, userCode, notes) => {
    if (status) {
        ques.status = status;
    }
    if (notes) {
        ques.notes = notes;
    }
    if (userCode) {
        ques.userCode.language = userCode.language;
        ques.userCode.code = userCode.code;
    }
    await ques.save();
    return ques;
}

const updateQuestion = async (req, res) => {
    try {
        const { quesId, type, status, userCode, notes } = req.body;
        if (!quesId) {
            return res.send(failure(400, "Question Id is required"));
        }
        let questionData;
        let response;
        switch (type.toLowerCase()) {
            case 'arrayques':
                questionData = await ArrayQues.findById(quesId);
                response = await questionUpdate(questionData, status, userCode, notes);
                break
            case 'llques':
                questionData = await LinkedListQues.findById(quesId);
                response = await questionUpdate(questionData, status, userCode, notes);
                break;
            default:
                return res.send(failure(400, "Invalid question type"));
        }
        return res.send(success(200, response));
    } catch (error) {
        return res.send(failure(500, error));
    }
}

const getAllQuestion = async (req, res) => {
    let questions;
    try{
        const user = req._id;
        const arrayQuestions = await ArrayQues.find({
            owner: user
        })
        const lLQuestions = await LinkedListQues.find({
            owner: user
        })
        return res.send(success(200, {...questions, arrayQuestions, lLQuestions}));
    }catch(error){
        return res.send(failure(501, error));
    }
    
}

module.exports = {
    createQuestion,
    updateQuestion,
    getAllQuestion
}