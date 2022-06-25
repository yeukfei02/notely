import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './model/note.model';
import { CreateNoteInput } from './dto/create-note.dto';
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
  async notes(@Context() context): Promise<Note[]> {
    const authorizeStatus = authorize(context.token);

    let notes = [];

    if (authorizeStatus) {
      notes = await this.noteService.getNotes();
    }

    return notes;
  }
}
