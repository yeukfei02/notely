import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNoteInput } from './dto/create-note.dto';
import { GetNotesInput } from './dto/get-notes.dto';
import { GetTrashsInput } from './dto/get-trashs.dto';
import { UpdateNoteByIdInput } from './dto/update-note-by-id.dto';
import { DeleteNoteByIdInput } from './dto/delete-note-by-id.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(createNoteInput: CreateNoteInput) {
    let note = null;

    if (createNoteInput.content && createNoteInput.users_id) {
      const data = {
        content: createNoteInput.content,
        users_id: createNoteInput.users_id,
      };
      if (createNoteInput.folder_id) {
        data['folder_id'] = createNoteInput.folder_id;
      }
      console.log('data = ', data);

      note = await this.prisma.note.create({
        data: data,
        include: {
          users: true,
          folder: true,
        },
      });
    }

    return note;
  }

  async getNotes(getNotesInput: GetNotesInput) {
    const where = {
      users_id: getNotesInput.users_id,
    };

    if (getNotesInput.type) {
      if (getNotesInput.type === 'notes') {
        where['deleted_at'] = null;
      } else if (getNotesInput.type === 'trash') {
        where['deleted_at'] = {
          lte: new Date(),
        };
      }
    } else {
      where['deleted_at'] = null;
    }

    if (getNotesInput.folder_id) {
      where['folder_id'] = getNotesInput.folder_id;
    }

    if (getNotesInput.search_notes_value) {
      where['content'] = {
        contains: getNotesInput.search_notes_value,
        mode: 'insensitive',
      };
    }
    console.log('where = ', where);

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

  async getTrashs(getTrashsInput: GetTrashsInput) {
    const where = {
      users_id: getTrashsInput.users_id,
      deleted_at: {
        lte: new Date(),
      },
    };
    console.log('where = ', where);

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

  async updateNoteById(updateNoteByIdInput: UpdateNoteByIdInput) {
    const where = {
      id: updateNoteByIdInput.id,
      users_id: updateNoteByIdInput.users_id,
    };
    console.log('where = ', where);

    const note = await this.prisma.note.updateMany({
      where: where,
      data: {
        content: updateNoteByIdInput.content,
        folder_id: updateNoteByIdInput.folder_id,
        updated_at: new Date(),
      },
    });
    return note;
  }

  async deleteNoteById(deleteNoteByIdInput: DeleteNoteByIdInput) {
    const where = {
      id: deleteNoteByIdInput.id,
      users_id: deleteNoteByIdInput.users_id,
    };
    if (deleteNoteByIdInput.folder_id) {
      where['folder_id'] = deleteNoteByIdInput.folder_id;
    }
    console.log('where = ', where);

    const notes = await this.prisma.note.updateMany({
      where: where,
      data: {
        deleted_at: new Date(),
      },
    });
    return notes;
  }

  async hardDeleteNoteById(deleteNoteByIdInput: DeleteNoteByIdInput) {
    const where = {
      id: deleteNoteByIdInput.id,
      users_id: deleteNoteByIdInput.users_id,
      deleted_at: {
        lte: new Date(),
      },
    };
    if (deleteNoteByIdInput.folder_id) {
      where['folder_id'] = deleteNoteByIdInput.folder_id;
    }
    console.log('where = ', where);

    const notes = await this.prisma.note.deleteMany({
      where: where,
    });
    return notes;
  }
}
