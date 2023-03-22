import { Schema, model } from 'mongoose';
import { Pet } from '../../entities/pet.js';

const petSchema = new Schema<Pet>({
  name: {
    type: String,
    required: true,
  },
  kg: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  temper: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
});

petSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});
export const PetModel = model('Pet', petSchema, 'pets');
