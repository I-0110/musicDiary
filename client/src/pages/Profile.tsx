import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PracticeLogs from '../components/PracticeLogs';
// import PracticeForm from '../components/PracticeForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : 'Your' }  Practice Logs...
      </h2>

      {profile.practiceLogs?.length > 0 && (
        <PracticeLogs
          practiceLogs={profile.practiceLogs}
          isLoggedInUser={!profileId && true}
        />
      )}

      {/* <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <PracticeForm profileId={profile._id} />
      </div> */}
    </div>
  );
};

export default Profile;
