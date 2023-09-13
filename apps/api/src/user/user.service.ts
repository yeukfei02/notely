import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { SignupInput } from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(signupInput: SignupInput) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(signupInput.password, salt);

    let user = null;

    if (signupInput.email && hashPassword) {
      user = await this.userRepository.createUser(signupInput, hashPassword);
    }

    return user;
  }

  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmails(email);
    return user;
  }
}
