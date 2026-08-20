import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project details
const supabaseUrl = 'https://kpayeynskkyzysmodefb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwYXlleW5za2t5enlzbW9kZWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMjU2MzQsImV4cCI6MjEwMjgwMTYzNH0.ie0udT9nqx8OqutF01akOQm2SehRur78lqq73qjjMqY';

export const supabase = createClient(supabaseUrl, supabaseKey);