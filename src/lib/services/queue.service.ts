import { createClient } from '@lib/supabase';

const supabaseAdmin = createClient();

export const getQueue = async (): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('queue')
    .select('*, albums ( * )')
    .order('position', { ascending: true });

  if (error) throw error;

  return data;
};

export const saveQueue = async (queue: any[]): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('queue')
    .upsert(queue, { onConflict: 'album_id' })
    .select();

  if (error) throw error;

  return data;
};
