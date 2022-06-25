import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNoteInput } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(createNoteInput: CreateNoteInput) {
    let note = null;

    if (
      createNoteInput.content &&
      createNoteInput.users_id &&
      createNoteInput.folder_id
    ) {
      note = await this.prisma.note.create({
        data: {
          content: createNoteInput.content,
          users_id: createNoteInput.users_id,
          folder_id: createNoteInput.folder_id,
        },
        include: {
          users: true,
          folder: true,
        },
      });
    }

    return note;
  }

  async getNotes() {
    const notes = await this.prisma.note.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        users: true,
        folder: true,
      },
    });
    return notes;
  }
}
