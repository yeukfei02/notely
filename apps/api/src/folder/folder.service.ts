import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFolderInput } from './dto/create-folder.dto';
import { GetFoldersInput } from './dto/get-folders.dto';
import { UpdateFolderByIdInput } from './dto/update-folder-by-id.dto';
import { DeleteFolderByIdInput } from './dto/delete-folder-by-id.dto';
import _ from 'lodash';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  async createFolder(createFolderInput: CreateFolderInput) {
    let folder = null;

    if (createFolderInput.name && createFolderInput.users_id) {
      folder = await this.prisma.folder.create({
        data: {
          name: createFolderInput.name,
          users_id: createFolderInput.users_id,
        },
        include: {
          users: true,
          notes: {
            where: {
              deleted_at: null,
            },
          },
        },
      });
    }

    return folder;
  }

  async getFolders(getFolderInput: GetFoldersInput) {
    const folders = await this.prisma.folder.findMany({
      where: {
        users_id: getFolderInput.users_id,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        users: true,
        notes: {
          where: {
            deleted_at: null,
          },
        },
      },
    });

    const sortedFolders = _.orderBy(
      folders,
      ['notes', 'created_at'],
      ['desc', 'asc']
    );

    return sortedFolders;
  }

  async getFolderById(id: string) {
    const folder = await this.prisma.folder.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
        notes: {
          where: {
            deleted_at: null,
          },
        },
      },
    });
    return folder;
  }

  async updateFolderById(updateFolderByIdInput: UpdateFolderByIdInput) {
    const folders = await this.prisma.folder.updateMany({
      where: {
        id: updateFolderByIdInput.id,
        users_id: updateFolderByIdInput.users_id,
      },
      data: {
        name: updateFolderByIdInput.name,
      },
    });
    return folders;
  }

  async deleteFolderById(deleteFolderByIdInput: DeleteFolderByIdInput) {
    const folders = await this.prisma.folder.deleteMany({
      where: {
        id: deleteFolderByIdInput.id,
        users_id: deleteFolderByIdInput.users_id,
      },
    });
    return folders;
  }
}
