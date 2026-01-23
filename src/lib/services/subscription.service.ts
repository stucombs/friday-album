import { createClient } from '@lib/supabase/client';

const supabase = createClient();

export const createSubscription = async (email: string): Promise<any> => {
  try {
    const { data, error } = await supabase.from('subscriptions').insert([
      {
        email,
        is_active: true
      }
    ]);

    return { data, error };
  } catch (err: any) {
    return {
      data: null,
      error: err.message
    };
  }
};

export const unsubscribe = async (): Promise<any> => {
  // TODO: Unsubscribe logic
};
