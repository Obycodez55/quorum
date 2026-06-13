import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/quorum',
  brevoApiKey: process.env.BREVO_API_KEY || '',
  brevoSenderEmail: process.env.BREVO_SENDER_EMAIL || 'noreply@quorum.com',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiration: (process.env.JWT_EXPIRATION || '30d') as SignOptions['expiresIn'],
  cookieName: 'organization-token'
};

export default config;
export type Config = typeof config;