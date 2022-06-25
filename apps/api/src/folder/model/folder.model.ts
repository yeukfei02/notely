import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Note } from '../../note/model/note.model';

@ObjectType()
export class Folder {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => User, { nullable: true })
  users?: User;

  @Field(() => [Note], { nullable: true })
  notes?: Note[];
}
