import { createAdminClient } from '@lib/supabase';

const supabaseAdmin = createAdminClient();

export const getAlbumById = async (id: number): Promise<IAlbum> => {
  const { data, error } = await supabaseAdmin
    .from('albums')
    .select('*, genre ( name )')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createAlbum = async (payload: IAlbumDto) => {
  try {
    const { data, error } = await supabaseAdmin
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
  const { error: demoteError } = await supabaseAdmin
    .from('albums')
    .update({
      archived: true,
      is_active: false
    })
    .eq('is_active', true);

  if (demoteError) throw demoteError;

  //Promote new album

  const { data, error } = await supabaseAdmin
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
  const { data, error } = await supabaseAdmin
    .from('albums')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return data;
};

export const editAlbum = async (payload: any) => {
  const { data, error } = await supabaseAdmin
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
