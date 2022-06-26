import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetNotesInput {
  @Field()
  users_id: string;
}
