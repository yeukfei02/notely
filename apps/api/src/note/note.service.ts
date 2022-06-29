import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNoteInput } from './dto/create-note.dto';
import { GetNotesInput } from './dto/get-notes.dto';
import { GetTrashsInput } from './dto/get-trashs.dto';
import { GetTagsInput } from './dto/get-tags.dto';
import { UpdateNoteByIdInput } from './dto/update-note-by-id.dto';
import { DeleteNoteByIdInput } from './dto/delete-note-by-id.dto';
import { DeleteAllNotesInput } from './dto/delete-all-notes.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(createNoteInput: CreateNoteInput) {
    let note = null;

    if (createNoteInput.content && createNoteInput.users_id) {
      const data = {
        content: createNoteInput.content,
        tag: createNoteInput.content.includes('#')
          ? createNoteInput.content
              .substring(createNoteInput.content.indexOf('#') + 1)
              .trim()
          : '',
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

    if (getNotesInput.tag) {
      where['tag'] = {
        contains: getNotesInput.tag,
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

  async getTags(getTagsInput: GetTagsInput) {
    const where = {
      users_id: getTagsInput.users_id,
      tag: {
        not: '',
      },
      deleted_at: null,
    };
    console.log('where = ', where);

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

    const formattedNotes = [];
    for (let index = 0; index < notes.length; index++) {
      const item: any = notes[index];

      const note = await this.prisma.note.findFirst({
        where: {
          tag: item.tag,
        },
        include: {
          users: true,
          folder: true,
        },
      });
      item.id = note.id;
      item.content = note.content;
      item.count = item._count.tag || 0;
      item.created_at = note.created_at;
      item.updated_at = note.updated_at;
      item.users = note.users;
      item.folder = note.folder;

      delete item._count;

      formattedNotes.push(item);
    }

    return formattedNotes;
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
        tag: updateNoteByIdInput.content.includes('#')
          ? updateNoteByIdInput.content
              .substring(updateNoteByIdInput.content.indexOf('#') + 1)
              .trim()
          : '',
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

  async hardDeleteAllNotes(deleteAllNotesInput: DeleteAllNotesInput) {
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
