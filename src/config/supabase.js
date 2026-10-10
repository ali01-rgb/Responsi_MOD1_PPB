const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

function createSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Peringatan: Variabel lingkungan SUPABASE_URL atau SUPABASE_KEY belum disetel.');
  }

  return createClient(supabaseUrl, supabaseKey);
}

module.exports = { createSupabaseClient };