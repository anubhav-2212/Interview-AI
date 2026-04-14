import mongoose from "mongoose";

/**
 * -job description schema:String
 * -resume text:String
 * -self description:String
 * 
 * -matchScore:Number
 * 
 * -Technical question ;[{question:"",intent:"",answer:""}]
 * -Behavioral question ;[{question:"",intent:"",answer:""}]
 * -Skill gaps ;[{skill:"",severity:{type:String,enum:["high","medium","low"]
 }}]
 * -Preparation plan;[{day:Number,focus:String,task:[String]}] 
 *  */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intent: {
        type: String,
        required: [true, "Intent is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resumeText: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: [0, "Match score cannot be less than 0"],
        max: [100, "Match score cannot be greater than 100"]
    },

})