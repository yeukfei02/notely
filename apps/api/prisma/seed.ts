import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

(async () => {
  await createUsers();
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
