import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedSchema } from './schemas/feed.schema';
import { CoursesModule } from '../courses/courses.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Feed', schema: FeedSchema }]),
    CoursesModule
  ],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule { }
