import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

export async function fakeUser() {
  return {
    username: faker.internet.userName(),
    name: faker.person.firstName(),
    password: await argon.hash(faker.internet.password()),
  };
}

export function fakeUserArray() {
  const users = [];
  for (let i = 0; i < 7; i++) {
    users.push(fakeUser());
  }
  return users;
}

export function fakePerusahaan() {
  return {
    nama: faker.company.name(),
    alamat: faker.location.streetAddress(),
    no_telp: faker.phone.number('021########'),
    kode: faker.string.alpha({
      length: 3,
      casing: 'upper',
    }),
  };
}

export function fakePerusahaanArray(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  total: number,
) {
  const perusahaan = [];
  for (let i = 0; i < total; i++) {
    perusahaan.push(fakePerusahaan());
  }
  return perusahaan;
}

export function fakeBarang() {
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
  };
}
