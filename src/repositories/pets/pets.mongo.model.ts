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
    required: false,
  },
  breed: {
    type: String,
    required: false,
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
  symptoms: {
    type: String,
    required: false,
  },
  temperature: {
    type: Number,
    required: false,
  },
  hr: {
    type: Number,
    required: false,
  },
  rr: {
    type: Number,
    required: false,
  },
  sap: {
    type: Number,
    required: false,
  },
  dap: {
    type: Number,
    required: false,
  },
  map: {
    type: Number,
    required: false,
  },
  fluids: {
    type: String,
    required: false,
  },
  meds: {
    type: String,
    required: false,
  },
  ml: {
    type: Number,
    required: false,
  },
  hour: {
    type: Number,
    required: false,
  },
  via: {
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
