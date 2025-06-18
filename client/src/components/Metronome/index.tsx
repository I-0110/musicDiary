import React, { useState, useEffect, useRef } from 'react';
// import { useMutation, useQuery } from "@apollo/client";
// import { gql } from "apollo-boost";

// const GET_METRONOME = gql`
//     query {
//         getMetronome {
//          bpm
//         }
//     }
// `;

// const SET_METRONOME = gql`
//     mutation setMetronome($bpm: Int!) {
//         setMetronome(bpm: $bpm) {
//             bpm
//         }
//     }
// `;

// Main variable and the calls for variable used throughtout the app 
const Metronome: React.FC = () => {
    // const { data } = useQuery(GET_METRONOME);
    // const [setMetronome] = useMutation(SET_METRONOME);
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef(0);
    const currentBeatRef = useRef(0);
    const schedulerTimerRef = useRef<number>();
    const scheduleAheadTime = 0.1; //milliseconds
    const lookAhead = 25; //seconds

    // const startMetronome = (bpm) => {
    //     const interval = 60000 / bpm;
    //     return setInterval(() => {

    //     }, interval);
    // };

    // const handleStart = () => {

    // };

    // const handleStop = () => {

    // };

    // const handleChange = (e) => {
    //     setBpm(e.target.value);
    //     setMetronome({ variables: { bpm: e.target.value } });
    // };

    //Advance time for the next beat 
    const nextNote = () => {
        const secondsPerBeat = 60.0 / bpm;
        nextNoteTimeRef.current += secondsPerBeat;
        currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure;
    };

    // Play a single click 
    const playClick = (time: number, accent: boolean) => {
        const ctx = audioCtxRef.current!;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = accent ? 1000 : 700;
        gain.gain.value = 0.5; //Increase volume

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.1); //short click, 0.1s
    };

    // Schedule upcoming notes
    const scheduleNote = (time: number) => {
        if (time < audioCtxRef.current!.currentTime) return; //skip too-late events

        const isAccent = currentBeatRef.current === 0;
        playClick(time, isAccent);
    };

    // Scheduler runs every 25ms, looking 100ms ahead
    const scheduler = () => {
        while (nextNoteTimeRef.current < audioCtxRef.current!.currentTime + scheduleAheadTime) {
            scheduleNote(nextNoteTimeRef.current);
            nextNote(); // Go to next beat
        }
    };

    // Start and Stop function when you click this button
    const handleStartStop = async () => {
        if (!isPlaying) {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContext();
            }

            if (audioCtxRef.current.state === 'suspended') {
                await audioCtxRef.current.resume();
            }

            nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
            currentBeatRef.current = 0;

            schedulerTimerRef.current = window.setInterval(scheduler, lookAhead);
            setIsPlaying(true);
        } else {
            if (schedulerTimerRef.current) {
                clearInterval(schedulerTimerRef.current);
            }
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (schedulerTimerRef.current) {
                clearInterval(schedulerTimerRef.current);
            }
        }
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text p-6 rounded shadow-md transition-all duration-300">
            <div className='flex flex-col items-center space-y-6 mt-10'>
                <h1 className="text-3xl font-bold">Metronome</h1>
                <input 
                    type="range"
                    min="40"
                    max="240" 
                    value={bpm} 
                    onChange={(e) => setBpm(Number(e.target.value))} 
                    className='w-64'
                />
                <p className='text-xl'>{bpm} BPM</p>
                <div className='flex items-center space-x-4'>
                    <label className='text-lg'>Beats per measure:</label>
                    <input
                        type='number'
                        min='1'
                        max='12'
                        value={beatsPerMeasure}
                        onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
                        className='border rounded px-2 py-1 w-16 text-black'
                    />
                </div>

            <button onClick={handleStartStop} className={`px-6 py-2 rounded text-white text-lg ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}>
                {isPlaying ? 'Stop' : 'Start'}
            </button>

            <button
                onClick={async () => {
                    const ctx = new AudioContext();
                    await ctx.resume();
                    const osc = ctx.createOscillator();
                    osc.frequency.value = 1000;
                    osc.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.1);
                }}
            >
            Test Sound Volume
            </button>
        </div>
    </div>
    );
};

export default Metronome;