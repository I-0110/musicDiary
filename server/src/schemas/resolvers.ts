import { Profile } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface PracticeLogInput {
  date: string;
  startTime: string;
  endTime: string;
}

interface AddPracticeLogArgs {
  profileId: string;
  log: PracticeLogInput;
}

interface Profile {
  _id: string;
  name: string;
  email: string;
  password: string;
  skills: string[];
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
      { profileId, log }: AddPracticeLogArgs,
      context: Context 
    ): Promise<Profile | null> => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const { date, startTime, endTime } = log;

      // Validate that endTime > startTime
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`S{date}T${endTime}`);

      if (end <= start) {
        throw new Error('End time must be after start time! '); 
      }

      // Add practice log entry to profile
      return await Profile.findOneAndUpdate(
        { _id: profileId },
        { $push: { practiceLogs: { date, startTime, endTime } } },
        { new: true, runValidators: true }
      );
    },
    addProfile: async (_parent: any, { input }: AddProfileArgs): Promise<{ token: string; profile: Profile }> => {
      const profile = await Profile.create({ ...input });
      const token = signToken(profile.name, profile.email, profile._id);
      return { token, profile };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; profile: Profile }> => {
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
