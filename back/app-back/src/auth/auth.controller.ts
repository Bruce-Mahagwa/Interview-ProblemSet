import { Body, Controller, Post } from '@nestjs/common';
import { User } from './schema/auth.schema';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("/signup")
    async createNewUser(@Body() authDto: AuthDto): Promise<User> {
        try {
            return this.authService.signupUser(authDto);
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    @Post("/login")
    async loginUser(@Body() authDto: AuthDto) {
        try {
            return this.authService.loginUser(authDto);
        }
        catch(e) {
            console.log(e)
            return e
        }
    }
}
