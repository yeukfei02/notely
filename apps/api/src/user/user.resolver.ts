import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { Login } from './model/login.model';
import { SignupInput } from './dto/signup.dto';
import { LoginInput } from './dto/login.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signup(@Args('input') signupInput: SignupInput): Promise<User> {
    const user = await this.userService.createUser(signupInput);
    return user;
  }

  @Mutation(() => Login)
  async login(@Args('input') loginInput: LoginInput): Promise<Login> {
    let data = {
      users: null,
      users_id: '',
      token: '',
    };

    const user = await this.userService.getUserByEmail(loginInput.email);
    if (user) {
      const isPasswordValid = bcrypt.compareSync(
        loginInput.password,
        user.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d',
          }
        );

        data = {
          users: user,
          users_id: user.id,
          token: token,
        };
      }
    }

    return data;
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    const users = await this.userService.getUsers();
    return users;
  }
}
