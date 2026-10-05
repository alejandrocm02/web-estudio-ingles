-- Run with the SQL editor/admin connection. All fixture data rolls back.
begin;
insert into auth.users(id) values ('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$ declare n int; begin
  select count(*) into n from public.save_study_progress(0,'{"grammar":{"A1":[true]}}');
  assert n=1,'first insert failed';
  select count(*) into n from public.save_study_progress(0,'{}');
  assert n=0,'stale insert overwrote progress';
  select count(*) into n from public.save_study_progress(1,'{"grammar":{"A1":[true,true]}}');
  assert n=1,'update failed';
  select count(*) into n from public.save_study_progress(1,'{}');
  assert n=0,'stale revision overwrote progress';
end $$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
do $$ declare n int; begin
  select count(*) into n from public.study_progress; assert n=0,'other user can read';
  select count(*) into n from public.save_study_progress(2,'{}'); assert n=0,'other user can update';
  begin
    insert into public.study_progress(user_id,payload) values ('11111111-1111-4111-8111-111111111111','{}');
    raise exception 'insert policy failed';
  exception when insufficient_privilege then null; end;
  select count(*) into n from public.save_study_progress(0,'{}'); assert n=1,'second user insert failed';
  begin
    update public.study_progress set user_id='33333333-3333-4333-8333-333333333333';
    raise exception 'update ownership check failed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
do $$ begin
  assert not has_table_privilege('anon','public.study_progress','select'),'anon can read';
  assert not has_function_privilege('anon','public.save_study_progress(bigint,jsonb)','execute'),'anon can write';
end $$;
rollback;
select 'All isolation and conflict assertions passed; fixtures rolled back.' as result;
