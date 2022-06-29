import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';
import { Folder } from '../../folder/model/folder.model';

@ObjectType()
export class Tag {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  tag: string;

  @Field(() => Int)
  count: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => User, { nullable: true })
  users?: User;

  @Field(() => Folder, { nullable: true })
  folder?: Folder;
}
