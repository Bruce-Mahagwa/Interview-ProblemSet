import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async signupUser(data: AuthDto) {
        const newUser = new this.userModel(data);
        await newUser.save();
        return newUser;
    }

    async loginUser(data: AuthDto) {
        console.log(data, "data")
        const res = await this.userModel.find({ email: data.email }).exec();
        if (res) {
            return { message: "authenticated", payload: res }
        }
        return { message: "unauthenticated" };
    }
}
