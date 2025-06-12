import { Link } from 'react-router-dom';

interface Profile {
  _id: string;
  name: string;
  practiceLogs: string[]; // Assuming practiceLogs are represented as an array of strings
}

interface ProfileListProps {
  profiles: Profile[];
  title: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {profile.practiceLogs ? profile.practiceLogs.length : 0}{' '}
                    endorsed skill
                    {profile.practiceLogs && profile.practiceLogs.length === 1 ? '' : 's'}
                  </span>
                </h4>
                <div className="card-body bg-light p-2">
                  {/* You can add additional profile details here if needed */}
                </div>
                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View other user's practice logs.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
