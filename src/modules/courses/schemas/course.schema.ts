import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    course_name: String,
    course_number: String,
    course_description: String,
    join_code: String,
})