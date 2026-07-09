-- Quirófano del Futuro 2026 — sistema de matrícula
-- XI Curso Nacional y XII Regional de Enfermería en Centro Quirúrgico
-- Ejecutar en el SQL Editor de tu proyecto Supabase.

create extension if not exists "pgcrypto";

create type tipo_participante as enum ('profesional', 'tecnico');
create type estado_registro as enum ('pendiente', 'aprobado', 'rechazado');

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  nombres text not null,
  apellidos text not null,
  dni text not null,
  correo text not null,
  celular text not null,
  profesion text not null,
  tipo_participante tipo_participante not null,
  ciudad text not null,
  institucion text not null,
  voucher_url text not null,
  acepta_terminos boolean not null,
  estado estado_registro not null default 'pendiente',
  fecha_registro timestamptz not null default now(),

  constraint registrations_dni_check check (dni ~ '^\d{8}$'),
  constraint registrations_celular_check check (celular ~ '^9\d{8}$'),
  constraint registrations_acepta_terminos_check check (acepta_terminos is true)
);

-- Evita registros duplicados por DNI o por correo (case-insensitive).
create unique index if not exists registrations_dni_key on registrations (dni);
create unique index if not exists registrations_correo_lower_key on registrations (lower(correo));

create index if not exists registrations_tipo_participante_idx on registrations (tipo_participante);

-- RLS: todas las escrituras y lecturas pasan por Route Handlers usando la
-- service_role key (bypassa RLS). No exponemos esta tabla al cliente con la
-- anon key, así que dejamos RLS activado sin policies (deny-all por defecto).
alter table registrations enable row level security;

-- Storage: bucket para comprobantes de pago.
-- Ejecuta esto una sola vez (o créalo desde el dashboard: Storage > New bucket).
insert into storage.buckets (id, name, public)
values ('vouchers', 'vouchers', true)
on conflict (id) do nothing;

-- El bucket es público para lectura (así el correo al administrador puede
-- enlazar directo al comprobante); las subidas solo ocurren vía service_role
-- desde el servidor.
