import { createClient } from '@lib/supabase';

const supabase = createClient();

export const getActiveAlbum = async (): Promise<IAlbum> => {
  const { data, error } = await supabase
    .from('albums')
    .select('*, genre ( name )')
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const getAlbumById = async (id: number): Promise<IAlbum> => {
  const { data, error } = await supabase
    .from('albums')
    .select('*, genre ( name )')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const getAlbumBacklog = async (): Promise<IAlbum[]> => {
  const { data, error, count } = await supabase
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

  const { data, error, count } = await supabase
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

export const createAlbum = async (payload: IAlbumDto) => {
  try {
    const { data, error } = await supabase
      .from('albums')
      .insert([
        {
          ...payload,
          is_active: false,
          archived: false
        }
      ])
      .select();

    return { data, error };
  } catch (err: any) {
    return {
      data: null,
      error: err.message
    };
  }
};

export const promoteAlbum = async (id: number) => {
  // Demote current live album
  const { error: demoteError } = await supabase
    .from('albums')
    .update({
      archived: true,
      is_active: false
    })
    .eq('is_active', true);

  if (demoteError) throw demoteError;

  //Promote new album

  const { data, error } = await supabase
    .from('albums')
    .update({
      is_active: true
    })
    .eq('id', id)
    .select();

  if (error) throw error;

  return data;
};

export const deleteAlbum = async (id: number) => {
  const { data, error } = await supabase.from('albums').delete().eq('id', id);

  if (error) throw error;

  return data;
};

export const editAlbum = async (payload: any) => {
  const { data, error } = await supabase
    .from('albums')
    .update({
      title: payload.title,
      artist: payload.artist,
      release_year: payload.release_year,
      genre_id: payload.genre_id,
      cover_url: payload.cover_url,
      spotify_link: payload.spotify_link,
      am_link: payload.am_link,
      updated_at: new Date()
    })
    .eq('id', payload.id);

  if (error) throw error;

  return data;
};

export const getRandomAlbum = async (
  archived: boolean = true
): Promise<any> => {
  const { data, error } = await supabase.rpc('random_album', {
    backlog: archived
  });

  if (error) throw error;

  return data[0].album;
};
