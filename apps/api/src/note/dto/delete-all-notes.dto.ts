import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteAllNotesInput {
  @Field(() => [String])
  ids: string[];

  @Field()
  users_id: string;
}
