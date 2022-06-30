import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateNoteByIdInput {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  type: string;

  @Field()
  users_id: string;

  @Field({ nullable: true })
  @IsOptional()
  folder_id?: string;
}
