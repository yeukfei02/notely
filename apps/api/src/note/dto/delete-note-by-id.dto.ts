import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteNoteByIdInput {
  @Field()
  id: string;

  @Field()
  users_id: string;
}
