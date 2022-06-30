import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

(async () => {
  await createUsers();
  await createFolders();
  await createNotes();
})();

async function createUsers() {
  const salt = bcrypt.genSaltSync(10);

  const usersList = [
    {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin', salt),
    },
    {
      email: 'yeukfei02@gmail.com',
      password: bcrypt.hashSync('test', salt),
    },
  ];

  await prisma.users.createMany({
    data: usersList,
  });
}

async function createFolders() {
  const users = await prisma.users.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  const foldersList = [
    {
      name: faker.lorem.word(),
      users_id: users[0].id,
    },
    {
      name: faker.lorem.word(),
      users_id: users[1].id,
    },
  ];

  await prisma.folder.createMany({
    data: foldersList,
  });
}

async function createNotes() {
  const users = await prisma.users.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
  const folders = await prisma.folder.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });

  const notesList = [
    {
      content: faker.word.noun(),
      tag: '# test',
      users_id: users[0].id,
    },
    {
      content: faker.word.noun(),
      tag: '# test',
      users_id: users[0].id,
    },
    {
      content: faker.word.noun(),
      tag: '# test2',
      users_id: users[1].id,
    },
    {
      content: faker.word.noun(),
      tag: '# test',
      users_id: users[0].id,
      folder_id: folders[0].id,
    },
    {
      content: faker.word.noun(),
      tag: '# test',
      users_id: users[1].id,
      folder_id: folders[1].id,
    },
    {
      content: faker.word.noun(),
      tag: '# test2',
      users_id: users[0].id,
      folder_id: folders[0].id,
    },
    {
      content: faker.word.noun(),
      users_id: users[0].id,
      folder_id: folders[0].id,
    },
    {
      content: faker.word.noun(),
      users_id: users[1].id,
      folder_id: folders[1].id,
    },
  ];

  await prisma.note.createMany({
    data: notesList,
  });
}
