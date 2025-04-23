import { Schema, model, Document } from 'mongoose';

interface IPractice extends Document {
    username: string;
    practiceTime: number;
    warmups: string[];
    technique: string[];    
    scales: string[];
    etudes: string[];
    pieces: string[];
    excerpts: string[];
    improvisation: string[];
    comments: string;
}

const practiceSchema = new Schema<IPractice>({
    username: {
        type: String,
        required: true,
    },
    practiceTime: { 
        type: Number,
        required: true,
    },
    warmups: {          
        type: [String],
        required: true,
    },
    technique: {
        type: [String],
        required: true,
    },
    scales: {
        type: [String],
        required: true,
    },
    etudes: {
        type: [String],
        required: true,
    },
    pieces: {
        type: [String],
        required: true,
    },
    excerpts: {
        type: [String],
        required: true,
    },
    improvisation: {
        type: [String],
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Practice = model<IPractice>('Practice', practiceSchema);

export default Practice; 

