import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Folder } from '../../folder/model/folder.model';

@ObjectType()
export class Note {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => User, { nullable: true })
  users?: User;

  @Field(() => Folder, { nullable: true })
  folder?: Folder;
}
