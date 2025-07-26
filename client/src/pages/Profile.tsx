import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PracticeLogs from '../components/PracticeLog';
import type { PracticeLog } from '../components/PracticeLog';
import PracticeChart from '../components/PracticeChart';

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

  type LogSummary = { [date: string]: number};

  function getMinutesBetween(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);

    return (eh * 60 + em) - (sh * 60 + sm);
  }

  function getDailyTotals(logs: PracticeLog[]): LogSummary {
    const totals: LogSummary = {};

    logs.forEach(log => {
      const date = log.date;
      const minutes = getMinutesBetween(log.startTime, log.endTime);

      if (!totals[date]) {
        totals[date] = 0;
      }

      totals[date] += minutes;
    });

    return totals;
  }

  function getCurrentWeekDates(): string[] {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0]; // "2025-07-26"
    });
  }

  function getWeeklySummary(logs: PracticeLog[]) {
    const totals = getDailyTotals(logs);
    const weekDates = getCurrentWeekDates();

    let weekTotal = 0;
    weekDates.forEach(date => {
      if (totals[date]) {
        weekTotal += totals[date];
      }
    });

    const dailyAvg = weekTotal / 7;
    return {
      weekTotal,
      dailyAvg,
      weekDates,
      weekData: weekDates.map(date => totals[date] || 0)
    };
  }

  function formatMinutes(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  const dailyTotals = getDailyTotals(profile.practiceLogs || []);

  const { weekTotal, dailyAvg, weekData, weekDates } = getWeeklySummary(profile.practiceLogs || []);

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : 'Your' }  Practice Logs...
      </h2>

      {profile.practiceLogs?.length > 0 && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-6'>
            <div className='md:col-span-1 flex flex-col space-y-6'>
              <div className='bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text shadow-md rounded-lg p-4 border border-gray-200'>
                <h3 className='text-xl font-semibold text-text-300 mb-2'>Recent practice with totals:</h3>
                <ul className='list-disc list-inside text-light-700 space-y-1'>
                  {Object.entries(dailyTotals)
                    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                    .map(([date, minutes]) => (
                      <li key={date}>
                        <strong>{date}</strong>: {formatMinutes(minutes)} practiced
                      </li>
                    ))}
                </ul>
              </div>
              <div className="bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text shadow-md rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Weekly Summary</h3>
                <p>
                  You've practiced <strong className='text-dark-alert'>{formatMinutes(weekTotal)}</strong> this week!
                </p>
                <p>
                  And your daily average is <strong className='text-dark-alert'>{formatMinutes(Math.round(dailyAvg))}</strong>
                </p>
              </div>
            </div>
            <div className='md:col-span-2 md:row-span-2 flex-1 flex-col justify-stretch'>
                <PracticeChart weekData={weekData} weekLabels={weekDates} />
            </div>
          </div>
          <PracticeLogs
            practiceLogs={profile.practiceLogs}
            isLoggedInUser={!profileId && true}
          />
        </>
      )}
    </div>
  );
};

export default Profile;