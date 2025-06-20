// Detects the pitch by analyzing repeating waveforms in the mic input 
export function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
       const val = buffer[i];
       rms += val * val;
    }

    // Returns a frequency (Hz) or -1 if the signal is too weak
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1; //too quiet
    
    let r1 = 0, r2 = SIZE - 1, threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i;
            break;
        }
    }

    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i;
            break;
        }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            c[i] += buffer[j] * buffer[j + i];
        }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;

    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }

    const T0 = maxpos;
    return sampleRate / T0;
}
// General standard for tuning
const A4 = 440; 

// Maps the frequency to a musical note (440 Hz --> A4, or A in the 4th range)
export function frequencyToNote(freq: number): string {
    // Uses standard 12-TET tuning with A4 = 440 Hz
    const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteNum = Math.round(12 * (Math.log2(freq / A4)) + 69);
    const note = noteStrings[noteNum % 12];
    const octave = Math.floor(noteNum / 12) - 1;
    return `${note}${octave}`;
}

// Calculates how far the frequency is from the exact pitch of the nearest note, in cents.
export function getCentsOff(freq: number): number {
    const noteNum =  Math.round(12 * (Math.log2(freq / A4)) + 69);
    const standardFreq = A4 * Math.pow(2, (noteNum - 69) / 12);
    return Math.floor(1200 * Math.log2(freq / standardFreq));
}