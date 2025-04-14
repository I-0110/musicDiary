import { Router, Request, Response } from 'express';
import { Musician } from '../../models/index.js';

// GET /Musicians
export const getAllMusicians = async (_req: Request, res: Response) => {
    try {
        const musicians = await Musician.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(musicians);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// GET /Musicians/:id
export const getMusicianById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const musician = await Musician.findByPk (id, {
            attributes: { exclude:['password'] }
        });
        if (musician) {
            res.json(musician);
        } else {
            res.status(404).json({ message: 'Musician not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// POST /Musicians
export const createMusician = async (req: Request, res: Response) => {
    req.body;
    try {
        const { username, email, password } = req.body;
        const newMusician = await Musician.create({ username, email, password });
        res.status(201).json(newMusician);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /Musicians/:id
export const updateMusician = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const musician = await Musician.findByPk(id);
        if (musician) {
            musician.username = username;
            musician.password = password;
            await musician.save();
            res.json(musician);
        } else {
            res.status(404).json({ message: 'Musician not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /Musicians/:id
export const deleteMusician = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const musician = await Musician.findByPk(id);
        if (musician) {
            await musician.destroy();
            res.json({ message: 'Musician account deleted' });
        } else {
            res.status(404).json({ message: 'Musician not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const router = Router();

// GET /musicians - Get all musicians-users
router.get('/', getAllMusicians);

// GET /musicians/:id - Get a musician-user by id
router.get('/:id', getMusicianById);

// POST /musicians - Create a new musician-user
router.post('/register', createMusician);

// PUT /musicians/:id - Update a musician-user by id
router.put('/:id', updateMusician);

// DELETE /musicians/:id - Delete a musician-user by id
router.delete('/:id', deleteMusician);

export { router as musicianRouter };