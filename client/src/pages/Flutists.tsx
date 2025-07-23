import React, { useState, useEffect } from 'react';

interface Flutists {
    name: string;
    img: string;
    dob: string;
    dod: string;
    country: string;
    period: string; 
    bio: string;
    teachers: string[];
    students: string[];
    workplaces: string[];
    videos: string[];
    sources: string[];
    hashtags: string[];
}

const Flutists: React.FC = () => {
    const [flutists, setFlutists] = useState<Flutists[]>([]);
    const [hover, setHover] = useState<number | null>(null);
    const [expand, setExpand] = useState<number | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || ''; 
        fetch(`${API_BASE}/api/flutists`)
        .then(res => res.json())
        .then(data => {
            console.log('Fetched flutist data:', data);
            setFlutists(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching flutists:', error);
            setError('Could not load flutists');
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading flutists...</p>;
    if (error) return <p className="text-red-200 dark:text-red-600">{error}</p>;

    return (
        <>
            <h1 className="bg-dark-background text-white text-center px-4 py-2 rounded shadow-md text-2xl font-bold mb-2 ">Flutists to Know</h1>
            
            {expand === null ? (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {flutists.map((flutist, index) => {
                    const isHover = hover !== null;
                    const isThisHover = hover === index;
                    const isExpanded = expand === index;

                    return (
                        <div 
                            key={index} 
                            className={`border p-4 rounded shadow transition-transform duration-300 
                            ${isHover && !isThisHover ? 'grayscale brightness-75 scale-102' : ''}
                            ${isThisHover ? 'scale-105 z-10' : ''} bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text 
                            `}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(null)}
                        >
                            <img src={flutist.img} alt={flutist.name} className='w-full h-48  object-cover' />
                            <h2 className='text-lg font-bold mt-2'>{flutist.name}</h2>
                            <p>{flutist.dob} ~ {flutist.dod} | {flutist.country}</p>
                            
                            <button
                                onClick={() => setExpand(index)}
                                className='mt-3 text-blue-700 dark:text-blue-300 text-sm hover:underline-transparent'
                            >
                                Read More
                            </button>
        
                            {/* Short Bio Preview */}
                            {!isExpanded && (
                                <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3">
                                    {Array.isArray(flutist.workplaces) ? flutist.workplaces.join(', ') : flutist.workplaces}
                                </p>
                            )}
                        </div>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-6 p-6 bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text rounded-lg shadow-lg col-span-full">
                    <div className='max-w-4xl mx-auto 
                    text-text dark:text-dark-text'>
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-bold mb-2">{flutists[expand].name}</h2>
                            <button
                                onClick={() => setExpand(null)}
                                className='text-gray-500 hover:text-red-600 dark:hover:text-red-400  text-2xl font-bold leading-none'
                                aria-label='Close'
                            >
                                    x
                            </button>
                        </div>
                        <img src={flutists[expand].img} alt={flutists[expand].name} className="w-64 h-auto mb-4 rounded" />

                        <p className="mb-1"><strong>Born:</strong> {flutists[expand].dob}</p>
                        <p className="mb-1"><strong>Died:</strong> {flutists[expand].dod}</p>
                        <p className="mb-1"><strong>Country:</strong> {flutists[expand].country}</p>
                        <p className="mb-1"><strong>Period:</strong> {flutists[expand].period}</p>
                        <p className="mb-1"><strong>Teachers:</strong> {flutists[expand].teachers.join(', ')}</p>
                        <p className="mb-1"><strong>Students:</strong> {flutists[expand].students.join(', ')}</p>
                        <p className="mb-1">
                            <strong>Workplaces:</strong> 
                            {Array.isArray(flutists[expand].workplaces) ? flutists[expand].workplaces.join(', ') : flutists[expand].workplaces}
                        </p>

                        <p className="mt-4 mb-4 whitespace-pre-line">{flutists[expand].bio}</p>

                        {flutists[expand].videos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {flutists[expand].videos.map((url, i) => {
                                    const videoId = new URL(url).searchParams.get("v");
                                    return (
                                        <iframe
                                            key={i}
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            className="w-full h-64 rounded"
                                            allowFullScreen
                                            title={`Video ${i}`}
                                        ></iframe>
                                    );
                                })}
                            </div>
                            )}

                            <div className='text-center mt-6'>
                                <button
                                    onClick={() => setExpand(null)}
                                    className='text-red-600 dark:text-red-400 underline-transparent'
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
};

export default Flutists;

// Original code by Utsav m. https://www.linkedin.com/feed/update/urn:li:activity:7349084705822035968/
// <div class="container">
//     <div class="card card1">...</div>
//     <div class="card card2">...</div>
//     <div class="card card3">...</div>
//     <div class="card card4">...</div>
// </div>

// .container:has(:hover) .card:not(:hover) {
//     filter: grayscale(1) Brightness(0.6);
//     transform: ScalarLeafsRule(0.95);
// }

// .card:hover {
//     transform: ScalarLeafsRule(1.05);
// }