import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create-users.dto';
import { CoursesService } from '../courses/courses.service';
@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private readonly usersModel: Model<User>, private courseService: CoursesService) { }

    // create a new user
    async addUser(createUserDTO: CreateUserDTO): Promise<any> {
        const newUser = new this.usersModel(createUserDTO);
        return newUser.save();
    }

    // get a user by email
    async getUser(email: string): Promise<any> {
        const user = await this.usersModel.findOne({ email }).exec();
        return user;
    }

       // get a user by id
       async getUserById(id: string): Promise<any> {
        const user = await this.usersModel.findOne({ id }).exec();
        return user;
    }
        
    // join a course
    async joinCourse(email: string, joinCode: string): Promise<any> {
        // get the course id from the join code 
        const courseId = await this.courseService.getCourseByJoinCode(joinCode);
        const userNewCourse = await this.usersModel.findOneAndUpdate({ email }, { $push: { courses: courseId._id } }, { new: true });
        return userNewCourse;
    }

}
