import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import users schema
import { UsersSchema } from './users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

const password = 'suhdyq-faffo0-kEnjix';
const mongodbUrl = `mongodb+srv://studystreamAdmin:${password}@cluster0.v6auelk.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [UsersModule, MongooseModule.forRoot(mongodbUrl), MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
