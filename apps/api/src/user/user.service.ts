import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcryptjs';
import { SignupInput } from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupInput: SignupInput) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(signupInput.password, salt);

    const user = await this.prisma.users.create({
      data: {
        email: signupInput.email,
        password: hashPassword,
      },
    });
    return user;
  }

  async getUsers() {
    const users = await this.prisma.users.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
}
