import { Profile } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
// import { GraphQLDateTime } from 'graphql-iso-date';

interface PracticeLog {
  date: string;
  startTime: string;
  endTime: string;
  totalPracticeTime?: string;
}

interface PracticeLogInput {
  date: string;
  startTime: string;
  endTime: string;
}

interface Profile {
  _id: string;
  name: string;
  email: string;
  password: string;
  practiceLogs: PracticeLog[];
}

interface ProfileArgs {
  profileId: string;
}

interface AddProfileArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

interface Auth {
  token: string;
  profile: Profile;
}

interface Context {
  user?: Profile;
}

const resolvers = {
  Query: {
    // Read operation: profiles (CRUD)
    profiles: async (): Promise<Profile[]> => {
      return await Profile.find();
    },
    // Return all profiles
    profile: async (_parent: any, { profileId }: ProfileArgs): Promise<Profile | null> => {
      return await Profile.findOne({ _id: profileId });
    },
    // Find single profile
    me: async (_parent: any, _args: any, context: Context): Promise<Profile | null> => {
      if (context.user) {
        return await Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    practiceLogsByDate: async (
      _parent: any,
      { date }: { date: string },
      context: Context
    ): Promise<PracticeLog[]> => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const user = await Profile.findById(context.user._id);

      if (!user) {
        throw new Error("User not found");
      }

      return user.practiceLogs.filter(log => log.date === date);
    },
    totalPracticeTime: async (
      _parent: any,
      _args: any,
      context: Context
    ): Promise<string> => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const user = await Profile.findById(context.user._id);
      if (!user) throw new Error("User not found");

      let totalMinutes = 0;

      for (const log of user.practiceLogs) {
        const start = new Date(`${log.date}T${log.startTime}`);
        const end = new Date(`${log.date}T${log.endTime}`);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          const diffMins = end.getTime() - start.getTime();
          totalMinutes += diffMins / 60000; //convert to minutes
        }
      }

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);

      return `${hours}h ${minutes}m`;
    },
  },
  Mutation: {
    addPracticeLog: async (
      _parent: any,
      { log }: { log: PracticeLogInput },
      context: Context 
    ): Promise<Profile | null> => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const { date, startTime, endTime } = log;

      // Validate that endTime > startTime
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date or time format.');
      }

      if (end <= start) {
        throw new Error('End time must be after start time! '); 
      }

      // Add practice log entry to profile
      return await Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { practiceLogs: { date, startTime, endTime } } },
        { new: true, runValidators: true }
      );
    },
    addProfile: async (_parent: any, { input }: AddProfileArgs): Promise<Auth> => {
      const profile = await Profile.create({ ...input });
      const token = signToken(profile.name, profile.email, profile._id);
      return { token, profile };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<Auth> => {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw AuthenticationError;
      }
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(profile.name, profile.email, profile._id);
      return { token, profile };
    },
    removeProfile: async (_parent: any, _args: any, context: Context): Promise<Profile | null> => {
      if (context.user) {
        return await Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    removePracticeLog: async (
      _parent: any, 
      { log }: { log: PracticeLogInput }, 
      context: Context
    ): Promise<Profile | null> => {
      if (!context.user) {
        throw AuthenticationError;
    }

    const { date, startTime, endTime } = log;

    return await Profile.findOneAndUpdate(
      { _id: context.user._id },
      {
        $pull: {
          practiceLogs: {
            date, 
            startTime,
            endTime,
          },
        },
      },
      { new: true }
    );
  },
}};

export default resolvers;
