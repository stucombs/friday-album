import { supabase } from '@/lib/supabase-server';
import { IAlbum } from '@/types';

export const getActiveAlbum = async (): Promise<IAlbum> => {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `)
    .eq('is_active', true)
    .maybeSingle();
  
  if ( error ) throw error;

  return data;
};

export const getAlbumById = async (id: number): Promise<IAlbum> => {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `)
    .eq('id', id)
    .maybeSingle();
    
  if( error ) throw error;

  return data;
};

export const getAlbums = async (): Promise<IAlbum[]> => {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `)
    .eq('is_active', false)
    .eq('archived', false)
    .order('id',{ ascending: true });

  if( error ) throw error;

  return data;
};

export const getPastAlbums = async (): Promise<IAlbum[]> => {
  const { data, error } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `)
    .eq('is_active', false)
    .eq('archived', true)
    .order('updated_at', { ascending: false });
  
  if( error ) throw error;

  return data;
};

export const addAlbum = async (payload: IAlbum) => {
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
  
  if( error ) throw error;
  
  return data;
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
  
  if( demoteError ) throw demoteError;

  //Promote new album

  const { data, error } = await supabase
    .from('albums')
    .update({
      is_active: true
    })
    .eq('id', id)
    .select();
  
  if( error ) throw error;

  return data;
};
