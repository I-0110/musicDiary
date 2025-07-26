import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PracticeChartProps {
    dailyTotals?: Record<string, number>;
    weekLabels?: string[];
    weekData?: number[];
}

const PracticeChart: React.FC<PracticeChartProps> = ({ 
    dailyTotals = {},
    weekLabels,
    weekData
    }) => {
    const labels: string[] = weekLabels || Object.keys(dailyTotals || {}).sort();
    const values: number[] = weekData || labels.map(date => (dailyTotals ? dailyTotals[date] : 0));
    const data = {
        labels, 
        datasets: [
            {
                label: 'Minutes Practiced',
                data: values,
                backgroundColor: '#3b82f6',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Practice Time Per Day',
            },
        },
    };

    return (
        <div className='bg-white p-4 rounded shadow mt-6'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PracticeChart;

