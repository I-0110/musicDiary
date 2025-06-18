const typeDefs = `
  type PracticeLog {
    date: String!
    startTime: String!
    endTime: String!
    totalPracticeTime: String
  }

  input PracticeLogInput {
    date: String!
    startTime: String!
    endTime: String!
  }

  type Metronome {
    bpm: Int
  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    practiceLogs: [PracticeLog]!
  }

  type Auth {
    token: ID!
    profile: Profile!
  }
  
  input ProfileInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    practiceLogsByDate(date: String!): [PracticeLog]!
    totalPracticeTime: String!
    getMetronome: Metronome
  }

  type Mutation {
    addPracticeLog(log: PracticeLogInput!): Profile
    addProfile(input: ProfileInput!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    removePracticeLog(log: PracticeLogInput!): Profile
    setMetronome(bpm: Int!): Metronome
  }
`;

export default typeDefs;
