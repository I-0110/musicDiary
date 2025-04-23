// Sequelize (PostgreSQL)
import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js';
import { SequelizeMethod } from 'sequelize/lib/utils';

export const sequelize = new SequelizeMethod;

// Mongoose (MongoDB)
import mongoose from 'mongoose';   
 
mongoose.connect(`mongodb://localhost:27017/practiceDB`);

