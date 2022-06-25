import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Login {
  @Field()
  users: User;

  @Field()
  users_id: string;

  @Field()
  token: string;
}
