import { supabase } from '@/lib/supabase-server';

export async function getActiveAlbum() {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;

  return data;
}

export async  function getPastAlbums() {
    const { data, error } = await supabase
        .from('albums')
        .select('*')
        .eq('is_active', false)
        .eq('archived', true);
    if( error ) throw error;

    return data;
}