CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  is_active boolean not null default true,
  unsub_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
) TABLESPACE pg_default;

alter table "public"."subscriptions" enable row level security;
create policy "anon_users_all"
on "public"."subscriptions"
for insert
to anon
with check(true)
