import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserResolver, UserService, UserRepository, PrismaService],
})
export class UserModule {}
