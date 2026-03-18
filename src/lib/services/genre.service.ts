import { createAdminClient } from '@lib/supabase';

const supabaseAdmin = createAdminClient();

export const getGenres = async (): Promise<IGenre[]> => {
  const { data, error } = await supabaseAdmin
    .from('genre')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) throw error;

  return data;
};

export const createGenre = async (payload: any) => {
  const { data, error } = await supabaseAdmin
    .from('genre')
    .insert([
      {
        ...payload
      }
    ])
    .select();

  if (error) throw error;

  return data;
};

export const deleteGenre = async (id: number) => {
  const { data, error } = await supabaseAdmin
    .from('genre')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return data;
};
