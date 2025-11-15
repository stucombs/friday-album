import { createClient } from '@lib/supabase/client';

const supabase = createClient();

export const getSettings = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

export const setSettings = async (payload: any): Promise<any> => {
  const { data, error } = await supabase.from('site_settings').insert({
    value: payload
  });

  if (error) throw error;

  return data;
};
