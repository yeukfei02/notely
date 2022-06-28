import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTrashsInput {
  @Field()
  users_id: string;
}
