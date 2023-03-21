import { Document } from 'mongoose';

export interface Course extends Document {
    readonly course_name: string;
    readonly course_number: string;
    readonly course_description: string;
    readonly join_code: string;
}