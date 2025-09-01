import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhzefqyvmzvkecmqugdy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoemVmcXl2bXp2a2VjbXF1Z2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDQ4OTIsImV4cCI6MjA3MjMyMDg5Mn0.6Ph3l2baFvi5SFz7Kj_IaM3X9_qFmFNNLZkGDg9Lf-s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)