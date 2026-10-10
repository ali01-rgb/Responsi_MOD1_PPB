const { createLoanModel } = require('./loan');

function createModels(supabase) {
  return {
    loan: createLoanModel(supabase)
  };
}

module.exports = { createModels };