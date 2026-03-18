-- UPDATE RLS FOR ALL EXISTING TABLES
DROP POLICY IF EXISTS "Enable access for all anon users" ON albums;
DROP POLICY IF EXISTS "anon_users_all" ON public.site_settings;
DROP POLICY IF EXISTS "anon_users_all" ON public.subscriptions;
DROP POLICY IF EXISTS "Enable access for all anon users" ON public.genre;

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genre ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Grant SELECT to anon for albums table
CREATE POLICY "public read access"
ON public.albums FOR SELECT
TO anon
USING (true);

-- Grant SELECT to anon for genre table
CREATE POLICY "public read access"
ON public.genre FOR SELECT
TO anon
USING (true);

-- Grant SELECT to anon for settings table
CREATE POLICY "public read access"
ON public.site_settings FOR SELECT
TO anon
USING (true);
