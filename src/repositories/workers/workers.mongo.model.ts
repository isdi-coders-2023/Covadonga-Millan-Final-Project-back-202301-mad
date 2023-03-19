import { model, Schema } from 'mongoose';
import { Worker } from '../../entities/worker.js';

const workerSchema = new Schema<Worker>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

workerSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});
export const WorkerModel = model('Worker', workerSchema, 'workers');
