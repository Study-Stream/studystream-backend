import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    email: String,
    courses: [String]
})