import type { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeUser(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrides?: Partial<Omit<Prisma.UserUncheckedCreateInput, ''>>,
) {
  return {
    username: faker.internet.userName(),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    ...overrides,
  };
}

export function fakePerusahaan(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrides?: Partial<Omit<Prisma.PerusahaanUncheckedCreateInput, ''>>,
) {
  return {
    nama: faker.person.fullName(),
    alamat: faker.location.streetAddress(),
    no_telp: faker.phone.number(),
    kode: faker.string.alpha({
      length: 3,
      casing: 'upper',
    }),
    ...overrides,
  };
}

export function fakeBarang(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrides?: Partial<Omit<Prisma.BarangUncheckedCreateInput, ''>>,
) {
  return {
    nama: faker.commerce.productName(),
    harga: faker.number.int({
      min: 1,
      max: 1000000,
    }),
    stok: faker.number.int({
      min: 0,
      max: 10000,
    }),
    kode: faker.string.alphanumeric({
      length: 5,
      casing: 'upper',
    }),
    ...overrides,
  };
}
