import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTagsInput {
  @Field()
  users_id: string;
}
