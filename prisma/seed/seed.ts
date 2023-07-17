import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
import * as argon from 'argon2';

const prisma: PrismaClient = new PrismaClient();
const uniqueEnforcer = new UniqueEnforcer();
const seed = async () => {
  /* Generate 10 Perusahaan */
  for (let i = 0; i < 10; i++) {
    const perusahaan = await prisma.perusahaan.create({
      data: {
        nama: faker.person.fullName(),
        alamat: faker.location.streetAddress(),
        no_telp: faker.phone.number(),
        kode: faker.string.alpha({
          length: 3,
          casing: 'upper',
        }),
      },
    });

    /* Generate 7 Barang for each Perusahaan */
    for (let j = 0; j < 7; j++) {
      const kode = uniqueEnforcer.enforce(
        () => {
          return faker.string.alpha({
            casing: 'upper',
          });
        },
        {
          maxTime: 1000,
          maxRetries: 1000,
        },
      );

      await prisma.barang.create({
        data: {
          nama: faker.commerce.productName(),
          harga: faker.number.int({
            min: 1,
            max: 1000000,
          }),
          stok: faker.number.int({
            min: 0,
            max: 10000,
          }),
          kode: kode,
          perusahaan: {
            connect: {
              id: perusahaan.id,
            },
          },
        },
      });
    }
  }

  faker.seed(123);
  /* Generate 3 Admin */
  for (let i = 0; i < 3; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        name: faker.person.firstName(),
        password: await argon.hash(faker.internet.password()),
      },
    });
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
