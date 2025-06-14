import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for PracticeLog
interface IPractice {
  date: string;
  startTime: string;
  endTime: string;
}

// Define an interface for the Profile document
interface IProfile extends Document {
  _id: string;
  name: string;
  email: string;
  password:string;
  practiceLogs: IPractice[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the Profile document
const practiceLogSchema = new Schema<IPractice>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
});

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    practiceLogs: [practiceLogSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// set up pre-save middleware to create password
profileSchema.pre<IProfile>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;
