import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create-users.dto';
import { CoursesService } from '../courses/courses.service';
@Injectable()
export class FeedService {

    constructor(@InjectModel('Feed') private readonly feedModel: Model<User>) { }
}
