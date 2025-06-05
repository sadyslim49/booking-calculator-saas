import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kizaerneuhchbommkyaz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpemFlcm5ldWhjaGJvbW1reWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDMwNTAsImV4cCI6MjA2MzkxOTA1MH0.u56XXMmTiFcP2o_sIczvilNSCHF4Rkb_uM0fa9cWN0c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);