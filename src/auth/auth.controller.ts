import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() { email, password }: { email: string; password: string }) {
        return this.authService.signup(email, password);
    }

    @Post('login')
    async login(@Body() { email, password }: { email: string; password: string }) {

        const user = await this.authService.validateUser(email, password);
        if (user) {
            return this.authService.login(email, password);
        } else {
            return { message: 'Invalid credentials' };
        }

    }
}