import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignupInput } from './dto/signup.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupInput: SignupInput, hashPassword: string) {
    const user = await this.prisma.users.create({
      data: {
        email: signupInput.email,
        password: hashPassword,
      },
      include: {
        folders: true,
        notes: true,
      },
    });
    return user;
  }

  async getUsers() {
    const users = await this.prisma.users.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        folders: true,
        notes: true,
      },
    });
    return users;
  }

  async getUserByEmails(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
}
