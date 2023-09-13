import { Injectable } from '@nestjs/common';
import { CreateFolderInput } from './dto/create-folder.dto';
import { GetFoldersInput } from './dto/get-folders.dto';
import { UpdateFolderByIdInput } from './dto/update-folder-by-id.dto';
import { DeleteFolderByIdInput } from './dto/delete-folder-by-id.dto';
import _ from 'lodash';
import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  async createFolder(createFolderInput: CreateFolderInput) {
    let folder = null;

    if (createFolderInput.name && createFolderInput.users_id) {
      folder = await this.folderRepository.createFolder(createFolderInput);
    }

    return folder;
  }

  async getFolders(getFolderInput: GetFoldersInput) {
    const folders = await this.folderRepository.getFolders(getFolderInput);

    const sortedFolders = _.orderBy(
      folders,
      ['notes', 'created_at'],
      ['desc', 'asc']
    );

    return sortedFolders;
  }

  async getFolderById(id: string) {
    const folder = await this.folderRepository.getFolderById(id);
    return folder;
  }

  async updateFolderById(updateFolderByIdInput: UpdateFolderByIdInput) {
    const folders = await this.folderRepository.updateFolderById(
      updateFolderByIdInput
    );
    return folders;
  }

  async deleteFolderById(deleteFolderByIdInput: DeleteFolderByIdInput) {
    const folders = await this.folderRepository.deleteFolderById(
      deleteFolderByIdInput
    );
    return folders;
  }
}
