import { Module } from '@nestjs/common';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';
import { PrismaService } from '../prisma.service';
import { FolderRepository } from './folder.repository';

@Module({
  providers: [FolderResolver, FolderService, FolderRepository, PrismaService],
})
export class FolderModule {}
