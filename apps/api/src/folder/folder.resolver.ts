import { Resolver, Mutation, Query, Args, Context, Int } from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder } from './model/folder.model';
import { CreateFolderInput } from './dto/create-folder.dto';
import { GetFoldersInput } from './dto/get-folders.dto';
import { UpdateFolderByIdInput } from './dto/update-folder-by-id.dto';
import { DeleteFolderByIdInput } from './dto/delete-folder-by-id.dto';
import { authorize } from '../helpers/helpers';

@Resolver()
export class FolderResolver {
  constructor(private readonly folderService: FolderService) {}

  @Mutation(() => Folder)
  async createFolder(
    @Args('input') createFolderInput: CreateFolderInput,
    @Context() context
  ): Promise<Folder> {
    const authorizeStatus = authorize(context.token);

    let folder = null;

    if (authorizeStatus) {
      folder = await this.folderService.createFolder(createFolderInput);
    }

    return folder;
  }

  @Query(() => [Folder], { nullable: true })
  async folders(
    @Args('input') getFoldersInput: GetFoldersInput,
    @Context() context
  ): Promise<Folder[]> {
    const authorizeStatus = authorize(context.token);

    let folders = [];

    if (authorizeStatus) {
      folders = await this.folderService.getFolders(getFoldersInput);
    }

    return folders;
  }

  @Query(() => Folder, { nullable: true })
  async folder(@Args('id') id: string, @Context() context): Promise<Folder> {
    const authorizeStatus = authorize(context.token);

    let folder = null;

    if (authorizeStatus) {
      folder = await this.folderService.getFolderById(id);
    }

    return folder;
  }

  @Mutation(() => Int)
  async updateFolderById(
    @Args('input') updateFolderByIdInput: UpdateFolderByIdInput,
    @Context() context
  ): Promise<number> {
    const authorizeStatus = authorize(context.token);

    let folders = null;

    if (authorizeStatus) {
      folders = await this.folderService.updateFolderById(
        updateFolderByIdInput
      );
    }

    console.log('folders = ', folders);

    let result = 0;
    if (folders && folders.count > 0) {
      result = folders.count;
    }

    return result;
  }

  @Mutation(() => Int)
  async deleteFolderById(
    @Args('input') deleteFolderByIdInput: DeleteFolderByIdInput,
    @Context() context
  ): Promise<number> {
    const authorizeStatus = authorize(context.token);

    let folders = null;

    if (authorizeStatus) {
      folders = await this.folderService.deleteFolderById(
        deleteFolderByIdInput
      );
    }

    console.log('folders = ', folders);

    let result = 0;
    if (folders && folders.count > 0) {
      result = folders.count;
    }

    return result;
  }
}
