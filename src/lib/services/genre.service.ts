import { createClient } from '@lib/supabase';

const supabase = createClient();

export const getGenres = async (): Promise<IGenre[]> => {
  const { data, error } = await supabase
    .from('genre')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) throw error;

  return data;
};

export const getGenreById = async (id: number): Promise<IGenre> => {
  const { data, error } = await supabase
    .from('genre')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createGenre = async (payload: any) => {
  const { data, error } = await supabase
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
  const { data, error } = await supabase.from('genre').delete().eq('id', id);

  if (error) throw error;

  return data;
};
