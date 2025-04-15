import express, { Request, Response } from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static('public'));

// Middleware to connect with log
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, _res, next) => {
    console.log(`📥 Received ${req.method} request at ${req.url}`);
    next();
});

// Root route
app.get('/', (_req: Request, res: Response) => {
    res.send(`
        <h1>🎵 Welcome to A Music Diary</h1>
        <p>Start tracking your musical journey today!</p>
        <img src="/cat.jpg" alt=" Music Cat Engineer" width="300"/>
        <p>Meow-sician at work!</p>
        `);
});

// Register /api routes
app.use(routes);

// Sync database and start server 
sequelize.authenticate()
    .then(() => {
        console.log('🔌 Database connection established successfully.');
        return sequelize.sync({ force: true });
    })
    .then(() => {
        console.log('✅ Database synced successfully (tables dropped and recreated)');
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.error('❌ Error syncing database:', err);
    });
