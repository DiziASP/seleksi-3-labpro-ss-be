import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { fakePerusahaanArray, fakeUser } from './fake-data';

const prisma: PrismaClient = new PrismaClient();

const seed = async () => {
  /**
   * Create 7 user
   */
  for (let i = 0; i < 7; i++) {
    const user = await fakeUser();
    await prisma.user.create({
      data: user,
    });
  }

  /**
   * Create 4 perusahaan with 4 barang each
   */
  const perusahaan = fakePerusahaanArray(4);
  for (let i = 0; i < perusahaan.length; i++) {
    const data = perusahaan[i];
    const created = await prisma.perusahaan.create({
      data,
    });
    for (let j = 0; j < 4; j++) {
      /* Random Harga dan Stokey */
      await prisma.barang.create({
        data: {
          nama: `${faker.commerce.productName()}`,
          harga: faker.number.int({
            min: 1000,
            max: 1000000,
          }),
          stok: faker.number.int({
            min: 0,
            max: 10000,
          }),
          kode: `${created.kode}-${j + 1}`,
          perusahaan: {
            connect: {
              id: created.id,
            },
          },
        },
      });
    }
  }
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
