import { Field, ObjectType } from '@nestjs/graphql';
import { Folder } from '../../folder/model/folder.model';
import { Note } from '../../note/model/note.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => [Folder], { nullable: true })
  folders?: Folder[];

  @Field(() => [Note], { nullable: true })
  notes?: Note[];
}
