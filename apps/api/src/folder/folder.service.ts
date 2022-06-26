import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFolderInput } from './dto/create-folder.dto';
import { GetFoldersInput } from './dto/get-folders.dto';
import { DeleteFolderByIdInput } from './dto/delete-folder-by-id.dto';

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
          notes: true,
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
        notes: true,
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
