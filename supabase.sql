-- Rode no Supabase: SQL Editor > New query > Run
create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_state enable row level security;
drop policy if exists "cada usuario acessa so o proprio estado" on public.user_state;
create policy "cada usuario acessa so o proprio estado" on public.user_state
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);