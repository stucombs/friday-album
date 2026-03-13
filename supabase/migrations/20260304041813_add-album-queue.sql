CREATE TABLE IF NOT EXISTS queue (
  id uuid primary key default gen_random_uuid(),
  album_id INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(album_id),
  UNIQUE(position)
) TABLESPACE pg_default;
