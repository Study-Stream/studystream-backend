import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Post('/create')
  async createCourse(@Res() res, @Body() createCourseDto: any) {
    const course = await this.courseService.create(createCourseDto);
    return res.status(HttpStatus.OK).json({
      message: 'Course has been created successfully',
      course,
    });
  }

  @Get('/video')
  async getVideoUrl(@Res() res, @Query('url') url: string) {
    const extractVideoId = (url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v');
    };

    const video = await this.courseService.getCourseVideo(extractVideoId(url));
    return res.status(HttpStatus.OK).json({
      message: 'Video has been fetched successfully',
      video,
    });
  }

  @Post('/add-post')
  async addPostToCourse(
    @Res() res,
    @Body() createPostDto: any,
    @Query('courseId') courseId: string,
  ) {
    console.log("Course ID: " + courseId);
    const post = await this.courseService.addPost(courseId, createPostDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been added to course successfully',
      course: post,
    });
  }

  @Post('/vote-post')
  async votePost(
    @Res() res,
    @Body() body: any
  ) {
    const { courseId, postId, userId, vote } = body;
    const post = await this.courseService.votePost(courseId, postId, userId, vote);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been voted on successfully',
      post,
    });
  }

  @Post('/getCourses')
  async getCoursesByCourseIds(@Res() res, @Body() body: any) {
    const { courseIds } = body;
    const courses = await this.courseService.getCoursesByCourseIds(courseIds);
    return res.status(HttpStatus.OK).json({
      message: 'Courses have been fetched successfully',
      courses,
    });
  }

  @Get('/:id')
  async getCourse(@Res() res, @Param('id') id: string) {
    try {
      const course = await this.courseService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Course has been fetched successfully',
        course,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: err.message,
        });
      }
      throw err;
    }
  }

  @Get(':id/posts')
async getCoursePosts(@Param('id') id: string): Promise<any> {
  const course = await this.courseService.findOne(id);
  if (!course) {
    throw new NotFoundException(`Course with ID "${id}" not found`);
  }

  const posts = course.posts.sort((a, b) => b.createdAt - a.createdAt);
  return posts;
}

}
