import { createClient } from '@lib/supabase';

const supabase = createClient();

export const getSettings = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

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
