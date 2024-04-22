import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    companyName: string;
    password: string;
    id: string
}