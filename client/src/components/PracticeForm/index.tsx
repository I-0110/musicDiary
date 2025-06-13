import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PRACTICE_LOG } from '../../utils/mutations';

import Auth from '../../utils/auth';

const PracticeLogForm = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [addPracticeLog, { error }] = useMutation(ADD_PRACTICE_LOG);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addPracticeLog({
        variables: { 
          log: {
            date,
            startTime,
            endTime,
          },
         },
      });

      // Clear form
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text p-6 rounded shadow-md transition-all duration-300">
    <h4 className="text-xl font-semibold mb-4">Log a new practice session</h4>
    {Auth.loggedIn() ? (
      <form
        className="flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full form-input bg-white text-black dark:bg-dark-background dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full form-input bg-white text-black dark:bg-dark-background dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full form-input bg-white text-black dark:bg-dark-background dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <button 
            className="bg-light-accent text-white dark:bg-dark-accent px-4 py-2 rounded hover:opacity-90 transition"
            type="submit"
          >
            Add Practice Log
          </button>
        </div>
          {/* <div className="bg-richBlack text-olive p-6 rounded-lg">
            <h2 className="text-teal text-2xl mb-2">Practice Summary</h2>
            <p>Total Time: 1h 15m</p>
          </div> */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded">
            {error.message}
          </div>
        )}
      </form>
      ) : (
      <p>
        You need to be logged in to log practice sessions. Please{' '}
        <Link
          to="/login">
          login
        </Link>{' '}
        or{' '}
        <Link
          to="/signup">
          signup
        </Link>.
      </p>
    )}
  </div>
  );
};

export default PracticeLogForm;
