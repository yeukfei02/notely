import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetFoldersInput {
  @Field()
  users_id: string;
}
