import { Profile } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface PracticeLog {
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

// interface AddSkillArgs {
//   profileId: string;
//   skill: string;
// }

// interface RemoveSkillArgs {
//   profileId: string;
//   skill: string;
// }

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
  },
  Mutation: {
    addPracticeLog: async (
      _parent: any,
      { log }: { log: PracticeLog },
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
    // addSkill: async (_parent: any, { profileId, skill }: AddSkillArgs, context: Context): Promise<Profile | null> => {
    //   if (context.user) {
    //     return await Profile.findOneAndUpdate(
    //       { _id: profileId },
    //       {
    //         $addToSet: { skills: skill },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw AuthenticationError;
    // },
    removeProfile: async (_parent: any, _args: any, context: Context): Promise<Profile | null> => {
      if (context.user) {
        return await Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // removeSkill: async (_parent: any, { skill }: RemoveSkillArgs, context: Context): Promise<Profile | null> => {
    //   if (context.user) {
    //     return await Profile.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { skills: skill } },
    //       { new: true }
    //     );
    //   }
    //   throw AuthenticationError;
    // },
  },
};

export default resolvers;
