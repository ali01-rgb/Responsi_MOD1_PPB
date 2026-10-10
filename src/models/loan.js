function createLoanModel(supabase) {
  return {
    async findAll({ status } = {}) {
      let query = supabase
        .from('loans')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.ilike('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    async findById(id) {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('id', id);

      if (error) throw error;
      return data && data.length > 0 ? data[0] : null;
    },

    async create(payload) {
      const { data, error } = await supabase
        .from('loans')
        .insert([payload])
        .select();

      if (error) throw error;
      return data && data.length > 0 ? data[0] : null;
    },

    async update(id, payload) {
      const { data, error } = await supabase
        .from('loans')
        .update(payload)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data && data.length > 0 ? data[0] : null;
    },

    async delete(id) {
      const { error } = await supabase
        .from('loans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    }
  };
}

module.exports = { createLoanModel };