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