import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CreatePostDto } from "./dto/create-post.dto";
import { Course } from './interfaces/course.interface';


@Injectable()
export class CoursesService {
    constructor(
        @InjectModel('Courses') private readonly courseModel: Model<Course>,
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    ){}

    async create(createCourseDto: any): Promise<any> {
        console.log('Create course DTO: ' + JSON.stringify(createCourseDto));
        // Generate a join code for the course that has not been used before (unique). They are 6 alphanumeric characters
        let joinCode = '';
        let isValidJoinCode = false;
        while (!isValidJoinCode) {
            joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            console.log('Join code: ' + joinCode);
            const courseWithSameJoinCode = await this.courseModel.findOne({ join_code: joinCode }).exec();
            if (!courseWithSameJoinCode) {
                isValidJoinCode = true;
            }
        }
        createCourseDto.join_code = joinCode;

        const course = new this.courseModel(createCourseDto);
        return course.save();
    }

    async addPost(courseId: string, createPostDto: any): Promise<any> {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with ID "${courseId}" not found`);
        }

        const user = await this.usersService.getUserById(createPostDto.userId);
        if (!user) {
            throw new NotFoundException(`User with ID "${createPostDto.userId}" not found`);
        }

        // add createdAt to the createPostDto object
        createPostDto.createdAt = new Date();

        course.posts.push(createPostDto);
        await course.save();

        return createPostDto;
    }

    async getCourseVideo(videoId: string): Promise<any> {
        console.log('Video ID: ' + videoId);
        const ytdl = require('ytdl-core');

        async function getMP4Url(videoId) {
            try {
                const info = await ytdl.getInfo(videoId);
                const formats = info.formats;
                const mp4Formats = formats.filter((format) => format.container === 'mp4' && format.hasVideo && format.hasAudio);

                if (mp4Formats.length > 0) {
                    // Choose the first available MP4 format
                    return mp4Formats[0].url;
                } else {
                    console.error('No MP4 format available.');
                    return null;
                }
            } catch (error) {
                console.error('Error getting video info:', error);
                return null;
            }
        }

        const url = await getMP4Url(videoId);

        console.log('URL: ' + url);

        return url;
    }

    async findOne(id: string): Promise<any> {
        const course = await this.courseModel.findById(id).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID "${id}" not found`);
        }
        return course;
    }

    async getCoursesByCourseIds(courseIds: string[]): Promise<any[]> {
        const courses = await this.courseModel.find({ _id: { $in: courseIds } }).exec();
        return courses;
    }
    // get a course by join code
    async getCourseByJoinCode(joinCode: string): Promise<any> {
        const course = await this.courseModel.findOne({ join_code: joinCode }).exec();
        return course;
    }
}
