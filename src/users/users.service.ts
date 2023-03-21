import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private usersModel:Model<IUsers>) { }

    async createUser(createUserDto: any): Promise<IUsers> {
        const createdUser = new this.usersModel(createUserDto);
        return await createdUser.save();
    }


}
