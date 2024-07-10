// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseAnonKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
