import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    }
})

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, " Username is required "],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, " email is required "],
        unique: true,
        match: [/.+\@.+\..+/, "please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, " password is required "]
    },
    verifyCode: {
        type: String,
        required: [true, " verify code is required "]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, " verify code expiry is required "]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]

})
