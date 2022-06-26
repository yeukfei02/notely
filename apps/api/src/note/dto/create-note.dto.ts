import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateNoteInput {
  @Field()
  content: string;

  @Field()
  users_id: string;

  @Field({ nullable: true })
  @IsOptional()
  folder_id?: string;
}
