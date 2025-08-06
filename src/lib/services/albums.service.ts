import { createClient } from '@/lib/supabase/client';
import { IAlbum, IAlbumDto } from '@/types';

const supabase = createClient();

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

export const getAlbumBacklog = async (
  page: number = 1,
  limit: number = 8
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `)
    .eq('is_active', false)
    .eq('archived', false)
    .range(from, to)
    .order('id',{ ascending: false });

  if( error ) throw error;

  return {
    data,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count ?? 0 ) / limit )
    }
  };
};

export const getPastAlbums = async (
  page: number = 1,
  limit: number = 5
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('albums')
    .select(`
      *,
      genre (
        name
      )
    `, { count: 'exact' })
    .eq('is_active', false)
    .eq('archived', true)
    .range(from, to)
    .order('updated_at', { ascending: false });
  
  if( error ) throw error;

  return {
    data,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count ?? 0 ) / limit )
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
  	} catch(err: any) {
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
