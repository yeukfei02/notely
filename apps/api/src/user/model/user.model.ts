import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
