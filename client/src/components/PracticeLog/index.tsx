import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_PRACTICE_LOG, UPDATE_PRACTICE_LOG } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface PracticeLog {
  date: string;
  startTime: string;
  endTime: string;
}

interface PracticeLogsListProps {
  practiceLogs?: PracticeLog[];
  isLoggedInUser: boolean;
}

function cleanLogInput(log: PracticeLog): PracticeLog {
  const { __typename, ...cleaned } = log as any;
  return cleaned;
}

const PracticeLogs: React.FC<PracticeLogsListProps> = ({ practiceLogs = [], isLoggedInUser }) => {
  const [removePracticeLog, { error: removeError }] = useMutation(REMOVE_PRACTICE_LOG, {
    refetchQueries: [QUERY_ME, 'me'],
  });

  const [updatePracticeLog, { error: updateError }] = useMutation(UPDATE_PRACTICE_LOG, {
    refetchQueries: [QUERY_ME, 'me'],
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedLog, setEditedLog] = useState<PracticeLog>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleEditClick = (log: PracticeLog, index: number) => {
    setEditIndex(index);
    setEditedLog(log);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (originalLog: PracticeLog) => {
    const cleanedOldLog = cleanLogInput(originalLog);
    const cleanedNewLog = cleanLogInput(editedLog);

    console.log("Submitting update...");
    console.log("Old Log:", cleanedOldLog);
    console.log("New Log:", cleanedNewLog);

    try {
      const { data } = await updatePracticeLog({
        variables: {
          oldLog: cleanedOldLog,
          newLog: cleanedNewLog,
        },
      });

      console.log("Update mutation result:", data);
      setEditIndex(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleRemovePracticeLog = async (log: PracticeLog) => {
    const cleanedLog = cleanLogInput(log);
    console.log("Deleting log:", cleanedLog);

    try {
      const { data } = await removePracticeLog({
        variables: { log: cleanedLog },
      });
      console.log("Delete mutation result:", data);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  if (!practiceLogs.length) {
    return <h3>No Practice Logs Yet</h3>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {practiceLogs.map((log, index) => (
        <div
          key={index}
          className="bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-text-300 mb-2">Practice Session</h3>

          {editIndex === index ? (
            <div className="space-y-2 text-gray-800">
              <input
                name="startTime"
                value={editedLog.startTime}
                onChange={handleEditChange}
                className="w-full px-2 py-1 border rounded"
                placeholder="Start Time"
              />
              <input
                name="endTime"
                value={editedLog.endTime}
                onChange={handleEditChange}
                className="w-full px-2 py-1 border rounded"
                placeholder="End Time"
              />
              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:opacity-90"
                  onClick={() => handleEditSubmit(log)}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:opacity-90"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </div>

              {/* Debug view */}
              <div className="mt-4 p-4 rounded border border-gray-300 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Original Log</p>
                    <ul className="text-gray-800">
                      <li><span className="font-semibold">Date:</span> {cleanLogInput(log).date}</li>
                      <li><span className="font-semibold">Start:</span> {cleanLogInput(log).startTime}</li>
                      <li><span className="font-semibold">End:</span> {cleanLogInput(log).endTime}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-gray-600">Edited Log</p>
                    <ul className="text-gray-800">
                      <li><span className="font-semibold">Date:</span> {cleanLogInput(editedLog).date}</li>
                      <li><span className="font-semibold">Start:</span> {cleanLogInput(editedLog).startTime}</li>
                      <li><span className="font-semibold">End:</span> {cleanLogInput(editedLog).endTime}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h5 className="text-text-800">
                <span className="font-medium">Date:</span> {log.date}
              </h5>
              <h5 className="text-text-800">
                <span className="font-medium">Start:</span> {log.startTime}
              </h5>
              <h5 className="text-text-800">
                <span className="font-medium">End:</span> {log.endTime}
              </h5>
              {isLoggedInUser && (
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white hover:opacity-90 transition rounded"
                    onClick={() => handleEditClick(log, index)}
                  >
                    🖉
                  </button>
                  <button
                    className="px-3 py-1 bg-dark-alert text-white hover:opacity-90 transition rounded"
                    onClick={() => handleRemovePracticeLog(log)}
                  >
                    X
                  </button>
                </div>
              )}
            </>
          )}

          {/* 🧨 Error displays */}
          {removeError && (
            <div className="my-3 p-3 bg-red-600 text-white rounded">
              Remove Error: {removeError.message}
            </div>
          )}
          {updateError && (
            <div className="my-3 p-3 bg-red-600 text-white rounded">
              Update Error: {updateError.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PracticeLogs;
