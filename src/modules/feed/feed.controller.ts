import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateUserDTO } from './dto/create-users.dto';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}
}
