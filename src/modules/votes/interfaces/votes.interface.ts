import { Document } from 'mongoose';

export interface Vote extends Document {
  user: string;
  video: string;
  value: number;
}