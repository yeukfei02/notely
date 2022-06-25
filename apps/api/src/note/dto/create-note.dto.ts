import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  content: string;

  @Field()
  users_id: string;

  @Field()
  folder_id: string;
}
