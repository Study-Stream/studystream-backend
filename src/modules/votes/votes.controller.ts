import { Controller, Param, Post } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote } from './interfaces/votes.interface';

@Controller('votes')
export class VotesController {
    constructor(private readonly votesService: VotesService) {}

  // upvote
    @Post('upvote/:userId/:videoId')
  async upvote(
    @Param('userId') userId: string,
    @Param('videoId') videoId: string,
  ): Promise<Vote> {
      return await this.votesService.upvote(userId, videoId);
    }

  //  downvote
    @Post('downvote/:userId/:videoId')
  async downvote(
    @Param('userId') userId: string,
    @Param('videoId') videoId: string,
  ): Promise<Vote> {
    return await this.votesService.downvote(userId, videoId);
    }
  
    // total votes by the video ID
    @Get('total/:videoId')
    async getTotalVotes(@Param('videoId') videoId: string): Promise<number> {
    return await this.votesService.getTotalVotes(videoId);
    }
}
