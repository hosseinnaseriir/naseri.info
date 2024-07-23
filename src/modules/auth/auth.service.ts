import { LoginPayload, RegisterPayload, User } from '@/entities';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async registerUser(registerPayload: RegisterPayload) {
        const existingUser = await this.usersRepository.findOneBy({ username: registerPayload.username })
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const hashedPassword = await bcrypt.hash(registerPayload.password, 10);
        const user = this.usersRepository.create({
            username: registerPayload.username,
            fullName: registerPayload.fullName,
            password: hashedPassword,
            phoneNumber: registerPayload.phoneNumber,
            dateOfBirth: registerPayload.dateOfBirth,
        })
        await this.usersRepository.save(user);
        return user;
    }


    async validateUser(loginPayload: LoginPayload) {
        const { username, password } = loginPayload;
        const user = await this.usersRepository.findOneBy({ username });
        console.log(user);
        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match');
        }
        if (user) return user;
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    async generateJwtToken(user: User) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
