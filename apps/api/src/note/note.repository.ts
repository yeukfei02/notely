import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateNoteByIdInput } from './dto/update-note-by-id.dto';
import { DeleteAllNotesInput } from './dto/delete-all-notes.dto';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(data) {
    const note = await this.prisma.note.create({
      data: data,
      include: {
        users: true,
        folder: true,
      },
    });
    return note;
  }

  async getNotes(where) {
    const notes = await this.prisma.note.findMany({
      where: where,
      orderBy: [
        {
          updated_at: 'desc',
        },
        {
          created_at: 'desc',
        },
      ],
      include: {
        users: true,
        folder: true,
      },
    });
    return notes;
  }

  async getTrashs(where) {
    const trashs = await this.prisma.note.findMany({
      where: where,
      orderBy: [
        {
          updated_at: 'desc',
        },
        {
          created_at: 'desc',
        },
      ],
      include: {
        users: true,
        folder: true,
      },
    });
    return trashs;
  }

  async getGroupByNotes(where) {
    const notes = await this.prisma.note.groupBy({
      by: ['tag'],
      where: where,
      _count: {
        tag: true,
      },
      orderBy: {
        _count: {
          tag: 'desc',
        },
      },
    });
    return notes;
  }

  async getTag(item) {
    const tag = await this.prisma.note.findFirst({
      where: {
        tag: item.tag,
      },
      include: {
        users: true,
        folder: true,
      },
    });
    return tag;
  }

  async getNoteById(id: string) {
    const note = await this.prisma.note.findFirst({
      where: {
        id: id,
        deleted_at: null,
      },
      include: {
        users: true,
        folder: true,
      },
    });
    return note;
  }

  async updateNoteById(where, updateNoteByIdInput: UpdateNoteByIdInput, tag) {
    const notes = await this.prisma.note.updateMany({
      where: where,
      data: {
        content: updateNoteByIdInput.content,
        type: updateNoteByIdInput.type,
        tag: tag,
        folder_id: updateNoteByIdInput.folder_id,
        updated_at: new Date(),
      },
    });
    return notes;
  }

  async updateNoteDeletedAtById(where) {
    const notes = await this.prisma.note.updateMany({
      where: where,
      data: {
        deleted_at: new Date(),
      },
    });
    return notes;
  }

  async deleteNoteById(where) {
    const notes = await this.prisma.note.deleteMany({
      where: where,
    });
    return notes;
  }

  async deleteAllNotes(deleteAllNotesInput: DeleteAllNotesInput) {
    const notes = await this.prisma.note.deleteMany({
      where: {
        id: {
          in: deleteAllNotesInput.ids,
        },
        users_id: deleteAllNotesInput.users_id,
        deleted_at: {
          lte: new Date(),
        },
      },
    });
    return notes;
  }
}
