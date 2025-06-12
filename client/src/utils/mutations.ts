import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($input: ProfileInput!) {
    addProfile(input: $input) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_PRACTICE_LOG = gql`
  mutation addPracticeLog($profileId: ID!, $practiceLog: String!) {
    addPracticeLog(profileId: $profileId, practiceLog: $practiceLog) {
      _id
      name
      practiceLogs
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PRACTICE_LOG = gql`
  mutation removePracticeLog($practiceLog: String!) {
    removePracticeLog(practiceLog: $practiceLog) {
      _id
      name
      practiceLogs
    }
  }
`;
