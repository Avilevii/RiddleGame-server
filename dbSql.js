import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const DB_KEY=process.env.DB_PUBLIC_SECRET
export const supabase = createClient(process.env.DB_URL,DB_KEY);