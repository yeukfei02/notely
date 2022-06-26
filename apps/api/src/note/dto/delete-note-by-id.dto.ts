import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class DeleteNoteByIdInput {
  @Field()
  id: string;

  @Field()
  users_id: string;

  @Field({ nullable: true })
  @IsOptional()
  folder_id?: string;
}
