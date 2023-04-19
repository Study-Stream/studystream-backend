import { Document } from 'mongoose';

export interface Course extends Document {
    course_name: string;
    course_number: string;
    course_description: string;
    join_code: string;
    posts: any;
}