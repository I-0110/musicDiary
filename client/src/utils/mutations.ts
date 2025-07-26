import { gql } from '@apollo/client';
export const ADD_PRACTICE_LOG = gql`
  mutation addPracticeLog($log: PracticeLogInput!) {
    addPracticeLog(log: $log) {
      _id
      name
      practiceLogs {
        date
        startTime
        endTime
      }
    }
  }
`;

export const UPDATE_PRACTICE_LOG = gql`
  mutation updatePracticeLog($oldLog: PracticeLogInput!, $newLog: PracticeLogInput!) {
    updatePracticeLog(oldLog: $oldLog, newLog: $newLog) {
      date
      startTime
      endTime
    }
  }  
`;

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
  mutation removePracticeLog($log: PracticeLogInput!) {
    removePracticeLog(log: $log) {
      _id
      name
      practiceLogs {
        date
        startTime
        endTime
      }
    }
  }
`;
