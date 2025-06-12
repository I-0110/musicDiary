import { useQuery } from '@apollo/client';

import PracticeLogForm from '../components/PracticeForm';

// import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading } = useQuery(QUERY_PROFILES);
  // const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PracticeLogForm />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
