import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import dotenv from 'dotenv';
dotenv.config();

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

// Middleware to connect with log
  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());

// Log all incoming requests
  app.use('/graphql', expressMiddleware(server,
    {
      context: authenticateToken as any
    }
  ));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

// Adding my own flutists API
  app.get('/api/flutists', (_req, res) => {
    const filePath = path.join(__dirname, 'seeds/flutistData.json');
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.json(data);
    } catch (err) {
      console.error('❌ Failed to load flutistData.json:', err);
      res.status(500).json({ error: 'Could not load flutist data' });
    }
  });

// Port where we get server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    console.log(`Use flutistsJSON at http://localhost:${PORT}/api/flutists`);
  });
};

startApolloServer();