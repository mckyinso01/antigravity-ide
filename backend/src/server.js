import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import securityRoutes from './routes/security.js';

const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
}));

// ─── Health check ────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'omnistock-backend', timestamp: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', securityRoutes);

// ─── Error handler ───────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ───────────────────────────────────────────────────────────────
app.listen(config.port, '0.0.0.0', () => {
  console.log(`[OmniStock Backend] Running on port ${config.port} (${config.nodeEnv})`);
});

export default app;
