C4App.database = {
  async create(table, data) {
    const { data: result, error } = await supabase.from(table).insert([data]);
    if (error) {
      console.error('Erro ao criar registro:', error);
      return { success: false, error };
    }
    return { success: true, data: result[0] };
  },

  async read(table, filters = {}) {
    let query = supabase.from(table).select('*');
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    const { data, error } = await query;
    if (error) {
      console.error('Erro ao ler registros:', error);
      return { success: false, error };
    }
    return { success: true, data };
  },

  async update(table, id, data) {
    const { data: result, error } = await supabase.from(table).update(data).eq('id', id);
    if (error) {
      console.error('Erro ao atualizar registro:', error);
      return { success: false, error };
    }
    return { success: true, data: result[0] };
  },

  async delete(table, id) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      console.error('Erro ao deletar registro:', error);
      return { success: false, error };
    }
    return { success: true };
  }
};
