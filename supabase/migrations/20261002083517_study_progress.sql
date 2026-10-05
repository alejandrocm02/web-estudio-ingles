-- One private document per authenticated learner. The primary key indexes RLS.
create table public.study_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 2097152),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);
alter table public.study_progress enable row level security;
revoke all on public.study_progress from public, anon, authenticated;
grant select, insert, update on public.study_progress to authenticated;
create policy own_read on public.study_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy own_insert on public.study_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy own_update on public.study_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Atomic compare-and-swap. A zero-row result means another device wrote first.
create function public.save_study_progress(expected_revision bigint, new_payload jsonb)
returns setof public.study_progress language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_revision = 0 then
    return query insert into public.study_progress(user_id,payload) values(auth.uid(),new_payload)
      on conflict(user_id) do nothing returning *;
  else
    return query update public.study_progress set payload=new_payload,revision=revision+1,updated_at=now()
      where user_id=auth.uid() and revision=expected_revision returning *;
  end if;
end;
$$;
revoke all on function public.save_study_progress(bigint,jsonb) from public, anon;
grant execute on function public.save_study_progress(bigint,jsonb) to authenticated;
