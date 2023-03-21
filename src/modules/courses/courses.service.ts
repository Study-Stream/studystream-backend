import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

    constructor(@InjectModel('Courses') private readonly courseModel: Model<Course>) { }

    // create a new course
    async createNewCourse(createCourseDTO: CreateCourseDTO): Promise<Course> {
        const newCourse = new this.courseModel(createCourseDTO);
        return newCourse.save();
    }
}
