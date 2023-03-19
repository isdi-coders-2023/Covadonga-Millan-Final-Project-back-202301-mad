import { Schema, model } from 'mongoose';
import { Pet } from '../../entities/pet.js';

const petSchema = new Schema<Pet>({
  name: {
    type: String,
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
    unique: true,
  },
  phone: {
    type: [Number],
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
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
