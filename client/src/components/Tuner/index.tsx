import React, { useRef, useState } from 'react';
import { autoCorrelate, frequencyToNote, getCentsOff } from '../../utils/tuner';

const Tuner: React.FC = () => {
    const [note, setNote] = useState<string | null>(null);
    const [frequency, setFrequency] = useState<number | null>(null);
    const [cents, setCents] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const rafRef = useRef<number | null>(null);

    const toggleTuner = async () => {
        if (isRunning) {
            // Stop audio context and animation loop
            if (audioContextRef.current) {
                audioContextRef.current.close();
                setIsRunning(false);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        } else {
            // Start mic and analyze pitch
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser(); 
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;


            const bufferLength = analyserRef.current.fftSize;
            const buffer = new Float32Array(bufferLength);

            const updatePitch = () => {
                if (!analyserRef.current || !audioContextRef.current) return;

                analyserRef.current.getFloatTimeDomainData(buffer);
                const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

                if (freq !== -1) {
                    setFrequency(freq);
                    const noteName = frequencyToNote(freq);
                    setNote(noteName);
                    setCents(getCentsOff(freq));
                }

                rafRef.current = requestAnimationFrame(updatePitch);
            };

            updatePitch();
            // Positive (sharp), Negative (flat)
            setIsRunning(true);
        }
    };

    const getTuningColor = (cents: number | null): string => {
        if (cents === null) return "bg-gray-400";
        const absCents = Math.abs(cents);
        if (absCents <=5) return "bg-green-500";
        if (absCents <= 10) return "bg-yellow-400";
        return "bg-red-500";
    };

    return (
        <div className="w-full max-w-md mx-auto bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text p-6 rounded shadow-md transition-all duration-300">
            <h1 className="flex flex-col items-center space-y-6 text-3xl font-bold">Tuner</h1>
            {note && frequency && (
                <>
                    <p className='text-lg font-semibold'>Note: {note}</p>
                    <p>Frequency: {frequency.toFixed(1)} Hz</p>
                    <p>Detune: {cents} cents</p>

                    <div className='relative w-full h-4 bg-gray-300 rounded overflow-hidden'>
                        <div 
                        className={`absolute w-1 h-full ${getTuningColor(cents)}`}
                        style={{ left: `${100 + (cents ?? 0)}%` }}
                        />
                    </div>

                    <div className='flex justify-between text-sm mt-1'>
                        <span>Flat</span>
                        <span>In Tune</span>
                        <span>Sharp</span>
                    </div>
                </>
            )}
            <div className='flex flex-col items-center space-x-6'>
                <button onClick={toggleTuner} className={`px-6 py-2 rounded text-white text-lg ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}>
                    {isRunning ? "Stop Tuner" : "Start Tuner"}
                </button>
            </div>
        </div>
    );
};

export default Tuner;