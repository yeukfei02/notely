import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.dto';
import { GetNotesInput } from './dto/get-notes.dto';
import { GetTrashsInput } from './dto/get-trashs.dto';
import { GetTagsInput } from './dto/get-tags.dto';
import { UpdateNoteByIdInput } from './dto/update-note-by-id.dto';
import { DeleteNoteByIdInput } from './dto/delete-note-by-id.dto';
import { DeleteAllNotesInput } from './dto/delete-all-notes.dto';
import _ from 'lodash';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(createNoteInput: CreateNoteInput) {
    let note = null;

    if (createNoteInput.content && createNoteInput.users_id) {
      let tag = '';
      if (createNoteInput.type === 'NORMAL_TEXT') {
        tag = createNoteInput.content.includes('#')
          ? createNoteInput.content
              .substring(createNoteInput.content.indexOf('#') + 1)
              .trim()
          : '';
      }

      const data = {
        content: createNoteInput.content,
        type: createNoteInput.type,
        tag: tag,
        users_id: createNoteInput.users_id,
      };
      if (createNoteInput.folder_id) {
        data['folder_id'] = createNoteInput.folder_id;
      }
      console.log('data = ', data);

      note = await this.noteRepository.createNote(data);
    }

    return note;
  }

  async getNotes(getNotesInput: GetNotesInput) {
    const where = {
      users_id: getNotesInput.users_id,
      deleted_at: null,
    };

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
        equals: getNotesInput.tag,
        mode: 'insensitive',
      };
    }

    console.log('where = ', where);

    const notes = await this.noteRepository.getNotes(where);
    return notes;
  }

  async getTrashs(getTrashsInput: GetTrashsInput) {
    const where = {
      users_id: getTrashsInput.users_id,
      deleted_at: {
        lte: new Date(),
      },
    };

    if (getTrashsInput.search_notes_value) {
      where['content'] = {
        contains: getTrashsInput.search_notes_value,
        mode: 'insensitive',
      };
    }

    console.log('where = ', where);

    const trashs = await this.noteRepository.getTrashs(where);
    return trashs;
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

    const notes = await this.noteRepository.getGroupByNotes(where);

    const formattedNotes = [];
    for (let index = 0; index < notes.length; index++) {
      const item: any = notes[index];

      const tag = await this.noteRepository.getTag(item);
      item.id = tag.id;
      item.content = tag.content;
      item.count = item._count.tag || 0;
      item.created_at = tag.created_at;
      item.updated_at = tag.updated_at;
      item.users = tag.users;
      item.folder = tag.folder;

      delete item._count;

      formattedNotes.push(item);
    }

    const sortedNotes = _.orderBy(
      formattedNotes,
      ['count', 'created_at'],
      ['desc', 'asc']
    );

    return sortedNotes;
  }

  async getNoteById(id: string) {
    const note = await this.noteRepository.getNoteById(id);
    return note;
  }

  async updateNoteById(updateNoteByIdInput: UpdateNoteByIdInput) {
    const where = {
      id: updateNoteByIdInput.id,
      users_id: updateNoteByIdInput.users_id,
    };
    console.log('where = ', where);

    let tag = '';
    if (updateNoteByIdInput.type === 'NORMAL_TEXT') {
      tag = updateNoteByIdInput.content.includes('#')
        ? updateNoteByIdInput.content
            .substring(updateNoteByIdInput.content.indexOf('#') + 1)
            .trim()
        : '';
    }

    const notes = await this.noteRepository.updateNoteById(
      where,
      updateNoteByIdInput,
      tag
    );
    return notes;
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

    const notes = await this.noteRepository.updateNoteDeletedAtById(where);
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

    const notes = await this.noteRepository.deleteNoteById(where);
    return notes;
  }

  async hardDeleteAllNotes(deleteAllNotesInput: DeleteAllNotesInput) {
    const notes = await this.noteRepository.deleteAllNotes(deleteAllNotesInput);
    return notes;
  }
}
