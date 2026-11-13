SET local check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.random_album (
  backlog boolean
)
  RETURNS SETOF record
  LANGUAGE sql
  AS $function$select jsonb_build_object(
    'id', stat.album_id,
    'title', a.title,
    'artist', a.artist,
    'release_year', a.release_year,
    'genre_name', g.name,
    'am_link', a.am_link,
    'spotify_link', a.spotify_link,
    'cover_url', a.cover_url
  ) as album
  from album_status stat
  inner join albums a on stat.album_id = a.id
  inner join genre g on g.id = a.genre_id
  where stat.is_active = false
  order by random()
  limit 1;$function$;
