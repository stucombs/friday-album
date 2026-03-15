import { createAdminClient } from '@lib/supabase';

const supabaseAdmin = createAdminClient();

export const getQueue = async (): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('queue')
    .select('*, albums ( * )')
    .order('position', { ascending: true });

  if (error) throw error;

  return data;
};

export const saveQueue = async (queue: any[]): Promise<any> => {
  // wipe the queue table before saving the new queue to avoid unique indexes
  const { data: deleteData, error: deleteError } = await supabaseAdmin
    .from('queue')
    .delete()
    .neq('album_id', 0);

  if (deleteError) throw deleteError;

  const { data, error } = await supabaseAdmin
    .from('queue')
    .upsert(queue, { onConflict: 'album_id' })
    .select();

  if (error) throw error;

  return data;
};

export const getTopQueue = async (): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('queue')
    .select('*, albums ( * )')
    .eq('position', 1)
    .maybeSingle();

  if (error) throw error;

  console.log(data);

  return data;
};
