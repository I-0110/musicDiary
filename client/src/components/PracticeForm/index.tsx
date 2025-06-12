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
    <div>
      <h4>Log a new practice session</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='form-input'
              required
            />
          </div>
          <div className="col-12 col-lg-9">
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className='form-input'
              required
            />
          </div>
          <div className="col-12 col-lg-9">
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className='form-input'
              required
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200" type="submit">
              Add Practice Log
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to log practice sessions. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PracticeLogForm;
