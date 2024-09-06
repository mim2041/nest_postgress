/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(email: string, password: string) {

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            return "User already exists";
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userInfo = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token after successful signup
        const payload = { email: userInfo.email, sub: userInfo.id };
        const accessToken = this.jwtService.sign(payload);

        return { access_token: accessToken };

    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.validateUser(email, password); // Validate credentials first

        // Generate JWT token after successful login
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { access_token: accessToken };
    }
}