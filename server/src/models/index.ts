// user model
import mongoose from 'mongoose';
import sequelize from '../config/connection.js';
import { UserFactory } from './musician.js';

const Musician = UserFactory(sequelize);

export { sequelize, Musician };

// practice model 
import Practice from './Practice.js';
const PracticeData = new Practice(mongoose);
export { PracticeData }; 