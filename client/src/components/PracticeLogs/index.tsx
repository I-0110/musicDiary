import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_PRACTICE_LOG } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface PracticeLogsListProps {
  practiceLogs?: string[];
  isLoggedInUser: boolean;
}

const PracticeLogs: React.FC<PracticeLogsListProps> = ({ practiceLogs = [], isLoggedInUser }) => {
  const [removePracticeLog, { error }] = useMutation
  (REMOVE_PRACTICE_LOG, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemovePracticeLog = async (practiceLog: any) => {
    try {
      await removePracticeLog({
        variables: { practiceLog },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!practiceLogs.length) {
    return <h3>No PracticeLogs Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {practiceLogs &&
          practiceLogs.map((practiceLog) => (
            <div key={practiceLog} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{practiceLog}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemovePracticeLog(practiceLog)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default PracticeLogs;
