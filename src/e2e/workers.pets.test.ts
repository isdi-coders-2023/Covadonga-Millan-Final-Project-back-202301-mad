import mongoose from 'mongoose';
import { dbConnect } from '../db/db.connect';
import { Pet } from '../entities/pet';
import { Auth, PayloadToken } from '../helpers/auth';
import { PetModel } from '../repositories/pets/pets.mongo.model';
import { WorkerModel } from '../repositories/workers/workers.mongo.model';
import { app } from '../app';
import request from 'supertest';

const setWorkerCollection = async () => {
  const workersMock = [
    {
      username: 'Ernestina',
      email: 'ernestina@mail.com',
      password: await Auth.hash('12345'),
    },
    {
      username: 'Pepe',
      email: 'pepe@mail.com',
      password: await Auth.hash('12345'),
    },
  ];

  await WorkerModel.deleteMany().exec();
  await WorkerModel.insertMany(workersMock);

  const workerData = await WorkerModel.find().exec();
  const workersIdsTest = [workerData[0].id, workerData[1].id];

  return workersIdsTest;
};

const setPetCollection = async () => {
  const petsMock = [
    {
      name: 'Checha',
      kg: 4,
      age: 4,
      species: 'cat',
      breed: 'european',
      owner: 'Olmo',
      phone: 666666366,
      email: 'emilio@email',
      temper: 'wapa',
      gender: 'queer',
    },

    {
      name: 'Candao',
      kg: 58,
      age: 12,
      species: 'dog',
      breed: 'labrador',
      owner: 'Cova',
      phone: 666663666,
      email: 'correo@email',
      temper: 'majo',
      gender: 'male',
    },
  ];

  await PetModel.deleteMany().exec();
  await PetModel.insertMany(petsMock);

  const petData = await PetModel.find().exec();
  const petsIdsTest = [petData[0].id, petData[1].id];

  return petsIdsTest;
};

describe('Given the Pet Hospital app and the /workers route', () => {
  let workerToken: PayloadToken;
  let tokenWorkerTest: string;

  beforeAll(async () => {
    await dbConnect();

    const workersIdsTest: string[] = await setWorkerCollection();

    workerToken = {
      id: workersIdsTest[1],
      email: 'luisa@mail.com',
    };

    tokenWorkerTest = Auth.createJWT(workerToken);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('When the Post method to workers/register path is performed ', () => {
    test('Then if the information is OK, the status code should be 201', async () => {
      const registerMock = {
        email: 'luisa@mail.com',
        password: '12345',
      };

      const response = await request(app)
        .post('/workers/register')
        .send(registerMock);

      expect(response.status).toBe(201);
    });

    test('Then if the information is NOT OK, the status code should be 401', async () => {
      const registerMock = {
        email: 'luisa@mail.com',
      };

      const response = await request(app)
        .post('/workers/register')
        .send(registerMock);

      expect(response.status).toBe(401);
    });
  });

  describe('When the Post method to workers/login path is performed', () => {
    test('Then if the information is OK, the status code should be 202', async () => {
      const loginMock = {
        email: 'luisa@mail.com',
        password: '12345',
      };

      const response = await request(app)
        .post('/workers/login')
        .send(loginMock);

      expect(response.status).toBe(202);
    });

    test('Then if the information is NOT OK (miss password), the status code should be 401', async () => {
      const loginMock = {
        email: 'email@email.com',
      };
      const response = await request(app)
        .post('/workers/login')
        .send(loginMock);

      expect(response.status).toBe(401);
    });

    test('Then if the information is NOT OK (userName does not exist), the status code should be 401', async () => {
      const loginMock = {
        email: 'otroemail@gmail.com',
        password: '12345',
      };
      const response = await request(app)
        .post('/workers/login')
        .send(loginMock);

      expect(response.status).toBe(401);
    });

    test('Then if the information is NOT OK (password does not match), the status code should be 401', async () => {
      const loginMock = {
        email: 'otroemail@gmail.com',
        password: 'mal',
      };
      const response = await request(app)
        .post('/workers/login')
        .send(loginMock);

      expect(response.status).toBe(401);
    });
  });
});

describe('Given the Pet Hospital app and the /pets route', () => {
  let newWorkerToken: PayloadToken;
  let tokenWorkerTest: string;

  beforeAll(async () => {
    await dbConnect();

    const workersIdsTest: string[] = await setWorkerCollection();

    newWorkerToken = {
      id: workersIdsTest[1],
      email: 'luisa@mail.com',
    };

    tokenWorkerTest = Auth.createJWT(newWorkerToken);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('When the Post method to pets/create path is performed  ', () => {
    test('Then if the information is OK, the status code should be 201', async () => {
      const createMock = {
        name: 'Chucha',
        kg: 5,
        age: 2,
        species: 'dog',
        breed: 'chihuahua',
        owner: 'Luisa',
        phone: 666666666,
        email: 'mail@email',
        temper: 'jeje',
        gender: 'male',
      };
      const response = await request(app)
        .post('/pets/create')
        .set('Authorization', `Bearer ${tokenWorkerTest}`)
        .send(createMock);

      expect(response.status).toBe(201);
    });

    test('Then if the information is NOT OK, the status code should be 401', async () => {
      const response = await request(app)
        .post('/pets/create')
        .set('Authorization', `Bearer ${tokenWorkerTest}`)
        .send();

      expect(response.status).toBe(400);
    });
  });

  describe('When the Get method to pets/search path is performed', () => {
    test('Then if the information is OK, the status code should be 201', async () => {
      const response = await request(app)
        .get('/pets/search')
        .set('Authorization', `Bearer ${tokenWorkerTest}`);

      expect(response.status).toBe(201);
    });
  });
});
