-- 1) Public factories discovery via SECURITY DEFINER function
create or replace function public.get_public_factories()
returns table (
  id uuid,
  nome_razao_social text,
  endereco_completo text,
  logo_url text,
  link_instagram text,
  capacidade_producao_mensal text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select id, nome_razao_social, endereco_completo, logo_url, link_instagram, capacidade_producao_mensal, created_at
  from public.fabrica_registrations;
$$;

-- Limit execution to authenticated users
revoke all on function public.get_public_factories() from public;
grant execute on function public.get_public_factories() to authenticated;

-- 2) Bar branches table with RLS
create table if not exists public.bar_branches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  address text not null,
  taps integer not null default 0,
  manager text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bar_branches enable row level security;

-- RLS policies
create policy if not exists "Users can create their own branches"
  on public.bar_branches for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can view their own branches"
  on public.bar_branches for select
  using (auth.uid() = user_id);

create policy if not exists "Users can update their own branches"
  on public.bar_branches for update
  using (auth.uid() = user_id);

create policy if not exists "Users can delete their own branches"
  on public.bar_branches for delete
  using (auth.uid() = user_id);

-- Updated_at trigger
create trigger if not exists set_bar_branches_updated_at
before update on public.bar_branches
for each row execute function public.update_updated_at_column();