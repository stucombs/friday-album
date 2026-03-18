import { createClient } from '@lib/supabase';

const supabaseAnon = createClient();

export const getActiveAlbum = async (): Promise<IAlbum> => {
  const { data, error } = await supabaseAnon
    .from('albums')
    .select('*, genre ( name )')
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const getAlbumBacklog = async (): Promise<IAlbum[]> => {
  const { data, error, count } = await supabaseAnon
    .from('albums')
    .select('*, genre ( name )', { count: 'exact' })
    .eq('is_active', false)
    .eq('archived', false)
    .order('id', { ascending: false });

  if (error) throw error;

  return data;
};

export const getPastAlbums = async (page: number = 1, limit: number = 5) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabaseAnon
    .from('albums')
    .select('*, genre ( name )', { count: 'exact' })
    .eq('is_active', false)
    .eq('archived', true)
    .range(from, to)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return {
    data,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count ?? 0) / limit)
    }
  };
};

export const getRandomAlbum = async (
  archived: boolean = true
): Promise<any> => {
  const { data, error } = await supabaseAnon.rpc('random_album', {
    backlog: archived
  });

  if (error) throw error;

  return data[0].album;
};
