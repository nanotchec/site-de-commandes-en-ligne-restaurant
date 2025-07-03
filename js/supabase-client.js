
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Remplacez les valeurs ci-dessous par votre URL et votre clé anonyme Supabase
const supabaseUrl = 'https://sjnhfchjznlovroljojv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbmhmY2hqem5sb3Zyb2xqb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NjE2ODYsImV4cCI6MjA2NzAzNzY4Nn0.D5c3eivo1vsr-xJDx_6Jo0aFQVzszL_3EFgvf1a8Q0k';

// Créez et exportez le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
