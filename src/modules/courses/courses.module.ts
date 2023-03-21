import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Courses', schema: CourseSchema }])
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
