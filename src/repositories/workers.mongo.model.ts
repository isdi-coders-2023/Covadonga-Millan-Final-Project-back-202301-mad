import { model, Schema } from 'mongoose';
import { Worker } from '../entities/worker.js';

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
export const WorkerModel = model('Worker', workerSchema, 'workers');
