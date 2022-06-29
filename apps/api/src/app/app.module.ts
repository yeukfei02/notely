import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '../user/user.module';
import { FolderModule } from '../folder/folder.module';
import { NoteModule } from '../note/note.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RavenModule } from 'nest-raven';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      persistedQueries: false,
    }),
    UserModule,
    FolderModule,
    NoteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web'),
      exclude: ['/api*'],
    }),
    RavenModule,
  ],
})
export class AppModule {}
