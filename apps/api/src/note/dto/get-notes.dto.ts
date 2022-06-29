import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class GetNotesInput {
  @Field()
  users_id: string;

  @Field({ nullable: true })
  @IsOptional()
  folder_id?: string;

  @Field({ nullable: true })
  @IsOptional()
  search_notes_value?: string;

  @Field({ nullable: true })
  @IsOptional()
  tag?: string;

  @Field({ nullable: true })
  @IsOptional()
  type?: string;
}
