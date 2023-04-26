import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    // add a user
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.usersService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    // get a user by email
    @Get('/')
    async getUser(@Res() res, @Query('email') email) {
        const user = await this.usersService.getUser(email);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    // join a course
    @Put('/join')
    async joinCourse(@Res() res, @Query('email') email, @Query('joinCode') joinCode) {
        const user = await this.usersService.joinCourse(email, joinCode);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has joined the course successfully',
            user
        });
    }

    @Get('/posts')
    async getPostsfromCourses(@Res() res, @Query('email') email) {
        const user = await this.usersService.getPostsfromCourses(email);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    // delete course from user
    @Delete('/course/delete')
    async deleteCourse(@Res() res, @Query('email') email, @Query('courseId') courseId) {
        const user = await this.usersService.deleteCourse(email, courseId);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Course has been deleted successfully',
            user
        })
    }


    
}
