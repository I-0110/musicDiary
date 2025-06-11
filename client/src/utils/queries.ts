import { gql } from '@apollo/client';
// Gets all user profiles. It shows the list with these details: name and skills. ("_id is to find their profiles and it will not show on page")
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;
// 	View another user's profile. It has parameters: "profileId"! This will allow the user who logged in, to add skills
export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;
// Gets the user who logged in -- Dashboard, and profile settings
export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;
