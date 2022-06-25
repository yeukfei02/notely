import { Test, TestingModule } from '@nestjs/testing';
import { NoteResolver } from './note.resolver';

describe('NoteResolver', () => {
  let resolver: NoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteResolver],
    }).compile();

    resolver = module.get<NoteResolver>(NoteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
