import { PracticeData } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Practice collection
    await PracticeData.deleteOne({});
    console.log('Schools collection cleaned.');
  } catch (error) {
    console.error('Error cleaning Schools collection:', error);
  }
  finally {
    // Close the database connection
    process.exit(1);
  }
};

export default cleanDB;