-- UPDATE RLS FOR ALL EXISTING TABLES
REVOKE ALL ON albums FROM anon, authenticated;
REVOKE ALL ON queue FROM anon, authenticated;
REVOKE ALL ON genre FROM anon, authenticated;
REVOKE ALL ON site_settings FROM anon, authenticated;
REVOKE ALL ON subscriptions FROM anon, authenticated;

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genre ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.albums TO anon;
GRANT SELECT ON public.genre TO anon;
GRANT SELECT ON public.site_settings TO anon;

CREATE POLICY "Public read access" ON public.albums FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON public.genre FOR SELECT TO anon USING (true);
CREATE POLICY "Public read access" ON public.site_settings FOR SELECT TO anon USING (true);
