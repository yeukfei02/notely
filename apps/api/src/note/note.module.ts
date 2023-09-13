import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';
import { PrismaService } from '../prisma.service';
import { NoteRepository } from './note.repository';

@Module({
  providers: [NoteResolver, NoteService, NoteRepository, PrismaService],
})
export class NoteModule {}
