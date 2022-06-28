import { Resolver, Mutation, Query, Args, Context, Int } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './model/note.model';
import { CreateNoteInput } from './dto/create-note.dto';
import { GetNotesInput } from './dto/get-notes.dto';
import { GetTrashsInput } from './dto/get-trashs.dto';
import { UpdateNoteByIdInput } from './dto/update-note-by-id.dto';
import { DeleteNoteByIdInput } from './dto/delete-note-by-id.dto';
import { authorize } from '../helpers/helpers';

@Resolver()
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  async createNote(
    @Args('input') createNoteInput: CreateNoteInput,
    @Context() context
  ): Promise<Note> {
    const authorizeStatus = authorize(context.token);

    let note = null;

    if (authorizeStatus) {
      note = await this.noteService.createNote(createNoteInput);
    }

    return note;
  }

  @Query(() => [Note], { nullable: true })
  async notes(
    @Args('input') getNotesInput: GetNotesInput,
    @Context() context
  ): Promise<Note[]> {
    const authorizeStatus = authorize(context.token);

    let notes = [];

    if (authorizeStatus) {
      notes = await this.noteService.getNotes(getNotesInput);
    }

    return notes;
  }

  @Query(() => [Note], { nullable: true })
  async trashs(
    @Args('input') getTrashsInput: GetTrashsInput,
    @Context() context
  ): Promise<Note[]> {
    const authorizeStatus = authorize(context.token);

    let notes = [];

    if (authorizeStatus) {
      notes = await this.noteService.getTrashs(getTrashsInput);
    }

    return notes;
  }

  @Query(() => Note, { nullable: true })
  async note(@Args('id') id: string, @Context() context): Promise<Note> {
    const authorizeStatus = authorize(context.token);

    let note = null;

    if (authorizeStatus) {
      note = await this.noteService.getNoteById(id);
    }

    return note;
  }

  @Mutation(() => Int)
  async updateNoteById(
    @Args('input') updateNoteByIdInput: UpdateNoteByIdInput,
    @Context() context
  ): Promise<number> {
    const authorizeStatus = authorize(context.token);

    let notes = null;

    if (authorizeStatus) {
      notes = await this.noteService.updateNoteById(updateNoteByIdInput);
    }

    console.log('notes = ', notes);

    let result = 0;
    if (notes && notes.count > 0) {
      result = notes.count;
    }

    return result;
  }

  @Mutation(() => Int)
  async deleteNoteById(
    @Args('input') deleteNoteByIdInput: DeleteNoteByIdInput,
    @Context() context
  ): Promise<number> {
    const authorizeStatus = authorize(context.token);

    let notes = null;

    if (authorizeStatus) {
      notes = await this.noteService.deleteNoteById(deleteNoteByIdInput);
    }

    console.log('notes = ', notes);

    let result = 0;
    if (notes && notes.count > 0) {
      result = notes.count;
    }

    return result;
  }

  @Mutation(() => Int)
  async hardDeleteNoteById(
    @Args('input') deleteNoteByIdInput: DeleteNoteByIdInput,
    @Context() context
  ): Promise<number> {
    const authorizeStatus = authorize(context.token);

    let notes = null;

    if (authorizeStatus) {
      notes = await this.noteService.hardDeleteNoteById(deleteNoteByIdInput);
    }

    console.log('notes = ', notes);

    let result = 0;
    if (notes && notes.count > 0) {
      result = notes.count;
    }

    return result;
  }
}
