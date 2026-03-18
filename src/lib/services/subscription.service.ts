import { createAdminClient } from '@lib/supabase';

const supabaseAdmin = createAdminClient();

export const addEmail = async (email: string): Promise<any> => {
  const { data, error } = await supabaseAdmin.from('subscriptions').insert([
    {
      email,
      is_active: true
    }
  ]);

  if (error) throw error;

  return data;
};

export const unsubscribe = async (token: string): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .update({
      is_active: false
    })
    .eq('unsub_token', token)
    .select();

  if (error) throw error;

  return data;
};

export const getSubscriptions = async (): Promise<any> => {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('email, unsub_token')
    .eq('is_active', true);

  if (error) throw error;

  return data;
};
