import dev from './dev';

const envFile = process.env.NODE_ENV || 'dev';
const envs = { dev };

export const env = envs[envFile];