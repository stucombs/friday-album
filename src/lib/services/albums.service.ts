import { createClient } from '@lib/supabase';

const supabaseAnon = createClient();

export const getActiveAlbum = async (): Promise<IAlbum> => {
  const { data, error } = await supabaseAnon
    .from('albums')
    .select('*, ...genre ( genre_name:name ), album_status!inner()')
    .eq('album_status.is_active', true)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const getAlbumBacklog = async (): Promise<IAlbum[]> => {
  const { data, error, count } = await supabaseAnon
    .from('albums')
    .select('*, ...genre ( genre_name:name ), album_status()')
    .is('album_status', null);

  if (error) throw error;

  return data;
};

export const getPastAlbums = async (page: number = 1, limit: number = 5) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabaseAnon
    .from('albums')
    .select(
      '*, ...genre ( genre_name:name ), ...album_status!inner( active_date )',
      { count: 'exact' }
    )
    .eq('album_status.is_active', false)
    .range(from, to)
    .order('album_status(active_date)', {
      ascending: false,
      nullsFirst: false
    });

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
