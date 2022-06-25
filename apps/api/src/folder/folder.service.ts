import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFolderInput } from './dto/create-folder.dto';

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

  async getFolders() {
    const folders = await this.prisma.folder.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        users: true,
        notes: true,
      },
    });
    return folders;
  }
}
