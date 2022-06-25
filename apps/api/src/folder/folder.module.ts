import { Module } from '@nestjs/common';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FolderResolver, FolderService, PrismaService],
})
export class FolderModule {}
