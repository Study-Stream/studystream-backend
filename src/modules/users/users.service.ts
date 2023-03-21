import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create-users.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private readonly usersModel: Model<User>) { }

    // create a new user
    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.usersModel(createUserDTO);
        return newUser.save();
    }

}
