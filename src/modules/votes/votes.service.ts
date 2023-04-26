import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './interfaces/votes.interface';

@Injectable()
export class VotesService {
  constructor(@InjectModel('Vote') private readonly voteModel: Model<Vote>) {}

  async upvote(userId: string, videoId: string): Promise<Vote> {
    const existingVote = await this.voteModel.findOne({
      user: userId,
      video: videoId,
    });
    if (existingVote) {
      if (existingVote.value === 1) {
        // User already upvoted, remove the upvote
        await this.voteModel.deleteOne({ _id: existingVote._id });
        return null;
      } else {
        // Change the downvote to an upvote
        existingVote.value = 1;
        return await existingVote.save();
      }
    } else {
      // Create a new upvote
      const newVote = new this.voteModel({
        user: userId,
        video: videoId,
        value: 1,
      });
      return await newVote.save();
    }
  }

  async downvote(userId: string, videoId: string): Promise<Vote> {
    const existingVote = await this.voteModel.findOne({
      user: userId,
      video: videoId,
    });
    if (existingVote) {
      if (existingVote.value === -1) {
        // User already downvoted, remove the downvote
        await this.voteModel.deleteOne({ _id: existingVote._id });
        return null;
      } else {
        // Change the upvote to a downvote
        existingVote.value = -1;
        return await existingVote.save();
      }
    } else {
      // Create a new downvote
      const newVote = new this.voteModel({
        user: userId,
        video: videoId,
        value: -1,
      });
      return await newVote.save();
    }
  }

  async getTotalVotes(videoId: string): Promise<number> {
    const votes = await this.voteModel.find({ video: videoId });
    return votes.reduce((total, vote) => total + vote.value, 0);
  }
}
