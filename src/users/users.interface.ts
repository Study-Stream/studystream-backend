import { Document } from 'mongoose';
export interface IUsers extends Document{
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}