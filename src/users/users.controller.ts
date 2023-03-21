import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get('/health')
    getHello(): string {
        return 'Users Service is running!';
    }

    // Create a Post method to create a new user 
    @Post('/create')
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request'
            });
        }
    }


    // Create a Get method to get all users

    // Create a Get method to get a user by id

    // Create a Put method to update a user by id

    // Create a Delete method to delete a user by id



}
