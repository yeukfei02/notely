import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [NoteResolver, NoteService, PrismaService],
})
export class NoteModule {}
