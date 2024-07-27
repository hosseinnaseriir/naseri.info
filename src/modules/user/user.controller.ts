import { UserJwtGuard } from '@/guards';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth';

@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(UserJwtGuard)
    @Get('me')
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
