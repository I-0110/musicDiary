const typeDefs = `type Class {
    _id: ID!
    username: String!
    practiceTime: Int
    warmups: [String]
    technique: [String]
    scales: [String]
    etudes: [String]
    pieces: [String]
    excerpts: [String]
    improvisation: [String]
    comments: String    
    date: String
    userId: ID!
    createdAt: String
    updatedAt: String
}

type Query {
    getAllPractices: [Class]
}`;

export default typeDefs;
    
