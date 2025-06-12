import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_PRACTICE_LOG } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface PracticeLog {
  date: string;
  startTime: string;
  endTime: string;
  // totalPracticeTime?:string;
}

interface PracticeLogsListProps {
  practiceLogs?: PracticeLog[];
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

  const handleRemovePracticeLog = async (log: PracticeLog) => {
    try {
      await removePracticeLog({
        variables: { log },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!practiceLogs.length) {
    return <h3>No Practice Logs Yet</h3>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
      {practiceLogs.map((log, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-green-300 mb-2">Practice Session</h3> 
            <h5 className="text-gray-800"><span className="font-medium">Date:</span> {log.date}</h5>
            <h5 className="text-gray-800"><span className="font-medium">Start:</span> {log.startTime}</h5>
            <h5 className="text-gray-800"><span className="font-medium">End:</span> {log.endTime}</h5>
            {/* <h5 className='text-gray-800'><span className='font-medium'>Total:</span>{log.totalPracticeTime}</h5> */}
              {isLoggedInUser && (
                <button
                  className="ml-auto mt-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  onClick={() => handleRemovePracticeLog({
                    date: log.date,
                    startTime: log.startTime,
                    endTime: log.endTime
                  })}
                >
                  X
                </button>
              )}
          </div>
        ))}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
  );
};

export default PracticeLogs;
