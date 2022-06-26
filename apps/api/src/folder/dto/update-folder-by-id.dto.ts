import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFolderByIdInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  users_id: string;
}
