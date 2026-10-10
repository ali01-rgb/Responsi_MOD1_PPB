require('dotenv').config();

const createApp = require('../src/app');
const { createSupabaseClient } = require('../src/config/supabase');
const { createModels } = require('../src/models');

const supabase = createSupabaseClient();
const models = createModels(supabase);

const app = createApp({ models });

module.exports = app;