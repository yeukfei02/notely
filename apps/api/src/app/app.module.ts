import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '../user/user.module';
import { FolderModule } from '../folder/folder.module';
import { NoteModule } from '../note/note.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/api/src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => {
        const data = {
          token: req.headers.authorization
            ? req.headers.authorization.replace('Bearer ', '').trim()
            : '',
        };
        return data;
      },
    }),
    UserModule,
    FolderModule,
    NoteModule,
  ],
})
export class AppModule {}
