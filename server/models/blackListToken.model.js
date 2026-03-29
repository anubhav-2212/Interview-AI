import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
    },
}, { timestamps: true });

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);

export default BlackListToken;