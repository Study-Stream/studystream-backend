import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) { }

    @Post('/create')
    async addUser(@Res() res, @Body() createCourseDTO: CreateCourseDTO) {
        const course = await this.courseService.createNewCourse(createCourseDTO);
        return res.status(HttpStatus.OK).json({
            message: "Course has been created successfully",
            course
        })
    }
}
