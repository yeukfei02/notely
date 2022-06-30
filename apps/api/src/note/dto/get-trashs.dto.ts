import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class GetTrashsInput {
  @Field()
  users_id: string;

  @Field({ nullable: true })
  @IsOptional()
  search_notes_value?: string;
}
