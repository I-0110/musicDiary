import { Router } from 'express';
import { musicianRouter } from './musician-routes.js';

const router = Router();

// Prefix all routes defined in `musician-routes.js` with /musicians --> refering to users
router.use('/musicians', musicianRouter);

export default router;