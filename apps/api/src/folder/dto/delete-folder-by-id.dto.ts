import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteFolderByIdInput {
  @Field()
  id: string;

  @Field()
  users_id: string;
}
