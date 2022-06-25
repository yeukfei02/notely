import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field()
  name: string;

  @Field()
  users_id: string;
}
