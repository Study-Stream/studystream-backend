import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customer/customer.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { FeedModule } from './modules/feed/feed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://studystreamAdmin:0hJQQYpsVxcWiPUw@cluster0.v6auelk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }),
    CoursesModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
