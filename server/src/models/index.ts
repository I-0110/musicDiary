import sequelize from '../config/connection.js';
import { UserFactory } from './musician.js';

const Musician = UserFactory(sequelize);

export { sequelize, Musician };