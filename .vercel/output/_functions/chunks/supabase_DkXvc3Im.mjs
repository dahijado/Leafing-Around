import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://psugkcdjjbonbusqdgkg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzdWdrY2RqamJvbmJ1c3FkZ2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1ODA1MzMsImV4cCI6MjA5MTE1NjUzM30.JLxUozRKVafL3vVowu3zJLb7AJXIbW8Y5BuG50eYFws";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    persistSession: false
  }
});

export { supabase as s };
