require('dotenv').config();

const createApp = require('../src/app');
const { createSupabaseClient } = require('../src/config/supabase');
const { createModels } = require('../src/models');

const app = createApp({
  models: createModels(createSupabaseClient()),
});

module.exports = app;